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
        rounded-xl
        border
        border-slate-200
        bg-white
        p-1.5
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-900/90
      "
    >
      {['👍', '❤️', '😂', '😢', '🙏', '🔥'].map(emoji => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="
            rounded-md
            p-1.5
            text-lg
            transition
            duration-200
            hover:scale-110
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
