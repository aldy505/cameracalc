import {defineConfig} from 'windicss/helpers';
import colors from 'windicss/colors';

export default defineConfig({
  purge: [],
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
  variants: {
    extend: {}
  },
  plugins: []
});
