import {defineConfig} from 'windicss/helpers';
import colors from 'windicss/colors';
import form from 'windicss/plugin/forms';

export default defineConfig({
  darkMode: 'media',
  theme: {
    colors: {
      ...colors
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
          'sans-serif'
        ]
      },
      flex: {
        2: '2 2 0%'
      }
    }
  },
  plugins: [
    form
  ]
});
