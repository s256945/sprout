import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal = (props: AboutModalProps) => {
  const { open, onClose } = props;
  // close on esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="About Sprout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md text-emerald-50 shadow-[0_30px_120px_-30px_rgba(0,0,0,.7)]"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-bold">About Sprout</h2>
                <button
                  onClick={onClose}
                  className="rounded-full px-3 py-1 bg-white/10 hover:bg-white/15 border border-white/10"
                  aria-label="Close About dialog"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-emerald-100/90">
                <strong>Sprout</strong> is a nature-inspired Pomodoro timer that
                makes focus feel calm and engaging. As you work, a small sprout
                grows through stages - from seedling to flower - so you can see
                progress without thinking about it.
              </p>

              <ul className="mt-4 space-y-2 text-emerald-100/90">
                <li>🎯 Pomodoro focus sessions with short & long breaks</li>
                <li>
                  🌱 Visual growth - the sprout evolves as the session
                  progresses
                </li>
                <li>💧 Break animations - rain (short) and sunlight (long)</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  React
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  Framer Motion
                </span>
              </div>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-xs opacity-75">
                  Made with 🌱 by <strong>Amy Jordan</strong>
                </p>
                <a
                  href="https://github.com/amyjordan/sprout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/10 hover:bg-white/15 transition"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
