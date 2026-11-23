/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        card: '#181818',
        'card-hover': '#202020',
        'card-border': '#282828',
        'subtle-border': '#333333',
        crimson: {
          DEFAULT: '#E50914',
          hover: '#FF1A27',
          dark: '#B00710',
          glow: 'rgba(229, 9, 20, 0.35)'
        },
        muted: '#A0A0A0',
        subtext: '#737373',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-crimson': '0 0 20px rgba(229, 9, 20, 0.45)',
        'glow-crimson-sm': '0 0 10px rgba(229, 9, 20, 0.3)',
        'phone-frame': '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
