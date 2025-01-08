import { enqueueSnackbar } from 'notistack';

export function numericFieldInput(value: string) {
  const filteredValue = value.replace(/[^0-9]/g, ''); // Allow only digits
  const isOnlyCommaFiltered = value.replace(/,/g, '') === filteredValue;
  if (!isOnlyCommaFiltered) {
    enqueueSnackbar('Please only use Numbers', { variant: 'error' });
  }
  return filteredValue ? Number(filteredValue) : null; // Return filtered value
}

export function rawNumericFilter(input: string) {
  return input.replace(/\D+/g, '');
}

export function rawStringToNumberToString(input: string) {
  return rawNumericFilter(input).toString();
}
