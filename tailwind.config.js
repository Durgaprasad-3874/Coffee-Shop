/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: '#C67C4E', // buttons, prices, active states
        'primary-soft': '#FFF5EE', // selected size, icon tiles
        ink: '#2F2D2C', // headings
        muted: '#A2A2A2', // secondary text
        line: '#EAEAEA', // dividers and outlines
        surface: '#F9F9F9', // app background
        dark: '#131313', // home header
        'dark-2': '#313131', // search field
        danger: '#ED5151', // promo tag
        success: '#36C07E', // delivery progress
        star: '#FBBE21', // ratings
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.05)',
        sheet: '0 -8px 24px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
