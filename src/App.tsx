import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { UserProvider } from './contexts';

interface AppProps {
  children?: ReactNode;
}

export const app = initializeApp(firebaseConfig);

function App({ children }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ResponsiveAppBar />
          {children}
        </Box>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
