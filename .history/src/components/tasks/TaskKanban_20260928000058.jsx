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



{/* Tasks */}
<div
  className={`flex flex-col gap-3 ${
    column.tasks.length > 4
      ? `
        max-h-[660px]
        overflow-y-auto
        pr-2
        [scrollbar-width:thin]
        [scrollbar-color:rgb(71_85_105)_transparent]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        [&::-webkit-scrollbar-thumb:hover]:bg-slate-500
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

      <p className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
        Bu mərhələdə tapşırıq yoxdur
      </p>

      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
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
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
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

            <span className="truncate text-[12px] font-semibold text-slate-600 dark:text-slate-300">
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