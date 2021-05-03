// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      fontFamily: {
        inter: [
          'Inter',
          'San\\ Francisco',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica\\ Neue',
          'Arial',
          'sans-serif',
        ],
      },
      flex: {
        2: '2 2 0%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
