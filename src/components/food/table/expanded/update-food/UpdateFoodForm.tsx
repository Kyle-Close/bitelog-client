import { Box, Paper, TextField, Typography } from '@mui/material';
import { FoodDataValues } from '../../../FoodsPage';
import UpdateFoodIngredientList from './UpdateFoodIngredientList';
import useUpdateFoodForm from '../../../../../hooks/useUpdateFoodForm';

interface UpdateFoodFormProps {
  food: FoodDataValues;
}

function UpdateFoodForm({ food }: UpdateFoodFormProps) {
  const {
    foodIngredientsQuery,
    foodName,
    handleNameChange,
    ingredients,
    setIngredients,
  } = useUpdateFoodForm(food);

  if (foodIngredientsQuery.error) {
    return <Typography>Error fetching food ingredient list.</Typography>;
  }

  if (foodIngredientsQuery.isLoading || !foodIngredientsQuery.data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box component='form' sx={{ display: 'flex', flexGrow: 1 }}>
      <Paper sx={{ display: 'flex', p: '1rem', flexGrow: 1 }} elevation={24}>
        <TextField
          sx={{ display: 'flex', flexBasis: '50%' }}
          size='small'
          variant='standard'
          label='Food Name'
          placeholder={foodName}
          value={foodName}
          onChange={handleNameChange}
        ></TextField>
        <UpdateFoodIngredientList
          setIngredients={setIngredients}
          ingredientsList={ingredients}
        />
      </Paper>
    </Box>
  );
}

export default UpdateFoodForm;
