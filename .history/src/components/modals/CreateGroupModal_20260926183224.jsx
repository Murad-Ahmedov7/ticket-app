import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateGroupModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div role="dialog" aria-modal="true" aria-label="Yeni Qrup Yarat" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(220,252,231,0.94))] p-5 shadow-[0_30px_80px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl animate-modal">
        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3.5">
          <h3 className="text-[1.05rem] font-bold text-slate-900">Yeni Qrup Yarat</h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), description: description.trim() }); }} className="mt-4 space-y-4 text-xs">
          <div>
            <label htmlFor="group-name" className="mb-1.5 block text-[0.7rem] font-semibold text-slate-600">Qrupun adı:</label>
            <input
              id="group-name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Məs: Logistika və Nəqliyyat"
              className="w-full rounded-xl border border-emerald-200/80 bg-white/80 px-3 py-3 text-sm text-slate-700 outline-none transition backdrop-blur-sm placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label htmlFor="group-description" className="mb-1.5 block text-[0.7rem] font-semibold text-slate-600">Təsvir:</label>
            <textarea
              id="group-description"
              rows="3"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Qrupun fəaliyyət sahəsi"
              className="w-full resize-none rounded-xl border border-emerald-200/80 bg-white/80 px-3 py-3 text-sm text-slate-700 outline-none transition backdrop-blur-sm placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-emerald-100 pt-3.5">
            <button type="button" onClick={onClose} className="rounded-xl px-3.5 py-2 text-[0.8rem] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              Ləğv et
            </button>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-[0.8rem] font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] transition hover:brightness-105 active:translate-y-[1px]">
              Qrupu Yarat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
