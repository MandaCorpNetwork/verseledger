export function capFirstLetter(string: string) {
  if (!string) return 'Non-String';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
