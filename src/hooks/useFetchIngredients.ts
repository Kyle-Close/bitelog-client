import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../context';
import { Ingredient, fetchUserIngredients } from '../helpers/fetch/ingredients';

export function useFetchIngredients() {
  const { user } = useContext(UserContext);
  if (!user) return;

  const ingredientsQuery = useQuery<Ingredient[], Error>({
    queryKey: ['ingredients', user.uid],
    queryFn: () => fetchUserIngredients(user.uid),
  });

  return ingredientsQuery;
}
