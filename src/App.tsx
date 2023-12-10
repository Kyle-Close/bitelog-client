import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  initializeApp(firebaseConfig);

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
