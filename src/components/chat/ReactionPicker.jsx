import { useEffect, useRef } from 'react';

export default function ReactionPicker({ position, onReact, onClose }) {
  const picker = useRef(null);
  useEffect(() => {
    function closeOutside(event) { if (!picker.current?.contains(event.target)) onClose(); }
    document.addEventListener('click', closeOutside);
    return () => document.removeEventListener('click', closeOutside);
  }, [onClose]);
  return <div ref={picker} style={{ top: Math.max(8, position.top - 45), left: Math.max(10, Math.min(position.left - 80, window.innerWidth - 285)) }} className="fixed z-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-1.5 flex items-center gap-1.5 backdrop-blur-md">
    {['👍', '❤️', '😂', '😢', '🙏', '🔥'].map(emoji => <button key={emoji} onClick={() => onReact(emoji)} className="p-1.5 text-lg hover:scale-125 transition">{emoji}</button>)}
  </div>;
}
