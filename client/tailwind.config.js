module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#e8dcff',
          200: '#d1b8ff',
          300: '#b58bff',
          400: '#9c63ff',
          500: '#8E2DE2',
          600: '#6b1ac7',
          700: '#4A00E0',
          800: '#3b00b7',
          900: '#2b008d',
        },
        secondary: {
          50: '#ecfdfa',
          100: '#c5f7ef',
          200: '#9ff0e4',
          300: '#76e8d8',
          400: '#4ddfd0',
          500: '#20B2AA',
          600: '#00CDAC',
          700: '#00b39c',
          800: '#00998c',
          900: '#007b76',
        },
      },
      fontFamily: {
        primary: ['Tajawal', 'sans-serif'],
        arabic: ['Amiri', 'Tajawal', 'sans-serif'],
        display: ['Almarai', 'Amiri', 'serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
