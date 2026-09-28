// import { useEffect, useState } from 'react';
// import Icon from '../common/Icons.jsx';
// import { taskStatuses, statusLabel, statusClasses, statusDots } from '../../utils/helpers.js';

// export default function TaskTable({ tasks, onDetail, onStatus, onChat }) {
//   const [dropdown, setDropdown] = useState(null);
//   useEffect(() => {
//     const close = () => setDropdown(null);
//     document.addEventListener('click', close);
//     return () => document.removeEventListener('click', close);
//   }, []);
//   return (
//     <div className="overflow-visible rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_18px_42px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
//       <div className="overflow-x-auto">
//         <table className="min-w-[950px] w-full border-collapse text-left">
//           <thead>
//             <tr className="border-b border-slate-200/80 bg-slate-50/90 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
//               {['№', 'Task Adı', 'Mesaj / Təsvir', 'Təyin Edən', 'Yaradılma', 'Dedlayn', 'İcraçı', 'Status', 'Əməliyyat'].map((label, i) => (
//                 <th key={label} className={`py-4 ${i === 0 ? 'w-12 pl-6 pr-3 text-center' : i === 8 ? 'pl-4 pr-6 text-right' : 'px-4'}`}>
//                   {label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-xs text-slate-700 dark:text-slate-200">
//             {tasks.map(task => {
//               const status = task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;
//               return <tr key={task.id} className="border-b border-slate-100/80 transition-all duration-200 hover:bg-emerald-50/40 dark:border-slate-800/80 dark:hover:bg-slate-800/50">
//                 <td className="py-4 pl-6 pr-3 font-mono text-[11px] font-bold text-slate-400">#{task.id}</td>
//                 <td className="py-4 px-4 text-sm font-bold text-slate-900 dark:text-white" onClick={() => onDetail(task.id)}>{task.title}</td>
//                 <td className="max-w-xs truncate py-4 px-4 text-slate-600 dark:text-slate-300" onClick={() => onDetail(task.id)}>{task.message || '-'}</td>
//                 <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{task.creator}</td>
//                 <td className="py-4 px-4 font-mono text-[11px] text-slate-500">{task.createdAt}</td>
//                 <td className="py-4 px-4 font-mono text-[11px] font-bold text-rose-600">{task.deadline}</td>
//                 <td className="py-4 px-4 font-bold text-emerald-700 dark:text-emerald-300">{task.assignee}</td>
//                 <td className="py-4 px-4"><div className="relative inline-block text-left" onClick={event => event.stopPropagation()}>
//                   <button type="button" onClick={() => setDropdown(dropdown === task.id ? null : task.id)} className={`inline-flex min-w-[120px] items-center justify-between rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-150 hover:shadow active:scale-[0.98] ${statusClasses[status] || statusClasses['Gözləmədə']}`} title="Statusu dəyişmək üçün vurun"><span className="mr-1 flex items-center gap-1.5 truncate"><span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDots[status]}`} /><span className="truncate">{statusLabel(task.status)}</span></span><Icon name="down" className="h-3.5 w-3.5 shrink-0 opacity-70" /></button>
//                   {dropdown === task.id && <div className="absolute left-0 z-50 mt-1 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-2xl dark:border-slate-700 dark:bg-slate-800 animate-modal">{taskStatuses.map(option => <button key={option} type="button" onClick={() => { onStatus(task.id, option); setDropdown(null); }} className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs transition ${status === option ? 'bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60'}`}><span>{statusLabel(option)}</span>{status === option && <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">✓</span>}</button>)}</div>}
//                 </div></td>
//                 <td className="py-4 pl-4 pr-6 text-right"><div className="flex items-center justify-end gap-1.5"><button onClick={() => onDetail(task.id)} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600" title="Detallar"><Icon name="eye" /></button><button onClick={onChat} className="rounded-lg p-1.5 text-emerald-600 transition hover:bg-emerald-50" title="Söhbətə keç"><Icon name="chat" /></button></div></td>
//               </tr>;
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import Icon from '../common/Icons.jsx';

import {
  taskStatuses,
  statusLabel,
  statusClasses,
  statusDots,
} from '../../utils/helpers.js';

export default function TaskTable({
  tasks,
  onDetail,
  onStatus,
  onChat,
}) {
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    const close = () => setDropdown(null);

    document.addEventListener('click', close);

    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className="relative">

      {/* ========================================= */}
      {/* ANIMATED GREEN BORDER */}
      {/* ========================================= */}

      <svg
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          h-full
          w-full
          overflow-visible
        "
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glow filter */}
          <filter
            id="greenGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Green gradient */}
          <linearGradient
            id="greenBorderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#10b981"
              stopOpacity="0"
            />

            <stop
              offset="35%"
              stopColor="#34d399"
              stopOpacity="0.6"
            />

            <stop
              offset="65%"
              stopColor="#10b981"
              stopOpacity="1"
            />

            <stop
              offset="100%"
              stopColor="#6ee7b7"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Moving light */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="27"
          ry="27"
          fill="none"
          stroke="url(#greenBorderGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="150 1600"
          filter="url(#greenGlow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-1750"
            dur="5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* ========================================= */}
      {/* TABLE CONTAINER */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10
          overflow-visible
          rounded-[28px]
          border
          border-slate-200/80
          bg-white
          shadow-[0_18px_42px_rgba(15,23,42,0.06)]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full border-collapse text-left">

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/80
                  bg-slate-50/90
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-slate-500
                  dark:border-slate-800
                  dark:bg-slate-800/60
                  dark:text-slate-400
                "
              >
                {[
                  '№',
                  'Task Adı',
                  'Mesaj / Təsvir',
                  'Təyin Edən',
                  'Yaradılma',
                  'Dedlayn',
                  'İcraçı',
                  'Status',
                  'Əməliyyat',
                ].map((label, i) => (
                  <th
                    key={label}
                    className={`
                      py-4

                      ${
                        i === 0
                          ? 'w-12 pl-6 pr-3 text-center'
                          : i === 8
                            ? 'pl-4 pr-6 text-right'
                            : 'px-4'
                      }
                    `}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ========================================= */}
            {/* BODY */}
            {/* ========================================= */}

            <tbody className="text-xs text-slate-700 dark:text-slate-200">

              {tasks.map((task) => {

                const status =
                  task.status === 'Tamamlandı'
                    ? 'Bitmiş'
                    : task.status;

                return (
                  <tr
                    key={task.id}
                    className="
                      border-b
                      border-slate-100/80
                      transition-all
                      duration-200
                      last:border-b-0
                      hover:bg-emerald-50/40
                      dark:border-slate-800/80
                      dark:hover:bg-slate-800/50
                    "
                  >

                    {/* ID */}

                    <td
                      className="
                        py-4
                        pl-6
                        pr-3
                        font-mono
                        text-[11px]
                        font-bold
                        text-slate-400
                      "
                    >
                      #{task.id}
                    </td>

                    {/* TASK NAME */}

                    <td
                      onClick={() => onDetail(task.id)}
                      className="
                        cursor-pointer
                        py-4
                        px-4
                        text-sm
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {task.title}
                    </td>

                    {/* MESSAGE */}

                    <td
                      onClick={() => onDetail(task.id)}
                      className="
                        max-w-xs
                        cursor-pointer
                        truncate
                        py-4
                        px-4
                        text-slate-600
                        dark:text-slate-300
                      "
                    >
                      {task.message || '-'}
                    </td>

                    {/* CREATOR */}

                    <td
                      className="
                        py-4
                        px-4
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      {task.creator}
                    </td>

                    {/* CREATED */}

                    <td
                      className="
                        py-4
                        px-4
                        font-mono
                        text-[11px]
                        text-slate-500
                      "
                    >
                      {task.createdAt}
                    </td>

                    {/* DEADLINE */}

                    <td
                      className="
                        py-4
                        px-4
                        font-mono
                        text-[11px]
                        font-bold
                        text-rose-600
                      "
                    >
                      {task.deadline}
                    </td>

                    {/* ASSIGNEE */}

                    <td
                      className="
                        py-4
                        px-4
                        font-bold
                        text-emerald-700
                        dark:text-emerald-300
                      "
                    >
                      {task.assignee}
                    </td>

                    {/* ========================================= */}
                    {/* STATUS */}
                    {/* ========================================= */}

                    <td className="py-4 px-4">

                      <div
                        className="relative inline-block text-left"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >

                        <button
                          type="button"
                          onClick={() =>
                            setDropdown(
                              dropdown === task.id
                                ? null
                                : task.id
                            )
                          }
                          title="Statusu dəyişmək üçün vurun"
                          className={`
                            inline-flex
                            min-w-[120px]
                            items-center
                            justify-between
                            rounded-xl
                            border
                            px-3.5
                            py-1.5
                            text-xs
                            font-semibold
                            shadow-sm
                            transition-all
                            duration-150
                            hover:shadow
                            active:scale-[0.98]

                            ${
                              statusClasses[status] ||
                              statusClasses['Gözləmədə']
                            }
                          `}
                        >

                          <span
                            className="
                              mr-1
                              flex
                              items-center
                              gap-1.5
                              truncate
                            "
                          >

                            <span
                              className={`
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                ${statusDots[status]}
                              `}
                            />

                            <span className="truncate">
                              {statusLabel(task.status)}
                            </span>

                          </span>

                          <Icon
                            name="down"
                            className="
                              h-3.5
                              w-3.5
                              shrink-0
                              opacity-70
                            "
                          />

                        </button>

                        {/* STATUS DROPDOWN */}

                        {dropdown === task.id && (

                          <div
                            className="
                              absolute
                              left-0
                              z-50
                              mt-1
                              w-36
                              overflow-hidden
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              py-1
                              shadow-2xl
                              dark:border-slate-700
                              dark:bg-slate-800
                              animate-modal
                            "
                          >

                            {taskStatuses.map((option) => (

                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  onStatus(
                                    task.id,
                                    option
                                  );

                                  setDropdown(null);
                                }}
                                className={`
                                  flex
                                  w-full
                                  items-center
                                  justify-between
                                  px-3.5
                                  py-2
                                  text-left
                                  text-xs
                                  transition

                                  ${
                                    status === option

                                      ? `
                                        bg-emerald-50
                                        font-bold
                                        text-emerald-700
                                        dark:bg-emerald-950/60
                                        dark:text-emerald-300
                                      `

                                      : `
                                        text-slate-700
                                        hover:bg-slate-50
                                        dark:text-slate-200
                                        dark:hover:bg-slate-700/60
                                      `
                                  }
                                `}
                              >

                                <span>
                                  {statusLabel(option)}
                                </span>

                                {status === option && (

                                  <span
                                    className="
                                      text-xs
                                      font-bold
                                      text-emerald-700
                                      dark:text-emerald-300
                                    "
                                  >
                                    ✓
                                  </span>

                                )}

                              </button>

                            ))}

                          </div>

                        )}

                      </div>

                    </td>

                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <td
                      className="
                        py-4
                        pl-4
                        pr-6
                        text-right
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-1.5
                        "
                      >

                        <button
                          onClick={() =>
                            onDetail(task.id)
                          }
                          className="
                            rounded-lg
                            p-1.5
                            text-slate-500
                            transition
                            hover:bg-emerald-50
                            hover:text-emerald-600
                          "
                          title="Detallar"
                        >
                          <Icon name="eye" />
                        </button>

                        <button
                          onClick={onChat}
                          className="
                            rounded-lg
                            p-1.5
                            text-emerald-600
                            transition
                            hover:bg-emerald-50
                          "
                          title="Söhbətə keç"
                        >
                          <Icon name="chat" />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}