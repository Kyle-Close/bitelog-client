import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ResponsiveAppBar from './components/header';
import { ReactNode, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { UserContext } from './contexts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface AppProps {
  children?: ReactNode;
}

export const app = initializeApp(firebaseConfig);

function App({ children }: AppProps) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName } = user;

        if (!email || !displayName) {
          setUser(null);
          return;
        }

        setUser({ email, username: displayName });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
