// Custom next/image loader for static export.
// Serves local assets as-is (no optimization) but prefixes the GitHub Pages
// basePath so images resolve when the site is hosted under /<repo>.
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (/^https?:\/\//.test(src)) return src; // external URL — leave alone
  return `${base}${src}`;
}
