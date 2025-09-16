import { useEffect, useState } from "react";

/**
 * A hook that debounces a value given a delay.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} delay - The number of milliseconds to debounce the value.
 * @returns {T} The debounced value.
 */
export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
