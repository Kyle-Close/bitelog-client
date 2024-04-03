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
      if (
        state.selectedFoods.some((food) => food.id === action.payload.value.id)
      )
        return { ...state };
      return {
        ...state,
        selectedFoods: [...state.selectedFoods, action.payload.value],
      };
    case EatLogActionTypes.REMOVE_SELECTED_FOOD:
      const foodIdToRemove = action.payload.id;

      const exists = state.selectedFoods.some(
        (food) => food.id === foodIdToRemove
      );

      if (!exists) return { ...state };

      const newSelectedFoods = state.selectedFoods.filter(
        (food) => food.id !== foodIdToRemove
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
        note: '',
      };
    case EatLogActionTypes.UPDATE_SELECTED_FOOD_QUANTITY:
      if (state.selectedFoods.length === 0) return { ...state };
      const { id, quantity } = action.payload;
      const index = state.selectedFoods.findIndex((food) => food.id === id);
      if (index === -1) {
        console.warn(`Food with id ${id} not found.`);
        return { ...state }; // Return current state if food not found
      }
      const newFoods = [...state.selectedFoods];
      newFoods[index].quantity = quantity;
      return {
        ...state,
        selectedFoods: newFoods,
      };
    case EatLogActionTypes.UPDATE_NOTE_VALUE:
      return { ...state, note: action.payload.value };
  }
}

export interface SelectedFoods extends IFoods {
  quantity: number;
}

export interface EatLogReducerState {
  autoCompleteValue: SelectedFoods | null;
  inputValue: string;
  selectedFoods: SelectedFoods[];
  note: string;
}

export enum EatLogActionTypes {
  UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE',
  UPDATE_AUTO_COMPLETE_VALUE = 'UPDATE_AUTO_COMPLETE_VALUE',
  UPDATE_NOTE_VALUE = 'UPDATE_NOTE_VALUE',
  ADD_TO_SELECTED_FOODS = 'ADD_TO_SELECTED_FOODS',
  REMOVE_SELECTED_FOOD = 'REMOVE_SELECTED_FOOD',
  UPDATE_SELECTED_FOOD_QUANTITY = 'UPDATE_SELECTED_FOOD_QUANTITY',
  RESET_FORM = 'RESET_FORM',
}

interface ResetForm {
  type: EatLogActionTypes.RESET_FORM;
}

interface UpdateSelectedFoodQuantity {
  type: EatLogActionTypes.UPDATE_SELECTED_FOOD_QUANTITY;
  payload: {
    id: number;
    quantity: number;
  };
}

interface UpdateNoteValue {
  type: EatLogActionTypes.UPDATE_NOTE_VALUE;
  payload: {
    value: string;
  };
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
    value: SelectedFoods | null;
  };
}

interface AddToSelectedFoods {
  type: EatLogActionTypes.ADD_TO_SELECTED_FOODS;
  payload: {
    value: SelectedFoods;
  };
}

interface RemoveSelectedFood {
  type: EatLogActionTypes.REMOVE_SELECTED_FOOD;
  payload: {
    id: number;
  };
}

type FoodFormReducerAction =
  | UpdateAutoCompleteValue
  | UpdateInputValue
  | AddToSelectedFoods
  | RemoveSelectedFood
  | ResetForm
  | UpdateSelectedFoodQuantity
  | UpdateNoteValue;
