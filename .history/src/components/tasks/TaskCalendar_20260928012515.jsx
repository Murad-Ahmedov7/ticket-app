// import Icon from "../common/Icons.jsx";

// const monthNames = [
//   "Yanvar",
//   "Fevral",
//   "Mart",
//   "Aprel",
//   "May",
//   "İyun",
//   "İyul",
//   "Avqust",
//   "Sentyabr",
//   "Oktyabr",
//   "Noyabr",
//   "Dekabr",
// ];

// export default function TaskCalendar({
//   calendarYear,
//   calendarMonth,
//   onMonth,
//   onReset,
//   onDetail,
//   onCreate,
// }) {
//   const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
//   const days = new Date(calendarYear, calendarMonth + 1, 0).getDate();
//   const previousDays = new Date(calendarYear, calendarMonth, 0).getDate();
//   return (
//     <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => onMonth(-1)}
//               title="Əvvəlki ay"
//               className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
//             >
//               <Icon name="left" />
//             </button>
//             <h3 className="text-base font-black text-slate-900 dark:text-white px-2">
//               {calendarYear} {monthNames[calendarMonth]}
//             </h3>
//             <button
//               onClick={() => onMonth(1)}
//               title="Növbəti ay"
//               className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
//             >
//               <Icon name="right" />
//             </button>
//           </div>
//           <button
//             onClick={onReset}
//             className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition"
//           >
//             Bu gün
//           </button>
//         </div>
//         <span className="text-xs text-slate-500">
//           Halal 12 İnteraktiv Təqvim Sistemi
//         </span>
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 py-1">
//         {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//           <div key={day}>{day}</div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-2 min-h-[480px]">
//         {Array.from({ length: 42 }, (_, i) => {
//           const current = i >= firstDay && i < firstDay + days;
//           const day =
//             i < firstDay
//               ? previousDays - firstDay + i + 1
//               : i >= firstDay + days
//                 ? i - firstDay - days + 1
//                 : i - firstDay + 1;
//           const date = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//           const september =
//             current && calendarYear === 2026 && calendarMonth === 8;
//           return (
//             <div
//               key={i}
//               className={`min-h-[72px] p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between transition hover:border-brand-300 dark:hover:border-brand-700 ${current ? "bg-white dark:bg-slate-800/80" : "opacity-40"}`}
//             >
//               <div className="flex items-center justify-between">
//                 <span
//                   className={`text-xs font-bold ${current ? "text-slate-800 dark:text-slate-200" : "text-slate-400"}`}
//                 >
//                   {day}
//                 </span>
//                 <button
//                   onClick={() => onCreate(date)}
//                   className="opacity-0 hover:opacity-100 p-0.5 rounded text-brand-600 hover:bg-brand-50"
//                   title="Bu günə task əlavə et"
//                 >
//                   +
//                 </button>
//               </div>
//               <div className="mt-1 space-y-1">
//                 {september && day <= 10 && (
//                   <div
//                     onClick={() => onDetail(10)}
//                     className="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1"
//                     title="tur"
//                   >
//                     13:43 - tur
//                   </div>
//                 )}
//                 {september && day === 16 && (
//                   <div
//                     onClick={() => onDetail(112)}
//                     className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1"
//                     title="yenilk"
//                   >
//                     12:00 - yenilk
//                   </div>
//                 )}
//                 {september && day === 25 && (
//                   <div
//                     onClick={() => onDetail(113)}
//                     className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1"
//                     title="nofication"
//                   >
//                     10:14 - nofication
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import Icon from '../common/Icons.jsx';
import { normalizeTaskStatus } from '../../utils/helpers.js';

const monthNames = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'İyun',
  'İyul',
  'Avqust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
];

const weekDays = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

export default function TaskCalendar({
  tasks,
  calendarYear,
  calendarMonth,
  onMonth,
  onReset,
  onDetail,
  onCreate,
}) {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const firstDay = new Date(
    calendarYear,
    calendarMonth,
    1
  ).getDay();

  const days = new Date(
    calendarYear,
    calendarMonth + 1,
    0
  ).getDate();

  const previousDays = new Date(
    calendarYear,
    calendarMonth,
    0
  ).getDate();

  const today = new Date();

  const isToday = (day) =>
    calendarYear === today.getFullYear() &&
    calendarMonth === today.getMonth() &&
    day === today.getDate();

  const getStatusStyle = (status) => {
    const normalizedStatus = normalizeTaskStatus(status);

    if (normalizedStatus === 'Gözləmədə') {
      return `
        bg-amber-50
        text-amber-800
        border-amber-300
        hover:bg-amber-100
        dark:bg-amber-500/15
        dark:text-amber-300
        dark:border-amber-500/40
        dark:hover:bg-amber-500/25
      `;
    }

    if (normalizedStatus === 'Icra olunur') {
      return `
        bg-blue-50
        text-blue-800
        border-blue-300
        hover:bg-blue-100
        dark:bg-blue-500/15
        dark:text-blue-300
        dark:border-blue-500/40
        dark:hover:bg-blue-500/25
      `;
    }

    if (normalizedStatus === 'Pauzada') {
      return `
        bg-violet-50
        text-violet-800
        border-violet-300
        hover:bg-violet-100
        dark:bg-violet-500/15
        dark:text-violet-300
        dark:border-violet-500/40
        dark:hover:bg-violet-500/25
      `;
    }

    if (normalizedStatus === 'Qəbul olundu') {
      return `
        bg-fuchsia-50
        text-fuchsia-800
        border-fuchsia-300
        hover:bg-fuchsia-100
        dark:bg-fuchsia-500/15
        dark:text-fuchsia-300
        dark:border-fuchsia-500/40
        dark:hover:bg-fuchsia-500/25
      `;
    }

    if (normalizedStatus === 'Bitmiş') {
      return `
        bg-emerald-50
        text-emerald-800
        border-emerald-300
        hover:bg-emerald-100
        dark:bg-emerald-500/15
        dark:text-emerald-300
        dark:border-emerald-500/40
        dark:hover:bg-emerald-500/25
      `;
    }

    return `
      bg-rose-50
      text-rose-800
      border-rose-300
      hover:bg-rose-100
      dark:bg-rose-500/15
      dark:text-rose-300
      dark:border-rose-500/40
      dark:hover:bg-rose-500/25
    `;
  };

  const getTaskDate = (deadline) => {
    if (!deadline) return null;

    const datePart = deadline.split(' ')[0];
    const parts = datePart.split('-');

    if (parts.length !== 3) return null;

    const [day, month, year] = parts;

    return `${year}-${month}-${day}`;
  };

  const getTaskTime = (deadline) => {
    if (!deadline) return '';

    const parts = deadline.split(' ');

    return parts[1] || '';
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/80
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-100
          px-5
          py-4
          dark:border-slate-800
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="
              flex
              items-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-1
              dark:border-slate-700
              dark:bg-slate-800/70
            "
          >
            <button
              onClick={() => onMonth(-1)}
              title="Əvvəlki ay"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-slate-500
                transition
                hover:bg-white
                hover:text-slate-900
                hover:shadow-sm
                dark:text-slate-400
                dark:hover:bg-slate-700
                dark:hover:text-white
              "
            >
              <Icon name="left" />
            </button>

            <h3
              className="
                min-w-[160px]
                px-3
                text-center
                text-[15px]
                font-black
                text-slate-900
                dark:text-white
              "
            >
              {calendarYear} {monthNames[calendarMonth]}
            </h3>

            <button
              onClick={() => onMonth(1)}
              title="Növbəti ay"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-slate-500
                transition
                hover:bg-white
                hover:text-slate-900
                hover:shadow-sm
                dark:text-slate-400
                dark:hover:bg-slate-700
                dark:hover:text-white
              "
            >
              <Icon name="right" />
            </button>
          </div>

          <button
            onClick={onReset}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-[11px]
              font-bold
              text-slate-600
              shadow-sm
              transition
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:border-emerald-700
              dark:hover:bg-emerald-950/50
              dark:hover:text-emerald-300
            "
          >
            Bu gün
          </button>
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Halal 12 İnteraktiv Təqvim Sistemi
        </span>
      </div>

      {/* Week days */}
      <div
        className="
          grid
          grid-cols-7
          border-b
          border-slate-100
          bg-slate-50/60
          dark:border-slate-800
          dark:bg-slate-950/40
        "
      >
        {weekDays.map((day) => (
          <div
            key={day}
            className="
              py-3
              text-center
              text-[11px]
              font-bold
              text-slate-400
              dark:text-slate-500
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid min-h-[480px] grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800">
        {Array.from({ length: 42 }, (_, i) => {
          const current =
            i >= firstDay &&
            i < firstDay + days;

          const day =
            i < firstDay
              ? previousDays - firstDay + i + 1
              : i >= firstDay + days
                ? i - firstDay - days + 1
                : i - firstDay + 1;

          const date = `${calendarYear}-${String(
            calendarMonth + 1
          ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          const todayCell =
            current && isToday(day);

          const dayTasks = current
            ? tasks.filter(
                (task) =>
                  getTaskDate(task.deadline) === date
              )
            : [];

          return (
            <div
              key={i}
              className={`
                group
                relative
                min-h-[112px]
                p-2.5
                transition-all
                duration-200
                hover:z-50

                ${
                  current
                    ? `
                      bg-white
                      hover:bg-slate-50
                      dark:bg-slate-900
                      dark:hover:bg-slate-800/80
                    `
                    : `
                      bg-slate-50/60
                      opacity-40
                      dark:bg-slate-950/50
                    `
                }

                ${
                  todayCell
                    ? `
                      ring-2
                      ring-inset
                      ring-emerald-400
                      dark:ring-emerald-500
                    `
                    : ''
                }
              `}
            >
              {/* Day header */}
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`
                    flex
                    h-7
                    min-w-[28px]
                    items-center
                    justify-center
                    rounded-lg
                    px-1.5
                    text-[11px]
                    font-bold

                    ${
                      todayCell
                        ? `
                          bg-emerald-500
                          text-white
                          shadow-sm
                        `
                        : current
                          ? `
                            text-slate-700
                            dark:text-slate-200
                          `
                          : `
                            text-slate-400
                            dark:text-slate-600
                          `
                    }
                  `}
                >
                  {day}
                </span>

                {current && (
                  <button
                    onClick={() => onCreate(date)}
                    title="Bu günə tapşırıq əlavə et"
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-sm
                      font-bold
                      text-slate-400
                      opacity-0
                      transition-all
                      group-hover:opacity-100
                      hover:bg-emerald-100
                      hover:text-emerald-700
                      dark:bg-slate-800
                      dark:text-slate-500
                      dark:hover:bg-emerald-950
                      dark:hover:text-emerald-300
                    "
                  >
                    +
                  </button>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-1.5">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    onMouseEnter={() =>
                      setHoveredTaskId(task.id)
                    }
                    onMouseLeave={() =>
                      setHoveredTaskId(null)
                    }
                    onClick={() => {
                      setHoveredTaskId(null);
                      onDetail(task.id);
                    }}
                    className={`
                      relative
                      z-10
                      cursor-pointer
                      rounded-lg
                      border
                      px-2
                      py-1.5
                      text-[10px]
                      font-bold
                      transition-all
                      hover:z-[60]
                      hover:-translate-y-0.5
                      hover:shadow-sm
                      ${getStatusStyle(task.status)}
                    `}
                  >
                    <div className="truncate">
                      {getTaskTime(task.deadline) && (
                        <span className="mr-1 opacity-60">
                          {getTaskTime(task.deadline)}
                        </span>
                      )}

                      {task.title}
                    </div>

                    {/* Hover preview */}
                    {hoveredTaskId === task.id && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-full
                          z-[100]
                          mt-2
                          min-w-[160px]
                          -translate-x-1/2
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-3
                          py-2.5
                          text-left
                          shadow-xl
                          dark:border-slate-700
                          dark:bg-slate-800
                        "
                      >
                        <div className="mb-2">
                          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Status
                          </p>

                          <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                            {normalizeTaskStatus(task.status)}
                          </p>
                        </div>

                        <div>
                          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            İcraçı
                          </p>

                          <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                            {task.assignee || '—'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {todayCell && (
                <span
                  className="
                    absolute
                    bottom-2
                    right-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-emerald-500
                  "
                >
                  bu gün
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}