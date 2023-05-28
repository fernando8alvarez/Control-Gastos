/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Inter': ['Inter', 'sans-serif'],
      'Montserrat': ['Montserrat', 'sans-serif'],
      'Ubuntu': ['Ubuntu', 'sans-serif'],
      'Roboto': ['Roboto Condensed', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

