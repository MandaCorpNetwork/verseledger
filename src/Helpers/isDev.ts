export const isDev = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).location.host === 'localhost:3000';
};
