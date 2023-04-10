import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { AppRouter } from './routes/AppRouter'
import { supabaseClient } from './lib'
import { Provider as SupabaseProvider } from 'react-supabase'
import { AuthContextProvider } from './hooks/useAuth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <SupabaseProvider value={supabaseClient}>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </SupabaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
