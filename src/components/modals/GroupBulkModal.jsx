import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function GroupBulkModal({ users, groups, onClose, onSave }) {
  const [group, setGroup] = useState(groups[0]?.name || '');
  const [members, setMembers] = useState([]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Qrup halında istifadəçi əlavə et" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 dark:bg-black/65 dark:[color-scheme:dark] p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-emerald-200/80 dark:border-emerald-800/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(220,252,231,0.94))] dark:bg-[linear-gradient(180deg,#0f172a,#112f2e)] p-5 shadow-[0_30px_80px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-2xl animate-modal">
        <div className="flex items-center justify-between border-b border-emerald-200/80 dark:border-emerald-800/60 pb-3.5">
          <h3 className="text-[1.05rem] font-bold text-slate-900 dark:text-slate-100">Qrup halında istifadəçi əlavə et</h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-300">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div>
            <label htmlFor="bulk-target" className="mb-1.5 block text-[0.7rem] font-semibold text-slate-600 dark:text-slate-300">Hədəf Qrupu Seçin:</label>
            <select
              id="bulk-target"
              value={group}
              onChange={e => setGroup(e.target.value)}
              className="dark:[&_option]:bg-slate-800 dark:[&_option]:text-slate-100 w-full rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-white/80 dark:bg-slate-800/90 px-3 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none transition backdrop-blur-sm focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-500/25"
            >
              {groups.slice(0, 3).map(item => (
                <option key={item.id} value={item.name}>
                  {item.name}{item.id === 'g2' || item.id === 'g3' ? ' Qrupu' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label className="block text-[0.7rem] font-semibold text-slate-600 dark:text-slate-300">Əlavə ediləcək istifadəçilər:</label>
              {members.length > 0 && (
                <span className="text-[0.62rem] font-semibold text-emerald-700 dark:text-emerald-300">{members.length} seçilib</span>
              )}
            </div>

            {members.length > 0 && (
              <div className="mb-2 flex min-h-[32px] flex-wrap gap-1.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/50 p-2">
                {members.map((name) => (
                  <span key={name} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 dark:border-emerald-700/50 bg-white/90 dark:bg-slate-800 px-2 py-1 text-[0.65rem] font-medium text-slate-700 dark:text-slate-200">
                    {name}
                    <button
                      type="button"
                      onClick={() => setMembers(current => current.filter(item => item !== name))}
                      className="ml-0.5 text-slate-500 dark:text-slate-400 transition hover:text-emerald-700 dark:hover:text-emerald-300"
                      aria-label={`${name} seçimini ləğv et`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-emerald-100 dark:border-emerald-900/70 bg-white/70 dark:bg-slate-800/70 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
              {users.map(user => {
                const isSelected = members.includes(user.name);

                return (
                  <label key={user.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-2 text-[0.78rem] transition ${isSelected ? 'border-emerald-200 dark:border-emerald-700/50 bg-emerald-50/80 dark:bg-emerald-900/40 text-slate-800 dark:text-slate-100' : 'border-transparent bg-transparent text-slate-700 dark:text-slate-200 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/30'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => setMembers(current => e.target.checked ? [...current, user.name] : current.filter(name => name !== user.name))}
                        className="h-3.5 w-3.5 accent-emerald-500 rounded border border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{user.name}</span>
                    </div>

                    {isSelected ? (
                      <span className="rounded-full bg-emerald-500 dark:bg-emerald-600 px-2 py-1 text-[0.62rem] font-semibold text-white shadow-[0_4px_10px_rgba(16,185,129,0.25)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                        Seçilib
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-emerald-100 dark:border-emerald-900/70 pt-3.5">
          <button onClick={onClose} className="rounded-xl px-3.5 py-2 text-[0.8rem] font-medium text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-100">
            Ləğv et
          </button>
          <button onClick={() => onSave(group, members)} className="rounded-xl bg-gradient-to-r from-emerald-500 dark:from-emerald-600 to-teal-500 dark:to-teal-600 px-4 py-2.5 text-[0.8rem] font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition hover:brightness-105 active:translate-y-[1px]">
            Təsdiq et
          </button>
        </div>
      </div>
    </div>
  );
}
