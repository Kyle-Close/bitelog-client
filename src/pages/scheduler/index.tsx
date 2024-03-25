import { Box, Container, Typography } from '@mui/material';
import HourlyScheduler from './hourly';
import { useState } from 'react';

interface Scheduler {
  view: 'hourly';
}

function Scheduler({ view }: Scheduler) {
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);

  if (view === 'hourly') {
    return (
      <Container sx={{ my: '2rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Typography
            variant='h4'
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '1.6rem',
                md: '1.75rem',
                lg: '2rem',
              },
            }}
          >
            Log Book
          </Typography>
          <HourlyScheduler date={date} setDate={setDate} />
        </Box>
      </Container>
    );
  }
  return <Box>Whoops, need a view...</Box>;
}

export default Scheduler;
