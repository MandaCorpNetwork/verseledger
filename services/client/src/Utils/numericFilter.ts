import { enqueueSnackbar } from 'notistack';

export function numericalFilter(value: string) {
  const filteredValue = value.replace(/[^0-9]/g, ''); // Allow only digits
  const isOnlyCommaFiltered = value.replace(/,/g, '') === filteredValue;
  if (!isOnlyCommaFiltered) {
    enqueueSnackbar('Please only use Numbers', { variant: 'error' });
  }
  return filteredValue ? Number(filteredValue) : null; // Return filtered value
}
