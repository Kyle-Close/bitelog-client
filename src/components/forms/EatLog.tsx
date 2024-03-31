import { Autocomplete, Box, InputLabel, TextField } from '@mui/material';

export function EatLogForm() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InputLabel id='combo-foods-label'>Foods</InputLabel>
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} variant='standard' />}
          id='combo-ingredients'
          size='small'
          value={state.autoCompleteValue}
          onChange={handleAutoCompleteChange}
          inputValue={state.inputValue}
          onInputChange={handleInputChange}
        ></Autocomplete>
      </Box>
    </Box>
  );
}
