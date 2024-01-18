import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import ResponsiveAppBar from './components/header';
import { ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import useFirebaseAuth from './hooks/useFirebaseAuth';

interface AppProps {
  children?: ReactNode;
}

export const app = initializeApp(firebaseConfig);

function App({ children }: AppProps) {
  useFirebaseAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ResponsiveAppBar />
        {children}
      </Box>
    </ThemeProvider>
  );
}

export default App;
