import { useEffect, useState } from 'react';
import Icon from '../common/Icons.jsx';
import { taskStatuses, statusLabel, statusClasses, statusDots } from '../../utils/helpers.js';

export default function TaskTable({ tasks, onDetail, onStatus, onChat }) {
  const [dropdown, setDropdown] = useState(null);
  useEffect(() => {
    const close = () => setDropdown(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  return <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-visible"><div className="overflow-x-auto"><table className="w-full text-left border-collapse min-w-[950px]">
    <thead><tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider font-bold text-slate-400">{['№', 'Task Adı', 'Mesaj / Təsvir', 'Təyin Edən', 'Yaradılma', 'Dedlayn', 'İcraçı', 'Status', 'Əməliyyat'].map((label, i) => <th key={label} className={`py-3.5 ${i === 0 ? 'pl-6 pr-3 w-12 text-center' : i === 8 ? 'pr-6 pl-4 text-right' : 'px-4'}`}>{label}</th>)}</tr></thead>
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">{tasks.map(task => {
      const status = task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;
      return <tr key={task.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition cursor-pointer">
        <td className="py-3.5 pl-6 pr-3 font-mono font-bold text-slate-400">#{task.id}</td>
        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white" onClick={() => onDetail(task.id)}>{task.title}</td>
        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate" onClick={() => onDetail(task.id)}>{task.message || '-'}</td>
        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{task.creator}</td>
        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{task.createdAt}</td>
        <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-rose-600">{task.deadline}</td>
        <td className="py-3.5 px-4 font-semibold text-brand-600 dark:text-brand-400">{task.assignee}</td>
        <td className="py-3.5 px-4"><div className="relative inline-block text-left" onClick={event => event.stopPropagation()}>
          <button type="button" onClick={() => setDropdown(dropdown === task.id ? null : task.id)} className={`inline-flex items-center justify-between min-w-[120px] px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 shadow-sm hover:shadow active:scale-95 ${statusClasses[status] || statusClasses['Gözləmədə']}`} title="Statusu dəyişmək üçün vurun"><span className="flex items-center gap-1.5 truncate mr-1"><span className={`w-1.5 h-1.5 rounded-full ${statusDots[status]} shrink-0`} /><span className="truncate">{statusLabel(task.status)}</span></span><Icon name="down" className="w-3.5 h-3.5 opacity-70 shrink-0 transition-transform duration-150" /></button>
          {dropdown === task.id && <div className="absolute left-0 mt-1 w-36 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl z-50 py-1 overflow-hidden animate-modal">{taskStatuses.map(option => <button key={option} type="button" onClick={() => { onStatus(task.id, option); setDropdown(null); }} className={`w-full px-3.5 py-2 text-left text-xs transition flex items-center justify-between ${status === option ? 'bg-[#e6f4ff] dark:bg-blue-950/70 text-[#1677ff] dark:text-blue-300 font-bold' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'}`}><span>{statusLabel(option)}</span>{status === option && <span className="text-[#1677ff] dark:text-blue-400 font-bold text-xs">✓</span>}</button>)}</div>}
        </div></td>
        <td className="py-3.5 pr-6 pl-4 text-right"><div className="flex items-center justify-end gap-1.5"><button onClick={() => onDetail(task.id)} className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg" title="Detallar"><Icon name="eye" /></button><button onClick={onChat} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg" title="Söhbətə keç"><Icon name="chat" /></button></div></td>
      </tr>;
    })}</tbody>
  </table></div></div>;
}
