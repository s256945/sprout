import { motion } from "framer-motion";

type Particle = { x: string; y: string; size: number; delay: number; dur: number; opacity: number };

const PARTICLES: Particle[] = Array.from({ length: 18 }).map(() => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 4 + Math.round(Math.random() * 8),
  delay: Math.random() * 6,
  dur: 12 + Math.random() * 12,
  opacity: 0.15 + Math.random() * 0.25,
}));

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
          }}
          className="absolute rounded-full bg-emerald-200"
          initial={{ y: 0, x: 0, scale: 0.8 }}
          animate={{ y: [-30, 30, -30], x: [10, -10, 10], scale: [0.8, 1, 0.8] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
