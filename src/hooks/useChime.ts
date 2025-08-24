import { useCallback } from "react";

export const useChime = () => {
  const play = useCallback((volume = 0.2) => {
    try {
      const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const now = ctx.currentTime;

      const make = (freq: number, start: number, len: number, gain: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0, now + start);
        g.gain.linearRampToValueAtTime(volume * gain, now + start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + start + len);
        o.start(now + start);
        o.stop(now + start + len + 0.05);
      };

      // “bloom” chord
      make(523.25, 0.0, 0.25, 0.8);
      make(659.25, 0.0, 0.25, 0.5); 
      make(783.99, 0.05, 0.3, 0.35);

      // ping
      make(1046.5, 0.3, 0.15, 0.25); // C6
    } catch {
      // ignore — audio blocked or unsupported
    }
  }, []);

  return play;
};
