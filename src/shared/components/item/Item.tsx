import {Box, Fab, Button, Icon, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import { styled } from '@mui/material/styles';


interface IItemProps {
  title: string;
  subtitle: string;
  status: string;
  color: string
  onClick: (() => void) | undefined;
  onClick2: (() => void) | undefined;
}

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  //textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  width: '100%'
}));

export const Item: React.FC<IItemProps> = ({title, subtitle, status, color, onClick, onClick2}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    console.log('Troca a cor e o nome do status');
    onClick?.();
  };
  const handleClickDashboard = () => {
    console.log('Entra no Dashboard');
    onClick2?.();
  };
  return (
    <>
 
      <SpecialBox elevation={6}>
        <Box display='flex' flexDirection='column'>
          <Box padding={theme.spacing(2)} display='flex' flexDirection='column' alignItems='flex-start'>

            <Box sx={{width: '100%'}} display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography sx={{color: theme.palette.mode === 'dark' ? '#F2F5F9' : '#1F334E'}} fontWeight='700'>{title}</Typography>
              <Typography variant='body2' sx={{color: '#696969'}} fontWeight='600'>{status}</Typography>
            </Box>
            <Typography variant='body2' sx={{color: '#696969'}} fontWeight='400'>{subtitle}</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' margin={theme.spacing(2)} >
            <Button onClick={handleClickDashboard} startIcon={<Icon>dashboard</Icon>} variant='outlined' size='small' color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}>Dashboard</Button>
            <Fab onClick={handleClick} size={smDown ? 'medium' : 'small'} color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}><Icon>power_settings_new_icon </Icon></Fab>
          </Box>

        </Box>
        <Box sx={{width: '100%', backgroundColor: `${color}`,borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px', height: `${theme.spacing(2)}`}}>
        </Box>
      </SpecialBox>
    </>
  );
};
