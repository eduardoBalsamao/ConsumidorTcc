import CloseIcon from '@mui/icons-material/Close';
import { Button, useTheme, useMediaQuery, Theme, Divider, Typography, 
  Box, InputLabel, InputBase, Menu, Fab, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Backdrop, Alert, Collapse,
  IconButton} from '@mui/material';
import { useState, useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { TwitterPicker   } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';
import {getDatabase, ref, get, set, update} from 'firebase/database';
import { AuthContext } from '../../contexts';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.mode == 'dark' ? theme.palette.secondary.main : theme.palette.primary.main ,
    },
  },
}));


export const MenuAdd: React.FC= ({children}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const user = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menu = Boolean(anchorEl);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const database = getDatabase();
  const [savedPass, setSavedPass] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (errorParam: string) => {
    setError(errorParam);
    setOpen(true);
  };
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleToggleSuccess = (successParam: string) => {
    setSuccess(successParam);
    setOpenSuccess(true);
  };

  const [name, setName] = useState('');
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [code, setCode] = useState('');
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const [local, setLocal] = useState('');
  const handleChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(event.target.value);
  };


  const [password, setPassword] = useState('');
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [openNewModal, setOpenNewModal] = useState(false);
  const handleClickOpenNewModal = () => {
    setOpenNewModal(true);
  };

  const handleCloseNewModal = () => {
    setOpenNewModal(false);
  };

  const [openExistModal, setOpenExistModal] = useState(false);
  const handleClickOpenExistModal = () => {
    setOpenExistModal(true);
  };

  const handleCloseExistModal = () => {
    setOpenExistModal(false);
  };

  const [itemColor, setItemColor] = useState('gray');

  // eslint-disable-next-line
  const handleChange = (color: any) => {
    setItemColor(color.hex);
  };

  const handleClickColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseColor = () => {
    setAnchorEl(null);
  };


  const verifyNew = () =>{
    
    if(name.length < 1){ 
      //alert('nome vazio');
      handleToggle('O campo nome est?? vazio');
      return;
    }
    if(local.length < 1){ 
      //alert('local vazio');
      handleToggle('O campo local est?? vazio');
      return;
    }
    if(code.length < 1){ 
      //alert('code vazio');
      handleToggle('O campo c??digo est?? vazio');
      return;
    }

    get(ref(database, `/dispositivos/${code}`) ).then((snapshot)=>{
      if(snapshot.val() != null){
        const pass = snapshot.val().password;
        console.log(snapshot.val());
        setSavedPass(snapshot.val().password);
        if(pass != ''){
          handleClickOpenExistModal();
          //Fun????o que verifica se as senhas s??o iguais 
          //Esse aparelho ja foi registrado por outra pessoa use a senha para ter acesso a esses dados. Caso isso seja um erro comunique conosco.
        }
        if(pass == ''){
          handleClickOpenNewModal();
        }
      } else{
        //alert('codigo invalido');
        handleToggle('O c??digo digitado ?? invalido!');
      }
    });
      
  };
  const addNew = () =>{
    console.log(password.length);
    if(password.length > 1){
      set(ref(database, `users/${user?.uid}/dispositivos/${code}`), {
        name: name,
        code: code,
        color: itemColor,
        local: local,
      })
        .then(() => {
          update(ref(database, `dispositivos/${code}`),{
            password: password
          });
          setPassword('');
          handleCloseNewModal();
          handleCloseExistModal();
          handleToggleSuccess('Dispositivo adcicionado com sucesso!');
        })
        .catch(() => {
          handleToggle('Error ao adcionar');
          setPassword('');
          handleCloseNewModal();
          handleCloseExistModal();
        });
    } else {
      handleToggle('Error ao adcionar');
    }
    
  };
  const addExist = () =>{
    if(password.length != 0){
      if(savedPass == password){
        set(ref(database, `users/${user?.uid}/dispositivos/${code}`), {
          name: name,
          code: code,
          color: itemColor,
          local: local,
        })
          .then(() => {
            update(ref(database, `dispositivos/${code}`),{
              password: password
            });
            setPassword('');
            handleCloseNewModal();
            handleCloseExistModal();
            handleToggleSuccess('Dispositivo adcicionado com sucesso!');
          })
          .catch(() => {
            handleToggle('Error ao adcionar 2');
            setPassword('');
            handleCloseNewModal();
            handleCloseExistModal();
          });
      } else {
        handleToggle('Error ao adcionar');
      }
    } else {
      handleToggle('Error ao adcionar');
    }
    
  };
  

  const theme = useTheme();
 
  return (
    <>
      {/* ------- Drawer para adicionar dispositivos INICIO -------*/}

      <Box  width={mdDown ? '88vw' : theme.spacing(100) } height="100%" display="flex" flexDirection="column"> 

        {children}

        {/* ------- Box INICIO -------*/}
        <Box display={smDown ? 'none' : 'flex'} paddingTop={theme.spacing(3)} paddingBottom={smDown ?  theme.spacing(1) : theme.spacing(2)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Typography textAlign={smDown ? 'center' : 'start'} variant='body2'>Adicione dispositivos a sua conta aqui!</Typography>
        </Box>
        {/* ------- Box FINAL -------*/}

        {/* ------- Box do form INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(2)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Typography color={theme.palette.mode== 'light' ? theme.palette.primary.main : theme.palette.secondary.main} variant='h5'>1. Detalhes basicos</Typography>
          <Typography textAlign={smDown ? 'center' : 'start'} margin={theme.spacing(1)} variant='body2'>D?? um nome ao seu dispositivo e informe o local.</Typography>
          <Divider />
        </Box>
        {/* ------- Box do form FINAL -------*/}

        {/* ------- Box dos Inputs INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(2)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Box  sx={{display: `${smDown ? 'block' : 'flex'}`}}>
            <Box sx={{marginRight: `${smDown ? '0' : `${theme.spacing(5)}`}`}}>
              <InputLabel htmlFor='nome'>
                Nome do Dispositivo
              </InputLabel>
              <BootstrapInput value={name} onChange={handleChangeName} placeholder='Me d?? um nome...' id='nome' />
            </Box>
            <Box marginTop= {smDown ? '2vh' : '0'}>
              <InputLabel htmlFor='tipo'>
                Local
              </InputLabel>
              <BootstrapInput value={local} onChange={handleChangeLocal} placeholder='Onde estou...' id='yipo' />
            </Box>
          </Box>
        </Box>
        {/* ------- Box dos Inputs FINAL -------*/}



        {/* ------- Box do form INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(2)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Typography color={theme.palette.mode== 'light' ? theme.palette.primary.main : theme.palette.secondary.main} variant='h5'>2. Detalhes Tecnicos</Typography>
          <Typography textAlign={smDown ? 'center' : 'start'} variant='body2'>Procure o identificador na embalagem do produto. O identificador ?? ??nico e voc?? pode compartilha-lo.</Typography>
          <Divider />
        </Box>
        {/* ------- Box do form FINAL -------*/}

        {/* ------- Box dos Inputs INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(2)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Box  sx={{display: `${smDown ? 'block' : 'flex'}`}}>
            <Box sx={{marginRight: `${smDown ? '0' : `${theme.spacing(5)}`}`}}>
              <InputLabel htmlFor='nome'>
                  Identificador
              </InputLabel>
              <BootstrapInput value={code} onChange={handleChangeCode} placeholder='gc001' id='nome' />
            </Box>
          </Box>
        </Box>

        {/* ------- Box do form INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(2)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Typography color={theme.palette.mode== 'light' ? theme.palette.primary.main : theme.palette.secondary.main} variant='h5'>3. Cor</Typography>
          <Typography display={smDown ? 'none' : 'flex'} variant='body2'>Defina uma cor para identificar melhor seus dispositivos.</Typography>
          <Divider />
        </Box>
        {/* ------- Box do form FINAL -------*/}

        {/* ------- Box do form INICIO -------*/}
        <Box 
          sx={{display: `${smDown ? 'flex' : 'block'}`}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(1)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Fab
            sx={{backgroundColor: `${itemColor}`}}
            id="basic-button"
            size='small'

            aria-haspopup="true"

            onClick={handleClickColor}
          >
            <PaletteIcon />
          </Fab>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menu}
            onClose={handleCloseColor}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <TwitterPicker color={itemColor} onChange={handleChange} onChangeComplete={handleCloseColor} />
          </Menu>
        </Box>
        {/* ------- Box do form FINAL -------*/}

        {/* ------- Box do Bot??o INICIO -------*/}
        <Box 
          sx={{display: 'flex'}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(3)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Button onClick={()=>{verifyNew();}} color={theme.palette.mode == 'light' ? 'primary' : 'secondary'} sx={{width: {xs: '75%', md: '50%'}}} variant='contained'>Adicionar</Button>
        </Box>
        {/* ------- Box dos Bot??o FINAL -------*/}

          


      </Box>
      <Box>
        <Dialog open={openNewModal} onClose={handleCloseNewModal}>
          <DialogTitle>Defina uma nova senha</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText marginBottom={theme.spacing(3)} textAlign='center'>
            Obrigado por adiquirir um dispositivo connect.
              <Divider />
            </DialogContentText>
            <Box display='flex' flexDirection='column' sx={{width: '100%'}}>
              <InputLabel htmlFor='password'>
                Senha
              </InputLabel>
              <BootstrapInput sx={{width: '100%'}} value={password} onChange={handleChangePassword} placeholder='Senha...' id='password' />
            </Box>
            <DialogContentText marginTop={theme.spacing(3)}>
             *Essa senha ser?? usada caso deseje compartilhar os dados do dispositivo com outras pessoas.
            </DialogContentText>
            <Box sx={{width: '100%'}}>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
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
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewModal}>Cancelar</Button>
            <Button onClick={()=>{addNew();}}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box>
        <Dialog open={openExistModal} onClose={handleCloseExistModal}>
          <DialogTitle>Forne??a a senha</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText marginBottom={theme.spacing(3)} textAlign='center'>
            Ops! Indentificamos que esse dispositivo j?? tem uma senha.
              <Divider />
            </DialogContentText>
            <Box display='flex' flexDirection='column' sx={{width: '100%'}}>
              <InputLabel htmlFor='password'>
                Senha
              </InputLabel>
              <BootstrapInput sx={{width: '100%'}} value={password} onChange={handleChangePassword} placeholder='Senha...' id='password' />
            </Box>
            <DialogContentText marginTop={theme.spacing(3)}>
             *Esse aparelho j?? foi registrado por outra pessoa use a senha que ela criou para ter acesso a esses dados. Caso isso seja um erro comunique conosco.
            </DialogContentText>
            <Box sx={{width: '100%'}}>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExistModal}>Cancelar</Button>
            <Button onClick={()=>{addExist();}}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box sx={{width: {md: '30%', xs: '75%'}}}>
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Box>
      </Backdrop>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSuccess}
        onClick={handleCloseSuccess}
      >
        <Box sx={{width: {md: '30%', xs: '75%'}}}>
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {success}
          </Alert>
        </Box>
      </Backdrop>

      {/* ------- Drawer para adicionar dispositivos FINAL -------*/}  
    </>
  );
};
