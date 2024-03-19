import { Autocomplete, Box, Button, Divider, InputLabel, TextField } from '@mui/material';
import { useFoodForm } from '../../hooks/useFoodForm';
import { useEffect, useState } from 'react';

interface IngredientType {
  name: string;
}

export function FoodForm() {
  const { ingredientsQuery } = useFoodForm();
  const [value, setValue] = useState<IngredientType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  if (!ingredientsQuery || !ingredientsQuery.data) return;

  const defaultProps = {
    options: ingredientsQuery.data,
    getOptionLabel: (option: IngredientType) => option.name,
  };

  const handleAutoCompleteChange = (event: any, newValue: IngredientType | null) => {
    setValue(newValue);
    if (newValue) addNewSelectedIngredient(newValue.name);
  };

  const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const addNewSelectedIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) return;
    setSelectedIngredients((prev) => [...prev, ingredient]);
  };

  return (
    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='food-name'>Food name</InputLabel>
        <TextField size='small' required id='food-name' />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='combo-ingredients-label'>Ingredients</InputLabel>
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} variant='standard' />}
          id='combo-ingredients'
          size='small'
          value={value}
          onChange={handleAutoCompleteChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
        ></Autocomplete>
      </Box>
      <Button sx={{ mt: '2rem' }} color='secondary' variant='contained' type='submit' size='small'>
        Submit
      </Button>
      <Divider />
      {selectedIngredients.length > 0 && selectedIngredients.join(', ')}
    </Box>
  );
}
