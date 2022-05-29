import { extendTheme } from 'native-base';

import colors from "./colors";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      400: colors.greenDark
    },
    secondary: {
      400: colors.gray,
      500: colors.grayDark
    }
  },
  config: {
    initialColorMode: 'dark'
  }
});

export default theme;