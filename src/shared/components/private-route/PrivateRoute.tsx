import {useContext} from 'react';
import { AuthContext } from '../../contexts';
import {Navigate, Outlet} from 'react-router-dom';


export const PrivateRoute = ({component, ...rest}: any) => {
  const user = useContext(AuthContext);

  if(!user){
    return <Navigate to="/login" />;
  }
    
  return (
    <Outlet />
  );
};