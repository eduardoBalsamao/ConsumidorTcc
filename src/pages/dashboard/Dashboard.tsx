import {Box} from '@mui/material';
import { LayoutBaseDePagina, PaperLayout } from '../../shared/layouts';
import { useParams } from 'react-router-dom';

export const Dashboard = () =>{
  //Conferir no useEffect se o cliente tem um dispositivo com esse código em seu firebase
  const codeParam = useParams();
  return (
    <LayoutBaseDePagina>
      <PaperLayout icon='dashboard' title='Dashboard'>
        {codeParam.code}
      </PaperLayout>
    </LayoutBaseDePagina>
  );
};
