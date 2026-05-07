/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'barber-gold': '#E4A14E',
        'barber-gold-dark': '#B37E3D',
      }
    },
  },
  plugins: [],
}