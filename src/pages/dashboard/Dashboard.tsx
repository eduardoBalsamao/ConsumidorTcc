import {Box, Divider, Paper, Typography, useTheme} from '@mui/material';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from 'firebase/database';

export const Dashboard = () =>{
  const database = getDatabase();
  const codeParam = useParams();
  const [data, setData] = useState<any[]>([]);
  const theme = useTheme();

  //Conferir no useEffect se o cliente tem um dispositivo com esse código em seu firebase

  function produtosFetch () {
    onValue(ref(database, `dispositivos/${codeParam.code}/energy`), (snapshot) => {
      const d: any = []; //Data temporaria
      const dados = {
        key: snapshot.val().key,
        current: snapshot.val().current,
        frequency: snapshot.val().frequency,
        power: snapshot.val().power,
        powerfactor: snapshot.val().powerfactor,
        voltage: snapshot.val().voltage,
      };
      d.push(dados);
      setData(d);
    });
  }
  useEffect(() => {
    produtosFetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='dashboard' title={'Dashboard - ' + codeParam.code}>
        <Paper sx={{margin: '3vh'}}>
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
                  <Typography>{item.voltage}</Typography>
                </Box>
                <Divider/>

              </Box>
            );
          })}
        </Paper>


        
      </PaperLayout>
    </LayoutBaseDePagina>
  );
};
