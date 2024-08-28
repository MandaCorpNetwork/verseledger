import { useCallback, useRef } from 'react';

type DebounceFunction<Args extends unknown[]> = (...args: Args) => void;

/**
 * Custom hook to debounce a callback function.
 * @param callback - The function to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the callback function that will only invoke the callback after the specified delay.
 *
 * @template Args - A tuple of argument types for the callback function.
 */
function useDebounce<Args extends unknown[]>(
  callback: DebounceFunction<Args>,
  delay: number,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}

export default useDebounce;
