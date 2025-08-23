import { useState } from "react";
import AboutModal from "./components/AboutModal";
import FloatingParticles from "./components/FloatingParticles";
import Header from "./components/Header";
import SproutPanel from "./components/Sprout";
import Timer from "./components/Timer";
import { usePomodoro } from "./hooks/usePomodoro";

export default function App() {
  const { mode, setMode, running, start, pause, reset, secondsLeft, progress } =
    usePomodoro();

  const [aboutOpen, setAboutOpen] = useState(false);

  const cardClass =
    "relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_20px_80px_-30px_rgba(0,0,0,.6)]";

  const growthLevel = Math.min(1 + Math.floor(progress * 5), 5);
  const completed = progress >= 0.999;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-emerald-50 overflow-hidden">
      {/* Radial light layers */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_30%_0%,rgba(16,185,129,.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_80%_40%,rgba(245,158,11,.08),transparent_60%)]" />

      {/* Grain + vignette */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,.06),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.25'/></svg>\")",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Header
          mode={mode}
          setMode={setMode}
          onAbout={() => setAboutOpen(true)}
        />

        <main
          className={`${cardClass} p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center`}
        >
          {/* sheen */}
          <div className="pointer-events-none absolute inset-x-6 top-6 h-24 rounded-2xl bg-gradient-to-b from-white/10 to-transparent blur-md" />
          {/* soft shadow */}
          <div className="pointer-events-none absolute -inset-x-4 bottom-4 h-24 blur-2xl rounded-[40px] bg-emerald-900/40 opacity-50" />

          <Timer
            mode={mode}
            secondsLeft={secondsLeft}
            running={running}
            start={start}
            pause={pause}
            reset={reset}
            progress={progress}
          />
          <div className="w-full h-full flex items-center justify-center transition-transform hover:-translate-y-[2px]">
            <SproutPanel
              mode={mode}
              growthLevel={growthLevel}
              completed={completed}
            />
          </div>
        </main>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
