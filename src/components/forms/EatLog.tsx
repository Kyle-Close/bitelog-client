import {
  Autocomplete,
  Box,
  Divider,
  InputLabel,
  TextField,
} from '@mui/material';
import { useEatLogForm } from '../../hooks/useEatLogForm';
import ItemWithQuantityList from '../generic/ItemWithQuantityList';

export function EatLogForm() {
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
          <InputLabel id='combo-foods-label'>Foods</InputLabel>
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
        <Divider />
        <ItemWithQuantityList
          handleChange={handleFoodItemListChange}
          items={EatLogForm.state.selectedFoods}
        />
      </Box>
    )
  );
}
