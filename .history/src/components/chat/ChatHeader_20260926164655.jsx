import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-teal-500 via-emerald-500 to-green-500';

  return (
    <header className="relative z-10 flex h-20 shrink-0 items-center justify-between border-b border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(208,250,229,0.72))] px-5 shadow-[0_16px_32px_rgba(16,185,129,0.14),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(16,185,129,0.08)] backdrop-blur-2xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="relative">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br ${avatarGradient} text-white shadow-[0_12px_24px_rgba(16,185,129,0.28)]`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-bold text-slate-900">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {isGroup
              ? `${members.length || 0} iştirakçı • ${members.join(', ') || 'Heç kim yoxdur'}`
              : 'Onlayn • Halal Portal'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onCall}
          className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-gradient-to-r from-teal-600/95 to-emerald-500/95 px-3.5 py-2.5 text-xs font-bold text-white shadow-[0_12px_22px_rgba(13,148,136,0.28)] backdrop-blur-sm transition hover:brightness-105 active:scale-[0.98]"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-white" />
          <span className="hidden sm:inline">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200/80 bg-white/70 px-3.5 py-2.5 text-xs font-bold text-emerald-700 shadow-[0_10px_22px_rgba(16,185,129,0.18)] backdrop-blur-sm transition hover:bg-emerald-50 active:scale-[0.98]"
          title="Tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-emerald-700" strokeWidth={2.2} />
          <span className="hidden md:inline">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200/80 bg-white/70 text-emerald-700 shadow-[0_8px_18px_rgba(16,185,129,0.14)] backdrop-blur-sm transition hover:bg-emerald-50"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_10px_22px_rgba(16,185,129,0.3)] backdrop-blur-sm transition hover:brightness-105 active:scale-[0.98]"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
