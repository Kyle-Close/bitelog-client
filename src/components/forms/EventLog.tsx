import { Box, TextField, Typography } from '@mui/material';
import { CustomDatePicker } from '../generic/DatePicker';
import { DiscomfortPicker } from '../generic/DiscomfortPicker';

interface EventLogProps {
  initialState?: any; // to be implemented
  logId?: number;
}

export function EventLogForm({ initialState, logId }: EventLogProps) {
  return (
    <Box
      onSubmit={() => {}}
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
    >
      <Typography mb={'-0.5rem'} fontWeight='bold'>
        Log Timestamp:
      </Typography>
      <CustomDatePicker
        initialDate={initialState && new Date(initialState.dateTime)}
        handleChange={() => {}}
      />
      <TextField
        onChange={() => {}}
        value={'todo - hold in state'}
        sx={{ mt: '1rem' }}
        id='event-note-text-field'
        label='Event Description'
        multiline
        rows={4}
        placeholder='Provide a description for this event.'
      />
      <DiscomfortPicker />
    </Box>
  );
}
