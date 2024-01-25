import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { Box, Typography } from '@mui/material';
import GoToHome from '../journal/GoToHome';
import FoodTable from './FoodTable';

export interface FoodDataValues {
  id: number;
  UserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function FoodsPage() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const foodQuery = useQuery({
    queryKey: ['food', user?.uid],
    queryFn: () => fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/food`),
    enabled: !!user,
  });

  if (foodQuery.isError) {
    return <Typography>Error fetching user food.</Typography>;
  } else if (foodQuery.isLoading || !foodQuery.data) {
    return <Typography>Loading...</Typography>;
  }

  const foodData: FoodDataValues[] = foodQuery.data.foodDataValues;
  console.log(foodData);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
        <GoToHome url={`/user/${user?.uid}/journal/${user?.journalId}`} />
        <Typography variant='h5'>Foods</Typography>
      </Box>
      <FoodTable foodData={foodData} />
    </Box>
  );
}

export default FoodsPage;
