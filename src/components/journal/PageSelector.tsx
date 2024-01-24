import { Typography, Box, Divider, Button, Paper } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import SettingsIcon from '@mui/icons-material/Settings';
import { useQuery } from '@tanstack/react-query';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

function PageSelector() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['journal', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/journal`),
    enabled: !!user,
  });

  if (error) {
    return <Typography>Error fetching user journal.</Typography>;
  }

  if (isLoading || !data) {
    return <Typography>Loading journal...</Typography>;
  }

  const userJournal = data.journals[0];

  const createButtons = (
    buttonItems: {
      name: string;
      icon: React.ReactElement;
      url?: string;
    }[]
  ) => {
    return buttonItems.map((item, key) => {
      return (
        <Button
          key={key}
          onClick={() =>
            navigate(`/user/${user?.uid}/journal/${userJournal.id}/${item.url}`)
          }
          sx={{
            display: 'flex',
            mt: item.url === 'settings' ? 'auto' : null,
          }}
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

  return (
    <>
      <Typography
        textAlign='center'
        sx={{ minWidth: '100%', pb: '0.5rem' }}
        variant='h6'
      >
        {userJournal.name ? userJournal.name : user?.username + "'s Journal"}
      </Typography>
      <Divider />
      <Box sx={contentContainerClasses}>{createButtons(buttonItems)}</Box>
    </>
  );
}

export default PageSelector;

const contentContainerClasses = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  my: '1rem',
};

const buttonItems = [
  {
    name: 'Hourly Tracking',
    icon: <CalendarTodayIcon />,
  },
  {
    name: 'My Foods',
    icon: <FastfoodIcon />,
    url: 'foods',
  },
  {
    name: 'My Ingredients',
    icon: <EggIcon />,
    url: 'ingredients',
  },
  {
    name: 'Journal Settings',
    icon: <SettingsIcon />,
    url: 'settings',
  },
];
