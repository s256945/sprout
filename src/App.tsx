import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -------- helpers
const pad = (n: number) => String(n).padStart(2, "0");
const format = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

type Mode = "focus" | "short" | "long";

export default function App() {
  // ----- state
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
          // auto-switch focus <-> break
          setMode(mode === "focus" ? "short" : "focus");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, mode, total]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(total);
  };

  // ----- ring geometry
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - secondsLeft / total; // 0..1
  const dash = circumference * Math.min(Math.max(progress, 0), 1);

  // ----- dynamic colors
  const modeColor =
    mode === "focus" ? "emerald" : mode === "short" ? "sky" : "amber";

  // sprout growth level (1..5) -> seedling to flower
  const growthLevel = Math.min(1 + Math.floor(progress * 5), 5);

  // ----- UI helpers
  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full transition font-semibold ${
      active
        ? "bg-emerald-600 text-white shadow"
        : "bg-white/10 text-emerald-100 hover:bg-white/15 border border-white/10"
    }`;

  const cardClass =
    "rounded-3xl bg-white/5 backdrop-blur-md border border-emerald-400/15 shadow-[0_10px_50px_-20px_rgba(0,0,0,.5)]";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-emerald-50">
      {/* Radial light layers */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_30%_0%,rgba(16,185,129,.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_80%_40%,rgba(245,158,11,.08),transparent_60%)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Sprout
            </h1>
            <p className="text-sm opacity-80">Focus, bloom, repeat 🌱</p>
          </div>
          <nav className="hidden sm:flex gap-2">
            <button className={pill(mode === "focus")} onClick={() => setMode("focus")}>
              Focus
            </button>
            <button className={pill(mode === "short")} onClick={() => setMode("short")}>
              Short break
            </button>
            <button className={pill(mode === "long")} onClick={() => setMode("long")}>
              Long break
            </button>
          </nav>
        </header>

        {/* Main card */}
        <main className={`${cardClass} p-6 md:p-10 grid md:grid-cols-2 gap-10 items-center`}>
          {/* Timer */}
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
                  className={`fill-none stroke-${modeColor}-500`}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - dash}
                />
              </svg>

              {/* Timer text */}
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
                      className={`px-5 py-2 rounded-full shadow hover:shadow-lg active:scale-[.98] transition
                      bg-${modeColor}-500 text-${modeColor}-50 hover:bg-${modeColor}-600`}
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

          {/* Sprout + nourishment animations */}
          <section className="relative flex flex-col items-center justify-center">
            {/* Nourishment ABOVE the sprout */}
            <AnimatePresence>
              {mode === "short" && (
                <motion.div
                  key="rain"
                  className="absolute -top-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DropletAnimation />
                </motion.div>
              )}
              {mode === "long" && (
                <motion.div
                  key="sun"
                  className="absolute -top-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SunRaysAnimation />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sprout itself */}
            <motion.div
              animate={{ rotate: mode === "focus" ? [-1, 1, -1] : [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              <SproutSVG level={growthLevel} />
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- Sprout SVG (levels 1..5) ---------- */
function SproutSVG({ level = 1 }: { level?: number }) {
  return (
    <svg width={120} height={120} viewBox="0 0 120 120" role="img" aria-label="Growing sprout">
      {/* stem */}
      <path
        d="M60 110 C62 75, 58 60, 60 40"
        stroke="#059669"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      {/* base leaves */}
      <path d="M60 60 C40 40, 30 30, 25 25 C45 25, 60 35, 60 55" fill="#34d399" />
      <path d="M60 55 C60 35, 75 25, 95 25 C90 30, 80 40, 60 60" fill="#10b981" />

      {/* extra growth by level */}
      {level >= 2 && <path d="M58 45 C50 35, 45 30, 42 28 C50 28, 58 32, 58 45" fill="#86efac" />}
      {level >= 3 && <path d="M62 45 C70 35, 75 30, 78 28 C70 28, 62 32, 62 45" fill="#22c55e" />}
      {level >= 4 && <circle cx="60" cy="30" r="5" fill="#facc15" />}
      {level >= 5 && (
        <motion.circle
          cx="60"
          cy="25"
          r="10"
          fill="#fde68a"
          stroke="#f59e0b"
          strokeWidth="2"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </svg>
  );
}

/* ---------- Rain (short break) ---------- */
function DropletAnimation() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-5 bg-sky-400 rounded-full"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 20, opacity: [0, 1, 0] }}
          transition={{ delay: i * 0.25, repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Sun rays (long break) ---------- */
function SunRaysAnimation() {
  // simple set of rotating rays with a soft pulse
  return (
    <motion.div
      className="relative w-24 h-24"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
    >
      {/* center sun */}
      <motion.div
        className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-amber-300"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      />
      {/* rays */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 w-1 h-9 -translate-x-1/2 -translate-y-[calc(100%+6px)] origin-bottom rounded-full bg-amber-300/60"
          style={{ transform: `rotate(${(i * 360) / 8}deg) translate(-50%, -100%)` }}
        />
      ))}
    </motion.div>
  );
}
