// Authored as a template literal rather than a .glsl file on purpose: Next 16
// builds with Turbopack by default, and adding a raw-loader rule is a build-config
// risk this earns nothing for. `/* glsl */` keeps editor highlighting.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * "Liquid vinyl" — domain-warped fBm read as flowing laminated film, raked by
 * the same overhead LED strips that light the install bay, then dithered so the
 * dark gradients band the way a printed sheet does instead of the way an 8-bit
 * gradient does.
 */
export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uPointer;   // -1..1, damped
  uniform float uScroll;    // 0..1 page progress
  uniform float uIntensity; // master fade, lets the hero dial it down
  uniform int   uOctaves;   // 5 desktop / 3 mobile

  const vec3 INK   = vec3(0.039, 0.039, 0.047);
  const vec3 COAL  = vec3(0.090, 0.094, 0.114);
  const vec3 BRAND = vec3(0.910, 0.125, 0.180);
  const vec3 BONE  = vec3(0.957, 0.945, 0.918);

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8); // decorrelates the octaves
    for (int i = 0; i < 6; i++) {
      if (i >= uOctaves) break;
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  // Ordered 4x4 Bayer dither. Cheap, and the halftone read is on-brand for a
  // print shop.
  float bayer(vec2 fragCoord) {
    int x = int(mod(fragCoord.x, 4.0));
    int y = int(mod(fragCoord.y, 4.0));
    int idx = x + y * 4;
    float m[16];
    m[0]=0.0;  m[1]=8.0;  m[2]=2.0;  m[3]=10.0;
    m[4]=12.0; m[5]=4.0;  m[6]=14.0; m[7]=6.0;
    m[8]=3.0;  m[9]=11.0; m[10]=1.0; m[11]=9.0;
    m[12]=15.0;m[13]=7.0; m[14]=13.0;m[15]=5.0;
    float v = 0.0;
    for (int i = 0; i < 16; i++) { if (i == idx) v = m[i]; }
    return v / 16.0 - 0.5;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);

    float t = uTime * 0.045;

    // Pointer nudges the field rather than moving a camera — no layout cost.
    p += uPointer * 0.055;
    p.y += uScroll * 0.35;

    // Domain warp: two nested fBm lookups. This is what makes it read as a
    // sheet of film settling rather than as generic noise.
    vec2 q = vec2(fbm(p * 1.6 + vec2(0.0, t)), fbm(p * 1.6 + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(fbm(p * 1.6 + 3.4 * q + vec2(1.7, 9.2) + 0.30 * t),
                  fbm(p * 1.6 + 3.4 * q + vec2(8.3, 2.8) - 0.24 * t));
    float f = fbm(p * 1.6 + 3.2 * r);

    float film = smoothstep(-0.55, 0.75, f);

    vec3 col = mix(INK, COAL, smoothstep(0.15, 0.85, film));
    // Brand only in the hot core of the warp, so red stays an accent.
    col = mix(col, BRAND, smoothstep(0.62, 1.05, film) * 0.85);

    // Anisotropic rake: the overhead LED strips sliding along laminated vinyl.
    float axis = p.x * 0.65 + p.y * 2.35;
    float streak = pow(abs(sin(axis * 3.0 + f * 5.0 + uTime * 0.16)), 26.0);
    col += BONE * streak * 0.22 * smoothstep(0.35, 0.9, film);

    // Specular bloom where the warp folds back on itself.
    float fold = smoothstep(0.80, 1.0, length(r));
    col += BRAND * fold * 0.18;

    // Vignette keeps the type legible over the middle.
    float vig = smoothstep(1.25, 0.25, length(p * vec2(0.85, 1.0)));
    col *= mix(0.55, 1.0, vig);

    col *= uIntensity;
    col += bayer(gl_FragCoord.xy) * (1.6 / 255.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;
