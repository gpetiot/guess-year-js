/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Main background colors
        bg: {
          DEFAULT: '#f8fafc', // Light gray background
          secondary: '#f1f5f9', // Slightly darker background for panels
          tertiary: '#e2e8f0', // Even darker for borders and dividers
        },
        // Text colors
        text: {
          DEFAULT: '#0f172a', // Near black for primary text
          secondary: '#475569', // Gray for secondary text
        },
        // Brand/Interactive colors
        primary: {
          DEFAULT: '#3b82f6', // Bright blue for primary actions
          hover: '#2563eb', // Darker blue for hover states
        },
        // Game feedback colors
        success: {
          DEFAULT: '#22c55e', // Green for correct guesses
          light: '#dcfce7', // Light green background
        },
        warning: {
          DEFAULT: '#eab308', // Yellow for partial matches
          light: '#fef9c3', // Light yellow background
        },
        error: {
          DEFAULT: '#ef4444', // Red for incorrect guesses
          light: '#fee2e2', // Light red background
        },
      },
    },
  },
  plugins: [],
} 