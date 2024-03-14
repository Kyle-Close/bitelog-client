import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { Box, Button, Typography } from '@mui/material';
import { useFetchUserFood } from '../../hooks/useFetchUserFood';
import { FoodTable } from './FoodTable';
import GoToHome from '../../components/journal/GoToHome';

export interface FoodDataValues {
  id: number;
  UserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function FoodsPage() {
  const { user } = useContext(UserContext);
  const { foodQuery, ingredientsQuery, foods } = useFetchUserFood(user);

  if (foodQuery.isError || ingredientsQuery.isError) {
    return <Typography>Error fetching user food.</Typography>;
  } else if (foodQuery.isLoading || !foodQuery.data || ingredientsQuery.isLoading) {
    return <Typography>Loading...</Typography>;
  }

  console.log(foods);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end', p: '1rem' }}>
        <GoToHome url={`/user/${user?.uid}/journal/${user?.journalId}`} />
        <Typography variant='h5'>Foods</Typography>
        <Button sx={{ ml: 'auto' }} variant='contained'>
          Create Food
        </Button>
      </Box>
      {foods && <FoodTable foods={foods} />}
    </Box>
  );
}

export default FoodsPage;
