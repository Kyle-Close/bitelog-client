import { Box, Typography } from '@mui/material';
import { FoodDataValues } from '../../FoodsPage';
import useFoodForm from '../../../../hooks/useFoodForm';
import { IngredientDataValue } from './food-ingredients/ExpandedSection';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts';
import useFoodQueryStatus from '../../../../hooks/useFoodQueryStatus';
import FoodFormContent from './FoodFormContent';

interface FoodFormProps {
  food?: FoodDataValues;
  method: 'POST' | 'PUT';
}

function FoodForm({ food, method }: FoodFormProps) {
  const {
    foodIngredientsQuery,
    userIngredientsQuery,
    foodName,
    handleNameChange,
    ingredients,
    setIngredients,
    handleSubmit,
    updateMutation,
    createMutation,
  } = useFoodForm(food);

  const queryStatus = useFoodQueryStatus(
    userIngredientsQuery,
    updateMutation,
    createMutation,
    food ? foodIngredientsQuery : null
  );

  const { user } = useContext(UserContext);

  if (queryStatus.status !== 'success') {
    return <Typography>{queryStatus.message}</Typography>;
  }

  const userIngredientList: IngredientDataValue[] = userIngredientsQuery.data.ingredients;

  const runHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    let url = `/user/${user.uid}/food`;

    if (method === 'POST') {
      handleSubmit(e, url, method);
    } else if (method === 'PUT') {
      url += `/${food?.id}`;
      handleSubmit(e, url, method);
    }
  };

  return (
    <Box onSubmit={runHandleSubmit} component='form' sx={{ display: 'flex', flexGrow: 1 }}>
      <FoodFormContent
        foodName={foodName}
        handleNameChange={handleNameChange}
        ingredients={ingredients}
        setIngredients={setIngredients}
        userIngredientList={userIngredientList}
        method={method}
      />
    </Box>
  );
}

export default FoodForm;
