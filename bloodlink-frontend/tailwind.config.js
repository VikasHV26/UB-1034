/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        bloodred: {
          50: '#fef5f5',
          100: '#fde8e8',
          200: '#fcd4d4',
          300: '#f9b3b3',
          400: '#f57777',
          500: '#ef5350',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#ad1d1d',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #991b1b 100%)',
        'gradient-hero': 'linear-gradient(180deg, #dc2626 0%, #ef4444 50%, #b91c1c 100%)',
        'gradient-features': 'linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%)',
        'gradient-cta': 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
      },
    },
  },
  plugins: [],
}