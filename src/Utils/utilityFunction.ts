export function addDates(date1: Date, date2: Date) {
  const date1Num = date1.getTime();
  const date2Num = date2.getTime();

  const combined = date1Num + date2Num;

  return new Date(combined);
}
