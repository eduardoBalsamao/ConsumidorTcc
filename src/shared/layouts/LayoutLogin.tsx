import {Box} from '@mui/material';

interface IBaseLayoutProps {
    children: React.ReactNode;
}
 
export const LayoutLogin: React.FC<IBaseLayoutProps> = ({children}) => {
  return (
    <Box 
      display="flex" 
      textAlign="center"
      sx={{
        background: 'url(\'10901970.jpg\')', 
        backgroundSize: {xs: 'cover', md: 'cover'}, 
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

      {children}
    </Box>

  );
};
