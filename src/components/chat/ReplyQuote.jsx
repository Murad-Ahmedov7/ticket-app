export default function ReplyQuote({ reply, outgoing = false, onJump }) {
  const canJump = onJump && reply.id != null;
  const Tag = canJump ? 'button' : 'div';
  return (
    <Tag
      {...(canJump ? { type: 'button', onClick: () => onJump(reply.id), title: 'Əvvəlki mesaja keç' } : {})}
      className={`block w-full min-w-0 rounded-lg border-l-4 px-3 py-2 text-left ${outgoing
        ? 'border-emerald-200 bg-black/10 text-white dark:border-emerald-400 dark:bg-black/20'
        : 'border-emerald-500 bg-emerald-50 text-slate-700 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-slate-200'} ${canJump ? 'transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300' : ''}`}
    >
      <span className={`mb-0.5 block truncate text-xs font-bold ${outgoing ? 'text-emerald-100 dark:text-emerald-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{reply.sender}</span>
      <span className="block line-clamp-2 text-xs leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">{reply.text}</span>
    </Tag>
  );
}