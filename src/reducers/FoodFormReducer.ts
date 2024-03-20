export function FoodFormReducer(
  state: FoodFormReducerState,
  action: FoodFormReducerAction
) {
  switch (action.type) {
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
      if (!state.selectedIngredients.includes(action.payload.value))
        return { ...state };
      const newSelectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient !== action.payload.value
      );
      return {
        ...state,
        selectedIngredients: newSelectedIngredients,
      };
  }
}

interface IngredientType {
  name: string;
}

interface FoodFormReducerState {
  autoCompleteValue: IngredientType | null;
  inputValue: string;
  selectedIngredients: string[];
}

export enum FoodFormActionTypes {
  UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE',
  UPDATE_AUTO_COMPLETE_VALUE = 'UPDATE_AUTO_COMPLETE_VALUE',
  ADD_TO_SELECTED_INGREDIENTS = 'ADD_TO_SELECTED_INGREDIENTS',
  REMOVE_SELECTED_INGREDIENT = 'REMOVE_SELECTED_INGREDIENT',
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
    value: string | null;
  };
}

interface RemoveSelectedIngredient {
  type: FoodFormActionTypes.REMOVE_SELECTED_INGREDIENT;
  payload: {
    value: string;
  };
}

type FoodFormReducerAction =
  | UpdateAutoCompleteValue
  | UpdateInputValue
  | AddToSelectedIngredients
  | RemoveSelectedIngredient;
