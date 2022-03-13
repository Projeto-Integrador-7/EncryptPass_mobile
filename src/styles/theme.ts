import { extendTheme } from 'native-base';

import colors from "./colors";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      400: colors.greenDark
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark'
  }
});

export default theme;