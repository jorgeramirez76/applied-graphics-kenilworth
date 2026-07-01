/**
 * Processes client-PROVIDED job photos (Costa Coffee machines, Notorious Boxing
 * Club interior mural + window graphics, World Cup cooler wrap) into optimized
 * web images. Originals kept untouched in /assets/raw/provided.
 * Auto-rotates (EXIF), trims distractions, brightens, sharpens.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'raw', 'provided');
const OUT = path.join(ROOT, 'public', 'images');

const JOBS = [
  { src: 'IMG_4542.jpg', out: 'costa-coffee-machine-wrap', trim: { top: 0.0, bottom: 0.0 } },
  { src: 'IMG_6441.jpg', out: 'notorious-gym-wall-mural', trim: { top: 0.03, bottom: 0.19 } },
  { src: 'IMG_6442.jpg', out: 'notorious-window-graphics', trim: { top: 0.0, bottom: 0.04 } },
  { src: 'IMG_9708.jpg', out: 'world-cup-cooler-wrap', trim: { top: 0.0, bottom: 0.08 } },
];

for (const j of JOBS) {
  const input = path.join(SRC, j.src);
  // Apply EXIF rotation into a buffer so we know the TRUE pixel dimensions.
  const { data, info: rinfo } = await sharp(input).rotate().toBuffer({ resolveWithObject: true });
  const w = rinfo.width,
    h = rinfo.height;
  const top = Math.round(h * (j.trim.top || 0));
  const cropH = Math.round(h * (1 - (j.trim.top || 0) - (j.trim.bottom || 0)));
  const info = await sharp(data)
    .extract({ left: 0, top, width: w, height: cropH })
    .resize({ width: 1500, withoutEnlargement: true })
    .modulate({ brightness: 1.06, saturation: 1.07 })
    .linear(1.04, -4)
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `${j.out}.webp`));
  console.log(`  ✓ ${j.out}.webp (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB)`);
}
console.log('Done.');
