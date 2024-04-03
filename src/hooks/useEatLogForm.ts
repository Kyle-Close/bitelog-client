import { useContext, useReducer } from 'react';
import { useFetchUserFood } from './useFetchUserFood';
import { UserContext } from '../context';
import {
  EatLogActionTypes,
  EatLogReducer,
  SelectedFoods,
} from '../reducers/EatLogFormReducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestBody, makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { getCurrentISODate } from '../helpers/dates';

export function useEatLogForm() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { foods, foodQuery } = useFetchUserFood(user);
  const [state, dispatch] = useReducer(EatLogReducer, {
    autoCompleteValue: null,
    inputValue: '',
    selectedFoods: [],
    note: '',
  });
  const createEatLogMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: () =>
      submitForm(
        `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs`,
        buildSubmitObject(state.selectedFoods, state.note),
        false
      ),
    onSuccess: () => {
      dispatch({ type: EatLogActionTypes.RESET_FORM });
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['eatLogs', user.uid],
        });
      }
    },
  });

  if (!foods) return;

  const handleAutoCompleteChange = (
    event: any,
    newValue: SelectedFoods | null
  ) => {
    if (!newValue) return;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEatLogMutation.mutate();
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
    handleSubmit,
  };
}

const buildSubmitObject = (selectedFoods: SelectedFoods[], note: string) => {
  const logTimestamp = getCurrentISODate();
  const foods = selectedFoods.map((food) => {
    return { id: food.id, quantity: food.quantity };
  });
  if (note)
    return {
      foods,
      notes: note,
      logTimestamp,
    };
  else return { foods, logTimestamp };
};

interface SubmitFormPayload {
  logTimestamp: string;
  foods: {
    id: number;
    quantity: number;
  }[];
  notes?: string;
}

const submitForm = async (
  url: string,
  payload: SubmitFormPayload,
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
