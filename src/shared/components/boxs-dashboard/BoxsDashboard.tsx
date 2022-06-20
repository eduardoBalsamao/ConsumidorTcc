import * as React from 'react';
import {
  Box, Divider, Paper, Typography, useTheme, 
  TextField, Button, useMediaQuery, Theme,
  InputAdornment, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    limiteAtual: string | null;
    handleDelete: () => void;
    handleChangeLimite: (event: React.ChangeEvent<HTMLInputElement>) => void;
    data: any[];
    limitChanger: () => void;
    calculo: () => string;
    
}

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  
}));
  

export const BoxsDashboard: React.FC<Props> = ({data, limiteAtual, handleDelete, handleChangeLimite, limitChanger, calculo}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  return (
    <>
      <Box display='flex' flexDirection={smDown ? 'column' : 'row'}>
        <SpecialBox  elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}, width: {xs: 'auto', md: '50%'}}}>
          <Box sx={{paddingTop: '1vh'}}>
            <Typography variant='h6' textAlign='center'>Dados em tempo real</Typography>
          </Box>
          {data.map((item) => {
            return(
              <Box key={item.key} sx={{padding: '3vh'}}>
                <Box marginTop={theme.spacing(2)} display='flex' justifyContent='space-between'>
                  <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} fontWeight='600'>Corrente: </Typography>
                  <Typography>{item.current}A</Typography>
                </Box>
                <Divider/>
                <Box marginTop={theme.spacing(2)} display='flex' justifyContent='space-between'>
                  <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} fontWeight='600'>Frequencia: </Typography>
                  <Typography>{item.frequency}Hz</Typography>
                </Box>
                <Divider/>
                <Box marginTop={theme.spacing(2)} display='flex' justifyContent='space-between'>
                  <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} fontWeight='600'>Potencia: </Typography>
                  <Typography>{item.power}W</Typography>
                </Box>
                <Divider/>
                <Box marginTop={theme.spacing(2)} display='flex' justifyContent='space-between'>
                  <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} fontWeight='600'>Fator de Potencia: </Typography>
                  <Typography>{item.powerfactor}</Typography>
                </Box>
                <Divider/>
                <Box marginTop={theme.spacing(2)} display='flex' justifyContent='space-between'>
                  <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} fontWeight='600'>Voltagem: </Typography>
                  <Typography>{item.voltage}V</Typography>
                </Box>
                <Divider/>

              </Box>
            );
          })}
        </SpecialBox>

        <SpecialBox  elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}, width: {xs: 'auto', md: '50%'}}}>
          <Box sx={{paddingTop: '1vh'}}>
            <Typography variant='subtitle1' fontWeight='600' textAlign='center'>Definir Limite de Gastos</Typography>
          </Box>
          <Box sx={{paddingTop: {xs: '2vh', md: '3vh'}}}>
            <Typography color={theme.palette.mode=='dark' ? theme.palette.secondary.main : theme.palette.primary.main} variant='subtitle2' textAlign='center'>{calculo()}</Typography>
            <Divider variant='middle' />
          </Box>
          <Box sx={{paddingTop: {xs: '2vh', md: '3vh'}}}>
            {
              limiteAtual == null ?
                <Chip color='primary' sx={{padding: '1vh'}} size='small' label={<Typography variant='subtitle2'>Nenhum limite adicionado no dia de hoje</Typography>} />
                :
                <Chip color='primary' sx={{padding: '1vh'}} onDelete={handleDelete}
                  deleteIcon={<DeleteIcon sx={{paddingLeft: '3vh'}} />} label={<Typography variant='subtitle2'>Limite para hoje: {limiteAtual}KW/H</Typography>} />
            }
          </Box>

          <Box sx={{paddingTop: {xs: '2vh', md: '3vh'}, marginBottom: '2vh'}}>
            <Box display='flex' flexDirection='column' justifyContent='center' marginTop='1vh' marginLeft={smDown ? '5vh' : '10vh'} marginRight={smDown ? '5vh' : '10vh'} marginBottom={smDown ? '5vh' : '0vh'}>
              <Typography variant='subtitle2' textAlign='center'>Definir Limite:</Typography>
              <TextField
                id="limite"
                label="Limite"
                type="limite"
                onChange={handleChangeLimite}
                placeholder='...'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">KW/H</InputAdornment>
                }}
              />
              <Button onClick={()=>{limitChanger();}} size='small' sx={{marginTop: '2vh'}} variant='contained'>Definir</Button>
            </Box>
          </Box>
          
        </SpecialBox>
      </Box>
      
    </>

  );
};