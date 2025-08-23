import React from "react";
import type { Mode } from "../hooks/usePomodoro";

const pad = (n: number) => String(n).padStart(2, "0");
const format = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

const modeColors: Record<Mode, { ring: string; startBtn: string }> = {
  focus: {
    ring: "stroke-emerald-500",
    startBtn: "bg-emerald-500 hover:bg-emerald-600 text-emerald-50",
  },
  short: {
    ring: "stroke-sky-500",
    startBtn: "bg-sky-500 hover:bg-sky-600 text-sky-50",
  },
  long: {
    ring: "stroke-amber-500",
    startBtn: "bg-amber-500 hover:bg-amber-600 text-amber-50",
  },
};

interface TimerProps {
  mode: Mode;
  secondsLeft: number;
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  progress: number; // 0..1
}

const Timer = (props: TimerProps) => {
  const { mode, secondsLeft, running, start, pause, reset, progress } = props;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * Math.min(Math.max(progress, 0), 1);
  const color = modeColors[mode];

  return (
    // Styling for timer buttons
    <section className="flex flex-col items-center justify-center relative">
      <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r={radius}
            className="fill-none stroke-white/10"
            strokeWidth="18"
          />
          <circle
            cx="150"
            cy="150"
            r={radius}
            className={`fill-none ${color.ring}`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
            {format(secondsLeft)}
          </div>
          <div className="mt-1 text-sm uppercase tracking-widest opacity-80">
            {mode === "focus"
              ? "Focus"
              : mode === "short"
              ? "Short break"
              : "Long break"}
          </div>
          <div className="mt-6 flex gap-2">
            {!running ? (
              <button
                onClick={start}
                className={`px-5 py-2 rounded-full shadow hover:shadow-lg active:scale-[.98] transition ${color.startBtn}`}
              >
                Start
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-5 py-2 rounded-full shadow hover:shadow-lg active:scale-[.98] transition
                  bg-amber-500 text-amber-50 hover:bg-amber-600"
              >
                Pause
              </button>
            )}
            <button
              onClick={reset}
              className="px-5 py-2 rounded-full shadow hover:shadow-lg active:scale-[.98] transition
                bg-white/10 text-emerald-50 border border-white/15 hover:bg-white/15"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timer;
