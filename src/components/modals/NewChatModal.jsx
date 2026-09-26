import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function NewChatModal({ users, onClose, onDirect, onGroup }) {
  const [tab, setTab] = useState('direct');
  const [user, setUser] = useState(users[0]?.name || '');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const toggleMember = (memberName) => {
    setMembers((current) =>
      current.includes(memberName)
        ? current.filter((nameValue) => nameValue !== memberName)
        : [...current, memberName]
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yeni Söhbət / Qrup Yarat"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/65 dark:[color-scheme:dark] p-4 backdrop-blur-[1.5px]"
    >
      <div className="w-full max-w-[440px] overflow-hidden rounded-[26px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_18px_42px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] ring-1 ring-white/60 dark:ring-slate-700/50">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dff7f4] dark:bg-teal-900/50 text-[#1bb7a7] dark:text-teal-300 shadow-[inset_0_0_0_1px_rgba(27,183,167,0.12)] dark:shadow-none">
              <Icon name="plus" className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h3 className="text-[15px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-slate-100">
              Yeni Söhbət / Qrup Yarat
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Bağla"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 p-1.5 text-[12px] font-bold">
          {[
            ['direct', 'Şəxsi Söhbət'],
            ['group', 'Yeni Qrup'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 rounded-lg py-2.5 transition-all duration-200 ${
                tab === id
                  ? 'bg-gradient-to-r from-[#4fd6c6] dark:from-teal-600 to-[#2ec4b3] dark:to-emerald-600 text-white shadow-[0_4px_10px_rgba(45,196,179,0.22)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
          </div>
        </div>

        {tab === 'direct' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onDirect(user, message.trim());
            }}
            className="space-y-5 px-5 pb-5 pt-4 text-[12px]"
          >
            <div>
              <label htmlFor="new-chat-user" className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                İstifadəçi seçin:
              </label>
              <select
                id="new-chat-user"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="dark:[&_option]:bg-slate-800 dark:[&_option]:text-slate-100 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2.5 text-[12px] text-slate-700 dark:text-slate-200 outline-none transition focus:border-teal-300 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-500/25"
              >
                {users.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name} ({item.company} - {item.position})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="new-chat-message" className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                İlkin mesaj (istəyə bağlı):
              </label>
              <input
                id="new-chat-message"
                placeholder="Salam..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2.75 text-[12px] text-slate-700 dark:text-slate-200 outline-none transition placeholder:text-slate-400 focus:border-teal-300 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-500/25"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-3.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-100"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#4fd6c6] dark:from-teal-600 to-[#2ec4b3] dark:to-emerald-600 px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_8px_16px_rgba(46,196,179,0.24)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition hover:from-[#42c9bb] dark:hover:from-teal-500 hover:to-[#26b6a8] dark:hover:to-emerald-500"
              >
                Söhbətə Başla
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onGroup(name.trim(), ['Siz', ...members]);
            }}
            className="space-y-4 px-5 pb-4 pt-4 text-[12px]"
          >
            <div>
              <label htmlFor="new-chat-group" className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                Qrupun adı:
              </label>
              <input
                id="new-chat-group"
                required
                placeholder="Məs: İT Təchizat Qrupu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2.75 text-[12px] text-slate-700 dark:text-slate-200 outline-none transition placeholder:text-slate-400 focus:border-teal-300 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-500/25"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">Qrup iştirakçıları:</label>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shadow-inner shadow-slate-100 dark:shadow-black/20">
                <div className="flex min-h-[48px] flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-2">
                  {members.length === 0 ? (
                    <span className="text-[11px] text-slate-400">Heç bir iştirakçı seçilməyib</span>
                  ) : (
                    members.map((member) => (
                      <button
                        key={member}
                        type="button"
                        onClick={() => toggleMember(member)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 dark:border-teal-700/60 bg-teal-50 dark:bg-teal-900/40 px-2 py-1 text-[11px] font-medium text-teal-700 dark:text-teal-300 transition hover:border-teal-300 dark:hover:border-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800/50"
                      >
                        {member}
                        <Icon name="close" className="h-3 w-3" />
                      </button>
                    ))
                  )}
                </div>

                <div className="max-h-[160px] overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  <div className="space-y-1">
                    {users.map((item) => {
                      const isSelected = members.includes(item.name);

                      return (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-teal-900/40 ring-1 ring-teal-100 dark:ring-teal-700/50'
                              : 'hover:bg-white dark:hover:bg-slate-700/60 hover:shadow-[0_1px_0_rgba(15,23,42,0.02)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleMember(item.name)}
                              className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-teal-600 accent-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-500/30"
                            />
                            <span className="text-[12px] text-slate-700 dark:text-slate-200">{item.name}</span>
                          </div>

                          {isSelected && (
                            <span className="rounded-full bg-teal-500 dark:bg-teal-600 px-2 py-0.5 text-[10px] font-bold text-white">
                              Seçilib
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-3.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-100"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#4fd6c6] dark:from-teal-600 to-[#2ec4b3] dark:to-emerald-600 px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_8px_16px_rgba(46,196,179,0.24)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition hover:from-[#42c9bb] dark:hover:from-teal-500 hover:to-[#26b6a8] dark:hover:to-emerald-500"
              >
                Qrup Yarat
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
