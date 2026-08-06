/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site under /<repo>. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH to that path; locally it's empty (root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export', // static export for GitHub Pages
  // Pin Turbopack's root here; without it Next walks up and finds an unrelated
  // lockfile in the home directory.
  turbopack: { root: import.meta.dirname },
  // three.js and drei ship untranspiled modern ESM.
  transpilePackages: ['three', 'three-stdlib', '@react-three/drei'],
  reactStrictMode: false, // avoids GSAP/Lenis double-invoke in dev
  trailingSlash: true, // /about -> /about/index.html on static hosts
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // Custom loader prefixes the basePath so images resolve under a subpath.
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
