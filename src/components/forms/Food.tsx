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
import { Loading } from '../generic/Loading';
import { FoodFormReducerState } from '../../reducers/FoodFormReducer';
import { IFoods } from '../../hooks/useFetchUserFood';

interface FoodFormProps {
  initialFoodFormState?: FoodFormReducerState;
  isUpdating?: boolean;
  food?: IFoods;
}

export function FoodForm({
  initialFoodFormState,
  isUpdating,
  food,
}: FoodFormProps) {
  const {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    handleFoodNameChange,
    handleCreateSubmit,
    createFoodMutation,
    handleUpdateSubmit,
    updateFoodMutation,
    ingredients,
  } = useFoodForm({ initialState: initialFoodFormState, isUpdating, food });

  if (
    !ingredientsQuery ||
    !ingredientsQuery.data ||
    createFoodMutation.isPending
  )
    return <Loading />;

  const defaultProps = {
    options: ingredients,
    getOptionLabel: (option: IngredientType) => option.name,
  };

  return (
    <Box
      component='form'
      onSubmit={isUpdating ? handleUpdateSubmit : handleCreateSubmit}
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
          value={state.foodName}
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
        {isUpdating ? 'Update' : 'Submit'}
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
      )}{' '}
      {updateFoodMutation.isSuccess && (
        <Typography
          fontWeight={'bold'}
          align='center'
          fontSize={'small'}
          color={'lightGreen'}
        >
          Successfully updated food!
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
