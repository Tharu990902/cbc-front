/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b2d7f",
        secondary: "#FFF8F8",
        accent: "#FF5733",
      },
    },
  },
  plugins: [],
}