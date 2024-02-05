import { Box } from '@mui/material';
import HourlyScheduler from './hourly';

interface Scheduler {
  view: 'hourly';
}

function Scheduler({ view }: Scheduler) {
  const currentDate = new Date();

  if (view === 'hourly') {
    return <HourlyScheduler date={currentDate} />;
  }
  return <Box>Whoops, need a view...</Box>;
}

export default Scheduler;
