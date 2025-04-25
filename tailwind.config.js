/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': {
          DEFAULT: '#f8f9ff',      // Soft blue-tinted white
          secondary: '#eef1ff',    // Light lavender
          tertiary: '#e2e7ff',     // Deeper lavender
        },
        'text': {
          DEFAULT: '#1a1b35',      // Deep navy
          secondary: '#4a4b6a',    // Muted navy
        },
        'primary': {
          DEFAULT: '#7c5cff',      // Vibrant purple
          hover: '#6344eb',        // Deeper purple
        },
        'success': '#34d399',      // Mint green
        'warning': '#fbbf24',      // Warm yellow
        'error': '#fb7185',        // Coral red
      },
    },
  },
  plugins: [],
} 