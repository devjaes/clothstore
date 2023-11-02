/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#161A1D',
        fontColorWhite: '#F5F3F4',
        primaryRed: '#AE2E31',
      },
    },
  },
  plugins: [],
}
