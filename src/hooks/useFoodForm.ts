import { useState, useContext, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchDataFromBackend,
  makeRequestToBackend,
  Method,
  RequestToBackend,
} from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { UserContext } from '../contexts';
import { FoodDataValues } from '../components/food/FoodsPage';
import { IngredientDataValue } from '../components/food/table/expanded/food-ingredients/ExpandedSection';

function useFoodForm(food?: FoodDataValues) {
  const queryClient = useQueryClient();
  const [foodName, setFoodName] = useState(food?.name || '');
  const [ingredients, setIngredients] = useState<IngredientDataValue[]>([]);
  const { user } = useContext(UserContext);

  const foodIngredientsQuery = useQuery({
    queryKey: ['food ingredients', { uid: user?.uid, foodId: food?.id }],
    queryFn: () =>
      fetchDataFromBackend(`${BASE_URL}/user/${user?.uid}/food/${food?.id}`),
    enabled: !!food,
  });

  const userIngredientsQuery = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(`${BASE_URL}/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });

  const updateMutation = useMutation({
    mutationKey: ['food', user?.uid, food?.id],
    mutationFn: (req: RequestToBackend) => makeRequestToBackend({ ...req }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['food', user?.uid] }),
  });

  const createMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: (req: RequestToBackend) => makeRequestToBackend({ ...req }),
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
    setFoodName(e.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    url: string,
    method: Method
  ) => {
    e.preventDefault();
    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    const body = { name: foodName, ingredientIds };

    if (method === 'PUT') {
      updateMutation.mutate({ url: `${BASE_URL}${url}`, method, body });
    } else if (method === 'POST') {
      createMutation.mutate({ url: `${BASE_URL}${url}`, method, body });
    }
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
    createMutation,
  };
}

export default useFoodForm;
