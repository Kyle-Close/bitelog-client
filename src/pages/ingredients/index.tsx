import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { IngredientTable } from './table';
import { useFetchIngredients } from '../../hooks/useFetchIngredients';
import { Loading } from '../../components/generic/Loading';
import { IngredientModal } from './IngredientModal';

function IngredientsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { ingredientsQuery, ingredients } = useFetchIngredients();

  if (!ingredientsQuery || ingredientsQuery.isError) {
    return <Typography>Error fetching user ingredients.</Typography>;
  } else if (ingredientsQuery.isLoading || !ingredientsQuery.data) {
    return <Loading />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <IngredientModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <Container>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', mt: { md: '2rem' } }}
        >
          <Box
            sx={{ display: 'flex', gap: '2rem', alignItems: 'end', p: '1rem' }}
          >
            <Typography variant='h5'>Ingredients</Typography>
            <Button
              onClick={() => setIsOpen(true)}
              sx={{ ml: 'auto' }}
              variant='contained'
            >
              Create Ingredient
            </Button>
          </Box>
          <IngredientTable ingredients={ingredients} />
        </Box>
      </Container>
    </Box>
  );
}

export default IngredientsPage;
