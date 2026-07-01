/**
 * Generates a "blank white van" version of Applied Graphics' own company van,
 * used as the un-wrapped base in the scroll-driven WrapReveal. Same vehicle,
 * same angle/crop as the wrapped image so the wrap aligns perfectly as it
 * reveals. Desaturated + brightened so the red wrap reads as plain white panel.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const input = path.join(ROOT, 'assets', 'raw', 'site03.jpg');

async function variant(name, pipe) {
  const out = path.join(ROOT, 'public', 'images', name);
  const info = await pipe(sharp(input).rotate()).webp({ quality: 88 }).toFile(out);
  console.log(`  ✓ ${name} (${info.width}x${info.height})`);
}

// strong white-out: greyscale, lift shadows + brighten body toward white
await variant('applied-graphics-van-blank.webp', (s) =>
  s.greyscale().linear(1.28, 64).modulate({ brightness: 1.06 }).gamma(1.25),
);

console.log('Done.');
