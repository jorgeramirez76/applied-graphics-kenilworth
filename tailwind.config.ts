import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2.5rem' },
      screens: { '2xl': '1340px' },
    },
    extend: {
      colors: {
        ink: '#0a0a0c',
        carbon: '#101013',
        graphite: '#17181d',
        slate: '#1f2127',
        steel: '#8a909a',
        ash: '#5b616b',
        fog: '#c7ccd3',
        bone: '#f4f1ea',
        brand: {
          DEFAULT: '#e8202e',
          600: '#cc1521',
          700: '#a50f1a',
          300: '#ff5a64',
          50: '#fdeaeb',
        },
        signal: '#f4f1ea',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        // legacy alias → maps old `font-cond` usage to the new mono voice
        cond: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.4em',
        wider2: '0.18em',
      },
      maxWidth: { prose: '64ch' },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4), 0 30px 60px -30px rgba(0,0,0,0.6)',
        glow: '0 24px 70px -24px rgba(232,32,46,0.55)',
        'glow-sm': '0 10px 40px -16px rgba(232,32,46,0.5)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        sheen: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.14) 45%, transparent 60%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-3%,0) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rise: {
          '0%': { transform: 'translateY(14px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 16s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'spin-slow': 'spin-slow 26s linear infinite',
        blink: 'blink 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
