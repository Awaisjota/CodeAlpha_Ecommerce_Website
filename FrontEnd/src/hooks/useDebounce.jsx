import { useEffect } from "react";

const useDebounce = (value, delay, callback) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
};

export default useDebounce;