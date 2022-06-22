/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  Box, Paper, Typography, useTheme, 
  TextField, Button, useMediaQuery, Theme, MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar, LabelList, Label} from 'recharts';


interface Props {
    mesOption: string;
    handleChangeOption: (event: React.ChangeEvent<HTMLInputElement>) => void;
    historicMonthFetch: () => void;
    historicoMensal: any[];
    
}

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  
}));
  

export const GraficoMensal: React.FC<Props> = ({mesOption, handleChangeOption, historicMonthFetch, historicoMensal}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  return (
    <>
      <SpecialBox   elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}}}>
        <Box display='flex' flexDirection='column' alignItems='center' >
          <Box sx={{paddingTop: '1vh'}}>
            <Typography variant='h6' textAlign='center'>Historico Mensal - Energia</Typography>
          </Box>
          <Box display='flex' justifyContent='flex-end' marginTop='3vh' marginLeft={smDown ? '0' : '10vh'}>
            <TextField
              label="Selecionar Intervalo de Tempo"
              value={mesOption}
              select
              onChange={handleChangeOption}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={'Janeiro'}>
                  Janeiro
              </MenuItem>
              <MenuItem value={'Fevereiro'}>
                Fevereiro
              </MenuItem>
              <MenuItem value={'Março'}>
                Março
              </MenuItem>
              <MenuItem value={'Abril'}>
                Abril
              </MenuItem>
              <MenuItem value={'Maio'}>
                Maio
              </MenuItem>
              <MenuItem value={'Junho'}>
                Junho
              </MenuItem>
              <MenuItem value={'Julho'}>
                Julho
              </MenuItem>
              <MenuItem value={'Agosto'}>
                Agosto
              </MenuItem>
              <MenuItem value={'Setembro'}>
                Setembro
              </MenuItem>
              <MenuItem value={'Outubro'}>
                Outubro
              </MenuItem>
              <MenuItem value={'Novembro'}>
                Novembro
              </MenuItem>
              <MenuItem value={'Dezembro'}>
                Dezembro
              </MenuItem>
            </TextField>
            <Button variant='contained' onClick={historicMonthFetch}>Atualizar</Button>
          </Box>
          <Box display='flex' justifyContent='center' marginX='3vh' marginTop={smDown ? '2vh' : 0} marginBottom={'2vh'}>
            <BarChart width={smDown ? 300 : 900} height={300} data={historicoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia">
                <Label value="Dias do Mes" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis label={smDown ? {display: 'none'} : { value: 'KW/H - Total', angle: -90, position: 'insideLeft' }}  />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="energy" fill={theme.palette.mode == 'dark' ? theme.palette.secondary.main : theme.palette.primary.main}>
                <LabelList dataKey="energy" position="top" />
              </Bar>
            </BarChart>
          </Box>
        </Box>
      </SpecialBox>
      
    </>

  );
};