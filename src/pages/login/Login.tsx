import {Box, FormControlLabel, Checkbox, CircularProgress, Modal, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Collapse, Alert } from '@mui/material';
import {LayoutLogin} from '../../shared/layouts';
import InputLogin from '../../shared/components/input-login/InputLogin';
import LoginTitle from '../../shared/components/login-title/LoginTitle';
import Link from '../../shared/components/link/Link';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../../shared/firebase';
import { getDatabase, ref, set } from 'firebase/database';


export const Login = () =>{
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading(true);
  const handleLoadingClose = () => setLoading(false);

  const navigate = useNavigate();
  const database = getDatabase();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeEmailRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailRegister(event.target.value);
  };
  const handleChangePasswordRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRegister(event.target.value);
  };
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const signIn = async () => {
    handleLoading();
    if(checked == true){
      localStorage.setItem('lsCode', email);
      localStorage.setItem('lsPass', password);
    } else{
      localStorage.setItem('lsCode', '');
      localStorage.setItem('lsPass', '');
    }

    await auth.signInWithEmailAndPassword(email, password).then(()=>{
      handleLoadingClose();
      navigate('/');
    }).catch(()=>{
      setError('Erro ao fazer login!');
      setOpenError(true);
      handleLoadingClose();
    });
  };

  useEffect(() => {
    const lsCode = localStorage.getItem('lsCode');
    const lsPass = localStorage.getItem('lsPass');
    if(lsCode && lsPass != null){
      setEmail(lsCode);
      setPassword(lsPass);
    }
  }, []);

  const createAccount = async () => {
    handleLoading();
    await auth.createUserWithEmailAndPassword(emailRegister, passwordRegister).then(()=>{
      set(ref(database, 'users/' + auth?.currentUser?.uid), {
        email: emailRegister,
      })
        .then(() => {
          handleLoadingClose();
          navigate('/');
        })
        .catch(() => {
          //console.log('Data failed');
        });
    }).catch((error) =>{
      setError('Erro ao realizar registro!');
      setOpenError(true);
      handleLoadingClose();
      if(error.code == 'auth/email-already-in-use'){
        setError('Esse email ja foi cadastrado!');
        setOpenError(true);
        handleLoadingClose();
      }
      if(error.code == 'auth/invalid-email'){
        setError('Esse email não é valido!');
        setOpenError(true);
        handleLoadingClose();
      }
      if(error.code == 'auth/weak-password'){
        setError('Sua senha está fraca! Sua senha deve ter pelo menos que 6 caracteres!');
        setOpenError(true);
        handleLoadingClose();
      } 
    });
  };
  return (
    <Box>
      <LayoutLogin>
        {/* ------- Box para titulo e logo INICIO -------*/}
        <Box sx={{paddingTop: '5vh'}}>
          <img style={{height: '80px'}} src='/logo192.png' />
          <LoginTitle fontWeight='bold' variant='h3'>Portal do Cliente</LoginTitle>
        </Box>
        {/* ------- Box para titulo e logo FINAL -------*/}

        {/* ------- Box para inputs INICIO -------*/}
        <Box sx={{ paddingTop: '2vh', width: {xs: '70%', md: '40%'}}}>
          <InputLogin value={email} onChange={handleChangeEmail} sx={{marginY: '2vh'}} color="secondary" fullWidth variant="standard" label="E-mail"></InputLogin>
          <InputLogin value={password} onChange={handleChangePassword} sx={{marginY: '2vh'}} color="secondary" fullWidth variant="standard" label="Senha"></InputLogin>
        </Box>
        {/* ------- Box para inputs FINAL -------*/}

        {/* ------- Box para registrar-se e lembrar senha INICIO -------*/}
        <Box sx={{width: {xs: '70%', md: '40%'}, flexDirection: {xs: 'column', md: 'row'}}} display='flex' alignItems='center' justifyContent='space-between'>
          <FormControlLabel sx={{color: 'white', marginBottom: {xs: '10px'}}}  control={
            <Checkbox color="secondary" sx={{color: 'white'}} defaultChecked onChange={handleCheckChange} />
          } label="Lembrar minha senha" />
          <Link onClick={handleClickOpen} variant="text" >Criar uma conta</Link>
        </Box>
        {/* ------- Box para registrar-se e lembrar senha FINAL -------*/}
        <Box sx={{width: {md: '40%', xs: '75%'}}}>
          <Collapse in={openError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        </Box>

        {/* ------- Box botão de entrar iNICIO -------*/}
        <Box sx={{paddingTop: '2vh', width: {xs: '70%', md: '40%'}}}>
          <Button onClick={()=>{signIn();}} fullWidth color="secondary" variant="contained"> Entrar </Button>
        </Box>
        {/* ------- Box botão de entrar FINAL -------*/}
        
        {/* ------- Box rodapé INICIO -------*/}
        <Box sx={{position: 'absolute', bottom: 15}} display='flex' alignItems='center' >
          <LoginTitle fontWeight='bold' variant='h6'>Connect Group</LoginTitle>
        </Box>
        {/* ------- Box rodapé FINAL -------*/}

      </LayoutLogin>

      {/* ------- Dialog para criar uma conta INICIO -------*/}
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
            onChange={handleChangeEmailRegister}
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
            onChange={handleChangePasswordRegister}
          />
          <Collapse in={openError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>

        </DialogContent>
        <DialogActions sx={{padding: '5vh'}}>
          <Button color='secondary' variant='contained' onClick={()=>(createAccount())}>Criar</Button>
        </DialogActions>
      </Dialog>
      {/* ------- Dialog para criar uma conta FINAL -------*/}
      <Modal
        open={loading}
        aria-labelledby="Carregando"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1vh',
          backgroundColor: 'transparent',
          p: 4,
        }}>
          <CircularProgress sx={{color: '#f5d561'}} />
        </Box>
      </Modal>

    </Box>
  );
};
