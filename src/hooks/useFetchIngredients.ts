import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../context';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { IngredientType } from './useFoodForm';

export function useFetchIngredients() {
  const { user } = useContext(UserContext);

  const ingredientsQuery = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () =>
      makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/ingredients`,
      }),
    enabled: !!user,
  });

  let ingredients: IngredientType[] = ingredientsQuery.data
    ? ingredientsQuery.data.ingredients
    : null;

  if (ingredients)
    ingredients = ingredients.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return {
    ingredientsQuery,
    ingredients,
  };
}
