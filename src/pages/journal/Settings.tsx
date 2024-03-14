import { Box, TextField, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend, updateDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoToHome from '../../components/generic/GoToHome';

function SettingsForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string>(``);
  const { data, error, isLoading } = useQuery({
    queryKey: ['journal', user?.uid],
    queryFn: () => fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/journal`),
    enabled: !!user,
  });

  const journalMutation = useMutation({
    mutationFn: (name: string) =>
      updateDataFromBackend(BASE_URL + `/user/${user?.uid}/journal/${user?.journalId}`, name),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['journal', user?.uid] });
    },
  });

  if (error) {
    return <Typography>Error fetching user journal.</Typography>;
  }

  if (isLoading || !data) {
    return <Typography>Loading journal...</Typography>;
  }

  const userJournal = data.journals[0];
  const homeURL = `/user/${user?.uid}/journal/${user?.journalId}`;

  const handleSubmit = async () => {
    if (name === '') return;
    journalMutation.mutate(name);
    navigate(`/user/${user?.uid}/journal/${user?.journalId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

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
          onChange={handleChange}
          placeholder={userJournal.name ? userJournal.name : user?.username + "'s Journal"}
        />
        <Button onClick={handleSubmit} sx={{ mt: 'auto' }} variant='contained'>
          Update Settings
        </Button>
      </Box>
    </Box>
  );
}

export default SettingsForm;
