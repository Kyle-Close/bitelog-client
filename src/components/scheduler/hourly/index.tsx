import { Box } from '@mui/material';

interface HourlyScheduler {
  date: Date; // Current day the hourly scheduler is looking at.
}

function HourlyScheduler({ date }: HourlyScheduler) {
  // Amount of hours passed in day, locally
  // Use this to display the hours close to the actual time on mobile.
  const currentHour = date.getHours();

  return <Box>Calendar implementation goes here.</Box>;
}

export default HourlyScheduler;
