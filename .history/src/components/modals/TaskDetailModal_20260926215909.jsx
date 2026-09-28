import Icon from '../common/Icons.jsx';
import { taskStatuses, statusLabel, statusDots } from '../../utils/helpers.js';

export default function TaskDetailModal({ task, onClose, onStatus, onCycle, onDelete }) {
  const selected = task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tapşırıq detalları"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md overflow-hidden rounded-[30px] border border-emerald-100/80 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.22)] ring-1 ring-emerald-50/70 dark:border-slate-800 dark:bg-slate-900/95 dark:ring-slate-800 animate-modal">
        <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 via-white to-white p-5 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">#{task.id}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{task.title}</h3>
            </div>
            <button onClick={onClose} title="Bağla" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5 text-xs">
          <div>
            <label className="text-slate-400">Mesaj / Təsvir:</label>
            <p className="mt-1.5 rounded-2xl border border-slate-200/80 bg-slate-50 p-3 font-medium text-slate-800 shadow-inner shadow-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
              {task.message || '-'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400">Təyin Edən:</label>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{task.creator}</p>
            </div>
            <div>
              <label className="text-slate-400">İcraçı:</label>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{task.assignee}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400">Yaradılma:</label>
              <p className="mt-1 font-mono text-slate-600 dark:text-slate-400">{task.createdAt}</p>
            </div>
            <div>
              <label className="text-slate-400">Dedlayn:</label>
              <p className="mt-1 font-mono font-bold text-rose-600 dark:text-rose-400">{task.deadline}</p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Status Variantları
            </label>
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100 p-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800">
              {taskStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatus(task.id, status)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 transition ${
                    selected === status
                      ? 'border border-emerald-200 bg-white text-emerald-700 shadow-sm dark:border-emerald-600 dark:bg-slate-700 dark:text-emerald-300'
                      : 'text-slate-500 hover:bg-white/80 dark:text-slate-400 dark:hover:bg-slate-700/70'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDots[status]}`} />
                  {statusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCycle(task.id)}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
            >
              Statusu Dəyiş
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              Sil
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}
