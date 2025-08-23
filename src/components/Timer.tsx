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

const Timer = ({
  mode,
  secondsLeft,
  running,
  start,
  pause,
  reset,
  progress,
}: TimerProps) => {
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * Math.min(Math.max(progress, 0), 1);
  const color = modeColors[mode];

  return (
    <section className="flex flex-col items-center justify-center relative">
      <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
          {/* base */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className="fill-none stroke-white/10"
            strokeWidth="18"
          />

          {/* 2) tick marks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="150"
              y1="18"
              x2="150"
              y2="30"
              stroke="rgba(255,255,255,.12)"
              strokeWidth="2"
              transform={`rotate(${i * 30} 150 150)`}
            />
          ))}

          {/* progress ring with glow */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className={`fill-none ${color.ring} drop-shadow-[0_0_12px_rgba(16,185,129,.45)]`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
          />
        </svg>

        {/* Center text + controls */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
            {format(secondsLeft)}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.25em] opacity-80">
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
                className={`px-5 py-2 rounded-full font-semibold
                ${color.startBtn}
                shadow-[0_8px_20px_-6px_rgba(16,185,129,.45)]
                active:shadow-[0_4px_10px_-6px_rgba(16,185,129,.45)]
                active:translate-y-[1px] transition`}
              >
                Start
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-5 py-2 rounded-full font-semibold
                bg-amber-500 text-amber-50 hover:bg-amber-600
                shadow-[0_8px_20px_-6px_rgba(245,158,11,.45)]
                active:shadow-[0_4px_10px_-6px_rgba(245,158,11,.45)]
                active:translate-y-[1px] transition"
              >
                Pause
              </button>
            )}
            <button
              onClick={reset}
              className="px-5 py-2 rounded-full font-semibold
              bg-white/10 text-emerald-50 border border-white/15 hover:bg-white/15
              shadow-[0_6px_14px_-6px_rgba(0,0,0,.4)]
              active:translate-y-[1px] transition"
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
