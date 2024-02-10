import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { RequestToBackend } from '../helpers/utility';

interface FoodQueryStatusResult {
  status: 'error' | 'loading' | 'pending' | 'success';
  message?: string;
}

function useFoodQueryStatus<TQuery>(
  userIngredientsQuery: UseQueryResult<TQuery, unknown>,
  updateMutation: UseMutationResult<any, Error, RequestToBackend, unknown>,
  createMutation: UseMutationResult<any, Error, RequestToBackend, unknown>,
  foodIngredientsQuery?: UseQueryResult<TQuery, unknown> | null
): FoodQueryStatusResult {
  if (!foodIngredientsQuery) {
    // Only check userIngredientsQuery & createMutation
    if (userIngredientsQuery.error || createMutation.error) {
      return { status: 'error', message: 'Error fetching ingredient list.' };
    }

    if (
      userIngredientsQuery.isLoading ||
      !userIngredientsQuery.data ||
      createMutation.isPending
    ) {
      return { status: 'loading', message: 'Loading...' };
    }

    return { status: 'success' };
  }

  if (foodIngredientsQuery.error || userIngredientsQuery.error) {
    return { status: 'error', message: 'Error fetching ingredient lists.' };
  }

  if (
    foodIngredientsQuery.isLoading ||
    !foodIngredientsQuery.data ||
    userIngredientsQuery.isLoading ||
    !userIngredientsQuery.data
  ) {
    return { status: 'loading', message: 'Loading...' };
  }

  if (updateMutation.isError) {
    return { status: 'error', message: 'Error during food update.' };
  }

  if (
    updateMutation.isPending ||
    (!updateMutation.data && !updateMutation.isIdle)
  ) {
    return { status: 'pending', message: 'Awaiting mutation...' };
  }

  return { status: 'success' };
}

export default useFoodQueryStatus;
