import { useRef } from "react";
export const useDebounce = () => {
  const timeoutRef = useRef(null);

  const debouncedFn = (fn, delay = 500) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
  };

  return debouncedFn;
};
