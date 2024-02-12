import { Box } from '@mui/material';
import EventEntry from './EventEntry';
import { EatLogDataValue, EventLogDataValue } from '../../helpers';

interface EventContent {
  eatLogs: {
    hourMark: number;
    quarterHourMark: number;
    data: EatLogDataValue;
  }[];
  eventLogs: {
    hourMark: number;
    quarterHourMark: number;
    data: EventLogDataValue;
  }[];
}

function EventContent({ eatLogs, eventLogs }: EventContent) {
  const buildEventEntries = () => {
    return eatLogs.map((log) => (
      <Box sx={{ display: 'flex', flexGrow: 1, gap: '0.3rem' }}>
        <EventEntry title='Eat Entry' type='eat' />
      </Box>
    ));
  };

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
      {eatLogs.length > 0 && buildEventEntries()}
    </Box>
  );
}

export default EventContent;
