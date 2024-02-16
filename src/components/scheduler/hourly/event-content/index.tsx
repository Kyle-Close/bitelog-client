import { Box } from '@mui/material';
import EventEntry from './EventEntry';
import { EatLogDataValue, EventLogDataValue } from '../../helpers';

interface EventContentProps {
  eatLogs: {
    hourMark: number;
    quarterHourMark: number;
    data: EatLogDataValue;
  }[];
  eventLogs: {
    hourMark: number;
    quarterHourMark: number;
    data: EventLogDataValue;
  }[];
}

interface LogEntry {
  hourMark: number;
  quarterHourMark: number;
  data: EatLogDataValue | EventLogDataValue;
  type: 'eat' | 'event';
}

function EventContent({ eatLogs, eventLogs }: EventContentProps) {
  const allLogs: LogEntry[] = [
    ...eatLogs.map((log) => ({ ...log, type: 'eat' as 'eat' })),
    ...eventLogs.map((log) => ({ ...log, type: 'event' as 'event' })),
  ];

  const groupedByQuarterHourMark = allLogs.reduce<Record<string, LogEntry[]>>(
    (accumulator, item) => {
      const key = item.quarterHourMark.toString();
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(item);
      return accumulator;
    },
    {}
  );

  // Step 2: Build event entries from the grouped logs
  const buildEventEntries = () => {
    return Object.entries(groupedByQuarterHourMark).map(
      ([quarterHourMark, logs]) => {
        const gridRow = parseInt(quarterHourMark, 10) + 1;
        return (
          <Box
            key={quarterHourMark}
            sx={{
              display: 'flex',
              flexGrow: 1,
              gridRow: `${gridRow} / span 1`,
              gap: '0.25rem',
            }}
          >
            {logs.map((log, index) => (
              <EventEntry
                key={index}
                title={log.type === 'eat' ? 'Eat' : 'Event'}
                type={log.type}
                data={log.data}
              />
            ))}
          </Box>
        );
      }
    );
  };

  return (
    <Box
      sx={{
        p: '0.2rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '0.2rem',
        flexGrow: 1,
      }}
    >
      {buildEventEntries()}
    </Box>
  );
}

export default EventContent;
