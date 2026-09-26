import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-brand-600 via-indigo-500 to-violet-500';

  return (
    <header className="relative z-10 flex h-24 shrink-0 items-center justify-between overflow-hidden border-b border-violet-100 bg-[radial-gradient(circle_at_left_top,rgba(216,180,254,0.32),transparent_26%),radial-gradient(circle_at_right_top,rgba(196,181,253,0.22),transparent_24%),linear-gradient(135deg,#fffdfd_0%,#f5f1ff_28%,#f1f5ff_100%)] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_left_top,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_right_top,rgba(99,102,241,0.16),transparent_20%),linear-gradient(135deg,#0b1020_0%,#111827_38%,#151b2d_100%)] sm:px-6">
      <div className="pointer-events-none absolute -left-8 top-4 h-24 w-24 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-500/20" />
      <div className="pointer-events-none absolute right-16 top-0 h-20 w-20 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-400/15" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 via-55% to-transparent dark:via-violet-300/80" />

      <div className="relative flex min-w-0 items-center gap-3.5">
        <div className="relative">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-white shadow-[0_12px_28px_rgba(147,51,234,0.28)] ring-4 ring-white/90 dark:ring-slate-950/80`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.14)] dark:border-slate-950" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate bg-gradient-to-r from-violet-900 via-purple-700 to-indigo-700 bg-clip-text text-base font-black tracking-[-0.03em] text-transparent dark:from-violet-100 dark:via-purple-200 dark:to-indigo-200">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-violet-700 shadow-sm shadow-violet-200/30 dark:border-violet-800 dark:from-violet-950/80 dark:via-purple-950/60 dark:to-indigo-950/70 dark:text-violet-200">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-violet-700/80 dark:text-violet-200/80">
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
          className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_10px_20px_rgba(16,185,129,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(16,185,129,0.3)] active:translate-y-0 dark:border-emerald-700/80 dark:from-emerald-500 dark:via-green-500 dark:to-emerald-600"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" />
          <span className="hidden sm:inline">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_10px_20px_rgba(34,197,94,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(34,197,94,0.3)] active:translate-y-0 dark:border-emerald-700/80 dark:from-emerald-500 dark:via-green-600 dark:to-lime-600"
          title="Söhbətdən tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" strokeWidth={2.2} />
          <span className="hidden md:inline">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white/80 text-violet-700 shadow-[0_6px_16px_rgba(124,58,237,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-900 hover:shadow-[0_8px_18px_rgba(124,58,237,0.12)] dark:border-slate-700 dark:bg-slate-900/85 dark:text-violet-200 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white shadow-[0_10px_24px_rgba(147,51,234,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(147,51,234,0.36)] active:translate-y-0"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
