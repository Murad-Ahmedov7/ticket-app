import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-brand-600 via-indigo-500 to-violet-500';

  return (
    <header className="relative z-10 flex h-24 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/85 px-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent dark:via-brand-500/30" />

      <div className="flex min-w-0 items-center gap-3.5">
        <div className="relative">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-white shadow-lg shadow-brand-500/25 ring-4 ring-white/80 dark:ring-slate-950/80`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-slate-950" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {isGroup
              ? `${members.length || 0} iştirakçı • ${members.join(', ') || 'Heç kim yoxdur'}`
              : 'Onlayn • Halal Portal'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onCall}
          className="group inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md active:translate-y-0 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-emerald-600 transition-transform duration-200 group-hover:scale-110 dark:text-emerald-300" />
          <span className="hidden sm:inline">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="group inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-bold text-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md active:translate-y-0 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-300 dark:hover:bg-brand-900/60"
          title="Söhbətdən tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-brand-600 transition-transform duration-200 group-hover:scale-110 dark:text-brand-300" strokeWidth={2.2} />
          <span className="hidden md:inline">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/40 active:translate-y-0"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
