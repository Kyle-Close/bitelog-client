import { useContext, useReducer } from 'react';
import { IFoods, useFetchUserFood } from './useFetchUserFood';
import { UserContext } from '../context';
import {
  EatLogActionTypes,
  EatLogReducer,
} from '../reducers/EatLogFormReducer';

export function useEatLogForm() {
  const { user } = useContext(UserContext);
  const { foods, foodQuery } = useFetchUserFood(user);
  const [state, dispatch] = useReducer(EatLogReducer, {
    autoCompleteValue: null,
    inputValue: '',
    selectedFoods: [],
  });

  if (!foods) return;

  const handleAutoCompleteChange = (event: any, newValue: IFoods | null) => {
    dispatch({
      type: EatLogActionTypes.UPDATE_AUTO_COMPLETE_VALUE,
      payload: { value: newValue },
    });
    dispatch({
      type: EatLogActionTypes.ADD_TO_SELECTED_FOODS,
      payload: { value: newValue },
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

  const removeSelectedIngredient = (ingredient: string) => {
    dispatch({
      type: EatLogActionTypes.REMOVE_SELECTED_FOOD,
      payload: { value: ingredient },
    });
  };

  const defaultProps = {
    options: foods,
    getOptionLabel: (option: IFoods) => option.name,
  };

  return {
    foodQuery,
    defaultProps,
    handleAutoCompleteChange,
    handleInputChange,
    removeSelectedIngredient,
    state,
  };
}
