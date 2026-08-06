'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './vinylShader';

// Scroll and pointer live outside React on purpose. Writing either into state
// would re-render the tree every frame; useFrame reads plain mutable values.
const input = { pointerX: 0, pointerY: 0, scroll: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      input.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      input.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
  window.addEventListener(
    'scroll',
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.scroll = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    },
    { passive: true },
  );
}

function Field({ octaves, intensity }: { octaves: number; intensity: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uIntensity: { value: intensity },
      uOctaves: { value: octaves },
    }),
    // Recreated only when the quality tier flips, which is rare.
    [octaves, intensity],
  );

  useFrame((_, delta) => {
    const u = mat.current.uniforms;
    u.uTime.value += delta;
    u.uRes.value.set(size.width, size.height);
    // Damp toward the pointer so it trails the cursor with weight.
    u.uPointer.value.x = THREE.MathUtils.damp(u.uPointer.value.x, input.pointerX, 2.4, delta);
    u.uPointer.value.y = THREE.MathUtils.damp(u.uPointer.value.y, input.pointerY, 2.4, delta);
    u.uScroll.value = THREE.MathUtils.damp(u.uScroll.value, input.scroll, 3, delta);
  });

  return (
    <mesh frustumCulled={false}>
      {/* Fullscreen triangle-ish quad; the vertex shader ignores the camera. */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function VinylField({ intensity = 1 }: { intensity?: number }) {
  const coarse = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
  const [dpr, setDpr] = useState(coarse ? 1 : 1.5);
  const [octaves, setOctaves] = useState(coarse ? 3 : 5);

  return (
    <Canvas
      // Fragment cost scales with DPR squared — 2.0 -> 1.5 is a 44% saving that
      // nobody can see on a slow-moving noise field.
      dpr={[1, dpr]}
      gl={{
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setOctaves(3);
        }}
        flipflops={3}
        onFallback={() => {
          setDpr(1);
          setOctaves(2);
        }}
      />
      <AdaptiveDpr />
      <Field octaves={octaves} intensity={intensity} />
    </Canvas>
  );
}
