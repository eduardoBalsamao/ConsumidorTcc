import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
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
      paper: '#F2F5F9',
      default: '#d3d3d3',
    },
  },
  
});
