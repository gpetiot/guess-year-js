/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Main background colors inspired by ancient Greek pottery and marble
        bg: {
          DEFAULT: '#F5F2E8', // Warm off-white like aged parchment
          secondary: '#E8E4D9', // Slightly darker warm tone
          tertiary: '#D8D2C4', // Earthy border color
        },
        // Text colors inspired by ancient ink and carved text
        text: {
          DEFAULT: '#2C2824', // Deep warm brown for primary text
          secondary: '#625D57', // Muted brown for secondary text
        },
        // Brand/Interactive colors inspired by Greek art and architecture
        primary: {
          DEFAULT: '#8B4513', // Terra cotta brown
          hover: '#723A0F', // Darker terra cotta
        },
        // Game feedback colors with an antique feel
        success: {
          DEFAULT: '#4A5D4C', // Olive green
          light: '#E2E5E2', // Light sage background
        },
        warning: {
          DEFAULT: '#A67C52', // Aged bronze
          light: '#F2E8D9', // Light sand background
        },
        error: {
          DEFAULT: '#8B4513', // Terra cotta red
          light: '#F2E6E0', // Light clay background
        },
      },
    },
  },
  plugins: [],
} 