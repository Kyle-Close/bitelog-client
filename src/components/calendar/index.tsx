import { Box } from '@mui/material';
import HourlyScheduler from './hourly';

interface Scheduler {
  view: 'hourly';
}

function Scheduler({ view }: Scheduler) {
  if (view === 'hourly') {
    return <HourlyScheduler />;
  }
  return <Box>Whoops, need a view...</Box>;
}

export default Scheduler;
