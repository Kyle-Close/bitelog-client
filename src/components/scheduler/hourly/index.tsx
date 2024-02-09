import { Box } from '@mui/material';
import HourContainerList from './HourContainerList';

interface HourlyScheduler {
  date: Date; // Current day the hourly scheduler is looking at.
}

function HourlyScheduler({ date }: HourlyScheduler) {
  // Amount of hours passed in day, locally
  // Use this to display the hours close to the actual time on mobile.
  const currentHour = date.getHours();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto',
        gap: '0.15rem',
      }}
    >
      <HourContainerList />
    </Box>
  );
}

export default HourlyScheduler;
