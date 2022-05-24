import React from 'react';
import { Button, useTheme, useMediaQuery, Theme, Divider, Icon, Grid, SwipeableDrawer, Box, ButtonBase, Typography} from '@mui/material';
import { Item } from '../../shared/components/item/Item';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useState } from 'react';
import { MenuAdd } from '../../shared/components/menu-add/MenuAdd';




export const PaginaInicial = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  //const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

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
            
            <Grid item xs={12} sm={4}>
              <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title='Lampada' subtitle='Quarto' status='Ligado' color='red'></Item>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title='Lampada' subtitle='Quarto' status='Ligado' color='blue'></Item>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title='Lampada' subtitle='Quarto' status='Ligado' color='green'></Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title='Lampada' subtitle='Quarto' status='Ligado' color='green'></Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item onClick2={()=>{console.log('Teste2');}} onClick={()=>{console.log('Altera no firebase');}} title='Lampada' subtitle='Quarto' status='Ligado' color='green'></Item>
            </Grid>

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
