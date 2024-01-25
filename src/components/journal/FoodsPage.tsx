import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { Box, Typography } from '@mui/material';
import GoToHome from './GoToHome';

function FoodsPage() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const foodQuery = useQuery({
    queryKey: ['food', user?.uid],
    queryFn: () => fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/food`),
    enabled: !!user,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
        <GoToHome url={`/user/${user?.uid}/journal/${user?.journalId}`} />
        <Typography variant='h5'>Foods</Typography>
      </Box>
    </Box>
  );
}

export default FoodsPage;
