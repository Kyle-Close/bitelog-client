export function getFullDisplayTime(i: number) {
  const displayHour = i < 10 ? `0${i}` : i;
  const displayMinutes = '00';
  const displayFullTime = displayHour + ':' + displayMinutes;
  return displayFullTime;
}
export function buildEatLogList(eatLogDataValues: EatLogDataValue[]) {
  const list: {
    hourMark: number;
    quarterHourMark: number;
    data: EatLogDataValue;
  }[] = [];

  eatLogDataValues.forEach((data) => {
    const dateTime = new Date(data.logTimestamp);
    const hourMark = dateTime.getHours();
    const quarterHourMark = getQuarterHourMark(dateTime);
    list.push({ hourMark, quarterHourMark, data });
  });

  return list;
}
export function buildEventLogList(eventLogDataValues: EventLogDataValue[]) {
  const list: {
    hourMark: number;
    quarterHourMark: number;
    data: EventLogDataValue;
  }[] = [];

  eventLogDataValues.forEach((data) => {
    const dateTime = new Date(data.logTimestamp);
    const hourMark = dateTime.getHours();
    const quarterHourMark = getQuarterHourMark(dateTime);
    list.push({ hourMark, quarterHourMark, data });
  });

  return list;
}
export function getQuarterHourMark(timestamp: Date) {
  const minutes = timestamp.getMinutes();
  const nearestInterval = minutes / 15;
  return Math.round(nearestInterval);
}
export type EventLogDataValue = {
  logTimestamp: string;
  JournalId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  discomfortRating: string;
  notes: string;
};
export type EatLogDataValue = {
  logTimestamp: string;
  JournalId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  notes: string;
};
export function formatISO8601ToReadableDate(iso8601String: string) {
  // Parse the ISO 8601 string to a Date object
  const date = new Date(iso8601String);

  // Format the date components
  const year = date.getFullYear();
  // Month in JavaScript is 0-indexed (0 for January, 1 for February, etc.), so add 1
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Format the time components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Return the formatted string with actual hours and minutes
  return `${year}-${month}-${day} at ${hours}:${minutes}`;
}
