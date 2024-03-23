import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useFoodForm } from '../../hooks/useFoodForm';
import ChipsArray from '../generic/ChipArray';
import { IngredientType } from '../../hooks/useFoodForm';
import CircularProgress from '@mui/material/CircularProgress';

export function FoodForm() {
  const {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    handleFoodNameChange,
    handleSubmit,
    createFoodMutation,
  } = useFoodForm();

  if (!ingredientsQuery || !ingredientsQuery.data) return;
  if (createFoodMutation.isPending)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress />
      </Box>
    );

  const defaultProps = {
    options: ingredientsQuery.data,
    getOptionLabel: (option: IngredientType) => option.name,
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <InputLabel id='food-name'>Food name</InputLabel>
        <TextField
          onChange={handleFoodNameChange}
          size='small'
          required
          id='food-name'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <InputLabel id='combo-ingredients-label'>Ingredients</InputLabel>
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} variant='standard' />}
          id='combo-ingredients'
          size='small'
          value={state.autoCompleteValue}
          onChange={handleAutoCompleteChange}
          inputValue={state.inputValue}
          onInputChange={handleInputChange}
        ></Autocomplete>
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
      {createFoodMutation.isSuccess && (
        <Typography
          fontWeight={'bold'}
          align='center'
          fontSize={'small'}
          color={'lightGreen'}
        >
          Successfully created food!
        </Typography>
      )}
      {createFoodMutation.error && (
        <Typography
          fontWeight={'bold'}
          align='center'
          fontSize={'small'}
          color={'error'}
        >
          {createFoodMutation.error.message}
        </Typography>
      )}
      <Divider />
      <ChipsArray
        chipData={state.selectedIngredients.map((ing) => ing.name)}
        deleteData={removeSelectedIngredient}
      />
    </Box>
  );
}
