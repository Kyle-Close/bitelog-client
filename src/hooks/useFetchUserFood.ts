import { useQuery } from '@tanstack/react-query';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { User } from '../context';
import { IngredientType } from './useFoodForm';

export interface IFoods {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  ingredients: IngredientType[];
}
export interface FoodResponseShape {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  Ingredients: IngredientType[];
}

export function useFetchUserFood(user: User | null) {
  const foodQuery = useQuery({
    queryKey: ['food', user?.uid],
    queryFn: () =>
      makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/food?includeIngredients=true`,
      }),
    enabled: !!user,
  });

  function createFoods() {
    if (!foodQuery.data) return;

    const foodData = foodQuery.data.foodDataValues as FoodResponseShape[];

    return foodData.map((data) => {
      return {
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        id: data.id,
        name: data.name,
        ingredients: data.Ingredients,
      };
    });
  }

  const foods = createFoods();

  return {
    foodQuery,
    foods,
  };
}
