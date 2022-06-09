import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { AppRoutes } from './routes';
import { AuthProvider } from './shared/components/provider/AuthProvider';

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <BrowserRouter>

          
            <AppRoutes />


          </BrowserRouter>
        </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
};
