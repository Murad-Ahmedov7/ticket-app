import Icon from '../common/Icons.jsx';

export default function ChatHeader({
  conversation,
  onCall,
  onCreateTask,
  onInfo,
  onAddMember,
  onShowConversations
}) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];

  return (
    <header className="chat-header relative z-10 flex min-h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-6">
      
      <div className="chat-header-identity flex min-w-0 items-center gap-3.5">
        
        <button
          type="button"
          onClick={onShowConversations}
          title="Söhbətlərə qayıt"
          aria-label="Söhbətlərə qayıt"
          className="chat-back flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="chat-header-avatar relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Icon name="groups" className="h-5 w-5" />
          </div>

          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="min-w-0 truncate text-base font-semibold text-slate-900 dark:text-slate-100">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>

            <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

            <span className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">
              {isGroup
                ? `${members.length || 0} iştirakçı • ${
                    members.join(', ') || 'Heç kim yoxdur'
                  }`
                : 'Onlayn • Halal Portal'}
            </span>
          </p>
        </div>
      </div>

      <div className="chat-header-actions flex shrink-0 items-center gap-2">
        
        <button
          onClick={onCall}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4" />

          <span className="chat-action-label">
            Zəng et
          </span>
        </button>

        <button
          onClick={onCreateTask}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Tapşırıq yarat"
        >
          <Icon
            name="plus"
            className="h-4 w-4"
            strokeWidth={2.2}
          />

          <span className="chat-action-label">
            Tapşırıq yarat
          </span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          title="İştirakçı əlavə et"
        >
          <Icon
            name="addMember"
            className="h-4 w-4"
            strokeWidth={2.4}
          />
        </button>

      </div>
    </header>
  );
}