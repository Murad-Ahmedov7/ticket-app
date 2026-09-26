import { useEffect, useRef, useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function AudioCallModal({ conversation, onClose, notify }) {
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const audio = useRef(null);
  useEffect(() => {
    const Context = window.AudioContext || window.webkitAudioContext;
    let oscillators = [];
    let gain;
    if (Context) {
      const ctx = new Context();
      audio.current = ctx;
      gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.connect(ctx.destination);
      oscillators = [440, 480].map(frequency => {
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscillator.connect(gain);
        oscillator.start();
        return oscillator;
      });
      ctx.resume().catch(() => {});
    }
    function stopRingtone() {
      for (const oscillator of oscillators) { oscillator.stop(); oscillator.disconnect(); }
      oscillators = [];
      gain?.disconnect();
    }
    let interval;
    const timeout = setTimeout(() => {
      stopRingtone();
      setConnected(true);
      setSeconds(1);
      let elapsed = 0;
      interval = setInterval(() => { elapsed += 1; setSeconds(elapsed); }, 1000);
    }, 1500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      stopRingtone();
      audio.current?.close().catch(() => {});
      audio.current = null;
    };
  }, []);
  const timer = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return <div role="dialog" aria-modal="true" aria-label="Səsli Zəng" className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-between p-8 text-white animate-modal">
    <div className="w-full flex items-center justify-between max-w-lg"><span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur">Təhlükəsiz Şifrələnmiş Səsli Zəng</span><button onClick={onClose} title="Bağla" className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"><Icon name="close" className="w-5 h-5" /></button></div>
    <div className="flex flex-col items-center text-center space-y-4 my-auto"><div className="relative flex items-center justify-center"><div className="absolute w-48 h-48 rounded-full bg-emerald-500/20 animate-pulse-ring" /><div className="absolute w-60 h-60 rounded-full bg-emerald-500/10 animate-pulse-ring" style={{ animationDelay: '0.6s' }} /><div className="w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-500 via-green-500 to-teal-500 p-1 shadow-[0_0_30px_rgba(16,185,129,0.45)] z-10 flex items-center justify-center"><Icon name="groups" className="w-16 h-16 text-white" strokeWidth={1.8} /></div></div><div className="space-y-1"><h3 className="text-2xl font-bold">{conversation.type === 'group' ? 'Chat with ' : ''}{conversation.name}</h3><p className="text-sm font-mono text-emerald-400">{connected ? timer : 'Zəng olunur...'}</p></div></div>
    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white/10 shadow-2xl"><button onClick={() => { setMuted(!muted); notify('Mikrofon vəziyyəti dəyişdirildi'); }} aria-pressed={muted} className={`p-3.5 rounded-full ${muted ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/25 transition text-white border border-white/10`} title="Mikrofon"><Icon name="mic" className="w-5 h-5" /></button><button onClick={onClose} className="p-4 rounded-full bg-rose-500 hover:bg-rose-600 transition text-white shadow-lg shadow-rose-500/40" title="Zəngi bitir"><Icon name="phone" className="w-6 h-6 rotate-[135deg]" strokeWidth={2.5} /></button></div>
  </div>;
}
