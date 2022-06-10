import {Box, Paper, Typography, Icon, Divider} from '@mui/material';

interface IBaseLayoutProps {
    children: React.ReactNode;
    title: string;
    icon: string;
}
  
export const PaperLayout: React.FC<IBaseLayoutProps> = ({children, title, icon}) => {
  return (
    <Box 
      display="flex" 
      flexWrap= 'wrap'
      textAlign="center"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        padding: {xs: '1.5vh', sm: '5vh'},
      }}>
      <Paper elevation={3} sx={{width: '100%', minHeight: '90vh'}} >
        <Box sx={{margin: {xs: '2vh 0 0 2vh', sm: '5vh 0 0 5vh'}}} display='flex' alignItems='center'>
          <Icon sx={{marginRight: '2vh'}}>{icon}</Icon>
          <Typography textAlign='initial' variant='h5' fontWeight='600'>{title}</Typography>
        </Box>
        <Divider sx={{borderBottomWidth: 2}} variant='middle' />
        {children}
      </Paper>
    </Box>

  );
};
