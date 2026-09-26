import Icon from '../common/Icons.jsx';

export default function ChatInfoModal({ conversation, onClose, onClear }) {
  const members = conversation?.members?.length ? conversation.members : [conversation?.name || 'Siz', 'Siz'];

  return (
    <div role="dialog" aria-modal="true" aria-label="Söhbət Məlumatları" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 dark:bg-black/65 dark:[color-scheme:dark] p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-emerald-200/80 dark:border-emerald-800/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(220,252,231,0.94))] dark:bg-[linear-gradient(180deg,#0f172a,#112f2e)] p-5 shadow-[0_30px_80px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-2xl animate-modal">
        <div className="flex items-center justify-between border-b border-emerald-200/80 dark:border-emerald-800/60 pb-3.5">
          <h3 className="text-[1.05rem] font-bold text-slate-900 dark:text-slate-100">Söhbət Məlumatları</h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-300">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2 pt-3.5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-emerald-500 dark:from-emerald-600 via-teal-500 dark:via-teal-600 to-emerald-600 dark:to-emerald-700 text-[1.5rem] font-bold text-white shadow-[0_10px_22px_rgba(16,185,129,0.25)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
            {conversation?.type === 'group' ? 'G' : (conversation?.name || 'S').charAt(0).toUpperCase()}
          </div>
          <h4 className="text-[0.98rem] font-black text-slate-900 dark:text-slate-100">{conversation?.name || 'Söhbət'}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {conversation?.type === 'group' ? `Qrup Söhbəti • ${members.length} iştirakçı` : 'Şəxsi Söhbət'}
          </p>
        </div>

        <div className="mt-4 space-y-2 text-xs">
          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">İştirakçılar</label>
          <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
            {members.map((member) => (
              <div key={member} className="flex items-center justify-between rounded-xl border border-emerald-100 dark:border-emerald-900/70 bg-white/70 dark:bg-slate-800/70 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 dark:from-emerald-600 to-teal-500 dark:to-teal-600 text-[10px] font-bold text-white">
                    {member.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-[0.9rem] font-semibold text-slate-800 dark:text-slate-100">{member}</span>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-600 shadow-[0_0_0_3px_rgba(16,185,129,0.12)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-emerald-100 dark:border-emerald-900/70 pt-3.5">
          <button onClick={onClear} className="rounded-xl px-3.5 py-2 text-[0.8rem] font-semibold text-rose-600 dark:text-rose-400 transition hover:bg-rose-50 dark:hover:bg-rose-950/50">
            Mesajları Təmizlə
          </button>
          <button onClick={onClose} className="rounded-xl bg-gradient-to-r from-emerald-500 dark:from-emerald-600 to-teal-500 dark:to-teal-600 px-4 py-2 text-[0.8rem] font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition hover:brightness-105 active:translate-y-[1px]">
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}
