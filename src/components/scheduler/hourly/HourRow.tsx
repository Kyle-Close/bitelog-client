import { Box } from '@mui/material';
import TimeColumn from './TimeColumn';
import EventContent from './event-content';
import { useEffect, useRef } from 'react';

interface HourRow {
  key: number;
  isCurrentHour: boolean;
  displayFullTime: string;
  isScrollAnchor: boolean;
}

function HourRow({
  key,
  isCurrentHour,
  isScrollAnchor,
  displayFullTime,
}: HourRow) {
  const currentHourRef = useRef<HTMLDivElement>(null);

  // Scroll to the current hour in the day on load.
  useEffect(() => {
    if (currentHourRef.current)
      currentHourRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box
      ref={isScrollAnchor ? currentHourRef : null}
      key={key}
      sx={{
        display: 'flex',
        flexGrow: 1,
        minHeight: '7.8rem',
        backgroundColor: '#505050',
        pl: '1rem',
      }}
    >
      <TimeColumn
        isCurrentHour={isCurrentHour}
        displayFullTime={displayFullTime}
      />
      <EventContent />
    </Box>
  );
}

export default HourRow;
