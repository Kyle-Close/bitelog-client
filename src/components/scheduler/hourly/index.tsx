import { Box } from '@mui/material';
import HourContainerList from './HourContainerList';

interface HourlyScheduler {
  date: Date; // Current day the hourly scheduler is looking at.
}

function HourlyScheduler({ date }: HourlyScheduler) {
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
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          minHeight: '5rem',
          backgroundColor: '#606060',
          px: '1rem',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          borderBottom: '0.15rem solid #121212',
        }}
      ></Box>
      <Box>
        <HourContainerList date={date} />
      </Box>
    </Box>
  );
}

export default HourlyScheduler;
