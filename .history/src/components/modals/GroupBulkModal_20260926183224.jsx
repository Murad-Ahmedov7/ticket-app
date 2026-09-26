import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function GroupBulkModal({ users, groups, onClose, onSave }) {
  const [group, setGroup] = useState(groups[0]?.name || '');
  const [members, setMembers] = useState([]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Qrup halında istifadəçi əlavə et" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(220,252,231,0.94))] p-5 shadow-[0_30px_80px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl animate-modal">
        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3.5">
          <h3 className="text-[1.05rem] font-bold text-slate-900">Qrup halında istifadəçi əlavə et</h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div>
            <label htmlFor="bulk-target" className="mb-1.5 block text-[0.7rem] font-semibold text-slate-600">Hədəf Qrupu Seçin:</label>
            <select
              id="bulk-target"
              value={group}
              onChange={e => setGroup(e.target.value)}
              className="w-full rounded-xl border border-emerald-200/80 bg-white/80 px-3 py-3 text-sm text-slate-700 outline-none transition backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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
              <label className="block text-[0.7rem] font-semibold text-slate-600">Əlavə ediləcək istifadəçilər:</label>
              {members.length > 0 && (
                <span className="text-[0.62rem] font-semibold text-emerald-700">{members.length} seçilib</span>
              )}
            </div>

            {members.length > 0 && (
              <div className="mb-2 flex min-h-[32px] flex-wrap gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-2">
                {members.map((name) => (
                  <span key={name} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white/90 px-2 py-1 text-[0.65rem] font-medium text-slate-700">
                    {name}
                    <button
                      type="button"
                      onClick={() => setMembers(current => current.filter(item => item !== name))}
                      className="ml-0.5 text-slate-500 transition hover:text-emerald-700"
                      aria-label={`${name} seçimini ləğv et`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-emerald-100 bg-white/70 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.7)]">
              {users.map(user => {
                const isSelected = members.includes(user.name);

                return (
                  <label key={user.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-2 text-[0.78rem] transition ${isSelected ? 'border-emerald-200 bg-emerald-50/80 text-slate-800' : 'border-transparent bg-transparent text-slate-700 hover:bg-emerald-50/40'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => setMembers(current => e.target.checked ? [...current, user.name] : current.filter(name => name !== user.name))}
                        className="h-3.5 w-3.5 rounded border border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{user.name}</span>
                    </div>

                    {isSelected ? (
                      <span className="rounded-full bg-emerald-500 px-2 py-1 text-[0.62rem] font-semibold text-white shadow-[0_4px_10px_rgba(16,185,129,0.25)]">
                        Seçilib
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-emerald-100 pt-3.5">
          <button onClick={onClose} className="rounded-xl px-3.5 py-2 text-[0.8rem] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            Ləğv et
          </button>
          <button onClick={() => onSave(group, members)} className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-[0.8rem] font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] transition hover:brightness-105 active:translate-y-[1px]">
            Təsdiq et
          </button>
        </div>
      </div>
    </div>
  );
}
