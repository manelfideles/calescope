import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { AppRouter } from './routes/AppRouter';
import { supabaseClient } from './lib';
import { Provider as SupabaseProvider } from 'react-supabase';
import { AuthContextProvider } from './hooks/useAuth';

import { MapProvider } from 'react-map-gl';

const toastDefaultOptions: UseToastOptions = {
  position: 'top-right',
  duration: 5 * 1000,
  isClosable: true,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapProvider>
      <ChakraProvider toastOptions={{ defaultOptions: toastDefaultOptions }}>
        <SupabaseProvider value={supabaseClient}>
          <AuthContextProvider>
            <AppRouter />
          </AuthContextProvider>
        </SupabaseProvider>
      </ChakraProvider>
    </MapProvider>
  </React.StrictMode>
);
