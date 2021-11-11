import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import * as Colors from '@mui/material/colors';

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    mode: 'dark',
    primary: Colors.red,
    secondary: Colors.lightGreen
  },
  background: {
    default: Colors.grey[900]
  },
});

export default theme;
