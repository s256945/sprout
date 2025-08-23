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
  onAbout: () => void;
}

const Header = (props: HeaderProps) => {
  const { mode, setMode, onAbout } = props;

  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
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

      <div className="hidden sm:flex items-center gap-3">
        <button
          className={pill(mode === "focus")}
          onClick={() => setMode("focus")}
        >
          Focus
        </button>

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

        {/* Info icon button */}
        <button
          onClick={onAbout}
          className="ml-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
          aria-label="About Sprout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-emerald-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
