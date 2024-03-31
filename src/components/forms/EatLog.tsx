import {
  Autocomplete,
  Box,
  Divider,
  InputLabel,
  TextField,
} from '@mui/material';
import { useEatLogForm } from '../../hooks/useEatLogForm';
import ChipsArray from '../generic/ChipArray';

export function EatLogForm() {
  const EatLogForm = useEatLogForm();
  return (
    EatLogForm && (
      <Box
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
            id='combo-ingredients'
            size='small'
            value={EatLogForm.state.autoCompleteValue}
            onChange={EatLogForm.handleAutoCompleteChange}
            inputValue={EatLogForm.state.inputValue}
            onInputChange={EatLogForm.handleInputChange}
          ></Autocomplete>
        </Box>
        <Divider />
        <ChipsArray
          chipData={EatLogForm.state.selectedFoods.map((food) => food.name)}
          deleteData={EatLogForm.removeSelectedFood}
        />
      </Box>
    )
  );
}
