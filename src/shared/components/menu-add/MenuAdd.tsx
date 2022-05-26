import React from 'react';
import { Button, useTheme, useMediaQuery, Theme, Divider, Typography, Box, InputLabel, InputBase, Menu, Fab} from '@mui/material';
import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { TwitterPicker   } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';


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
    width: 'auto',
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemColor, setItemColor] = useState('gray');
  const menu = Boolean(anchorEl);

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

  // eslint-disable-next-line
  const [open, setOpen] = useState(false);

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
          <Typography textAlign={smDown ? 'center' : 'start'} margin={theme.spacing(1)} variant='body2'>Dê um nome ao seu dispositivo e informe o tipo.</Typography>
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
              <BootstrapInput placeholder='Me dê um nome...' id='nome' />
            </Box>
            <Box marginTop= {smDown ? '2vh' : '0'}>
              <InputLabel htmlFor='tipo'>
                Tipo
              </InputLabel>
              <BootstrapInput placeholder='Onde estou...' id='yipo' />
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
          <Typography textAlign={smDown ? 'center' : 'start'} variant='body2'>Procure o identificador na embalagem do produto. O identificador é único e você pode compartilha-lo.</Typography>
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
              <BootstrapInput placeholder='t111' id='nome' />
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
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
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

        {/* ------- Box do Botão INICIO -------*/}
        <Box 
          sx={{display: 'flex'}}
          flexDirection= 'column'
          alignItems='center'
          justifyContent='center'
          paddingTop={theme.spacing(3)} paddingRight={smDown ? 0 : theme.spacing(3)} paddingLeft={smDown ?  0 : theme.spacing(12)}>
          <Button color={theme.palette.mode == 'light' ? 'primary' : 'secondary'} sx={{width: {xs: '75%', md: '50%'}}} variant='contained'>Adicionar</Button>
        </Box>
        {/* ------- Box dos Botão FINAL -------*/}
          


      </Box>

      {/* ------- Drawer para adicionar dispositivos FINAL -------*/}  
    </>
  );
};
