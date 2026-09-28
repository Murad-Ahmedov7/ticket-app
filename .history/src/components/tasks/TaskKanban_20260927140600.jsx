import { normalizeTaskStatus, taskStatuses } from '../../utils/helpers.js';

export default function TaskKanban({ tasks, onDetail, onCycle }) {
  const columns = taskStatuses.map((status) => ({
    label: status,
    dot: status === 'Gözləmədə' ? 'bg-amber-400' : status === 'Icra olunur' ? 'bg-sky-500' : status === 'Pauzada' ? 'bg-violet-500' : status === 'Qəbul olundu' ? 'bg-teal-500' : status === 'Bitmiş' ? 'bg-emerald-500' : 'bg-rose-500',
    badge: status === 'Gözləmədə' ? 'bg-amber-100 text-amber-700' : status === 'Icra olunur' ? 'bg-sky-100 text-sky-700' : status === 'Pauzada' ? 'bg-violet-100 text-violet-700' : status === 'Qəbul olundu' ? 'bg-teal-100 text-teal-700' : status === 'Bitmiş' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700',
    tasks: tasks.filter(task => normalizeTaskStatus(task.status) === status),
  }));

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {columns.map((column) => (
        <div
          key={column.label}
          className="flex min-h-[360px] flex-col rounded-2xl border border-slate-200 bg-slate-100/80 p-3 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
        >
          <div className="mb-3 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
              <h3 className="text-sm font-bold text-slate-800">{column.label}</h3>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${column.badge}`}>
              {column.tasks.length}
            </span>
          </div>

          <div className="space-y-3">
            {column.tasks.length === 0 ? (
              <div className="flex min-h-[110px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 text-[11px] font-medium text-slate-400">
                Boş siyahı
              </div>
            ) : (
              column.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onDetail(task.id)}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500">
                      #{task.id}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-500">
                      {task.deadline?.split(' ')[0] || '—'}
                    </span>
                  </div>

                  <h4 className="mb-2 text-sm font-bold leading-snug text-slate-900">
                    {task.title}
                  </h4>

                  <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                    {task.message || '-'}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                    <span className="truncate font-medium text-slate-600">👤 {task.assignee}</span>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onCycle(task.id);
                      }}
                      className="font-bold text-sky-600 transition hover:text-sky-700"
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
