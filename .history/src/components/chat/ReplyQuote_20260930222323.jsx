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
              onClick: () =>
                onJump(reply.id),
              title:
                'Əvvəlki mesaja keç'
            }
          : {}
      )}
      className={`
        block
        w-full
        min-w-0
        rounded-lg
        border
        border-slate-200
        border-l-[3px]
        border-l-emerald-500
        bg-slate-50
        px-3
        py-2
        text-left
        text-slate-700
        dark:border-slate-700
        dark:border-l-emerald-400
        dark:bg-slate-800
        dark:text-slate-200

        ${
          canJump
            ? `
              transition
              hover:bg-slate-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-300
              dark:hover:bg-slate-700
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
          text-xs
          font-semibold
          text-slate-600
          dark:text-slate-300
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
          text-slate-500
          [overflow-wrap:anywhere]
          dark:text-slate-400
        "
      >
        {reply.text}
      </span>
    </Tag>
  );
}