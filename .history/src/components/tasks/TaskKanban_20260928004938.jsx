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



import {
  normalizeTaskStatus,
  taskStatuses,
} from '../../utils/helpers.js';

export default function TaskKanban({ tasks, onDetail, onCycle }) {
  const getInitials = (name = '') => {
    return name
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
  };

  const getDeadlineStyle = (deadline) => {
    if (!deadline) {
      return 'text-slate-400 dark:text-slate-500';
    }

    const datePart = deadline.split(' ')[0];
    const parts = datePart.split('-');

    if (parts.length !== 3) {
      return 'text-slate-500 dark:text-slate-400';
    }

    const [day, month, year] = parts;

    const deadlineDate = new Date(
      `${year}-${month}-${day}T23:59:59`
    );

    const today = new Date();

    const difference = deadlineDate - today;

    const daysLeft = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return `
        bg-rose-50
        text-rose-500
        dark:bg-rose-500/10
        dark:text-rose-400
      `;
    }

    if (daysLeft <= 3) {
      return `
        bg-amber-50
        text-amber-600
        dark:bg-amber-500/10
        dark:text-amber-400
      `;
    }

    return `
      bg-slate-100
      text-slate-500
      dark:bg-slate-800
      dark:text-slate-300
    `;
  };

  const columns = taskStatuses.map((status) => {
    const styles =
      status === 'Gözləmədə'
        ? {
            dot: 'bg-amber-500',
            badge:
              'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
            background:
              'bg-amber-50/40 dark:bg-amber-500/[0.06]',
            border:
              'border-amber-200/70 dark:border-amber-500/30',
            accent: 'bg-amber-500',
            avatar:
              'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
          }
        : status === 'Icra olunur'
          ? {
              dot: 'bg-blue-500',
              badge:
                'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
              background:
                'bg-blue-50/40 dark:bg-blue-500/[0.06]',
              border:
                'border-blue-200/70 dark:border-blue-500/30',
              accent: 'bg-blue-500',
              avatar:
                'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
            }
          : status === 'Pauzada'
            ? {
                dot: 'bg-violet-500',
                badge:
                  'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
                background:
                  'bg-violet-50/40 dark:bg-violet-500/[0.06]',
                border:
                  'border-violet-200/70 dark:border-violet-500/30',
                accent: 'bg-violet-500',
                avatar:
                  'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
              }
            : status === 'Qəbul olundu'
              ? {
                  dot: 'bg-fuchsia-500',
                  badge:
                    'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
                  background:
                    'bg-fuchsia-50/40 dark:bg-fuchsia-500/[0.06]',
                  border:
                    'border-fuchsia-200/70 dark:border-fuchsia-500/30',
                  accent: 'bg-fuchsia-500',
                  avatar:
                    'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
                }
              : status === 'Bitmiş'
                ? {
                    dot: 'bg-emerald-500',
                    badge:
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
                    background:
                      'bg-emerald-50/40 dark:bg-emerald-500/[0.06]',
                    border:
                      'border-emerald-200/70 dark:border-emerald-500/30',
                    accent: 'bg-emerald-500',
                    avatar:
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
                  }
                : {
                    dot: 'bg-rose-600',
                    badge:
                      'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
                    background:
                      'bg-rose-50/40 dark:bg-rose-500/[0.06]',
                    border:
                      'border-rose-200/70 dark:border-rose-500/30',
                    accent: 'bg-rose-600',
                    avatar:
                      'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
                  };

    return {
      label: status,
      ...styles,
      tasks: tasks.filter(
        (task) =>
          normalizeTaskStatus(task.status) === status
      ),
    };
  });

  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
      {columns.map((column) => (
        <div
          key={column.label}
          className={`
            flex flex-col
            rounded-[24px]
            border
            p-3
            transition-colors
            ${column.background}
            ${column.border}
          `}
        >
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-center justify-between px-1 py-1">
              <h3
                className="
                  flex items-center gap-2
                  text-[14px]
                  font-bold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                <span
                  className={`
                    h-2.5 w-2.5
                    rounded-full
                    shadow-sm
                    ${column.dot}
                  `}
                />

                {column.label}
              </h3>

              <span
                className={`
                  min-w-[24px]
                  rounded-full
                  px-2 py-0.5
                  text-center
                  text-[11px]
                  font-extrabold
                  ${column.badge}
                `}
              >
                {column.tasks.length}
              </span>
            </div>

            <div
              className={`
                mt-2
                h-[2px]
                w-full
                rounded-full
                opacity-40
                ${column.accent}
              `}
            />
          </div>

          {/* Tasks */}
          <div
            className={`flex flex-col gap-3 ${
              column.tasks.length > 4
                ? `
                  max-h-[660px]
                  overflow-y-auto
                  pr-2

                  [scrollbar-width:thin]
                  [scrollbar-color:rgb(148_163_184)_transparent]

                  dark:[scrollbar-color:rgb(71_85_105)_transparent]

                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-transparent

                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-slate-300

                  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400

                  dark:[&::-webkit-scrollbar-thumb]:bg-slate-600/70
                  dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
                `
                : ''
            }`}
          >
            {column.tasks.length === 0 ? (
              <div
                className="
                  flex min-h-[320px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-slate-300/80
                  bg-white/40
                  px-4
                  text-center
                  dark:border-slate-700
                  dark:bg-slate-900/40
                "
              >
                <div
                  className="
                    mb-3
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-lg
                    text-slate-500
                    shadow-sm
                    dark:bg-slate-800
                    dark:text-slate-300
                    dark:shadow-none
                  "
                >
                  ✓
                </div>

                <p
                  className="
                    text-[13px]
                    font-semibold
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  Bu mərhələdə tapşırıq yoxdur
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Yeni tapşırıqlar əlavə olunduqda burada görünəcək
                </p>
              </div>
            ) : (
              column.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onDetail(task.id)}
                  className="
                    group
                    relative
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/80
                    bg-white
                    p-4
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-slate-200
                    hover:shadow-lg

                    dark:border-slate-700/80
                    dark:bg-slate-900
                    dark:shadow-none
                    dark:hover:border-slate-600
                    dark:hover:bg-slate-800/90
                    dark:hover:shadow-xl
                    dark:hover:shadow-black/20
                  "
                >
                  {/* Accent */}
                  <div
                    className={`
                      absolute
                      bottom-3
                      left-0
                      top-3
                      w-[3px]
                      rounded-r-full
                      ${column.accent}
                    `}
                  />

                  {/* ID + deadline */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className="
                        rounded-md
                        bg-slate-100
                        px-2 py-1
                        font-mono
                        text-[11px]
                        font-extrabold
                        tracking-wide
                        text-slate-500
                        dark:bg-slate-800
                        dark:text-slate-400
                      "
                    >
                      TASK-{task.id}
                    </span>

                    <span
                      className={`
                        rounded-lg
                        px-2 py-1
                        text-[11px]
                        font-bold
                        ${getDeadlineStyle(task.deadline)}
                      `}
                    >
                      {task.deadline?.split(' ')[0] || '—'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className="
                      mb-2
                      text-[15px]
                      font-extrabold
                      leading-snug
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {task.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="
                      mb-4
                      line-clamp-2
                      min-h-[40px]
                      text-[13px]
                      leading-relaxed
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {task.message || 'Açıqlama yoxdur'}
                  </p>

                  {/* Bottom */}
                  <div
                    className="
                      flex items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-3
                      dark:border-slate-800
                    "
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className={`
                          flex h-8 w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[11px]
                          font-extrabold
                          ${column.avatar}
                        `}
                      >
                        {getInitials(task.assignee) || '?'}
                      </div>

                      <span
                        className="
                          truncate
                          text-[12px]
                          font-semibold
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {task.assignee}
                      </span>
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onCycle(task.id);
                      }}
                      className="
                        ml-3
                        flex h-8 w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-50
                        text-sm
                        font-bold
                        text-slate-500
                        transition-all
                        duration-200
                        hover:bg-slate-900
                        hover:text-white
                        group-hover:translate-x-0.5

                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:hover:bg-slate-700
                        dark:hover:text-white
                      "
                      title="Növbəti statusa keçir"
                    >
                      →
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