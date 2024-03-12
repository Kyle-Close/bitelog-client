import { useQuery } from '@tanstack/react-query';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { User } from '../contexts';
import { FoodDataValues } from '../components/food/FoodsPage';

export function useFetchUserFood(user: User | null) {
  const foodQuery = useQuery({
    queryKey: ['food', user?.uid],
    queryFn: () => makeRequestToBackend({ url: `${BASE_URL}/user/${user?.uid}/food` }),
    enabled: !!user,
  });

  const ingredientsQuery = useQuery({
    queryKey: ['foodIngredients', user?.uid],
    queryFn: () => {
      return makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/food/bulk`,
        method: 'POST',
        body: createBody(foodQuery.data.foodDataValues),
      });
    },
    enabled: foodQuery.isSuccess,
  });

  function createBody(foodData: FoodDataValues[]) {
    return { foodIds: foodData.map((food) => food.id) };
  }

  return {
    foodQuery,
    ingredientsQuery,
  };
}
