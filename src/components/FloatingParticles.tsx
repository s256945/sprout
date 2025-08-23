import { motion } from "framer-motion";

type Particle = {
  x: string;
  y: string;
  size: number;
  delay: number;
  dur: number;
  blur: number;
  tint: string; // rgba string
  opacity: number;
};

const make = (count: number, min: number, max: number, blur: number, durBase: number, tint: string) =>
  Array.from({ length: count }).map<Particle>(() => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: min + Math.round(Math.random() * (max - min)),
    delay: Math.random() * 6,
    dur: durBase + Math.random() * durBase,
    blur,
    tint,
    opacity: 0.12 + Math.random() * 0.25,
  }));

// 6) three layers: large/blurred (slow), medium, small/sharp (faster)
const LAYER_A = make(10, 8, 14, 6, 18, "rgba(203, 255, 203, .35)"); // big, mint
const LAYER_B = make(14, 5, 9, 3, 14, "rgba(200, 240, 255, .35)");   // mid, cool
const LAYER_C = make(16, 3, 6, 1, 10, "rgba(255, 235, 180, .35)");   // small, warm
const PARTICLES = [...LAYER_A, ...LAYER_B, ...LAYER_C];

const FloatingParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            backgroundColor: p.tint,
          }}
          className="absolute rounded-full"
          initial={{ y: 0, x: 0, scale: 0.9 }}
          animate={{ y: [-40, 40, -40], x: [12, -12, 12], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
