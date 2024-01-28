import { useState, useContext, useEffect } from 'react';
import {
  RequestToBackend,
  fetchDataFromBackend,
  makeRequestToBackend,
} from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../contexts';
import { FoodDataValues } from '../components/food/FoodsPage';
import { IngredientDataValue } from '../components/food/table/expanded/food-ingredients/ExpandedSection';

function useUpdateFoodForm(food: FoodDataValues) {
  const queryClient = useQueryClient();
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
  const userIngredientsQuery = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });
  const updateMutation = useMutation({
    mutationKey: ['food', user?.uid, food.id],
    mutationFn: (req: RequestToBackend) => makeRequestToBackend({ ...req }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['food', user?.uid] }),
  });

  useEffect(() => {
    if (
      foodIngredientsQuery.data &&
      foodIngredientsQuery.data.ingredientsDataValues
    ) {
      setIngredients(foodIngredientsQuery.data.ingredientsDataValues);
    }
  }, [foodIngredientsQuery.data]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFoodName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = foodName;
    const ingredientIds = getIngredientIdList(ingredients);
    const body = { name, ingredientIds };
    const url = BASE_URL + `/user/${user?.uid}/food/${food.id}`;

    updateMutation.mutate({ url, method: 'PUT', body });
  };

  const getIngredientIdList = (ingredients: IngredientDataValue[]) => {
    return ingredients.map((ingredient) => ingredient.id);
  };

  return {
    foodName,
    setFoodName,
    ingredients,
    setIngredients,
    foodIngredientsQuery,
    userIngredientsQuery,
    handleNameChange,
    handleSubmit,
    updateMutation,
  };
}

export default useUpdateFoodForm;
