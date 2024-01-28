import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { Box, Button, Typography } from '@mui/material';
import GoToHome from '../journal/GoToHome';
import FoodTable from './table/FoodTable';

export interface FoodDataValues {
  id: number;
  UserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function FoodsPage() {
  const { user } = useContext(UserContext);
  const [createFoodIsOpen, setCreateFoodIsOpen] = useState<boolean>(false);
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

  const handleClick = () => {
    setCreateFoodIsOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
        <Typography variant='h5'>Foods</Typography>
        <Button onClick={handleClick} sx={{ ml: 'auto' }} variant='contained'>
          Create Food
        </Button>
      </Box>
      <FoodTable createFoodIsOpen={createFoodIsOpen} foodData={foodData} />
    </Box>
  );
}

export default FoodsPage;
