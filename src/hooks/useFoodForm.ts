import { useContext, useReducer } from 'react';
import { useFetchIngredients } from './useFetchIngredients';
import {
  FoodFormActionTypes,
  FoodFormReducer,
} from '../reducers/FoodFormReducer';
import { RequestBody, makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../context';

export interface IngredientType {
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export function useFoodForm() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(FoodFormReducer, {
    foodName: '',
    autoCompleteValue: null,
    inputValue: '',
    selectedIngredients: [],
  });
  const ingredientsQuery = useFetchIngredients();

  const createFoodMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: () =>
      submitFoodForm(`${BASE_URL}/user/${user?.uid}/food`, getBody()),
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createFoodMutation.mutate();
  };

  return {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    handleFoodNameChange,
    handleSubmit,
    createFoodMutation,
  };
}

interface CreateFoodPayload {
  name: string;
  ingredientIds: number[];
}

const submitFoodForm = async (url: string, payload: CreateFoodPayload) => {
  try {
    await makeRequestToBackend({
      url,
      method: 'POST',
      body: payload as unknown as RequestBody,
    });
  } catch (err) {
    console.log(err);
  }
};
