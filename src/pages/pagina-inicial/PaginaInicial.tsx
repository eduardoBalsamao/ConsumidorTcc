import { Button, useTheme, useMediaQuery, Theme, Divider, Icon, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Item } from '../../shared/components/item/Item';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';


export const PaginaInicial = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  //const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='home_icon' title='Pagina Inicial'>

        <Box margin={theme.spacing(2)} display='flex' justifyContent='flex-end'>
          <Button startIcon={<Icon>add</Icon>} color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} fullWidth={smDown ? true : false} variant='contained'> Adicionar Dispositivo</Button>
        </Box>
        <Divider variant='middle' />
        <Box margin={theme.spacing(4)}>
          <Grid container rowSpacing={smDown ? 2 : 4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} display='flex' flexDirection='row' alignItems='center' flexWrap='wrap' >
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>
            <Grid item xs={12} sm={4}><Item></Item></Grid>

          </Grid>
        </Box>
      </PaperLayout>
    </LayoutBaseDePagina>
  );
};
