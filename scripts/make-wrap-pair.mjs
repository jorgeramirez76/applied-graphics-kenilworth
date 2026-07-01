/**
 * Builds the aligned image pair for the scroll-driven WrapReveal:
 *  - van-blank.webp   : generated plain white van, framed to match
 *  - van-wrapped.webp : the REAL Applied Graphics wrapped van, same framing
 * Both 1200x750 on white so a left→right wipe is seamless in the background
 * and only reveals the wrap across the van body.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'images');
const W = 1200, H = 750;

// White van — crop generated image to frame the van ~full width, centered.
await sharp(path.join(ROOT, 'assets', 'raw', 'generated-white-van.png'))
  .extract({ left: 178, top: 22, width: 1066, height: 666 })
  .resize(W, H, { fit: 'cover', position: 'center' })
  .flatten({ background: '#ffffff' })
  .modulate({ brightness: 1.02 })
  .webp({ quality: 90 })
  .toFile(path.join(OUT, 'van-blank.webp'));
console.log('  ✓ van-blank.webp');

// Wrapped van — real AG van, same canvas/framing, flattened on white.
await sharp(path.join(ROOT, 'assets', 'raw', 'site03.jpg'))
  .resize(W, H, { fit: 'cover', position: 'center' })
  .flatten({ background: '#ffffff' })
  .modulate({ brightness: 1.05, saturation: 1.08 })
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 90 })
  .toFile(path.join(OUT, 'van-wrapped.webp'));
console.log('  ✓ van-wrapped.webp');
console.log('Done.');
