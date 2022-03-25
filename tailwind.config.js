const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './hotels/**/*.{js,ts,jsx,tsx}',
  ],
  purge: {
    options: {
      safelist: [
        { pattern: /primary/, variants: ['hover'] },
        { pattern: /dark/, variants: ['hover'] },
        { pattern: /border/ },
      ],
    },
  },
  theme: {
    extend: {
      borderRadius: {
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        1000: '1000px',
      },
      colors: {
        primary: {
          1000: 'var(--primary-color-1000)',
          900: 'var(--primary-color-900)',
          800: 'var(--primary-color-800)',
          700: 'var(--primary-color-700)',
          600: 'var(--primary-color-600)',
          500: 'var(--primary-color-500)',
          400: 'var(--primary-color-400)',
          300: 'var(--primary-color-300)',
          200: 'var(--primary-color-200)',
          100: 'var(--primary-color-100)',
          50: 'var(--primary-color-50)',
          25: 'var(--primary-color-25)',
        },
        'primary-dark': 'var(--primary-color-dark)',
        dark: {
          1000: '#454545',
          900: '#595959',
          800: '#666666',
          700: '#7A7A7A',
          600: '#8A8A8A',
          500: '#9C9C9C',
          400: '#B5B5B5',
          300: '#D4D4D4',
          200: '#E6E6E6',
          100: '#F7F7F7',
        },
        error: {
          1000: '#D10808',
          900: '#DE1F1F',
          800: '#E83333',
          700: '#F04343',
          600: '#F55656',
          500: '#F56E6E',
          400: '#F58787',
          300: '#F7A1A1',
          200: '#FCBDBD',
          100: '#FFD9D9',
        },
        'primary-light': 'var(--primary-light-color)',
      },
      fontSize: {
        sm: '1rem',
        base: '1.125rem',
        lg: '1.25rem',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
