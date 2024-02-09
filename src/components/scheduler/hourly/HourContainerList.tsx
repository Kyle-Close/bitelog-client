import { Box, Typography } from '@mui/material';
import HourRow from './HourRow';

interface HoursContainerList {
  date: Date;
}

function HourContainerList({ date }: HoursContainerList) {
  // Amount of hours passed in day, locally
  const currentHour = date.getHours();

  const List = () => {
    // The individual containers for each hour. There will be 24.
    const containerList: React.ReactNode[] = [];
    for (let i = 0; i < 24; i++) {
      const displayHour = i < 10 ? `0${i}` : i;
      const displayMinutes = '00';
      const displayFullTime = displayHour + ':' + displayMinutes;

      const isCurrentHour = currentHour === i;
      const isScrollAnchor = currentHour - 3 === i;
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
