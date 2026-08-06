// usage: node scripts/webp.mjs <in.png> <outBase> <largeW> <smallW>
// writes <outBase>.webp (q82) and <outBase>-sm.webp (q78)
import sharp from 'sharp';

const [, , input, outBase, largeW, smallW] = process.argv;
for (const [w, q, suffix] of [
  [Number(largeW), 82, ''],
  [Number(smallW), 78, '-sm'],
]) {
  const out = `${outBase}${suffix}.webp`;
  const m = await sharp(input).resize({ width: w }).webp({ quality: q }).toFile(out);
  console.log(out, `${m.width}x${m.height}`, `${Math.round(m.size / 1024)}KB`);
}
