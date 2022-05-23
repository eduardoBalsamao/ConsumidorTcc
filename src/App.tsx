import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>


          <AppRoutes />


        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
