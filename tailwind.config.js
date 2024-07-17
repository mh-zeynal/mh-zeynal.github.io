/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: { preflight: false },
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: '#182848',
        secondary: '#4b6cb7'
      }
    }
  },
  plugins: [],
};
