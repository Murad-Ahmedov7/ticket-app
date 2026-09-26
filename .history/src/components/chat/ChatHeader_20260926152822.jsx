import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-brand-600 via-indigo-500 to-violet-500';

  return (
    <header className="relative z-10 flex h-24 shrink-0 items-center justify-between border-b border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,240,255,0.94),rgba(255,255,255,0.96))] px-5 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(17,24,39,0.94),rgba(15,23,42,0.98))] sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent dark:via-brand-400/70" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-500/5 via-brand-400/0 to-transparent dark:from-brand-500/10" />

      <div className="flex min-w-0 items-center gap-3.5">
        <div className="relative">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-white shadow-[0_10px_24px_rgba(124,58,237,0.35)] ring-4 ring-white/90 dark:ring-slate-950/80`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)] dark:border-slate-950" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-violet-700 dark:border-violet-900/70 dark:from-violet-950/60 dark:to-indigo-950/60 dark:text-violet-300">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.8)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/80" />
            </span>
            {isGroup
              ? `${members.length || 0} iştirakçı • ${members.join(', ') || 'Heç kim yoxdur'}`
              : 'Onlayn • Halal Portal'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onCall}
          className="group inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-50 px-3.5 py-2.5 text-xs font-bold text-emerald-700 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/15 active:translate-y-0 dark:border-emerald-900/60 dark:from-emerald-950/60 dark:via-emerald-900/50 dark:to-teal-950/50 dark:text-emerald-300"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-emerald-600 transition-transform duration-200 group-hover:scale-110 dark:text-emerald-300" />
          <span className="hidden sm:inline">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="group inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-brand-50 to-indigo-50 px-3.5 py-2.5 text-xs font-bold text-violet-700 shadow-sm shadow-violet-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-500/15 active:translate-y-0 dark:border-violet-900/60 dark:from-violet-950/60 dark:via-brand-950/50 dark:to-indigo-950/50 dark:text-violet-300"
          title="Söhbətdən tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-violet-600 transition-transform duration-200 group-hover:scale-110 dark:text-violet-300" strokeWidth={2.2} />
          <span className="hidden md:inline">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-800 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 via-violet-600 to-indigo-500 text-white shadow-[0_10px_25px_rgba(124,58,237,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(124,58,237,0.45)] active:translate-y-0"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
