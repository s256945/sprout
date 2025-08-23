import { motion, AnimatePresence } from "framer-motion";
import type { Mode } from "../hooks/usePomodoro";

interface SproutPanelProps {
  mode: Mode;
  growthLevel: number;
}

const SproutPanel = (props: SproutPanelProps) => {
  const { mode, growthLevel } = props;

  return (
    <section className="relative flex flex-col items-center justify-center">
      {/* Short break waters sprout */}
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
        {/* Long break sun rays sprout */}
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

      {/* Sprout */}
      <motion.div
        animate={{ rotate: mode === "focus" ? [-1, 1, -1] : [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <SproutSVG level={growthLevel} />
      </motion.div>
    </section>
  );
};

export default SproutPanel;

/* ---------- Sprout SVG (levels 1..5) ---------- */
export const SproutSVG = ({ level = 1 }: { level?: number }) => {
  return (
    <svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Growing sprout"
    >
      {/* stem */}
      <path
        d="M60 110 C62 75, 58 60, 60 40"
        stroke="#059669"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      {/* base leaves */}
      <path
        d="M60 60 C40 40, 30 30, 25 25 C45 25, 60 35, 60 55"
        fill="#34d399"
      />
      <path
        d="M60 55 C60 35, 75 25, 95 25 C90 30, 80 40, 60 60"
        fill="#10b981"
      />

      {/* extra growth by level */}
      {level >= 2 && (
        <path
          d="M58 45 C50 35, 45 30, 42 28 C50 28, 58 32, 58 45"
          fill="#86efac"
        />
      )}
      {level >= 3 && (
        <path
          d="M62 45 C70 35, 75 30, 78 28 C70 28, 62 32, 62 45"
          fill="#22c55e"
        />
      )}
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
};

/* ---------- Rain (short break) ---------- */
const DropletAnimation = () => (
  <div className="flex gap-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-3 h-5 bg-sky-400 rounded-full"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 20, opacity: [0, 1, 0] }}
        transition={{
          delay: i * 0.25,
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ---------- Sun rays (long break) ---------- */
const SunRaysAnimation = () => (
  <motion.div
    className="relative w-24 h-24"
    animate={{ rotate: [0, 360] }}
    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
  >
    <motion.div
      className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-amber-300"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
    />
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 w-1 h-9 -translate-x-1/2 -translate-y-[calc(100%+6px)] origin-bottom rounded-full bg-amber-300/60"
        style={{
          transform: `rotate(${(i * 360) / 8}deg) translate(-50%, -100%)`,
        }}
      />
    ))}
  </motion.div>
);
