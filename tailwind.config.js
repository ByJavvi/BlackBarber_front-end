/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'barber-gold': '#E4A14E',
        'barber-gold-dark': '#B37E3D',
        'black-barber': '#1A1A1A',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gold-glow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(228,161,78,0)' },
          '50%': { boxShadow: '0 0 18px rgba(228,161,78,0.45)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'fade-in-down': 'fade-in-down 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.4s ease-out both',
        'slide-in-down': 'slide-in-down 0.35s ease-out both',
        'shimmer': 'shimmer 1.6s linear infinite',
        'gold-glow': 'gold-glow 2.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 1s linear infinite',
      },
    },
  },
  plugins: [],
}
