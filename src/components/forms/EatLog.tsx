import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useEatLogForm } from '../../hooks/useEatLogForm';
import ItemWithQuantityList from '../generic/ItemWithQuantityList';
import { useContext } from 'react';
import { UserContext } from '../../context';
import { Loading } from '../generic/Loading';
import { EatLogReducerState } from '../../reducers/EatLogFormReducer';
import { MuiDateTimePicker } from '../generic/MuiDateTimePicker';
import { BASE_CLIENT_URL } from '../../config/axiosConfig';

interface EatLogFormProps {
  initialState?: EatLogReducerState;
  logId?: number;
  createSelectedDate: Date;
}

export function EatLogForm({
  initialState,
  logId,
  createSelectedDate,
}: EatLogFormProps) {
  const { user } = useContext(UserContext);
  const EatLogForm = useEatLogForm(initialState, logId);

  const handleFoodItemListChange = (id: number, newQuantity: number) => {
    if (EatLogForm) EatLogForm.updateFoodQuantity(id, newQuantity);
  };

  if (EatLogForm?.createEatLogMutation.isPending) return <Loading />;

  return (
    EatLogForm && (
      <Box
        onSubmit={EatLogForm.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        component='form'
      >
        <Typography mb={'-0.5rem'} fontWeight='bold'>
          Log Timestamp:
        </Typography>
        <MuiDateTimePicker
          date={initialState ? initialState.dateTime : createSelectedDate}
          handleChange={EatLogForm.handleDateChange}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <InputLabel id='combo-foods-label'>Your Foods</InputLabel>
          <Autocomplete
            {...EatLogForm.defaultProps}
            renderInput={(params) => (
              <TextField {...params} variant='standard' />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id='combo-ingredients'
            size='small'
            value={EatLogForm.state.autoCompleteValue}
            onChange={EatLogForm.handleAutoCompleteChange}
            inputValue={EatLogForm.state.inputValue}
            onInputChange={EatLogForm.handleInputChange}
          />
        </Box>
        <Typography fontSize='small'>
          <Link
            fontSize='small'
            underline='none'
            color='secondary'
            href={`${BASE_CLIENT_URL}/user/${user?.uid}/food`}
          >
            Create Food
          </Link>{' '}
          ← Click here to add additional foods to your account.
        </Typography>
        <TextField
          onChange={EatLogForm.handleUpdateNote}
          value={EatLogForm.state.note}
          sx={{ mt: '1rem' }}
          id='note-text-field'
          label='Notes'
          multiline
          rows={4}
          placeholder='Add any additional notes you would like to log - optional'
        />
        {EatLogForm.createEatLogMutation.isSuccess && (
          <Typography fontWeight='bold' fontSize='small' color='lightgreen'>
            Successfully created eat log!
          </Typography>
        )}
        {EatLogForm.updateEatLogMutation.isSuccess && (
          <Typography fontWeight='bold' fontSize='small' color='lightgreen'>
            Successfully updated eat log!
          </Typography>
        )}
        {EatLogForm.createEatLogMutation.isError && (
          <Typography fontWeight='bold' fontSize='small' color='error'>
            {EatLogForm.createEatLogMutation.error.message}
          </Typography>
        )}
        {EatLogForm.updateEatLogMutation.isError && (
          <Typography fontWeight='bold' fontSize='small' color='error'>
            {EatLogForm.updateEatLogMutation.error.message}
          </Typography>
        )}
        <Button
          sx={{ mt: '0.5rem' }}
          type='submit'
          variant='contained'
          color='secondary'
        >
          Submit
        </Button>
        <Divider />
        <ItemWithQuantityList
          handleDelete={EatLogForm.removeSelectedFood}
          handleChange={handleFoodItemListChange}
          items={EatLogForm.state.selectedFoods}
        />
      </Box>
    )
  );
}
