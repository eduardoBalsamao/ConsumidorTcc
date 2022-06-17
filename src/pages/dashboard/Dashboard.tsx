import * as React from 'react';
import {
  Box, Divider, Paper, Typography, useTheme, 
  TextField, Button, useMediaQuery, Theme, 
  Dialog, AppBar, Toolbar, IconButton, Table,
  TableBody, TableContainer, TableHead, TableRow,
  InputAdornment, Chip, MenuItem
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update} from 'firebase/database';
import { Line, XAxis, YAxis, CartesianGrid, Legend , LineChart, Tooltip, BarChart, Bar, LabelList, Label} from 'recharts';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

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

const SpecialBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',

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
  const [power, setPower] = useState();
  const [limite, setLimite] = useState<string | null>(null);
  const [limiteAtual, setLimiteAtual] = useState<string | null>(null);
  const [historico, setHistorico] = useState<any[]>([]);
  const [historicoMensal, setHistoricoMensal] = useState<any[]>([]);
  const theme = useTheme();

  const meses = ['0', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dateSupp = new Date();
  const [dia, setDia] = useState(String(dateSupp.getDate()).padStart(2, '0'));
  const [mes, setMes] = useState(String(dateSupp.getMonth() + 1).padStart(2, '0'));
  const [ano, setAno] = useState(String(dateSupp.getFullYear()));
  const dataAtual = ano + '-' + mes + '-' + dia;
  const [mesOption, setMesOption] = useState(meses[parseInt(mes)]);
  const [date, setDate] = useState(dataAtual);

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setDia(event.target.value.substring(8,10));
    setMes(event.target.value.substring(5,7));
    setAno(event.target.value.substring(0,4));
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMesOption(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeLimite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimite(event.target.value);
  };
  const handleDelete = () => {
    setLimiteAtual(null);
    update(ref(database, `dispositivos/${codeParam.code}/energy_historic/${ano}/${meses[parseInt(mes)]}/${parseInt(dia)}`), {
      limite: null
    }).then(()=>{
      getLimite();
    });
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
      setPower(snapshot.val().power);
      d.push(dados);
      setData(d);
    });
  }

  function getLimite () {
    onValue(ref(database, `dispositivos/${codeParam.code}/energy_historic/${ano}/${meses[parseInt(mes)]}/${parseInt(dia)}/limite`), (snapshot) => {
      if(snapshot.val() == null){
        setLimiteAtual(null);
      }
      else{
        setLimiteAtual(snapshot.val());
      }
    });
  }
  
  function limitChanger(){
    console.log(limite);
    update(ref(database, `dispositivos/${codeParam.code}/energy_historic/${ano}/${meses[parseInt(mes)]}/${parseInt(dia)}`), {
      limite: limite
    }).then(()=>{
      getLimite();
    });
  }

  function calculo () {
    if(power == null){
      return 'carregando';
    }if(power == 0){
      return 'O calculo é feito em tempo real, ligue o aparelho para calcularmos o gasto diario!';
    }
    else{
      const calculopotencia = (power*24)/1000;
      return `Gasto diario máximo = (${power}W x 24Horas)/1000 = ${calculopotencia.toFixed(5)}KW/H`;
    }
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

  function historicMonthFetch () {
    onValue(ref(database, `dispositivos/${codeParam.code}/energy_historic/${ano}/${mesOption}`), (snapshot) => {
      const d: any = [];
      snapshot.forEach(item => {
        const dados = {
          dia: item.key,
          energy: item.val().energy[23]
        };
        d.push(dados);
      });
      console.log(d);
      setHistoricoMensal(d);
    });
  }

  useEffect(() => {
    energyFetch();
    historicFetch();
    historicMonthFetch();
    getLimite();
  }, []);



  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='dashboard' title={'Dashboard - ' + codeParam.code}>

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
          <SpecialBox sx={{margin: {xs: '2vh', md: '5vh' }, width: '100%'}} elevation={4}>
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
          </SpecialBox>

        </Box>

      </Dialog>
    </LayoutBaseDePagina>
  );
};
