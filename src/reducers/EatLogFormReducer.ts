import { IFoods } from '../hooks/useFetchUserFood';

export function EatLogReducer(
  state: EatLogReducerState,
  action: FoodFormReducerAction
) {
  switch (action.type) {
    case EatLogActionTypes.UPDATE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload.value,
      };
    case EatLogActionTypes.UPDATE_AUTO_COMPLETE_VALUE:
      return {
        ...state,
        autoCompleteValue: action.payload.value,
      };
    case EatLogActionTypes.ADD_TO_SELECTED_FOODS:
      if (!action.payload.value) return { ...state };
      if (state.selectedFoods.includes(action.payload.value))
        return { ...state };
      return {
        ...state,
        selectedFoods: [...state.selectedFoods, action.payload.value],
      };
    case EatLogActionTypes.REMOVE_SELECTED_FOOD:
      const exists = state.selectedFoods.some(
        (food) => food.name === action.payload.value
      );
      if (!exists) return { ...state };
      const newSelectedFoods = state.selectedFoods.filter(
        (food) => food.name !== action.payload.value
      );
      return {
        ...state,
        selectedFoods: newSelectedFoods,
      };
    case EatLogActionTypes.RESET_FORM:
      return {
        autoCompleteValue: null,
        inputValue: '',
        selectedFoods: [],
      };
  }
}

export interface EatLogReducerState {
  autoCompleteValue: IFoods | null;
  inputValue: string;
  selectedFoods: IFoods[];
}

export enum EatLogActionTypes {
  UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE',
  UPDATE_AUTO_COMPLETE_VALUE = 'UPDATE_AUTO_COMPLETE_VALUE',
  ADD_TO_SELECTED_FOODS = 'ADD_TO_SELECTED_FOODS',
  REMOVE_SELECTED_FOOD = 'REMOVE_SELECTED_FOOD',
  RESET_FORM = 'RESET_FORM',
}

interface ResetForm {
  type: EatLogActionTypes.RESET_FORM;
}

interface UpdateInputValue {
  type: EatLogActionTypes.UPDATE_INPUT_VALUE;
  payload: {
    value: string;
  };
}

interface UpdateAutoCompleteValue {
  type: EatLogActionTypes.UPDATE_AUTO_COMPLETE_VALUE;
  payload: {
    value: IFoods | null;
  };
}

interface AddToSelectedFoods {
  type: EatLogActionTypes.ADD_TO_SELECTED_FOODS;
  payload: {
    value: IFoods | null;
  };
}

interface RemoveSelectedFood {
  type: EatLogActionTypes.REMOVE_SELECTED_FOOD;
  payload: {
    value: string;
  };
}

type FoodFormReducerAction =
  | UpdateAutoCompleteValue
  | UpdateInputValue
  | AddToSelectedFoods
  | RemoveSelectedFood
  | ResetForm;
