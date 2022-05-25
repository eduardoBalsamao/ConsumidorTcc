import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { PaginaInicial } from '../pages';
import { Login } from '../pages';
import { MenuLateral } from '../shared/components';
import { PrivateRoute } from '../shared/components/private-route/PrivateRoute';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/',
        label: 'Página inicial',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MenuLateral><PaginaInicial /></MenuLateral>} />
      </Route>

      <Route path="/login" element={<Login />} />

    </Routes>
  );
};
