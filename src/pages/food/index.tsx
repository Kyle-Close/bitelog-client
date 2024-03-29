import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { Box, Button, Container, Typography } from '@mui/material';
import { useFetchUserFood } from '../../hooks/useFetchUserFood';
import { FoodTable } from './table';
import { FoodIngredientModal } from './FoodIngredientModal';

export interface FoodDataValues {
  id: number;
  UserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function FoodsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { foodQuery, foods } = useFetchUserFood(user);

  if (foodQuery.isError) {
    return <Typography>Error fetching user food.</Typography>;
  } else if (foodQuery.isLoading || !foodQuery.data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FoodIngredientModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <Container>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', mt: { md: '2rem' } }}
        >
          <Box
            sx={{ display: 'flex', gap: '2rem', alignItems: 'end', p: '1rem' }}
          >
            <Typography variant='h5'>Foods</Typography>
            <Button
              onClick={() => setIsOpen(true)}
              sx={{ ml: 'auto' }}
              variant='contained'
            >
              Create Food
            </Button>
          </Box>
          {foods && <FoodTable foods={foods} />}
        </Box>
      </Container>
    </Box>
  );
}

export default FoodsPage;
