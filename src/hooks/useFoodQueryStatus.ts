import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { RequestToBackend } from '../helpers/utility';

interface FoodQueryStatusResult {
  status: 'error' | 'loading' | 'pending' | 'success';
  message?: string;
}

function useFoodQueryStatus<TQuery>(
  userIngredientsQuery: UseQueryResult<TQuery, unknown>,
  updateMutation: UseMutationResult<any, Error, RequestToBackend, unknown>,
  foodIngredientsQuery?: UseQueryResult<TQuery, unknown> | null
): FoodQueryStatusResult {
  if (!foodIngredientsQuery) {
    // Only check userIngredientsQuery
    if (userIngredientsQuery.error) {
      console.log('1');
      return { status: 'error', message: 'Error fetching ingredient list.' };
    }

    if (userIngredientsQuery.isLoading || !userIngredientsQuery.data) {
      console.log('2');
      return { status: 'loading', message: 'Loading...' };
    }

    console.log('3');
    return { status: 'success' };
  }

  if (foodIngredientsQuery.error || userIngredientsQuery.error) {
    console.log('4');
    return { status: 'error', message: 'Error fetching ingredient lists.' };
  }

  if (
    foodIngredientsQuery.isLoading ||
    !foodIngredientsQuery.data ||
    userIngredientsQuery.isLoading ||
    !userIngredientsQuery.data
  ) {
    console.log('5');
    return { status: 'loading', message: 'Loading...' };
  }

  if (updateMutation.isError) {
    console.log('6');
    return { status: 'error', message: 'Error during food update.' };
  }

  if (
    updateMutation.isPending ||
    (!updateMutation.data && !updateMutation.isIdle)
  ) {
    console.log('7');
    return { status: 'pending', message: 'Awaiting mutation...' };
  }

  console.log('8');
  return { status: 'success' };
}

export default useFoodQueryStatus;
