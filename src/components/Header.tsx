import { motion } from "framer-motion";
import type { Mode } from "../hooks/usePomodoro";

const pill = (active: boolean) =>
  `px-4 py-2 rounded-full transition font-semibold ${
    active
      ? "bg-emerald-600 text-white shadow"
      : "bg-white/10 text-emerald-100 hover:bg-white/15 border border-white/10"
  }`;

interface HeaderProps {
  mode: Mode;
  setMode: (m: Mode) => void;
}

const Header = ({ mode, setMode }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {/* 11) tiny sprout icon */}
        <svg width="28" height="28" viewBox="0 0 120 120" aria-hidden>
          <path
            d="M60 110 C62 75, 58 60, 60 40"
            stroke="#34d399"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 60 C40 40, 30 30, 25 25 C45 25, 60 35, 60 55"
            fill="#34d399"
          />
          <path
            d="M60 55 C60 35, 75 25, 95 25 C90 30, 80 40, 60 60"
            fill="#10b981"
          />
        </svg>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Sprout
          </h1>
          <p className="text-xs opacity-80">
            Tiny sprouts today, tall trees tomorrow. 🌱
          </p>
        </div>
      </div>

      <nav className="hidden sm:flex items-center gap-3">
        <button
          className={pill(mode === "focus")}
          onClick={() => setMode("focus")}
        >
          Focus
        </button>

        {/* 11) breathing dot between pills */}
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <button
          className={pill(mode === "short")}
          onClick={() => setMode("short")}
        >
          Short break
        </button>

        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          aria-hidden
        />

        <button
          className={pill(mode === "long")}
          onClick={() => setMode("long")}
        >
          Long break
        </button>
      </nav>
    </header>
  );
};

export default Header;
