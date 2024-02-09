import { Box, Typography } from '@mui/material';
import TimeColumn from './TimeColumn';
import EventColumn from './EventColumn';

interface HourRow {
  key: number;
  isCurrentHour: boolean;
  displayFullTime: string;
}

function HourRow({ key, isCurrentHour, displayFullTime }: HourRow) {
  return (
    <Box
      key={key}
      sx={{
        display: 'flex',
        flexGrow: 1,
        minHeight: '7.8rem',
        backgroundColor: '#707070',
        pl: '1rem',
      }}
    >
      <TimeColumn
        isCurrentHour={isCurrentHour}
        displayFullTime={displayFullTime}
      />
      <EventColumn />
    </Box>
  );
}

export default HourRow;
