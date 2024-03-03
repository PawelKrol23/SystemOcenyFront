import { createTheme } from '@mui/material/styles';
import { colors,fontSizes  } from './variables';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
        default: colors.background,
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;