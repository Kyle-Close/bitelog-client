import { Box, Button, InputLabel, TextField } from '@mui/material';
import { useIngredientForm } from '../../hooks/useIngredientForm';

export function IngredientForm() {
  const { ingredientName, handleIngredientNameChange } = useIngredientForm();
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
      onSubmit={(e) => {}}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='food-name'>Ingredient name</InputLabel>
        <TextField
          onChange={handleIngredientNameChange}
          value={ingredientName}
          size='small'
          required
          id='ingredient-name'
        />
      </Box>
      <Button
        sx={{ mt: '2rem' }}
        color='secondary'
        variant='contained'
        type='submit'
        size='small'
      >
        Submit
      </Button>
    </Box>
  );
}
