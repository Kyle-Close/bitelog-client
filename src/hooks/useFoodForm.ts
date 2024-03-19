import { useFetchIngredients } from './useFetchIngredients';

export function useFoodForm() {
  const ingredientsQuery = useFetchIngredients();

  return {
    ingredientsQuery,
  };
}
