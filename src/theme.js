import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    mode: 'dark',
    primary: { 
      main: '#ff0000' 
    },
    secondary: {
      main: 'rgb(50, 125, 238)'
    }
  },
  background: {
    default: 'rgba(13, 17, 23, 1)'
  },
});

export default theme;
