import { Box, Typography } from '@mui/material';
import TimeColumn from './TimeColumn';
import EventContent from './event-content';
import { useContext, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../../contexts';
import {
  fetchDataFromBackend,
  makeRequestToBackend,
} from '../../../helpers/utility';
import { BASE_URL } from '../../../config/axiosConfig';
import useScrollIntoView from '../../../hooks/useScrollIntoView';
import useGetAllJournalEvents from '../../../hooks/useGetAllJournalEvents';

interface HourRow {
  isCurrentHour: boolean;
  displayFullTime: string;
  isScrollAnchor: boolean;
}

function HourRow({ isCurrentHour, isScrollAnchor, displayFullTime }: HourRow) {
  const currentHourRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(currentHourRef, { behavior: 'smooth' });

  return (
    <Box
      ref={isScrollAnchor ? currentHourRef : null}
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
