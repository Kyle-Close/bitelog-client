import { Typography } from '@mui/material';
import HourRow from './HourRow';
import useGetAllJournalEvents from '../../../hooks/useGetAllJournalEvents';
import { useContext } from 'react';
import { UserContext } from '../../../contexts';
import { getFullDisplayTime } from '../helpers';
import { buildEatLogList } from '../helpers';
import { buildEventLogList } from '../helpers';
import { EventLogDataValue } from '../helpers';

interface HoursContainerList {
  date: Date;
}

export type EatLogDataValue = {
  logTimestamp: string;
  JournalId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  notes: string;
};

function HourContainerList({ date }: HoursContainerList) {
  const { user } = useContext(UserContext);
  const fromDate = date;
  const toDate = new Date(date.getTime() + 86400000);
  const [eatLogQuery, eventQuery] = useGetAllJournalEvents(fromDate, toDate, user);

  if (
    !eatLogQuery ||
    !eventQuery ||
    eatLogQuery.isLoading ||
    eventQuery.isLoading ||
    eatLogQuery.isPending ||
    eventQuery.isPending
  )
    return <Typography>Loading...</Typography>;

  if (eatLogQuery.error || eventQuery.error) {
    return <Typography>Error fetching data</Typography>;
  }

  const eatLogDataValues: EatLogDataValue[] = eatLogQuery.data.eatLogDataValues;
  const eventLogDataValues: EventLogDataValue[] = eventQuery.data.reportLogs;

  const eatLogList = buildEatLogList(eatLogDataValues);
  const eventLogList = buildEventLogList(eventLogDataValues);

  // Amount of hours passed in day, locally
  const currentHour = date.getHours();

  const List = () => {
    // The individual containers for each hour. There will be 24.
    const containerList: React.ReactNode[] = [];
    for (let i = 0; i < 24; i++) {
      const displayFullTime = getFullDisplayTime(i);
      const isCurrentHour = currentHour === i;
      const isScrollAnchor = currentHour - 3 === i;
      const eatLogs = eatLogList.filter((log) => log.hourMark === i);
      const eventLogs = eventLogList.filter((log) => log.hourMark === i);

      containerList.push(
        <HourRow
          key={i}
          isCurrentHour={isCurrentHour}
          displayFullTime={displayFullTime}
          isScrollAnchor={isScrollAnchor}
          eatLogs={eatLogs}
          eventLogs={eventLogs}
        />
      );
    }
    return containerList;
  };
  return <>{List()}</>;
}

export default HourContainerList;
