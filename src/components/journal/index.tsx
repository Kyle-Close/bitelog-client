import { Box, Divider, Paper, Typography, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsForm from './Settings';
import IngredientsPage from './Ingredients';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../contexts';
import { BASE_URL } from '../../config/axiosConfig';
import { fetchDataFromBackend } from '../../helpers/utility';

enum Pages {
  DEFAULT = 'DEFAULT',
  SETTINGS = 'SETTINGS',
  INGREDIENTS = 'INGREDIENTS',
  FOODS = 'FOODS',
  HOURLY_TRACKING = 'HOURLY TRACKING',
}

function Journal() {
  const { user } = useContext(UserContext);
  const [showing, setShowing] = useState<Pages>(Pages.DEFAULT);
  const { data, error, isLoading } = useQuery({
    queryKey: ['journal', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/journal`),
    enabled: !!user,
  });

  if (isLoading) {
    return <Typography>Loading journal...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching user journal.</Typography>;
  }

  if (!data) return;

  const userJournal = data.journals[0];

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
      onClick: () => setShowing(Pages.INGREDIENTS),
    },
    {
      name: 'Journal Settings',
      icon: <SettingsIcon />,
      onClick: () => setShowing(Pages.SETTINGS),
    },
  ];

  const contentContainerClasses = {
    display: 'flex',
    flexDirection: 'column',
    my: '1rem',
    flexGrow: showing === Pages.SETTINGS ? 1 : 0,
  };

  const currentPage = () => {
    if (showing === Pages.DEFAULT) return createButtons(buttonItems);
    else if (showing === Pages.SETTINGS)
      return (
        <>
          <GoToDefaultPageBtn setShowing={setShowing} />
          <SettingsForm />
        </>
      );
    else if (showing === Pages.INGREDIENTS)
      return (
        <>
          <GoToDefaultPageBtn setShowing={setShowing} />
          <IngredientsPage />
        </>
      );
  };

  return (
    <Paper elevation={6} sx={bgPaperClasses}>
      <Typography
        textAlign='center'
        sx={{ minWidth: '100%', pb: '0.5rem' }}
        variant='h6'
      >
        {userJournal.name}
      </Typography>
      <Divider />
      <Box sx={contentContainerClasses}>{currentPage()}</Box>
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
  return buttonItems.map((item, key) => {
    return (
      <Button
        key={key}
        onClick={item.onClick}
        sx={{ display: 'flex', flexGrow: 1 }}
      >
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

function GoToDefaultPageBtn({
  setShowing,
}: {
  setShowing: (page: Pages) => void;
}) {
  return (
    <>
      <Button
        color='secondary'
        startIcon={<ArrowBackIcon />}
        onClick={() => setShowing(Pages.DEFAULT)}
        variant='contained'
        sx={{ display: 'flex', gap: '0.5rem' }}
        aria-label='back'
      >
        <Typography fontSize='.85rem'>Back to Journal</Typography>
      </Button>
    </>
  );
}

export default Journal;
