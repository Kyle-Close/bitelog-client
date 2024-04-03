import { useContext, useReducer } from 'react';
import { useFetchUserFood } from './useFetchUserFood';
import { UserContext } from '../context';
import {
  EatLogActionTypes,
  EatLogReducer,
  SelectedFoods,
} from '../reducers/EatLogFormReducer';

export function useEatLogForm() {
  const { user } = useContext(UserContext);
  const { foods, foodQuery } = useFetchUserFood(user);
  const [state, dispatch] = useReducer(EatLogReducer, {
    autoCompleteValue: null,
    inputValue: '',
    selectedFoods: [],
    note: '',
  });

  if (!foods) return;

  const handleAutoCompleteChange = (
    event: any,
    newValue: SelectedFoods | null
  ) => {
    dispatch({
      type: EatLogActionTypes.UPDATE_AUTO_COMPLETE_VALUE,
      payload: { value: newValue },
    });
    dispatch({
      type: EatLogActionTypes.ADD_TO_SELECTED_FOODS,
      payload: { value: newValue },
    });
  };

  const handleUpdateNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: EatLogActionTypes.UPDATE_NOTE_VALUE,
      payload: { value: e.target.value },
    });
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    dispatch({
      type: EatLogActionTypes.UPDATE_INPUT_VALUE,
      payload: { value: newInputValue },
    });
  };

  const updateFoodQuantity = (foodId: number, quantity: number) => {
    dispatch({
      type: EatLogActionTypes.UPDATE_SELECTED_FOOD_QUANTITY,
      payload: { id: foodId, quantity },
    });
  };

  const removeSelectedFood = (foodId: number) => {
    dispatch({
      type: EatLogActionTypes.REMOVE_SELECTED_FOOD,
      payload: { id: foodId },
    });
  };

  const defaultPropsFoods = foods.map((food) => {
    return { ...food, quantity: 1 };
  });
  const defaultProps = {
    options: defaultPropsFoods,
    getOptionLabel: (option: SelectedFoods) => option.name,
  };

  return {
    foodQuery,
    defaultProps,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedFood,
    state,
    updateFoodQuantity,
    handleUpdateNote,
  };
}
