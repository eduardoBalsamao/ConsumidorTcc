import { Widgets } from '@mui/icons-material';
import {Box, Fab, Button, Icon, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import { styled } from '@mui/material/styles';

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  //textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  width: '100%'
}));

export const Item: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>

      <SpecialBox elevation={2}>
        <Box display='flex' flexDirection='column'>
          <Box padding={theme.spacing(2)} display='flex' flexDirection='column' alignItems='flex-start'>

            <Box sx={{width: '100%'}} display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography sx={{color: theme.palette.mode === 'dark' ? '#F2F5F9' : '#1F334E'}} fontWeight='700'>Titulo</Typography>
              <Typography variant='body2' sx={{color: '#696969'}} fontWeight='600'>Ligado</Typography>
            </Box>
            <Typography variant='body2' sx={{color: '#696969'}} fontWeight='400'>Subtitulo (Tipo)</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' margin={theme.spacing(2)} >
            <Button startIcon={<Icon>dashboard</Icon>} variant='outlined' size='small' color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}>Dashboard</Button>
            <Fab size={smDown ? 'medium' : 'small'} color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}><Icon>power_settings_new_icon </Icon></Fab>
          </Box>

        </Box>
        <Box sx={{width: '100%', backgroundColor: 'red',borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px', height: `${theme.spacing(2)}`}}>
        </Box>
      </SpecialBox>
    </>
  );
};
