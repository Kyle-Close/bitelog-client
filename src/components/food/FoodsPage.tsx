import GoToHome from '../journal/GoToHome';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { Box, Button, Typography } from '@mui/material';
import { FoodTable } from './FoodTable';
import { useFetchUserFood } from '../../hooks/useFetchUserFood';

export interface FoodDataValues {
  id: number;
  UserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function FoodsPage() {
  const { user } = useContext(UserContext);
  const { foodQuery, ingredientsQuery } = useFetchUserFood(user);

  if (foodQuery.isError) {
    return <Typography>Error fetching user food.</Typography>;
  } else if (foodQuery.isLoading || !foodQuery.data) {
    return <Typography>Loading...</Typography>;
  }

  const foodData: FoodDataValues[] = foodQuery.data.foodDataValues;
  console.log('here', ingredientsQuery.data);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
        <GoToHome url={`/user/${user?.uid}/journal/${user?.journalId}`} />
        <Typography variant='h5'>Foods</Typography>
        <Button sx={{ ml: 'auto' }} variant='contained'>
          Create Food
        </Button>
      </Box>
      <FoodTable foodData={foodData} />
    </Box>
  );
}

export default FoodsPage;
