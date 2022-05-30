import {Box, Fab, Button, Icon, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import { styled } from '@mui/material/styles';
import {getDatabase, ref, update, onValue} from 'firebase/database';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

interface IItemProps {
  title: string;
  subtitle: string;
  color: string
  code: string
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

export const Item: React.FC<IItemProps> = ({title, subtitle, color, code}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const database = getDatabase();
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const statusChanger = () => {
    if(status == '1'){
      update(ref(database, `dispositivos/${code}`),{
        status: '0'
      });
    }
    if(status == '0'){
      update(ref(database, `dispositivos/${code}`),{
        status: '1'
      });
    }
  };
  const statusVerify = () => {
    onValue( ref(database, `dispositivos/${code}/status`), (snapshot) =>{
      setStatus(snapshot.val());
      
    });
  };
  const handleClickDashboard = () => {
    navigate(`/dashboard/${code}`);
  };

  useEffect(() => {
    statusVerify();
  }, []);
  return (
    <>
 
      <SpecialBox elevation={6}>
        <Box display='flex' flexDirection='column'>
          <Box padding={theme.spacing(2)} display='flex' flexDirection='column' alignItems='flex-start'>

            <Box sx={{width: '100%'}} display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography sx={{color: theme.palette.mode === 'dark' ? '#F2F5F9' : '#1F334E'}} fontWeight='700'>{title}</Typography>
              <Typography variant='body2' sx={{color: '#696969'}} fontWeight='600'>
                {status == '1' ? 
                  'Ligado'
                  : 
                  'Desligado'
                }
              </Typography>
            </Box>
            <Typography variant='body2' sx={{color: '#696969'}} fontWeight='400'>{subtitle}</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' margin={theme.spacing(2)} >
            <Button onClick={handleClickDashboard} startIcon={<Icon>dashboard</Icon>} variant='outlined' size='small' color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}>Dashboard</Button>
            {status == '1' ? 
              <Fab onClick={statusChanger} size={smDown ? 'medium' : 'small'} color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}><Icon>power_settings_new_icon </Icon></Fab>
              : 
              <Fab onClick={statusChanger} size={smDown ? 'medium' : 'small'}><Icon>power_settings_new_icon </Icon></Fab>
            }
          </Box>

        </Box>
        <Box sx={{width: '100%', backgroundColor: `${color}`,borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px', height: `${theme.spacing(2)}`}}>
        </Box>
      </SpecialBox>
    </>
  );
};
