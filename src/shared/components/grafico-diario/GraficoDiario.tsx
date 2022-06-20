import * as React from 'react';
import {
  Box, Paper, Typography,
  TextField, Button, useMediaQuery,
  Theme
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Line, XAxis, YAxis, CartesianGrid, Legend , LineChart, Tooltip} from 'recharts';


interface Props {
    date: string;
    handleChangeData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    historicFetch: () => void;
    handleClickOpen: () => void;
    historico: any[];
    
}

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  
}));
  

export const GraficoDiario: React.FC<Props> = ({date, handleChangeData, historicFetch, handleClickOpen, historico}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  return (
    <>
      <SpecialBox   elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}}}>
        <Box display='flex' flexDirection='column' alignItems='center' >
          <Box sx={{paddingTop: '1vh'}}>
            <Typography variant='h6' textAlign='center'>Historico Diario - Energia</Typography>
          </Box>
          <Box display='flex' justifyContent='flex-end' marginTop='3vh' marginLeft={smDown ? '0' : '10vh'}>
            <TextField
              id="date"
              label="Selecionar Intervalo de Tempo"
              type='date'
              defaultValue={date}
              onChange={handleChangeData}
              SelectProps={{
                native: true,
              }}
            />
            <Button variant='contained' onClick={historicFetch}>Atualizar</Button>
          </Box>
          <Box display='flex' justifyContent='center' marginX='3vh' marginTop={smDown ? '2vh' : 0}>
            <LineChart width={smDown ? 300 : 900} height={300} data={historico}
              margin={smDown ? { top: 5, right: 10, left: 0, bottom: 5 } : { top: 5, right: 11, left: 11, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora">
              </XAxis>
              <YAxis label={smDown ? {display: 'none'} : { value: 'KW/H', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="KWH" stroke={theme.palette.mode == 'dark' ? theme.palette.secondary.main : theme.palette.primary.main} />
            </LineChart>
          </Box>
          <Box width='95%' margin='3vh'>
            <Button onClick={handleClickOpen} fullWidth variant='contained'>Visualizar em Tabela</Button>
          </Box>
        </Box>
      </SpecialBox>
      
    </>

  );
};