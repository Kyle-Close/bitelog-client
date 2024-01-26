import { Box, Paper, TextField, Typography } from '@mui/material';
import { FoodDataValues } from './FoodsPage';
import UpdateFoodIngredientList from './UpdateFoodIngredientList';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts';
import { useQuery } from '@tanstack/react-query';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { IngredientDataValue } from './ExpandedSection';

interface UpdateFoodFormProps {
  food: FoodDataValues;
}

function UpdateFoodForm({ food }: UpdateFoodFormProps) {
  const [ingredients, setIngredients] = useState<IngredientDataValue[]>([]);
  const { user } = useContext(UserContext);
  const { data, error, isLoading } = useQuery({
    queryKey: [
      'food ingredients',
      {
        uid: user?.uid,
        foodId: food.id,
      },
    ],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/food/${food.id}`),
  });

  useEffect(() => {
    if (data && data.ingredientsDataValues) {
      console.log('here: ', data.ingredientsDataValues);
      setIngredients(data.ingredientsDataValues);
    }
  }, [data]);

  if (error) {
    return <Typography>Error fetching food ingredient list.</Typography>;
  }

  if (isLoading || !data) {
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
          placeholder={food.name}
          value={food.name}
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
