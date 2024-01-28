import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FoodDataValues } from '../../../FoodsPage';
import UpdateFoodIngredientList from './UpdateFoodIngredientList';
import useUpdateFoodForm from '../../../../../hooks/useUpdateFoodForm';
import { IngredientDataValue } from '../food-ingredients/ExpandedSection';
import UserIngredientSelectBox from './UserIngredientSelectBox';

interface UpdateFoodFormProps {
  food: FoodDataValues;
}

function UpdateFoodForm({ food }: UpdateFoodFormProps) {
  const {
    foodIngredientsQuery,
    userIngredientsQuery,
    foodName,
    handleNameChange,
    ingredients,
    setIngredients,
    handleSubmit,
    updateMutation,
  } = useUpdateFoodForm(food);

  if (foodIngredientsQuery.error) {
    return <Typography>Error fetching food ingredient list.</Typography>;
  }

  if (userIngredientsQuery.error) {
    return <Typography>Error fetching user ingredient list.</Typography>;
  }

  if (
    foodIngredientsQuery.isLoading ||
    !foodIngredientsQuery.data ||
    userIngredientsQuery.isLoading ||
    !userIngredientsQuery.data
  ) {
    return <Typography>Loading...</Typography>;
  }

  if (updateMutation.isError) {
    return <Typography>Error during food update.</Typography>;
  }

  if (
    updateMutation.isPending ||
    (!updateMutation.data && !updateMutation.isIdle)
  ) {
    return <Typography>Awaiting mutation...</Typography>;
  }

  const userIngredientList: IngredientDataValue[] =
    userIngredientsQuery.data.ingredients;

  return (
    <Box
      onSubmit={handleSubmit}
      component='form'
      sx={{ display: 'flex', flexGrow: 1 }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '1rem',
          flexGrow: 1,
          gap: '1rem',
        }}
        elevation={24}
      >
        <Box sx={{ display: 'flex', flexGrow: 1, gap: '1rem' }}>
          <TextField
            sx={{ display: 'flex', width: '50%' }}
            size='small'
            variant='outlined'
            label='Food Name'
            placeholder={foodName}
            value={foodName}
            onChange={handleNameChange}
          ></TextField>
          <UserIngredientSelectBox
            ingredients={ingredients}
            setIngredients={setIngredients}
            userIngredientList={userIngredientList}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography fontWeight='600'>Ingredients</Typography>
          <UpdateFoodIngredientList ingredientsList={ingredients} />
          <Button
            sx={{ mt: '1rem' }}
            color='secondary'
            variant='contained'
            type='submit'
          >
            Update Food
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default UpdateFoodForm;
