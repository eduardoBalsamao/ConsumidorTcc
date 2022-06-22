/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  Box, Paper, Typography, useTheme,
  Dialog, AppBar, Toolbar, IconButton, Table,
  TableBody, TableContainer, TableHead, TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update} from 'firebase/database';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { GraficoDiario, GraficoMensal, BoxsDashboard } from '../../shared/components';

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
        <BoxsDashboard 
          data={data}
          limiteAtual={limiteAtual}
          handleDelete={handleDelete}
          handleChangeLimite={handleChangeLimite}
          limitChanger={limitChanger}
          calculo={calculo}
        />

        {/*Grafico diario*/}
        <GraficoDiario
          date={date}
          handleChangeData={handleChangeData}
          historicFetch={historicFetch}
          handleClickOpen={handleClickOpen}
          historico={historico}
        />
        
        {/*Grafico mensal*/}
        <GraficoMensal 
          mesOption={mesOption}
          handleChangeOption={handleChangeOption}
          historicMonthFetch={historicMonthFetch}
          historicoMensal={historicoMensal}
        />
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
