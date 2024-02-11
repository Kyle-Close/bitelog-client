import { Box, Typography } from '@mui/material';
import HourRow from './HourRow';
import useGetAllJournalEvents from '../../../hooks/useGetAllJournalEvents';
import { useContext } from 'react';
import { UserContext } from '../../../contexts';

interface HoursContainerList {
  date: Date;
}

function HourContainerList({ date }: HoursContainerList) {
  const { user } = useContext(UserContext);
  const [eatLogQuery, eventQuery] = useGetAllJournalEvents(user);

  if (!eatLogQuery || !eventQuery || eatLogQuery.isLoading)
    return <Typography>Loading...</Typography>;

  if (eatLogQuery.error) {
    return <Typography>Error fetching eat log data</Typography>;
  }

  // Amount of hours passed in day, locally
  const currentHour = date.getHours();

  const List = () => {
    // The individual containers for each hour. There will be 24.
    const containerList: React.ReactNode[] = [];
    for (let i = 0; i < 24; i++) {
      const displayFullTime = getFullDisplayTime(i);
      const isCurrentHour = currentHour === i;
      const isScrollAnchor = currentHour - 3 === i;

      //TODO: pass any event data to here. for each hour
      // ex: {eatData: [...], eventData: [...]}
      containerList.push(
        <HourRow
          key={i}
          isCurrentHour={isCurrentHour}
          displayFullTime={displayFullTime}
          isScrollAnchor={isScrollAnchor}
        />
      );
    }
    return containerList;
  };
  return <>{List()}</>;
}

export default HourContainerList;
function getFullDisplayTime(i: number) {
  const displayHour = i < 10 ? `0${i}` : i;
  const displayMinutes = '00';
  const displayFullTime = displayHour + ':' + displayMinutes;
  return displayFullTime;
}
