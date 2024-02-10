import { Box } from '@mui/material';
import HourlyScheduler from './hourly';
import { useState } from 'react';

interface Scheduler {
  view: 'hourly';
}

function Scheduler({ view }: Scheduler) {
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);

  if (view === 'hourly') {
    return <HourlyScheduler date={date} setDate={setDate} />;
  }
  return <Box>Whoops, need a view...</Box>;
}

export default Scheduler;
