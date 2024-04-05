import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { DiscomfortPicker } from '../generic/DiscomfortPicker';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  EventLogFormState,
  useEventLogForm,
} from '../../hooks/useEventLogForm';
import { MuiDateTimePicker } from '../generic/MuiDateTimePicker';

interface EventLogProps {
  initialState?: EventLogFormState;
  logId?: number;
  createSelectedDate: Date;
}

export function EventLogForm({
  initialState,
  logId,
  createSelectedDate,
}: EventLogProps) {
  const EventLogForm = useEventLogForm(initialState, logId);
  return (
    <Box
      onSubmit={EventLogForm.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
    >
      <Typography mb={'-0.5rem'} fontWeight='bold'>
        Log Timestamp:
      </Typography>
      <MuiDateTimePicker
        date={initialState ? initialState.timeStamp : createSelectedDate}
        handleChange={EventLogForm.handleDateChange}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          Discomfort Level (optional)
        </AccordionSummary>
        <AccordionDetails>
          <DiscomfortPicker
            initialState={initialState?.discomfortLevel}
            handleChange={EventLogForm.handleUpdateDiscomfortLevel}
          />
        </AccordionDetails>
      </Accordion>
      <TextField
        required
        onChange={EventLogForm.handleUpdateNote}
        value={EventLogForm.note}
        sx={{ mt: '1rem' }}
        id='event-note-text-field'
        label='Event Description'
        multiline
        rows={4}
        placeholder='Provide a description for this event.'
      />
      {EventLogForm.createEventMutation.isSuccess && (
        <Typography fontWeight='bold' fontSize='small' color='lightgreen'>
          Successfully created event!
        </Typography>
      )}
      {EventLogForm.updateEventMutation.isSuccess && (
        <Typography fontWeight='bold' fontSize='small' color='lightgreen'>
          Successfully updated event!
        </Typography>
      )}
      {EventLogForm.createEventMutation.isError && (
        <Typography fontWeight='bold' fontSize='small' color='error'>
          {EventLogForm.createEventMutation.error.message}
        </Typography>
      )}
      {EventLogForm.updateEventMutation.isError && (
        <Typography fontWeight='bold' fontSize='small' color='error'>
          {EventLogForm.updateEventMutation.error.message}
        </Typography>
      )}
      <Button type='submit' variant='contained' color='secondary'>
        Submit
      </Button>
    </Box>
  );
}
