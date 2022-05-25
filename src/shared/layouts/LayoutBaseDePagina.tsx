import { Icon, IconButton, Theme, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import LoginTitle from '../components/login-title/LoginTitle';

import { useDrawerContext } from '../contexts';

export const LayoutBaseDePagina: React.FC = ({ children }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box sx={{
        backgroundColor:{xs: `${theme.palette.primary.main}`, md: 'transparent'},
        display: {md: 'flex', lg: 'none'}
      }} 
      padding={1} alignItems="center" gap={1} height={theme.spacing(smDown ? 4 : mdDown ? 4 : 6)}>
        {mdDown && (
          <Box width='100%' display='flex' alignItems='center' >
            <IconButton sx={{alignSelf: 'flex-start'}} onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
            <LoginTitle fontWeight='600' sx={{marginLeft: `${theme.spacing(8)}`}}>Connect Group</LoginTitle>
          </Box>
        )}
      </Box>

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
