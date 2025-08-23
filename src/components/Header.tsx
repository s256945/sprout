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

const Header = (props: HeaderProps) => {
  const { mode, setMode } = props;

  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Sprout</h1>
        <p className="text-sm opacity-80">Tiny sprouts today, tall trees tomorrow. 🌱</p>
      </div>
      {/* Different modes for the Pomodoro timer */}
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
  );
};

export default Header;
