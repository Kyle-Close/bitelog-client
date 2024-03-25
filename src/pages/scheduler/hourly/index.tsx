import { Box, Paper } from '@mui/material';
import HourContainerList from './HourContainerList';
import StickyHourlyMenu from './StickyHourlyMenu';

interface HourlyScheduler {
  date: Date; // Current day the hourly scheduler is looking at.
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function HourlyScheduler({ date, setDate }: HourlyScheduler) {
  return (
    <Paper
      elevation={20}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto',
        position: 'relative',
        borderRadius: '8px',
      }}
    >
      <StickyHourlyMenu date={date} setDate={setDate} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <HourContainerList date={date} />
      </Box>
    </Paper>
  );
}

export default HourlyScheduler;
