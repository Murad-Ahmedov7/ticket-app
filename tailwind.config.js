export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f0ff', 100: '#ede4ff', 200: '#ddccff', 300: '#c4a6ff',
          400: '#a774ff', 500: '#8b3eff', 600: '#7000ff', 700: '#5c00d4',
          800: '#4c02ab', 900: '#3a0284', 950: '#230054',
        },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
    },
  },
  plugins: [],
};
