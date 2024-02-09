import { Box } from '@mui/material';
import EventEntry from './EventEntry';

function EventContent() {
  return (
    <Box
      sx={{
        p: '0.2rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '0.2rem',
        flexGrow: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <EventEntry />
      </Box>
    </Box>
  );
}

export default EventContent;
