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
        border-slate-300/70
        bg-[#f8faf9]/95 backdrop-blur-[2px]
        [background-image:linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)] dark:[background-image:linear-gradient(160deg,rgba(255,255,255,0.045),rgba(255,255,255,0)_70%)]
        p-1.5
        shadow-[0_4px_16px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_16px_rgba(2,6,23,0.2),inset_0_1px_0_rgba(255,255,255,0.07)]

        dark:border-slate-700
        dark:bg-slate-800/95
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
            duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
            hover:scale-110
            hover:bg-slate-100
            dark:hover:bg-slate-700
          "
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
