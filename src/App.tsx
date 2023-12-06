import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ReactNode } from 'react';

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
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
