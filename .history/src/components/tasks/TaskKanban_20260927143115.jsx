// import { normalizeTaskStatus, taskStatuses } from '../../utils/helpers.js';

// export default function TaskKanban({ tasks, onDetail, onCycle }) {
//   const columns = taskStatuses.map((status) => ({
//     label: status,
//     dot: status === 'Gözləmədə' ? 'bg-amber-400' : status === 'Icra olunur' ? 'bg-sky-500' : status === 'Pauzada' ? 'bg-violet-500' : status === 'Qəbul olundu' ? 'bg-teal-500' : status === 'Bitmiş' ? 'bg-emerald-500' : 'bg-rose-500',
//     badge: status === 'Gözləmədə' ? 'bg-amber-100 text-amber-700' : status === 'Icra olunur' ? 'bg-sky-100 text-sky-700' : status === 'Pauzada' ? 'bg-violet-100 text-violet-700' : status === 'Qəbul olundu' ? 'bg-teal-100 text-teal-700' : status === 'Bitmiş' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700',
//     tasks: tasks.filter(task => normalizeTaskStatus(task.status) === status),
//   }));

//   return (
//     <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
//       {columns.map((column) => (
//         <div
//           key={column.label}
//           className="flex flex-col rounded-[26px] border border-slate-200 bg-slate-100/80 p-3 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
//         >
//           <div className="mb-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 shadow-sm">
//             <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
//               <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
//               {column.label}
//             </h3>
//             <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${column.badge}`}>
//               {column.tasks.length}
//             </span>
//           </div>

//           <div className="flex flex-1 flex-col gap-3">
//             {column.tasks.length === 0 ? (
//               <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 text-center text-[11px] font-medium text-slate-400">
//                 Boş siyahı
//               </div>
//             ) : (
//               column.tasks.map((task) => (
//                 <div
//                   key={task.id}
//                   onClick={() => onDetail(task.id)}
//                   className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
//                 >
//                   <div className="mb-2 flex items-center justify-between gap-2">
//                     <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-extrabold text-slate-500">
//                       #{task.id}
//                     </span>
//                     <span className="text-[11px] font-semibold text-rose-500">
//                       {task.deadline?.split(' ')[0] || '—'}
//                     </span>
//                   </div>

//                   <h4 className="mb-1.5 text-[15px] font-bold leading-snug text-slate-900">
//                     {task.title}
//                   </h4>

//                   <p className="mb-3 line-clamp-2 text-[12px] leading-relaxed text-slate-500">
//                     {task.message || '-'}
//                   </p>

//                   <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
//                     <span className="truncate font-medium text-slate-600">👤 {task.assignee}</span>
//                     <button
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         onCycle(task.id);
//                       }}
//                       className="font-bold text-sky-600 transition hover:text-sky-700"
//                     >
//                       Keçir
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import Icon from '../common/Icons.jsx';
import {
  taskStatuses,
  statusLabel,
  statusDots,
} from '../../utils/helpers.js';

export default function TaskDetailModal({
  task,
  onClose,
  onStatus,
  onCycle,
  onDelete,
}) {
  if (!task) return null;

  const selected =
    task.status === 'Tamamlandı'
      ? 'Bitmiş'
      : task.status;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tapşırıq detalları"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/55
        backdrop-blur-md
        p-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-[28px]
          border border-slate-200/70
          bg-white
          p-6
          shadow-[0_30px_80px_rgba(15,23,42,0.28)]
          dark:border-slate-800
          dark:bg-slate-900
          animate-modal
          space-y-4
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-100
            pb-4
            dark:border-slate-800
          "
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="
                shrink-0
                rounded-lg
                bg-emerald-50
                px-2.5 py-1
                font-mono
                text-[11px]
                font-bold
                text-emerald-700
                dark:bg-emerald-950/50
                dark:text-emerald-300
              "
            >
              #{task.id}
            </span>

            <h3
              className="
                truncate
                text-base
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              {task.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            title="Bağla"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              text-slate-400
              transition-all
              hover:bg-slate-100
              hover:text-slate-700
              active:scale-95
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <Icon
              name="close"
              className="h-4.5 w-4.5"
            />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4 text-xs">
          {/* DESCRIPTION */}
          <div>
            <label
              className="
                mb-1.5 block
                text-[11px]
                font-semibold
                text-slate-400
              "
            >
              Mesaj / Təsvir:
            </label>

            <p
              className="
                mt-0.5
                rounded-2xl
                border border-slate-100
                bg-slate-50/90
                p-3.5
                font-medium
                leading-relaxed
                text-slate-700
                dark:border-slate-800
                dark:bg-slate-800/60
                dark:text-slate-200
              "
            >
              {task.message || '-'}
            </p>
          </div>

          {/* PEOPLE */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-white
                p-3.5
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <label className="text-[11px] text-slate-400">
                Təyin Edən:
              </label>

              <p
                className="
                  mt-1
                  font-semibold
                  text-slate-800
                  dark:text-slate-200
                "
              >
                {task.creator}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-white
                p-3.5
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <label className="text-[11px] text-slate-400">
                İcraçı:
              </label>

              <p
                className="
                  mt-1
                  font-semibold
                  text-emerald-700
                  dark:text-emerald-300
                "
              >
                {task.assignee}
              </p>
            </div>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-slate-50/60
                p-3.5
                dark:border-slate-800
                dark:bg-slate-800/30
              "
            >
              <label className="text-[11px] text-slate-400">
                Yaradılma:
              </label>

              <p
                className="
                  mt-1
                  font-mono
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {task.createdAt}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-rose-50/40
                p-3.5
                dark:border-slate-800
                dark:bg-rose-950/10
              "
            >
              <label className="text-[11px] text-slate-400">
                Dedlayn:
              </label>

              <p
                className="
                  mt-1
                  font-mono
                  font-bold
                  text-rose-600
                "
              >
                {task.deadline}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label
              className="
                mb-2 block
                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-500
                dark:text-slate-400
              "
            >
              Status Variantları (Sürüşdürməli Seçim):
            </label>

            <div
              className="
                grid grid-cols-3
                gap-2
                rounded-2xl
                border border-slate-200/80
                bg-slate-100/70
                p-2
                text-xs
                font-semibold
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              {taskStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    onStatus(task.id, status)
                  }
                  className={`
                    flex items-center justify-center
                    gap-1.5
                    rounded-xl
                    px-2 py-2.5
                    transition-all duration-200
                    active:scale-[0.98]

                    ${
                      selected === status
                        ? `
                          border border-emerald-200
                          bg-white
                          text-emerald-700
                          shadow-sm
                          dark:border-emerald-700
                          dark:bg-slate-700
                          dark:text-emerald-300
                        `
                        : `
                          border border-transparent
                          text-slate-500
                          hover:bg-white/70
                          hover:text-slate-700
                          dark:text-slate-400
                          dark:hover:bg-slate-700/60
                        `
                    }
                  `}
                >
                  <span
                    className={`
                      h-1.5 w-1.5
                      shrink-0
                      rounded-full
                      ${statusDots[status]}
                    `}
                  />

                  {statusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex items-center justify-between
            border-t border-slate-100
            pt-4
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCycle(task.id)}
              className="
                rounded-xl
                border border-emerald-200
                bg-emerald-50
                px-3.5 py-2
                text-xs
                font-bold
                text-emerald-700
                transition-all
                hover:bg-emerald-100
                active:scale-[0.98]
                dark:border-emerald-800
                dark:bg-emerald-950/40
                dark:text-emerald-300
              "
            >
              Statusu Dəyiş
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="
                rounded-xl
                px-3 py-2
                text-xs
                font-semibold
                text-rose-600
                transition-all
                hover:bg-rose-50
                active:scale-[0.98]
                dark:hover:bg-rose-950/40
              "
            >
              Sil
            </button>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-slate-900
              px-4 py-2
              text-xs
              font-bold
              text-white
              shadow-sm
              transition-all
              hover:bg-slate-800
              active:scale-[0.98]
              dark:bg-slate-700
              dark:hover:bg-slate-600
            "
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}