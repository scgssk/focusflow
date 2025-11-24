import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "focusflow_timer_state";

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startRef = useRef(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw);
      const { isRunning: savedRunning, elapsedSeconds: savedElapsed, lastStart } =
        saved || {};

      const now = Date.now();

      if (savedRunning && lastStart) {
        // User was in a running session before reload
        const diff = Math.floor((now - lastStart) / 1000);
        const total = Math.max(0, (savedElapsed || 0) + diff);
        setElapsedSeconds(total);
        setIsRunning(true);
        startRef.current = now - total * 1000;
      } else {
        setElapsedSeconds(savedElapsed || 0);
        setIsRunning(false);
        startRef.current = null;
      }
    } catch (err) {
      console.error("Failed to load timer state:", err);
    }
  }, []);

  // Timer ticking logic
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      if (!startRef.current) {
        startRef.current = Date.now() - elapsedSeconds * 1000;
      }

      intervalId = setInterval(() => {
        const diff = Math.floor((Date.now() - startRef.current) / 1000);
        setElapsedSeconds(diff);
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  // Persist to localStorage whenever these change
  useEffect(() => {
    try {
      const payload = {
        isRunning,
        elapsedSeconds,
        lastStart: isRunning && startRef.current ? startRef.current : null,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to persist timer state:", err);
    }
  }, [isRunning, elapsedSeconds]);

  const start = () => {
    if (!isRunning) {
      startRef.current = Date.now() - elapsedSeconds * 1000;
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (!isRunning) return;
    // Freeze elapsed at current value
    const currentElapsed = Math.floor((Date.now() - startRef.current) / 1000);
    setElapsedSeconds(currentElapsed);
    setIsRunning(false);
    startRef.current = null;
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    startRef.current = null;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear timer state:", err);
    }
  };

  return {
    isRunning,
    elapsedSeconds,
    start,
    pause,
    reset,
  };
}
