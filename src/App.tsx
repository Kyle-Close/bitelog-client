import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ReactNode } from 'react';
import { initializeApp } from 'firebase/app';

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyA1-_ryNYOdqZxIL7T3VZMABVF200PFXvs',
    authDomain: 'auth-blog-practice.firebaseapp.com',
    projectId: 'auth-blog-practice',
    storageBucket: 'auth-blog-practice.appspot.com',
    messagingSenderId: '595001719173',
    appId: '1:595001719173:web:719f6ff4a9e182ed57acec',
  };

  const app = initializeApp(firebaseConfig);

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
