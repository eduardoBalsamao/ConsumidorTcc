import * as React from 'react';
import {
  Box, Divider, Paper, Typography, useTheme, 
  TextField, Button, useMediaQuery, Theme, 
  Dialog, AppBar, Toolbar, IconButton, Table,
  TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from 'firebase/database';
import { Line, XAxis, YAxis, CartesianGrid, Legend , LineChart, Tooltip } from 'recharts';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode == 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
    color:theme.palette.mode == 'dark' ? theme.palette.common.black : theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const Dashboard = () =>{
  const database = getDatabase();
  const codeParam = useParams();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  //const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [data, setData] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    energyFetch();
    historicFetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='dashboard' title={'Dashboard - ' + codeParam.code}>
        <Paper  elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}}}>
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


        
        <Paper  elevation={3} sx={{margin: {xs: '2vh', md:'3vh'}}}>
          <Box display='flex' flexDirection='column' alignItems='center' >
            <Box sx={{paddingTop: '1vh'}}>
              <Typography variant='h6' textAlign='center'>Historico - Energia</Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end' marginTop='3vh' marginLeft={smDown ? '0' : '10vh'}>
              <TextField
                id="date"
                label="Selecionar Intervalo de Tempo"
                type="date"
                defaultValue={date}
                onChange={handleChangeData}
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
            <Box width='95%' margin='3vh'>
              <Button onClick={handleClickOpen} fullWidth variant='contained'>Visualizar em Tabela</Button>
            </Box>
          </Box>
        </Paper>

      </PaperLayout>
      <Dialog fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative'}} color={theme.palette.mode == 'dark' ? 'secondary' : 'primary' }>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Dados Tabelados do dia - {dia}/{mes}/{ano}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box display='flex' justifyContent='center' alignItems='center'>
          <Paper sx={{margin: {xs: '2vh', md: '5vh' }, width: '100%'}} elevation={4}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Horas do Dia</StyledTableCell>
                    <StyledTableCell align="right">KW/H Acumulado</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {historico.map((row) => (
                    <StyledTableRow
                      key={row.hora}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.hora}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.KWH}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

        </Box>

      </Dialog>
    </LayoutBaseDePagina>
  );
};
