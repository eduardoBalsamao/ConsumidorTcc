/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, useTheme, useMediaQuery, Theme, Divider, Icon, Grid, SwipeableDrawer, Box, ButtonBase, Typography} from '@mui/material';
import { Item } from '../../shared/components/item/Item';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useState, useEffect } from 'react';
import { MenuAdd } from '../../shared/components/menu-add/MenuAdd';
import { getDatabase, ref, onValue} from 'firebase/database';
import {auth} from '../../shared/firebase';




export const PaginaInicial = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  //const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const database = getDatabase();
  const [data, setData] = useState<any[]>([]);
  const produtosRef = ref(database, `/users/${auth?.currentUser?.uid}/dispositivos`);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Função que recolhe os dados sobre os produtos do usuario logado
  function produtosFetch () {
    onValue(produtosRef, (snapshot) => {
      const d: any = []; //Data temporaria
      snapshot.forEach(item => {
        console.log(item.val());
        const produtos = {
          nome: item.val().name, //Nome
          code: item.val().code,
          local: item.val().local,
          color: item.val().color

        };
        d.push(produtos);
      });
      setData(d);
    });
  }
  useEffect(() => {
    produtosFetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='home_icon' title='Pagina Inicial'>

        {/* ------- Box do botão adicionar INICIO -------*/}
        <Box margin={theme.spacing(2)} display='flex' justifyContent='flex-end'>
          <Button onClick={handleClickOpen} startIcon={<Icon>add</Icon>} color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} fullWidth={smDown ? true : false} variant='contained'> Adicionar Dispositivo</Button>
        </Box>
        {/* ------- Box do botão adicionar FINAL -------*/}
        <Divider variant='middle' />

        {/* ------- Box dos itens INICIO -------*/}
        <Box margin={theme.spacing(4)}>
          <Grid container rowSpacing={smDown ? 2 : 4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} display='flex' flexDirection='row' alignItems='center' flexWrap='wrap' >
            {data.map((item) => {
              return(
                <Grid key={item.code} item xs={12} md={6} lg={4}>
                  <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title={item?.nome} subtitle={item?.local} status='Ligado' color={item?.color}></Item>
                </Grid>
              );
            })}


          </Grid>
        </Box>
        {/* ------- Box dos itens FINAL -------*/}

      </PaperLayout>

      {/* ------- Drawer para adicionar dispositivos INICIO -------*/}
      <SwipeableDrawer anchor='right' open={open} onClose={handleClose} onOpen={handleClickOpen} variant='temporary'>
        <MenuAdd>
          {/* ------- Box do cabeçalho INICIO -------*/}
          <Box 
            display='flex'
            alignItems='center'
            sx={{backgroundColor: `${theme.palette.mode== 'light' ? theme.palette.primary.main : theme.palette.secondary.main}`, alignItems: 'center'}}
          >
            <ButtonBase onClick={handleClose}>
              <Icon sx={{color: `${theme.palette.mode== 'light' ? 'white' : 'black'}`, padding: `${theme.spacing(2)}`, marginRight: `${theme.spacing(2)}`}}>
                arrow_forward_ios_icon 
              </Icon>
            </ButtonBase>
            <Typography variant='h6' fontWeight='600' sx={{color: `${theme.palette.mode== 'light' ? 'white' : 'black'}`}}> Adicionar Dispositivo</Typography>
          </Box>
          {/* ------- Box do cabeçalho FINAL -------*/}
        </MenuAdd>

      </SwipeableDrawer>
      {/* ------- Drawer para adicionar dispositivos FINAL -------*/}  

    </LayoutBaseDePagina>
    
  );
};
