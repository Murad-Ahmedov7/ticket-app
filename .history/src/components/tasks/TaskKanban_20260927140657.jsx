import { normalizeTaskStatus, taskStatuses } from '../../utils/helpers.js';

export default function TaskKanban({ tasks, onDetail, onCycle }) {
  const columns = taskStatuses.map((status) => ({
    label: status,
    dot: status === 'Gözləmədə' ? 'bg-amber-400' : status === 'Icra olunur' ? 'bg-brand-500' : status === 'Pauzada' ? 'bg-violet-500' : status === 'Qəbul olundu' ? 'bg-teal-500' : status === 'Bitmiş' ? 'bg-emerald-500' : 'bg-rose-500',
    badge: status === 'Gözləmədə' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' : status === 'Icra olunur' ? 'bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300' : status === 'Pauzada' ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300' : status === 'Qəbul olundu' ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300' : status === 'Bitmiş' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300',
    tasks: tasks.filter(task => normalizeTaskStatus(task.status) === status),
  }));
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{columns.map(column => <div key={column.label} className="bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col">
    <div className="flex items-center justify-between mb-3 px-1"><h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${column.dot}`} />{column.label}</h3><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${column.badge}`}>{column.tasks.length}</span></div>
    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">{column.tasks.map(task => <div key={task.id} onClick={() => onDetail(task.id)} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition space-y-2 cursor-pointer">
      <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">#{task.id}</span><span className="text-[10px] font-mono text-rose-600 font-semibold">{task.deadline.split(' ')[0]}</span></div>
      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{task.title}</h4><p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{task.message || '-'}</p>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[10px]"><span className="font-medium text-slate-600 dark:text-slate-300">👤 {task.assignee}</span><button onClick={event => { event.stopPropagation(); onCycle(task.id); }} className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Keçir</button></div>
    </div>)}</div>
  </div>)}</div>;
}
