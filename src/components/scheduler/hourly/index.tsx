import { Box } from '@mui/material';
import HourContainerList from './HourContainerList';
import StickyHourlyMenu from './StickyHourlyMenu';

interface HourlyScheduler {
  date: Date; // Current day the hourly scheduler is looking at.
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function HourlyScheduler({ date, setDate }: HourlyScheduler) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <StickyHourlyMenu date={date} setDate={setDate} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        <HourContainerList date={date} />
      </Box>
    </Box>
  );
}

export default HourlyScheduler;
