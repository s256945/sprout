import { useEffect, useMemo, useState } from "react";

export type Mode = "focus" | "short" | "long";

export function usePomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [running, setRunning] = useState(false);

  const total = useMemo(() => {
    if (mode === "focus") return 25 * 60;
    if (mode === "short") return 5 * 60;
    return 15 * 60;
  }, [mode]);

  const [secondsLeft, setSecondsLeft] = useState(total);

  useEffect(() => setSecondsLeft(total), [total, mode]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setRunning(false);
          setMode((m) => (m === "focus" ? "short" : "focus"));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(total);
  };

  const progress = 1 - secondsLeft / total;

  return { mode, setMode, running, start, pause, reset, secondsLeft, total, progress };
}
