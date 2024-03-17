import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EE6C4D',
    },
    secondary: {
      main: '#E0FBFC',
    },
    mode: 'dark',
    background: {
      default: '#293241',
      paper: '#363F50',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    darker: '#232423';
  }

  interface PaletteOptions {
    darker?: '#232423';
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    darker: true;
  }
}
