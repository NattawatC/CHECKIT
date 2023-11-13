/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '375px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1440px',
        // => @media (min-width: 1440px) { ... }
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'custom-black': '#000000',
        'custom-blackHover': '#1A1A1A',
        'custom-white': '#F7F9FB',
        'custom-orange': '#F14C1B',
        'custom-orangeHover': '#E53E06',
        'custom-gray': '#282828',
        'custom-grayHover': '#1A1A1A',
        'custom-purple': '#827DF3',
        'custom-purpleHover': '#716BE4',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
