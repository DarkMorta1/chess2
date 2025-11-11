/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chess: {
          light: '#F0D9B5',
          dark: '#B58863',
          highlight: '#BDB76B',
          selected: '#7FC97F',
        }
      }
    },
  },
  plugins: [],
}
