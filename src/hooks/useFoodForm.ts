import { useContext, useReducer } from 'react';
import { useFetchIngredients } from './useFetchIngredients';
import {
  FoodFormActionTypes,
  FoodFormReducer,
  FoodFormReducerState,
} from '../reducers/FoodFormReducer';
import { RequestBody, makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../context';
import { IFoods } from './useFetchUserFood';

export interface IngredientType {
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

const defaultState = {
  foodName: '',
  autoCompleteValue: null,
  inputValue: '',
  selectedIngredients: [],
};

interface UseFoodFormProps {
  initialState?: FoodFormReducerState;
  isUpdating?: boolean;
  food?: IFoods;
}

export function useFoodForm({ initialState, food }: UseFoodFormProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(
    FoodFormReducer,
    initialState ? initialState : defaultState
  );
  const ingredientsQuery = useFetchIngredients();

  const createFoodMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: () =>
      submitFoodForm(`${BASE_URL}/user/${user?.uid}/food`, getBody(), false),
    onSuccess: () => {
      dispatch({ type: FoodFormActionTypes.RESET_FORM });
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['food', user.uid],
        });
      }
    },
  });

  const updateFoodMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: () =>
      submitFoodForm(
        `${BASE_URL}/user/${user?.uid}/food/${food?.id}`,
        getBody(),
        true
      ),
    onSuccess: () => {
      dispatch({ type: FoodFormActionTypes.RESET_FORM });
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['food', user.uid],
        });
      }
    },
  });

  const handleFoodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createFoodMutation.reset();
    dispatch({
      type: FoodFormActionTypes.UPDATE_FOOD_NAME,
      payload: { value: e.target.value },
    });
  };

  const handleAutoCompleteChange = (
    event: any,
    newValue: IngredientType | null
  ) => {
    createFoodMutation.reset();
    dispatch({
      type: FoodFormActionTypes.UPDATE_AUTO_COMPLETE_VALUE,
      payload: { value: newValue },
    });
    dispatch({
      type: FoodFormActionTypes.ADD_TO_SELECTED_INGREDIENTS,
      payload: { value: newValue },
    });
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    createFoodMutation.reset();
    dispatch({
      type: FoodFormActionTypes.UPDATE_INPUT_VALUE,
      payload: { value: newInputValue },
    });
  };

  const removeSelectedIngredient = (ingredient: string) => {
    createFoodMutation.reset();
    dispatch({
      type: FoodFormActionTypes.REMOVE_SELECTED_INGREDIENT,
      payload: { value: ingredient },
    });
  };

  const getBody = () => {
    const ingredientIds = state.selectedIngredients.map(
      (ingredient) => ingredient.id
    );
    return { name: state.foodName, ingredientIds };
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createFoodMutation.mutate();
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFoodMutation.mutate();
  };

  return {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    handleFoodNameChange,
    handleCreateSubmit,
    createFoodMutation,
    handleUpdateSubmit,
    updateFoodMutation,
  };
}

interface CreateFoodPayload {
  name: string;
  ingredientIds: number[];
}

const submitFoodForm = async (
  url: string,
  payload: CreateFoodPayload,
  isUpdating: boolean
) => {
  try {
    await makeRequestToBackend({
      url,
      method: isUpdating ? 'PUT' : 'POST',
      body: payload as unknown as RequestBody,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unexpected error occurred');
  }
};
