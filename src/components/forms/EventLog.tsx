import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { CustomDatePicker } from '../generic/DatePicker';
import { DiscomfortPicker } from '../generic/DiscomfortPicker';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  EventLogFormState,
  useEventLogForm,
} from '../../hooks/useEventLogForm';

interface EventLogProps {
  initialState?: EventLogFormState;
  logId?: number;
}

export function EventLogForm({ initialState, logId }: EventLogProps) {
  const EventLogForm = useEventLogForm();
  return (
    <Box
      onSubmit={EventLogForm.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      component='form'
    >
      <Typography mb={'-0.5rem'} fontWeight='bold'>
        Log Timestamp:
      </Typography>
      <CustomDatePicker
        initialDate={initialState && new Date(initialState.timeStamp)}
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
      <Button type='submit' variant='contained' color='secondary'>
        Submit
      </Button>
    </Box>
  );
}
