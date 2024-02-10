import { Box, Typography } from '@mui/material';
import EatEvent from './EatEvent';

interface EventEntry {
  type: 'eat' | 'event';
  title: string;
}

function EventEntry({ type, title }: EventEntry) {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <EatEvent title={title} />
    </Box>
  );
}

export default EventEntry;
