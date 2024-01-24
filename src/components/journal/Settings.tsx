import { Box, TextField, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { Typography } from '@mui/material';
import GoToHome from './GoToHome';

function SettingsForm() {
  const { user } = useContext(UserContext);

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
  const homeURL = `/user/${user?.uid}/journal/${user?.journalId}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'start',
        m: '1rem',
        gap: '2rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '3rem' }}>
        <GoToHome url={homeURL} />
        <Typography variant='h5'>Settings</Typography>
      </Box>

      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: '100%',
        }}
      >
        <TextField
          sx={{ display: 'flex' }}
          variant='filled'
          label='Journal Name'
          size='small'
          placeholder={
            userJournal.name ? userJournal.name : user?.username + "'s Journal"
          }
        />
        <Button sx={{ mt: 'auto' }} variant='contained' type='submit'>
          Update Settings
        </Button>
      </Box>
    </Box>
  );
}

export default SettingsForm;
