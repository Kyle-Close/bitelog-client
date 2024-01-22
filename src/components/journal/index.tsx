import { Box, Divider, Paper, Typography, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import SettingsIcon from '@mui/icons-material/Settings';

function Journal() {
  return (
    <Paper elevation={6} sx={bgPaperClasses}>
      <Typography
        textAlign='center'
        sx={{ minWidth: '100%', pb: '0.5rem' }}
        variant='h6'
      >
        Close55's Journal
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', my: '1rem' }}>
        <Button sx={{ display: 'flex', flexGrow: 1 }}>
          <Paper
            sx={{ display: 'flex', flexGrow: 1, p: '1rem', gap: '1.5rem' }}
            elevation={1}
          >
            <CalendarTodayIcon />
            <Typography
              textAlign='start'
              fontWeight='bold'
              sx={{ flexGrow: '1' }}
            >
              Hourly Tracking
            </Typography>
          </Paper>
        </Button>
        {createButtons()}
      </Box>
    </Paper>
  );
}

const buttonItems = [
  {
    name: 'Hourly Tracking',
    icon: <CalendarTodayIcon />,
  },
  {
    name: 'My Foods',
    icon: <FastfoodIcon />,
  },
  {
    name: 'My Ingredients',
    icon: <EggIcon />,
  },
];

const createButtons = () => {
  return buttonItems.map((item) => {
    return (
      <Button sx={{ display: 'flex', flexGrow: 1 }}>
        <Paper
          sx={{ display: 'flex', flexGrow: 1, p: '1rem', gap: '1.5rem' }}
          elevation={1}
        >
          {item.icon}
          <Typography
            textAlign='start'
            fontWeight='bold'
            sx={{ flexGrow: '1' }}
          >
            {item.name}
          </Typography>
        </Paper>
      </Button>
    );
  });
};

const bgPaperClasses = {
  height: '100%',
  m: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  p: '1rem',
};

export default Journal;
