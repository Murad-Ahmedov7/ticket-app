import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-brand-600 via-indigo-500 to-violet-500';

  return (
    <header className="relative z-10 flex h-24 shrink-0 items-center justify-between overflow-hidden border-b border-slate-200/80 bg-[radial-gradient(circle_at_left_top,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_right_top,rgba(34,211,238,0.18),transparent_25%),linear-gradient(135deg,#ffffff_0%,#f5f3ff_28%,#eef2ff_100%)] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_left_top,rgba(168,85,247,0.26),transparent_30%),radial-gradient(circle_at_right_top,rgba(59,130,246,0.22),transparent_25%),linear-gradient(135deg,#020817_0%,#0f172a_38%,#111827_100%)] sm:px-6">
      <div className="pointer-events-none absolute -left-10 top-3 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/25" />
      <div className="pointer-events-none absolute right-16 top-0 h-20 w-20 rounded-full bg-cyan-400/15 blur-3xl dark:bg-sky-500/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/80 via-55% to-transparent dark:via-brand-400/80" />

      <div className="relative flex min-w-0 items-center gap-3.5">
        <div className="relative">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-white shadow-[0_12px_28px_rgba(124,58,237,0.42)] ring-4 ring-white/90 dark:ring-slate-950/80`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)] dark:border-slate-950" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-base font-black tracking-[-0.03em] text-transparent dark:from-white dark:via-violet-200 dark:to-sky-300">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-indigo-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-violet-700 shadow-sm shadow-violet-200/40 dark:border-violet-800 dark:from-violet-950/80 dark:via-fuchsia-950/60 dark:to-indigo-950/70 dark:text-violet-200">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.9)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/80" />
            </span>
            {isGroup
              ? `${members.length || 0} iştirakçı • ${members.join(', ') || 'Heç kim yoxdur'}`
              : 'Onlayn • Halal Portal'}
          </p>
        </div>
      </div>

      <div className="relative flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onCall}
          className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_10px_22px_rgba(16,185,129,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(16,185,129,0.4)] active:translate-y-0 dark:border-emerald-700/80"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" />
          <span className="hidden sm:inline">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="group inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_10px_22px_rgba(139,92,246,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(139,92,246,0.46)] active:translate-y-0 dark:border-violet-700/80"
          title="Söhbətdən tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" strokeWidth={2.2} />
          <span className="hidden md:inline">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-[0_8px_18px_rgba(15,23,42,0.1)] dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 via-violet-600 to-indigo-500 text-white shadow-[0_10px_24px_rgba(124,58,237,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(124,58,237,0.5)] active:translate-y-0"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
