import { useEffect, useState } from 'react';

function Toast({ toast, onDismiss }) {
  const [phase, setPhase] = useState('enter');
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPhase('visible'));
    const fade = setTimeout(() => setPhase('exit'), 2800);
    const remove = setTimeout(() => onDismiss(toast.id), 3100);
    return () => { cancelAnimationFrame(frame); clearTimeout(fade); clearTimeout(remove); };
  }, [toast.id, onDismiss]);
  return <div className={`px-4 py-3 rounded-2xl bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 text-xs font-semibold shadow-2xl border border-white/10 backdrop-blur pointer-events-auto transform transition-all duration-300 flex items-center gap-2.5 ${phase === 'enter' ? 'translate-y-2 opacity-0' : phase === 'exit' ? '-translate-y-2 opacity-0' : ''}`}><span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" /><span>{toast.message}</span></div>;
}

export default function ToastContainer({ toasts, onDismiss }) {
  return <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none" aria-live="polite">{toasts.map(toast => <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />)}</div>;
}
