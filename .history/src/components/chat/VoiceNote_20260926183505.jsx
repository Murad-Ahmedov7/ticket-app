import { useEffect, useRef, useState } from 'react';

export default function VoiceNote({ message, playing, onToggle, notify }) {
  const audio = useRef(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    const ctx = new Context();
    audio.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 2);
    osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 5);
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 4.9);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 5);
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    ctx.resume().catch(() => {});
    osc.start();
    osc.stop(ctx.currentTime + 5);
    const interval = setInterval(() => setStep(value => value + 1), 100);
    return () => {
      clearInterval(interval);
      try { osc.stop(); } catch { /* Already ended. */ }
      osc.disconnect(); filter.disconnect(); gain.disconnect();
      ctx.close().catch(() => {});
      audio.current = null;
    };
  }, [playing]);
  const heights = [12, 20, 8, 24, 16, 8, 20, 12, 24, 8, 16];
  return <div className="flex items-center gap-3 py-1">
    <button onClick={onToggle} title={playing ? 'Səsi dayandır' : 'Səsi oxut'} className={`w-9 h-9 rounded-full ${message.isOutgoing ? 'bg-white text-emerald-700 hover:bg-slate-100' : 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white hover:brightness-105'} flex items-center justify-center shrink-0 shadow-md transition active:scale-95`}>
      <svg className={`w-4 h-4 ${playing ? '' : 'ml-0.5'}`} fill="currentColor" viewBox="0 0 24 24"><path d={playing ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' : 'M8 5v14l11-7z'} /></svg>
    </button>
    <div className="flex flex-col flex-1 min-w-[170px]">
      <div className="flex items-end gap-1 h-6 cursor-pointer py-1" onClick={() => notify(`Audio zaman xətti: ${message.duration}`)}>
        {heights.map((height, index) => <span key={index} className={`audio-waveform-bar w-1 rounded-full ${message.isOutgoing ? ['bg-white/90', 'bg-white/80', 'bg-white/70', 'bg-white/90', 'bg-white/80', 'bg-white/60', 'bg-white/85', 'bg-white/70', 'bg-white/90', 'bg-white/50', 'bg-white/75'][index] : ['bg-emerald-600', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-600', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-600', 'bg-emerald-400', 'bg-emerald-600', 'bg-emerald-300', 'bg-emerald-400'][index]}`} style={{ height: playing ? Math.floor(Math.sin((step + index) * 0.8) * 10 + 14) : height }} />)}
      </div>
      <div className={`flex items-center justify-between text-[10px] ${message.isOutgoing ? 'text-white/80' : 'text-emerald-700/80'}`}><span>0:00</span><span>{message.duration}</span></div>
    </div>
  </div>;
}
