import { normalizeTaskStatus, taskStatuses } from '../../utils/helpers.js';

export default function TaskKanban({ tasks, onDetail, onCycle }) {
  const columns = taskStatuses.map((status) => ({
    label: status,
    dot: status === 'Gözləmədə' ? 'bg-amber-400' : status === 'Icra olunur' ? 'bg-brand-500' : status === 'Pauzada' ? 'bg-violet-500' : status === 'Qəbul olundu' ? 'bg-teal-500' : status === 'Bitmiş' ? 'bg-emerald-500' : 'bg-rose-500',
    badge: status === 'Gözləmədə' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' : status === 'Icra olunur' ? 'bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300' : status === 'Pauzada' ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300' : status === 'Qəbul olundu' ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300' : status === 'Bitmiş' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300',
    tasks: tasks.filter(task => normalizeTaskStatus(task.status) === status),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((column) => (
        <div
          key={column.label}
          className="flex min-h-[360px] flex-col rounded-3xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
              {column.label}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${column.badge}`}>
              {column.tasks.length}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {column.tasks.length === 0 ? (
              <div className="flex min-h-[140px] flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 px-4 text-center text-[11px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800/30 dark:text-slate-500">
                Boş siyahı
              </div>
            ) : (
              column.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onDetail(task.id)}
                  className="cursor-pointer space-y-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                      #{task.id}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-rose-500">
                      {task.deadline?.split(' ')[0] || '—'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {task.title}
                  </h4>

                  <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {task.message || '-'}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] dark:border-slate-700/60">
                    <span className="truncate font-medium text-slate-600 dark:text-slate-300">
                      👤 {task.assignee}
                    </span>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onCycle(task.id);
                      }}
                      className="font-bold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      Keçir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
