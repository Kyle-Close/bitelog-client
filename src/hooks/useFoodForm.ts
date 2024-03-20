import { useReducer } from 'react';
import { useFetchIngredients } from './useFetchIngredients';
import {
  FoodFormActionTypes,
  FoodFormReducer,
} from '../reducers/FoodFormReducer';

export interface IngredientType {
  name: string;
}

export function useFoodForm() {
  const [state, dispatch] = useReducer(FoodFormReducer, {
    autoCompleteValue: { name: '' },
    inputValue: '',
    selectedIngredients: [],
  });
  const ingredientsQuery = useFetchIngredients();

  const handleAutoCompleteChange = (
    event: any,
    newValue: IngredientType | null
  ) => {
    dispatch({
      type: FoodFormActionTypes.UPDATE_AUTO_COMPLETE_VALUE,
      payload: { value: newValue },
    });
    dispatch({
      type: FoodFormActionTypes.ADD_TO_SELECTED_INGREDIENTS,
      payload: { value: newValue ? newValue.name : '' },
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

  return {
    ingredientsQuery,
    state,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
  };
}
