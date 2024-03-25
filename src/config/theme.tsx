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
      paper: '#3f495c',
      //@ts-ignore
      darkerPaper: '#31394a',
    },
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        input: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            marginRight: '16px',
          },
        }),
        displayedRows: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
          },
        }),
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
          },
        }),
        selectLabel: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
          },
        }),
      },
    },
  },
});
