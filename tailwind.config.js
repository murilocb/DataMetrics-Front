/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#341266',
        },
        button: {
          DEFAULT: 'rgb(14, 140, 95)'
        }
      }
    },
  },
  plugins: [],
}

