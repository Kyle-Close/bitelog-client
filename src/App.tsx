import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import ResponsiveAppBar from './components/header';
import { ReactNode, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { UserContext } from './context';

interface AppProps {
  children?: ReactNode;
}

export const app = initializeApp(firebaseConfig);

function App({ children }: AppProps) {
  useFirebaseAuth();
  const { user, SetUserJournalId } = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.uid) return;
    SetUserJournalId();
  }, [user?.uid]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <ResponsiveAppBar />
        {children}
      </Box>
    </ThemeProvider>
  );
}

export default App;
