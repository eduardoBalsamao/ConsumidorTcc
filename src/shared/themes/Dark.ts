import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1f334e',
      dark: '#000b26',
      light: '#4a5c7a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5d561',
      dark: '#bfa430',
      light: '#ffff92',
      contrastText: '#000000',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
