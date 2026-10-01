export default function ReplyQuote({
  reply,
  outgoing = false,
  onJump
}) {
  const canJump =
    onJump && reply.id != null;

  const Tag =
    canJump ? 'button' : 'div';

  return (
    <Tag
      {...(
        canJump
          ? {
              type: 'button',
              onClick: () => onJump(reply.id),
              title: 'Əvvəlki mesaja keç'
            }
          : {}
      )}
      className={`
        block
        w-full
        min-w-0
        rounded-2xl
        border
        border-slate-200/80
        border-l-[4px]
        border-l-violet-500
        bg-gradient-to-r
        from-slate-50
        to-white
        px-3
        py-2.5
        text-left
        text-slate-700
        shadow-[0_8px_20px_rgba(15,23,42,0.04)]
        dark:border-slate-700
        dark:border-l-violet-400
        dark:from-slate-900
        dark:to-slate-900
        dark:text-slate-200

        ${
          outgoing
            ? 'border-violet-200 bg-violet-50/80 dark:border-violet-900/60 dark:bg-violet-950/20'
            : ''
        }

        ${
          canJump
            ? `
              transition
              hover:bg-slate-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-300
              dark:hover:bg-slate-800
            `
            : ''
        }
      `}
    >
      <span
        className="
          mb-0.5
          block
          truncate
          text-[11px]
          font-semibold
          tracking-wide
          text-violet-700
          dark:text-violet-300
        "
      >
        {reply.sender}
      </span>

      <span
        className="
          block
          line-clamp-2
          whitespace-pre-wrap
          text-xs
          leading-relaxed
          text-slate-600
          [overflow-wrap:anywhere]
          dark:text-slate-300
        "
      >
        {reply.text}
      </span>
    </Tag>
  );
}