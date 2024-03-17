import { Autocomplete, Box, Button, Divider, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';

export function FoodForm() {
  const [activeIngredient, setActiveIngredient] = useState('');

  return (
    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='food-name'>Food name</InputLabel>
        <TextField size='small' required id='food-name' />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='combo-ingredients-label'>Ingredients</InputLabel>
        <Autocomplete id='combo-ingredients' value={activeIngredient} size='small'></Autocomplete>
      </Box>
      <Button sx={{ mt: '2rem' }} color='secondary' variant='contained' type='submit' size='small'>
        Submit
      </Button>
      <Divider />
    </Box>
  );
}
