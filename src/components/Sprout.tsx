import { motion, AnimatePresence } from "framer-motion";
import type { Mode } from "../hooks/usePomodoro";

type SproutPanelProps = {
  mode: Mode;
  growthLevel: number;
  completed?: boolean;
};

const SproutPanel = (props: SproutPanelProps) => {
  const { mode, growthLevel, completed } = props;

  return (
    <section className="relative flex flex-col items-center justify-center">
      {/* Nourishment above sprout */}
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

      {/* Sprout with idle sway */}
      <motion.div
        animate={{ rotate: mode === "focus" ? [-1.5, 1.5, -1.5] : [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <SproutSVG level={growthLevel} completed={completed} />
      </motion.div>
    </section>
  );
};

export default SproutPanel;

/* ---------- Sprout SVG (levels 1..5) ---------- */
export const SproutSVG = ({
  level = 1,
  completed = false,
}: {
  level?: number;
  completed?: boolean;
}) => {
  // bloom anchor
  const cx = 60;
  const cy = 20;

  return (
    <svg
      width={120}
      height={120}
      viewBox="-8 -8 136 136"
      role="img"
      aria-label="Growing sprout"
    >
      <defs>
        <linearGradient id="leafHi" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="flowerCore" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#facc15" />
        </radialGradient>
      </defs>

      {/* stem */}
      <path
        d="M60 110 C62 80, 58 65, 60 40"
        stroke="#059669"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />

      {/* leaves */}
      <path
        d="M60 60 C40 40, 30 30, 25 25 C45 25, 60 35, 60 55"
        fill="#34d399"
      />
      <path
        d="M60 55 C60 35, 75 25, 95 25 C90 30, 80 40, 60 60"
        fill="#10b981"
      />
      <path
        d="M52 45 C45 40, 40 36, 37 34 C46 35, 52 38, 55 45"
        fill="url(#leafHi)"
      />
      <path
        d="M70 45 C77 40, 82 36, 85 34 C77 35, 72 38, 69 45"
        fill="url(#leafHi)"
      />

      {/* extra growth */}
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
      {level >= 4 && <circle cx={cx} cy={cy + 10} r="4.5" fill="#facc15" />}

      {/* level 5: petals (staggered) + core (on top) */}
      {level >= 5 && (
        <motion.g
          initial={{ scale: 0.72, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = i * 45;
            return (
              <g
                key={i}
                transform={`rotate(${angle} ${cx} ${cy}) translate(0 -12)`}
              >
                <motion.ellipse
                  cx={cx}
                  cy={cy}
                  rx={8}
                  ry={11}
                  fill="#fde68a"
                  stroke="#facc15"
                  strokeWidth="1"
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.28,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </g>
            );
          })}
          <motion.circle
            cx={cx}
            cy={cy}
            r={9}
            fill="url(#flowerCore)"
            stroke="#b45309"
            strokeWidth="2"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.08 * 8 + 0.08,
              duration: 0.25,
              ease: "easeOut",
            }}
          />
        </motion.g>
      )}

      {/* completion pulse */}
      {completed && (
        <motion.circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="rgba(250, 204, 21, .45)"
          strokeWidth="2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8 }}
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
