// hooks/useInterval.ts
import { useEffect, useRef } from 'react';

interface IntervalCallback {
  (): void | Promise<void>;
}

export function useInterval(callback: IntervalCallback, delay: number | null) {
  const savedCallback = useRef<IntervalCallback>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;
    
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}