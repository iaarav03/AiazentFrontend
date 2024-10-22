/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#002147', 
        primaryBlue2:'rgb(73 125 168)',
        buttonbg:'rgb(66 87 117)'
      },
    },
  },
  plugins: [],
}