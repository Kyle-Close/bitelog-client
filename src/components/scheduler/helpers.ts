import { EventLogDataValue } from './helpers';
import { EatLogDataValue } from './helpers';
import { getQuarterHourMark } from './helpers';

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
  dicomfortRating: string;
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
