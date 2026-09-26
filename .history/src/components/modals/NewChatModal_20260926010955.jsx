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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[2px]"
    >
      <div className="w-full max-w-[420px] rounded-[28px] border border-violet-100 bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] p-5 shadow-[0_26px_60px_rgba(88,28,135,0.18)]">
        <div className="flex items-center justify-between border-b border-violet-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-violet-700 shadow-inner">
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

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-violet-50 p-1.5 text-[12px] font-semibold">
          {[
            ['direct', 'Şəxsi Söhbət'],
            ['group', 'Yeni Qrup'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 rounded-lg py-2 transition-all duration-200 ${
                tab === id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_8px_18px_rgba(109,40,217,0.24)]'
                  : 'text-violet-700 hover:text-violet-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'direct' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onDirect(user, message.trim());
            }}
            className="mt-4 space-y-3 text-[12px]"
          >
            <div>
              <label htmlFor="new-chat-user" className="mb-1.5 block font-semibold text-slate-700">
                İstifadəçi seçin:
              </label>
              <select
                id="new-chat-user"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2.5 text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              >
                {users.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name} ({item.company} - {item.position})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="new-chat-message" className="mb-1.5 block font-semibold text-slate-700">
                İlkin mesaj (istəyə bağlı):
              </label>
              <input
                id="new-chat-message"
                placeholder="Salam..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3.5 py-2 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-4 py-2 font-bold text-white shadow-[0_10px_20px_rgba(124,58,237,0.25)] transition hover:bg-violet-700"
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
            className="mt-4 space-y-3 text-[12px]"
          >
            <div>
              <label htmlFor="new-chat-group" className="mb-1.5 block font-semibold text-slate-700">
                Qrupun adı:
              </label>
              <input
                id="new-chat-group"
                required
                placeholder="Məs: İT Təchizat Qrupu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-semibold text-slate-700">Qrup iştirakçıları:</label>
              <div className="max-h-36 space-y-1.5 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                {users.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg p-1.5 transition hover:bg-white"
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
                      className="h-4 w-4 rounded text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-slate-700">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3.5 py-2 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-4 py-2 font-bold text-white shadow-[0_10px_20px_rgba(124,58,237,0.25)] transition hover:bg-violet-700"
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
