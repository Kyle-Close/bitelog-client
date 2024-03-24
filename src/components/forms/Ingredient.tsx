import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useIngredientForm } from '../../hooks/useIngredientForm';
import { Loading } from '../generic/Loading';

export function IngredientForm() {
  const {
    ingredientName,
    handleIngredientNameChange,
    handleSubmit,
    createIngredientMutation,
  } = useIngredientForm();

  if (createIngredientMutation.isPending) return <Loading />;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
      onSubmit={handleSubmit}
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
      {createIngredientMutation.isSuccess && (
        <Typography
          color='lightgreen'
          fontWeight={'bold'}
          align='center'
          fontSize={'small'}
        >
          Successfully created ingredient!
        </Typography>
      )}
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
