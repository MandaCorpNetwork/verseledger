import { useEffect, useState } from 'react';

export const useAnimatedLoadingText = (
  baseText = 'Loading',
  cycle = ['.', '. .', '. . .'],
  interval = 300,
) => {
  const [text, setText] = useState(baseText);

  useEffect(() => {
    let index = 0;
    const handle = setInterval(() => {
      setText(`${baseText} ${cycle[index % cycle.length]}`);
      index++;
    }, interval);

    return () => clearInterval(handle);
  }, [baseText, cycle, interval]);

  return text;
};
