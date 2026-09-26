import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function NewChatModal({ users, onClose, onDirect, onGroup }) {
  const [tab, setTab] = useState('direct');
  const [user, setUser] = useState(users[0]?.name || '');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yeni Söhbət / Qrup Yarat"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[1.5px]"
    >
      <div className="w-full max-w-[440px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.12)] ring-1 ring-white/60">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dff7f4] text-[#1bb7a7] shadow-[inset_0_0_0_1px_rgba(27,183,167,0.12)]">
              <Icon name="plus" className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h3 className="text-[15px] font-extrabold tracking-[-0.02em] text-slate-900">
              Yeni Söhbət / Qrup Yarat
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Bağla"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1.5 text-[12px] font-bold">
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
                  ? 'bg-gradient-to-r from-[#4fd6c6] to-[#2ec4b3] text-white shadow-[0_4px_10px_rgba(45,196,179,0.22)]'
                  : 'text-slate-600 hover:text-slate-800'
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
            className="space-y-4 px-5 pb-4 pt-4 text-[12px]"
          >
            <div>
              <label htmlFor="new-chat-user" className="mb-1.5 block text-[12px] font-semibold text-slate-700">
                İstifadəçi seçin:
              </label>
              <select
                id="new-chat-user"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
              >
                {users.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name} ({item.company} - {item.position})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="new-chat-message" className="mb-1.5 block text-[12px] font-semibold text-slate-700">
                İlkin mesaj (istəyə bağlı):
              </label>
              <input
                id="new-chat-message"
                placeholder="Salam..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.75 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#4fd6c6] to-[#2ec4b3] px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_8px_16px_rgba(46,196,179,0.24)] transition hover:from-[#42c9bb] hover:to-[#26b6a8]"
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
              <label htmlFor="new-chat-group" className="mb-1.5 block text-[12px] font-semibold text-slate-700">
                Qrupun adı:
              </label>
              <input
                id="new-chat-group"
                required
                placeholder="Məs: İT Təchizat Qrupu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.75 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-700">Qrup iştirakçıları:</label>
              <div className="max-h-[160px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-1.5 shadow-inner shadow-slate-100 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <div className="space-y-1">
                  {users.map((item) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white hover:shadow-[0_1px_0_rgba(15,23,42,0.02)]"
                    >
                      <input
                        type="checkbox"
                        checked={members.includes(item.name)}
                        onChange={(e) =>
                          setMembers(
                            e.target.checked
                              ? [...members, item.name]
                              : members.filter((nameValue) => nameValue !== item.name)
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300 bg-white text-teal-600 accent-teal-500 focus:ring-2 focus:ring-teal-200"
                      />
                      <span className="text-[12px] text-slate-700">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#4fd6c6] to-[#2ec4b3] px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_8px_16px_rgba(46,196,179,0.24)] transition hover:from-[#42c9bb] hover:to-[#26b6a8]"
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
