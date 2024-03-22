import { useQuery } from '@tanstack/react-query';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { User } from '../context';
import { FoodDataValues } from '../pages/food';

export interface IFoods {
  UserId: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  ingredients: string[];
}

interface IFoodIngredients {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export function useFetchUserFood(user: User | null) {
  const foodQuery = useQuery({
    queryKey: ['food', user?.uid],
    queryFn: () =>
      makeRequestToBackend({ url: `${BASE_URL}/user/${user?.uid}/food` }),
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

  function createFoods() {
    if (!foodQuery.data || !ingredientsQuery.data) return;

    const foodIngredientsData = ingredientsQuery.data.foodIngredients;
    const foodData = foodQuery.data.foodDataValues;

    const ingredientNames = foodIngredientsData.map(
      (foodIngredients: IFoodIngredients[]) => {
        return foodIngredients.map((ingredients) => ingredients.name);
      }
    );

    const foods: IFoods[] = [];
    for (let i = 0; i < foodData.length; i++) {
      foods.push({ ...foodData[i], ingredients: ingredientNames[i] });
    }

    return foods;
  }

  const foods = createFoods();

  return {
    foodQuery,
    ingredientsQuery,
    foods,
  };
}
