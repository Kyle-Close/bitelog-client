import {
  Box,
  Divider,
  Paper,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Journal() {
  const [showSettings, setShowSettings] = useState<boolean>(false);

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
    {
      name: 'Journal Settings',
      icon: <SettingsIcon />,
      onClick: () => setShowSettings(true),
    },
  ];

  const contentContainerClasses = {
    display: 'flex',
    flexDirection: 'column',
    my: '1rem',
    flexGrow: showSettings ? 1 : 0,
  };

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
      <Box sx={contentContainerClasses}>
        {showSettings ? (
          <>
            <Button
              color='secondary'
              startIcon={<ArrowBackIcon />}
              onClick={() => setShowSettings(false)}
              variant='contained'
              sx={{ display: 'flex', gap: '0.5rem' }}
              aria-label='back'
            >
              <Typography fontSize='.85rem'>Back to Journal</Typography>
            </Button>
            <SettingsForm />
          </>
        ) : (
          createButtons(buttonItems)
        )}
      </Box>
    </Paper>
  );
}

const createButtons = (
  buttonItems: {
    name: string;
    icon: React.ReactElement;
    onClick?: () => void;
  }[]
) => {
  return buttonItems.map((item) => {
    return (
      <Button onClick={item.onClick} sx={{ display: 'flex', flexGrow: 1 }}>
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

function SettingsForm() {
  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '2rem',
        flexGrow: 1,
        m: '1rem',
      }}
    >
      <TextField
        sx={{ display: 'flex' }}
        variant='standard'
        label='Journal Name'
      />
      <Button sx={{ mt: 'auto' }} variant='contained' type='submit'>
        Update Settings
      </Button>
    </Box>
  );
}

export default Journal;
