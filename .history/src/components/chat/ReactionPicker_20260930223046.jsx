import { useEffect, useRef } from 'react';

export default function ReactionPicker({ position, onReact, onClose }) {
  const picker = useRef(null);

  useEffect(() => {
    function closeOutside(event) {
      if (!picker.current?.contains(event.target)) onClose();
    }

    document.addEventListener('click', closeOutside);
    return () => document.removeEventListener('click', closeOutside);
  }, [onClose]);

  return (
    <div
      ref={picker}
      style={{
        top: Math.max(8, position.top - 54),
        left: Math.max(12, Math.min(position.left - 84, window.innerWidth - 290))
      }}
      className="
        fixed
        z-40
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-violet-100
        bg-white/90
        p-1.5
        shadow-[0_20px_45px_rgba(76,29,149,0.16)]
        backdrop-blur-md
        dark:border-slate-700
        dark:bg-slate-900/90
      "
    >
      {['👍', '❤️', '😂', '😢', '🙏', '🔥'].map(emoji => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="
            rounded-full
            p-1.5
            text-lg
            transition
            duration-200
            hover:scale-125
            hover:bg-violet-50
            dark:hover:bg-slate-800
          "
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
