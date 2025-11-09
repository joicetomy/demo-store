// Role: Provider Component
// Purpose: Wrap app with Redux, Apollo, NextAuth, and MUI Theme providers

'use client';

import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { apolloClient } from '@/services/apollo-client';
import { store } from '@/store';
import { theme } from '@/styles/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

