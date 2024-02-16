import { Box, Typography } from '@mui/material';
import { EventLogDataValue } from '../../../helpers';
import { formatISO8601ToReadableDate } from '../../../helpers';
import DiscomfortRating from './DiscomfortRating';

interface Event {
  data: EventLogDataValue;
}

function Event({ data }: Event) {
  const eventTimeText = formatISO8601ToReadableDate(data.logTimestamp);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <Typography fontWeight='600' fontSize='large'>
        <Box component='span'>{'Event Time: '}</Box>
        {eventTimeText}
      </Typography>
      <Typography
        fontSize='large'
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <Box fontWeight='600' component='span'>
          Discomfort Rating:
        </Box>
        {<DiscomfortRating rating={data.discomfortRating} />}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: '1rem',
          py: '0.5rem',
          px: '1rem',
          backgroundColor: '#434343',
        }}
      >
        <Typography fontWeight='600'>Notes:</Typography>
        <Typography>{data.notes}</Typography>
      </Box>
    </Box>
  );
}

export default Event;
