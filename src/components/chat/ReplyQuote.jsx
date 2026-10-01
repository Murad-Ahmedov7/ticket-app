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
        rounded-xl
        border
        border-[var(--message-border,#cbd6d0)]
        bg-[var(--message-inner,#e9efec)]
        px-3
        py-2
        text-left
        text-slate-700
        shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        [background-image:linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)] dark:[background-image:linear-gradient(160deg,rgba(255,255,255,0.045),rgba(255,255,255,0)_70%)]
        dark:border-[var(--message-border,#475569)]
        dark:bg-[var(--message-inner,#293548)]
        dark:text-slate-200

        ${
          outgoing
            ? 'border-[var(--message-border,#cbd6d0)]'
            : ''
        }

        ${
          canJump
            ? `
              transition
              hover:bg-[var(--message-hover,#dfe7e2)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-300
              dark:hover:bg-[var(--message-hover,#344256)]
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
          tracking-normal
          text-slate-700
          dark:text-slate-200
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
