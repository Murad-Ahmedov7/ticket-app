import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateTaskModal({ defaults = {}, onClose, onSave }) {
  const [title, setTitle] = useState(defaults.title || '');
  const [comment, setComment] = useState(defaults.comment || '');
  const [date, setDate] = useState(defaults.date || '2026-09-25');
  const [time, setTime] = useState('12:00');
  const [assignee, setAssignee] = useState('Emil Xanciqazov');
  const [equipment, setEquipment] = useState('Optik Tester və Kabel');
  return (
    <div role="dialog" aria-modal="true" aria-label="Tapşırıq Əlavə Et" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-modal rounded-[30px] border border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(214,250,229,0.8))] p-5 shadow-[0_28px_70px_rgba(15,118,110,0.14),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3.5">
          <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.25)]">
              <Icon name="tasks" strokeWidth={2.5} className="h-4 w-4" />
            </span>
            Tapşırıq Əlavə Et (Halal 16)
          </h3>
          <button onClick={onClose} title="Bağla" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={e => { e.preventDefault(); onSave({ title: title.trim(), comment: comment.trim(), date, time, assignee, equipment }); }} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label htmlFor="task-assignee" className="mb-1.5 block font-semibold text-slate-700">İcraçı:</label>
            <select id="task-assignee" required value={assignee} onChange={e => setAssignee(e.target.value)} className="w-full rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
              {['Emil Xanciqazov', 'emil xanjiyev', 'İzzət', 'Emil Mahmudov', 'Sayid Mardaliyev', 'Ali Mensimov', 'Vasif Xudiyev'].map(name => <option key={name}>{name}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="task-title" className="mb-1.5 block font-semibold text-slate-700">Tapşırıq adı:</label>
            <input id="task-title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Tapşırıq adı" className="w-full rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-date" className="mb-1.5 block font-semibold text-slate-700">Dedlayn (Tarix):</label>
              <input id="task-date" type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label htmlFor="task-time" className="mb-1.5 block font-semibold text-slate-700">Saat:</label>
              <input id="task-time" type="time" required value={time} onChange={e => setTime(e.target.value)} className="w-full rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>

          <div>
            <label htmlFor="task-equipment" className="mb-1.5 block font-semibold text-slate-700">Avadanlıqlar (Halal 16):</label>
            <select id="task-equipment" value={equipment} onChange={e => setEquipment(e.target.value)} className="w-full rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
              {['Optik Tester və Kabel', 'Server / Router avadanlığı', 'Laptop və Şəbəkə alətləri', 'Heç biri'].map(item => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="task-comment" className="mb-1.5 block font-semibold text-slate-700">Komment / Təsvir:</label>
            <textarea id="task-comment" rows="2" value={comment} onChange={e => setComment(e.target.value)} placeholder="Komment və ya tapşırıq detalları" className="w-full resize-none rounded-xl border border-emerald-200/80 bg-white/70 px-3 py-2.5 text-xs text-slate-700 outline-none transition backdrop-blur-sm placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-emerald-100 pt-3">
            <button type="button" onClick={onClose} className="rounded-xl px-3.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              Ləğv et
            </button>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-xs font-bold text-white shadow-[0_12px_22px_rgba(16,185,129,0.25)] transition hover:brightness-105 active:translate-y-[1px]">
              Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
