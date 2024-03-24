import { IngredientType } from '../hooks/useFoodForm';

export function FoodFormReducer(
  state: FoodFormReducerState,
  action: FoodFormReducerAction
) {
  switch (action.type) {
    case FoodFormActionTypes.UPDATE_FOOD_NAME:
      return {
        ...state,
        foodName: action.payload.value,
      };
    case FoodFormActionTypes.UPDATE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload.value,
      };
    case FoodFormActionTypes.UPDATE_AUTO_COMPLETE_VALUE:
      return {
        ...state,
        autoCompleteValue: action.payload.value,
      };
    case FoodFormActionTypes.ADD_TO_SELECTED_INGREDIENTS:
      if (!action.payload.value) return { ...state };
      if (state.selectedIngredients.includes(action.payload.value))
        return { ...state };
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients,
          action.payload.value,
        ],
      };
    case FoodFormActionTypes.REMOVE_SELECTED_INGREDIENT:
      const exists = state.selectedIngredients.some(
        (ingredient) => ingredient.name === action.payload.value
      );
      if (!exists) return { ...state };
      const newSelectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.name !== action.payload.value
      );
      return {
        ...state,
        selectedIngredients: newSelectedIngredients,
      };
    case FoodFormActionTypes.RESET_FORM:
      return {
        foodName: '',
        autoCompleteValue: null,
        inputValue: '',
        selectedIngredients: [],
      };
  }
}

export interface FoodFormReducerState {
  foodName: string;
  autoCompleteValue: IngredientType | null;
  inputValue: string;
  selectedIngredients: IngredientType[];
}

export enum FoodFormActionTypes {
  UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE',
  UPDATE_AUTO_COMPLETE_VALUE = 'UPDATE_AUTO_COMPLETE_VALUE',
  ADD_TO_SELECTED_INGREDIENTS = 'ADD_TO_SELECTED_INGREDIENTS',
  REMOVE_SELECTED_INGREDIENT = 'REMOVE_SELECTED_INGREDIENT',
  UPDATE_FOOD_NAME = 'UPDATE_FOOD_NAME',
  RESET_FORM = 'RESET_FORM',
}

interface ResetForm {
  type: FoodFormActionTypes.RESET_FORM;
}

interface UpdateInputValue {
  type: FoodFormActionTypes.UPDATE_INPUT_VALUE;
  payload: {
    value: string;
  };
}

interface UpdateAutoCompleteValue {
  type: FoodFormActionTypes.UPDATE_AUTO_COMPLETE_VALUE;
  payload: {
    value: IngredientType | null;
  };
}

interface AddToSelectedIngredients {
  type: FoodFormActionTypes.ADD_TO_SELECTED_INGREDIENTS;
  payload: {
    value: IngredientType | null;
  };
}

interface RemoveSelectedIngredient {
  type: FoodFormActionTypes.REMOVE_SELECTED_INGREDIENT;
  payload: {
    value: string;
  };
}

interface UpdateFoodName {
  type: FoodFormActionTypes.UPDATE_FOOD_NAME;
  payload: {
    value: string;
  };
}

type FoodFormReducerAction =
  | UpdateAutoCompleteValue
  | UpdateInputValue
  | AddToSelectedIngredients
  | RemoveSelectedIngredient
  | UpdateFoodName
  | ResetForm;
