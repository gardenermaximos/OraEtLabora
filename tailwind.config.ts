/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="vigilia"]'],
  theme: {
    extend: {
      colors: {
        // --- Base Palette ---
        ivory: {
          50: 'hsl(var(--color-ivory-50) / <alpha-value>)',
          100: 'hsl(var(--color-ivory-100) / <alpha-value>)',
          200: 'hsl(var(--color-ivory-200) / <alpha-value>)',
        },
        graphite: {
          400: 'hsl(var(--color-graphite-400) / <alpha-value>)',
          600: 'hsl(var(--color-graphite-600) / <alpha-value>)',
          800: 'hsl(var(--color-graphite-800) / <alpha-value>)',
          900: 'hsl(var(--color-graphite-900) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'hsl(var(--color-gold) / <alpha-value>)',
          light: 'hsl(var(--color-gold-light) / <alpha-value>)',
          dark: 'hsl(var(--color-gold-dark) / <alpha-value>)',
        },
        // --- Liturgical accent (changes dynamically) ---
        liturgical: {
          DEFAULT: 'hsl(var(--color-liturgical) / <alpha-value>)',
          subtle: 'hsl(var(--color-liturgical-subtle) / <alpha-value>)',
        },
        // --- Dark mode (Vigília) ---
        vigilia: {
          bg: 'hsl(var(--color-vigilia-bg) / <alpha-value>)',
          surface: 'hsl(var(--color-vigilia-surface) / <alpha-value>)',
          text: 'hsl(var(--color-vigilia-text) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'prayer-sm': ['1.0625rem', { lineHeight: '1.75' }],
        'prayer-md': ['1.1875rem', { lineHeight: '1.8' }],
        'prayer-lg': ['1.375rem', { lineHeight: '1.85' }],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        nav: 'var(--shadow-nav)',
      },
      spacing: {
        safe: 'env(safe-area-inset-bottom, 0px)',
      },
      transitionDuration: {
        subtle: '180ms',
        standard: '280ms',
      },
    },
  },
  plugins: [],
}
