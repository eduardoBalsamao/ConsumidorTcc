import {Box, FormControlLabel, Checkbox, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import {LayoutLogin} from '../../shared/layouts';
import InputLogin from '../../shared/components/input-login/InputLogin';
import LoginTitle from '../../shared/components/login-title/LoginTitle';
import Link from '../../shared/components/link/Link';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export const Login = () =>{
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <LayoutLogin>
        <Box sx={{paddingTop: '5vh'}}>
          <img style={{height: '80px'}} src='/logo192.png' />
          <LoginTitle fontWeight='bold' variant='h3'>Portal do Cliente</LoginTitle>
        </Box>
        <Box sx={{ paddingTop: '2vh', width: {xs: '70%', md: '40%'}}}>
          <InputLogin sx={{marginY: '3vh'}} color="secondary" fullWidth variant="standard" label="E-mail"></InputLogin>
          <InputLogin sx={{marginY: '3vh'}} color="secondary" fullWidth variant="standard" label="Senha"></InputLogin>
        </Box>
        <Box sx={{width: {xs: '70%', md: '40%'}, flexDirection: {xs: 'column', md: 'row'}}} display='flex' alignItems='center' justifyContent='space-between'>
          <FormControlLabel sx={{color: 'white', marginBottom: {xs: '10px'}}}  control={<Checkbox color="secondary" sx={{color: 'white'}} defaultChecked />} label="Lembrar minha senha" />
          <Link onClick={handleClickOpen} variant="text" >Criar uma conta</Link>
        </Box>
        <Box sx={{paddingTop: '5vh', width: {xs: '70%', md: '40%'}}}>
          <Button fullWidth color="secondary" variant="contained"> Entrar </Button>
        </Box>
        
        <Box sx={{position: 'absolute', bottom: 15}} display='flex' alignItems='center' >
          <LoginTitle fontWeight='bold' variant='h6'>Connect Group</LoginTitle>
        </Box>
      </LayoutLogin>
      <Dialog fullWidth PaperProps={{style:{backgroundColor: '#373737'}}} open={open} onClose={handleClose}>
        <Box display='flex' justifyContent='space-between' alignContent='center'>
          <DialogTitle sx={{color:'#FFFFFF'}}>Crie sua conta gratuita!</DialogTitle>
          <IconButton onClick={handleClose} color='secondary' aria-label="delete">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <InputLogin
            autoFocus
            margin="dense"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
            color="secondary"
            sx={{marginY: '2vh'}}
          />
          <InputLogin
            autoFocus
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
            color="secondary"
            sx={{marginY: '2vh'}}
          />
          <InputLogin
            autoFocus
            margin="dense"
            label="Confirmação de Senha"
            type="password"
            fullWidth
            variant="standard"
            color="secondary"
            sx={{marginY: '2vh'}}
          />
        </DialogContent>
        <DialogActions sx={{padding: '5vh'}}>
          <Button color='secondary' variant='contained' onClick={handleClose}>Criar</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};
