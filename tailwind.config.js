/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes:{
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
      },
      colors: {
        primaryBlack: '#161A1D',
        fontColorWhite: '#F5F3F4',
        primaryRed: '#AE2E31',
      },
      animation: {
        carousel: 'marquee 40s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        cel_carousel:'marquee 10s linear infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      screens: {
        'IpadPro': '1025px',
      },
    },
  },
  plugins: [],
}
