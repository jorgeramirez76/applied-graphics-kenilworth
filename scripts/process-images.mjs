/**
 * Image pipeline for Applied Graphics.
 *
 * - Reads ORIGINAL, untouched photos from /assets/raw  (never modified)
 * - Lightly enhances them (brighten, color-correct, sharpen), resizes
 *   WITHOUT upscaling, and exports optimized WebP to /public/images
 * - Generates a branded Open Graph card and app icon (typographic art —
 *   NOT a fabricated photo of work)
 *
 * Every source photo is the client's own public work and is marked
 * "needs-permission" in /data/projects.json and /research/visual-assets.md.
 *
 * Run:  npm run images
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(ROOT, 'assets', 'raw');
const OUT = path.join(ROOT, 'public', 'images');

const BRAND = { ink: '#0b0b0d', red: '#e11d2a', steel: '#9aa3ad', cream: '#f5f4f1' };

// raw filename -> optimized slug (matches /data/projects.json)
const MAP = {
  'p01_hilltop_bicycles.jpg': 'hilltop-bicycles-van-wrap',
  'p02_health_bus.jpg': 'metroplus-health-mobile-unit',
  'p03_garage_sign.jpg': 'garage-kings-box-truck',
  'p04_joe_fix_it.jpg': 'mr-joe-fix-it-van',
  'p05_color_change.jpg': 'jeep-color-change',
  'p06_post6.jpg': 'holden-color-change',
  'p08_post8.jpg': 'crush-covid-mobile-unit',
  'p09_post9.jpg': 'door-boy-van',
  'site03.jpg': 'applied-graphics-company-van',
};

async function processPhotos() {
  await mkdir(OUT, { recursive: true });
  if (!existsSync(RAW)) {
    console.warn(`! raw dir not found: ${RAW}`);
    return;
  }
  const files = await readdir(RAW);
  let done = 0;
  for (const [src, slug] of Object.entries(MAP)) {
    if (!files.includes(src)) {
      console.warn(`  - skip (missing): ${src}`);
      continue;
    }
    const input = path.join(RAW, src);
    const meta = await sharp(input).metadata();
    const targetW = Math.min(meta.width || 1280, 1280); // never upscale
    const out = path.join(OUT, `${slug}.webp`);
    const info = await sharp(input)
      .rotate()
      .resize({ width: targetW, withoutEnlargement: true })
      .modulate({ brightness: 1.07, saturation: 1.08 }) // brighten + color-correct
      .linear(1.03, -3) // gentle contrast
      .sharpen({ sigma: 0.7 }) // light sharpen
      .webp({ quality: 84 })
      .toFile(out);
    console.log(`  ✓ ${src}  ->  images/${slug}.webp  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB)`);
    done++;
  }
  console.log(`Processed ${done} photos.`);
}

function ogSvg() {
  return Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#101114"/>
        <stop offset="1" stop-color="#0a0a0c"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="0" y="0" width="14" height="630" fill="${BRAND.red}"/>
    <text x="80" y="190" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="42" fill="${BRAND.red}" letter-spacing="6">APPLIED GRAPHICS</text>
    <text x="78" y="320" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="104" fill="${BRAND.cream}">The wrap with</text>
    <text x="78" y="430" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="104" fill="${BRAND.cream}">a warranty.</text>
    <text x="80" y="520" font-family="Arial, sans-serif" font-size="30" fill="${BRAND.steel}">Vehicle wraps &amp; large-format graphics &#183; Kenilworth, NJ &#183; (908) 620-9600</text>
    <text x="80" y="575" font-family="Arial, sans-serif" font-size="24" fill="#5f666e">3M-Certified Installers &#183; BBB A+ &#183; Since 1978</text>
  </svg>`);
}

function iconSvg(size) {
  return Buffer.from(`
  <svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill="#0b0b0d"/>
    <rect x="96" y="150" width="44" height="230" fill="#e11d2a" transform="skewX(-12)"/>
    <text x="190" y="340" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="250" fill="#f5f4f1">A</text>
  </svg>`);
}

async function branding() {
  await mkdir(path.join(ROOT, 'public'), { recursive: true });
  await sharp(ogSvg()).jpeg({ quality: 88 }).toFile(path.join(ROOT, 'public', 'og.jpg'));
  console.log('  ✓ public/og.jpg (1200x630)');
  await sharp(iconSvg(512)).png().toFile(path.join(ROOT, 'src', 'app', 'icon.png'));
  await sharp(iconSvg(180)).resize(180, 180).png().toFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'));
  console.log('  ✓ src/app/icon.png + apple-icon.png');
}

console.log('Applied Graphics — image pipeline\n----------------------------------');
await processPhotos();
await branding();
console.log('Done.');
