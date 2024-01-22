import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
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
