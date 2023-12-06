import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
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
      <ResponsiveAppBar />
      {children}
    </ThemeProvider>
  );
}

export default App;
