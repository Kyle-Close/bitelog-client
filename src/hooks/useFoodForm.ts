import { useReducer } from 'react';
import { useFetchIngredients } from './useFetchIngredients';
import {
  FoodFormActionTypes,
  FoodFormReducer,
} from '../reducers/FoodFormReducer';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';

export interface IngredientType {
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export function useFoodForm() {
  const [state, dispatch] = useReducer(FoodFormReducer, {
    foodName: '',
    autoCompleteValue: null,
    inputValue: '',
    selectedIngredients: [],
  });
  const ingredientsQuery = useFetchIngredients();

  const handleFoodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FoodFormActionTypes.UPDATE_FOOD_NAME,
      payload: { value: e.target.value },
    });
  };

  const handleAutoCompleteChange = (
    event: any,
    newValue: IngredientType | null
  ) => {
    console.log(newValue);
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
    dispatch({
      type: FoodFormActionTypes.UPDATE_INPUT_VALUE,
      payload: { value: newInputValue },
    });
  };

  const removeSelectedIngredient = (ingredient: string) => {
    dispatch({
      type: FoodFormActionTypes.REMOVE_SELECTED_INGREDIENT,
      payload: { value: ingredient },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ingredientIds = state.selectedIngredients.map(
      (ingredient) => ingredient.id
    );
    console.log(ingredientIds);
    makeRequestToBackend({ url: `${BASE_URL}/` });
  };

  return {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    handleFoodNameChange,
    handleSubmit,
  };
}
