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
import { BASE_URL } from '../../config/axiosConfig';
import { useContext } from 'react';
import { UserContext } from '../../context';

export function EatLogForm() {
  const { user } = useContext(UserContext);
  const EatLogForm = useEatLogForm();

  const handleFoodItemListChange = (id: number, newQuantity: number) => {
    if (EatLogForm) EatLogForm.updateFoodQuantity(id, newQuantity);
  };

  return (
    EatLogForm && (
      <Box
        onSubmit={(e) => {
          e.preventDefault();
        }}
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        component='form'
      >
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
            href={`/user/${user?.uid}/food`}
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
