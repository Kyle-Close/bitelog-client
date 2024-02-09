import { Box, Typography } from '@mui/material';
import EatEvent from './EatEvent';

interface EventEntry {
  type: 'eat' | 'event';
  title: string;
}

function EventEntry() {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <EatEvent />
    </Box>
  );
}

export default EventEntry;
