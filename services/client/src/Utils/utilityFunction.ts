import type dayjs from 'dayjs';

export function addDates(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
  return date1.add(date2.valueOf(), 'ms');
}
