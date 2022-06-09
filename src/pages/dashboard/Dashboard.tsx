import {Box, Divider, Paper, Typography, useTheme, TextField, Button, useMediaQuery, Theme} from '@mui/material';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from 'firebase/database';
import { Line, XAxis, YAxis, CartesianGrid, Legend , LineChart, Tooltip } from 'recharts';


export const Dashboard = () =>{
  const database = getDatabase();
  const codeParam = useParams();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  //const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [data, setData] = useState<any[]>([]);
  const [historico, setHistorico] = useState();
  const theme = useTheme();
  const meses = ['0', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


  const dateSupp = new Date();
  const [dia, setDia] = useState(String(dateSupp.getDate()).padStart(2, '0'));
  const [mes, setMes] = useState(String(dateSupp.getMonth() + 1).padStart(2, '0'));
  const [ano, setAno] = useState(String(dateSupp.getFullYear()));
  const dataAtual = ano + '-' + mes + '-' + dia;

  const [date, setDate] = useState(dataAtual);

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setDia(event.target.value.substring(8,10));
    setMes(event.target.value.substring(5,7));
    setAno(event.target.value.substring(0,4));
  };

  //Conferir no useEffect se o cliente tem um dispositivo com esse código em seu firebase

  function energyFetch () {
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

  function historicFetch () {
    onValue(ref(database, `dispositivos/${codeParam.code}/energy_historic/${ano}/${meses[parseInt(mes)]}/${parseInt(dia)}/energy`), (snapshot) => {
      //console.log(`dispositivos/${codeParam.code}/energy_historic/${ano}/${meses[parseInt(mes)]}/${dia}/energy`);
      const d: any = []; //Data temporaria
      snapshot.forEach(item =>{
        const dados = {
          hora: item.key  + ':00',
          KWH: item.val()
        };
        d.push(dados);
      });
      setHistorico(d);
      //console.log(historico);
    });
  }

  useEffect(() => {
    energyFetch();
    historicFetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='dashboard' title={'Dashboard - ' + codeParam.code}>
        <Paper  elevation={3} sx={{margin: '3vh'}}>
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
        </Paper>


        
        <Paper  elevation={3} sx={{margin: '3vh', height: '100%'}}>
          <Box display='flex' flexDirection='column' >
            <Box sx={{paddingTop: '1vh'}}>
              <Typography variant='h6' textAlign='center'>Historico - Energia</Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end' marginTop='3vh' marginRight={smDown ? '1vh' : '4.5vh'} marginLeft={smDown ? '1vh' : '0'}>
              <TextField
                id="date"
                label="Selecionar Intervalo de Tempo"
                type="date"
                defaultValue={date}
                onChange={handleChangeData}

                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
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
          </Box>
        </Paper>

      </PaperLayout>
    </LayoutBaseDePagina>
  );
};
