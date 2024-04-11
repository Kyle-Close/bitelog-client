import { Typography, Box, Divider, Button, Paper } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import SettingsIcon from '@mui/icons-material/Settings';
import { useQuery } from '@tanstack/react-query';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_CLIENT_URL, BASE_URL } from '../../config/axiosConfig';
import { useContext } from 'react';
import { User, UserContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/generic/Loading';

function PageSelector() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['journal', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/journal`),
    enabled: !!user,
  });

  if (!user) {
    return <Typography>Must be logged in.</Typography>;
  }

  if (error) {
    return <Typography>Error fetching user journal.</Typography>;
  }

  // Show loading only on initial load when there's no data
  if (isLoading || !data) {
    return <Loading />;
  }

  const userJournal = data.journals[0];

  const createButtons = (
    buttonItems: {
      name: string;
      icon: React.ReactElement;
      url: string;
    }[]
  ) => {
    return buttonItems.map((item, key) => {
      const url = populateLinkVariables(item.url, user);
      return (
        <Button
          key={key}
          onClick={() => navigate(url)}
          sx={{
            display: 'flex',
            mt: item.url.includes('settings') ? 'auto' : null,
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              flexGrow: 1,
              p: '1rem',
              gap: '1.5rem',
              bgcolor: 'background.darkerPaper',
            }}
            elevation={8}
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
        align='center'
        sx={{
          minWidth: '100%',
          pb: '0.5rem',
          pl: '1rem',
          fontSize: { xs: '1.5rem', sm: '1.6rem', md: '1.75rem', lg: '2rem' },
        }}
        variant='h5'
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
  gap: '0.5rem',
};

const buttonItems = [
  {
    name: 'My Journal Logs',
    icon: <CalendarTodayIcon />,
    url: `/${BASE_CLIENT_URL}/user/:userId/journal/:journalId/scheduler`,
  },
  {
    name: 'My Foods',
    icon: <FastfoodIcon />,
    url: `/${BASE_CLIENT_URL}/user/:userId/food`,
  },
  {
    name: 'My Ingredients',
    icon: <EggIcon />,
    url: `/${BASE_CLIENT_URL}/user/:userId/ingredients`,
  },
  {
    name: 'Journal Settings',
    icon: <SettingsIcon />,
    url: `/${BASE_CLIENT_URL}/user/:userId/journal/:journalId/settings`,
  },
];

const populateLinkVariables = (inputURL: string, user: User) => {
  const segments = inputURL.split('/');
  const updatedSegments = segments.map((segment) => {
    if (segment.startsWith(':')) {
      if (segment.toLowerCase().includes('userid')) {
        return user.uid;
      } else if (segment.toLowerCase().includes('journalid')) {
        return user.journalId;
      }
    } else {
      return segment;
    }
  });

  return updatedSegments.join('/');
};
