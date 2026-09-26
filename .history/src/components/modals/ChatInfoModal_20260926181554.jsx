import Icon from '../common/Icons.jsx';

export default function ChatInfoModal({ conversation, onClose, onClear }) {
  const members = conversation?.members?.length ? conversation.members : [conversation?.name || 'Siz', 'Siz'];

  return (
    <div role="dialog" aria-modal="true" aria-label="Söhbət Məlumatları" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(220,252,231,0.94))] p-5 shadow-[0_30px_80px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl animate-modal">
        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3.5">
          <h3 className="text-base font-bold text-slate-900">Söhbət Məlumatları</h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2 pt-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-xl font-bold text-white shadow-[0_10px_22px_rgba(16,185,129,0.25)]">
            {conversation?.type === 'group' ? 'G' : (conversation?.name || 'S').charAt(0).toUpperCase()}
          </div>
          <h4 className="text-base font-black text-slate-900">{conversation?.name || 'Söhbət'}</h4>
          <p className="text-xs text-slate-500">
            {conversation?.type === 'group' ? `Qrup Söhbəti • ${members.length} iştirakçı` : 'Şəxsi Söhbət'}
          </p>
        </div>

        <div className="mt-4 space-y-2 text-xs">
          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">İştirakçılar</label>
          <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
            {members.map((member) => (
              <div key={member} className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white/70 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[10px] font-bold text-white">
                    {member.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-semibold text-slate-800">{member}</span>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-emerald-100 pt-3.5">
          <button onClick={onClear} className="rounded-xl px-3.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
            Mesajları Təmizlə
          </button>
          <button onClick={onClose} className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] transition hover:brightness-105 active:translate-y-[1px]">
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}
