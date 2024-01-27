import { useState, useContext, useEffect } from 'react';
import { fetchDataFromBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../contexts';
import { FoodDataValues } from '../components/food/FoodsPage';
import { IngredientDataValue } from '../components/food/table/expanded/food-ingredients/ExpandedSection';

function useUpdateFoodForm(food: FoodDataValues) {
  const [foodName, setFoodName] = useState(food.name);
  const [ingredients, setIngredients] = useState<IngredientDataValue[]>([]);
  const { user } = useContext(UserContext);
  const foodIngredientsQuery = useQuery({
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFoodName(value);
  };

  useEffect(() => {
    if (
      foodIngredientsQuery.data &&
      foodIngredientsQuery.data.ingredientsDataValues
    ) {
      setIngredients(foodIngredientsQuery.data.ingredientsDataValues);
    }
  }, [foodIngredientsQuery.data]);

  return {
    foodName,
    setFoodName,
    ingredients,
    setIngredients,
    foodIngredientsQuery,
    handleNameChange,
  };
}

export default useUpdateFoodForm;
