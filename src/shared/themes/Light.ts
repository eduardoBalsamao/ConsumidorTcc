import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d4b72',
      dark: '#002446',
      light: '#5c76a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5d561',
      dark: '#bfa430',
      light: '#ffff92',
      contrastText: '#000000',
    },
    background: {
      paper: '#f2f6f9',
      default: '#d3d3d3',
    },
  },
  
});
