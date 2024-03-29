import { Box } from '@mui/material';
import TimeColumn from './TimeColumn';
import EventContent from './event-content';
import { useRef } from 'react';
import useScrollIntoView from '../../../hooks/useScrollIntoView';
import { EatLogDataValue, EventLogDataValue } from '../helpers';

interface HourRow {
  isCurrentHour: boolean;
  displayFullTime: string;
  isScrollAnchor: boolean;
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

function HourRow({
  isCurrentHour,
  isScrollAnchor,
  displayFullTime,
  eatLogs,
  eventLogs,
}: HourRow) {
  const currentHourRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(currentHourRef, { behavior: 'smooth' });

  return (
    <Box
      ref={isScrollAnchor ? currentHourRef : null}
      sx={{
        display: 'flex',
        flexGrow: 1,
        minHeight: { xs: '5rem', sm: '5.5rem', md: '6.5rem', lg: '7.8rem' },
        pl: '1rem',
        bgcolor: 'background.paper',
      }}
    >
      <TimeColumn
        isCurrentHour={isCurrentHour}
        displayFullTime={displayFullTime}
      />
      <EventContent eatLogs={eatLogs} eventLogs={eventLogs} />
    </Box>
  );
}

export default HourRow;
