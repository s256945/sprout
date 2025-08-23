import FloatingParticles from "./components/FloatingParticles";
import Header from "./components/Header";
import SproutPanel from "./components/Sprout";
import Timer from "./components/Timer";
import { usePomodoro } from "./hooks/usePomodoro";


const App = () => {
  const { mode, setMode, running, start, pause, reset, secondsLeft, progress } =
    usePomodoro();

  const cardClass =
    "rounded-3xl bg-white/5 backdrop-blur-md border border-emerald-400/15 shadow-[0_10px_50px_-20px_rgba(0,0,0,.5)]";

  // sprout growth based on timer progress (1..5)
  const growthLevel = Math.min(1 + Math.floor(progress * 5), 5);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-emerald-50">
      {/* Radial light layers */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_30%_0%,rgba(16,185,129,.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_80%_40%,rgba(245,158,11,.08),transparent_60%)]" />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Header mode={mode} setMode={setMode} />

        {/* Centered grid layout */}
        <main
          className={`${cardClass} p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center`}
        >
          <Timer
            mode={mode}
            secondsLeft={secondsLeft}
            running={running}
            start={start}
            pause={pause}
            reset={reset}
            progress={progress}
          />
          <SproutPanel mode={mode} growthLevel={growthLevel} />
        </main>
      </div>
    </div>
  );
}

export default App;