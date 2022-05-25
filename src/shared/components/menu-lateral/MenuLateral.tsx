import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme} from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAppThemeContext, useDrawerContext } from '../../contexts';
import {auth} from '../../firebase';
import LoginTitle from '../login-title/LoginTitle';

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });


  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  //Esses itens estão nas rotas
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon sx={{color: '#FFFFFF'}}>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

const drawerThemeLight = createTheme({
  palette:{
    background:{
      paper: '#263f60'
    }
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
const drawerThemeDark = createTheme({
  palette:{
    mode: 'dark',
    background:{
      paper: '#1F334E'
    }
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});

export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  
  const signOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <>
      <ThemeProvider theme={theme.palette.mode === 'dark' ? drawerThemeDark : drawerThemeLight}>
        <Drawer  open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
          <Box  width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

            <Box marginTop='5vh' width="100%" height={theme.spacing(20)} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Avatar
                sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                src='/logo192.png'
              />
              <LoginTitle variant='h5' fontWeight='500'>Portal do</LoginTitle>
              <LoginTitle variant='h5' fontWeight='500'>Cliente</LoginTitle>
            </Box>

            <Divider variant='middle'  sx={{ backgroundColor: `${theme.palette.secondary.main}`, borderBottomWidth: 2}} />

            <Box marginTop='2vh' flex={1}>
              <List component="nav">
                {drawerOptions.map(drawerOption => (
                  <ListItemLink
                    to={drawerOption.path}
                    key={drawerOption.path}
                    icon={drawerOption.icon}
                    label={drawerOption.label}
                    onClick={smDown ? toggleDrawerOpen : undefined}
                  />
                ))}
              </List>
            </Box>

            <Box>
              <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                  <ListItemIcon>
                    <Icon sx={{color: '#FFFFFF'}}>dark_mode</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Alternar tema" />
                </ListItemButton>
              </List>
            </Box>
            <Box>
              <List component="nav">
                <ListItemButton onClick={()=>{signOut();}} >
                  <ListItemIcon>
                    <Icon sx={{color: '#FFFFFF'}}>logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>
      </ThemeProvider>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
