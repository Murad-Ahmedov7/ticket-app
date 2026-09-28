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
import { createPortal } from 'react-dom';
import Icon from '../common/Icons.jsx';
import {
  taskStatuses,
  statusLabel,
} from '../../utils/helpers.js';

export default function TaskTable({
  tasks = [],
  onDetail,
  onStatus,
  onChat,
}) {
  const [dropdown, setDropdown] = useState(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const statusColors = {
    'Gözləmədə': {
      dot: 'bg-amber-400 ring-amber-400/30',
      button:
        'bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/40',
      selected:
        'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
    },

    'Icra olunur': {
      dot: 'bg-sky-500 ring-sky-500/30',
      button:
        'bg-sky-500/10 text-sky-700 border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/40',
      selected:
        'bg-sky-50 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
    },

    'Pauzada': {
      dot: 'bg-violet-500 ring-violet-500/30',
      button:
        'bg-violet-500/10 text-violet-700 border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/40',
      selected:
        'bg-violet-50 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
    },

    'Qəbul olundu': {
      dot: 'bg-fuchsia-500 ring-fuchsia-500/30',
      button:
        'bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-500/30 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-fuchsia-500/40',
      selected:
        'bg-fuchsia-50 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
    },

    'Bitmiş': {
      dot: 'bg-emerald-500 ring-emerald-500/30',
      button:
        'bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40',
      selected:
        'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
    },

    'Silinmiş': {
      dot: 'bg-rose-500 ring-rose-500/30',
      button:
        'bg-rose-500/10 text-rose-700 border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/40',
      selected:
        'bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
    },
  };

  useEffect(() => {
    const close = () => setDropdown(null);

    document.addEventListener('click', close);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);

    return () => {
      document.removeEventListener('click', close);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, []);

  const openDropdown = (event, taskId) => {
    event.stopPropagation();

    if (dropdown === taskId) {
      setDropdown(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 6,
      left: rect.left,
    });

    setDropdown(taskId);
  };

  return (
    <div className="relative group/table">
      {/* ƏSAS CƏDVƏL KARTI (Glassmorphism & Dərin kölgə) */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90 transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse text-left">
            {/* BAŞLIQ ZOLAĞI */}
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {[
                  '№',
                  'Tapşırığın Adı',
                  'Mesaj / Təsvir',
                  'Təyin Edən',
                  'Tarix',
                  'Dedlayn',
                  'İcraçı',
                  'Status',
                  'Əməliyyat',
                ].map((label, i) => (
                  <th
                    key={label}
                    className={`py-3.5 ${
                      i === 0
                        ? 'w-14 pl-5 pr-2 text-center'
                        : i === 8
                        ? 'pl-3 pr-5 text-right'
                        : 'px-3.5'
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* CƏDVƏL GÖVDƏSİ */}
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 dark:divide-slate-800 dark:text-slate-200">
              {tasks.map((task) => {
                const status =
                  task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;

                const colors =
                  statusColors[status] || statusColors['Gözləmədə'];

                return (
                  <tr
                    key={task.id}
                    className="group relative transition-all duration-150 hover:bg-teal-50/30 dark:hover:bg-teal-950/15"
                  >
                    {/* ID */}
                    <td className="py-3.5 pl-5 pr-2 text-center font-mono text-[11px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors">
                      #{task.id}
                    </td>

                    {/* TASK ADI */}
                    <td
                      className="cursor-pointer py-3.5 px-3.5 font-bold text-slate-900 dark:text-white transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-300"
                      onClick={() => onDetail(task.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-teal-500 transition-colors" />
                        <span className="truncate max-w-[200px]" title={task.title}>
                          {task.title}
                        </span>
                      </div>
                    </td>

                    {/* MESAJ / TƏSVİR */}
                    <td
                      className="max-w-xs cursor-pointer truncate py-3.5 px-3.5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors"
                      onClick={() => onDetail(task.id)}
                    >
                      {task.message || '—'}
                    </td>

                    {/* TƏYİN EDƏN */}
                    <td className="py-3.5 px-3.5 font-medium text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          {task.creator ? task.creator.charAt(0).toUpperCase() : '?'}
                        </span>
                        <span className="truncate">{task.creator}</span>
                      </div>
                    </td>

                    {/* YARADILMA */}
                    <td className="py-3.5 px-3.5 font-mono text-[11px] text-slate-400">
                      {task.createdAt}
                    </td>

                    {/* DEDLAYN */}
                    <td className="py-3.5 px-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50">
                        {task.deadline}
                      </span>
                    </td>

                    {/* İCRAÇI */}
                    <td className="py-3.5 px-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50/80 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200/60 font-semibold text-xs shadow-2xs">
                        <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-black">
                          {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'İ'}
                        </span>
                        <span className="truncate max-w-[110px]">{task.assignee}</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-3.5">
                      <div
                        className="relative inline-block text-left"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(event) => openDropdown(event, task.id)}
                          className={`
                            inline-flex min-w-[125px] items-center justify-between
                            rounded-xl border px-3 py-1.5 text-xs font-bold
                            shadow-xs transition-all duration-200 hover:shadow-sm
                            active:scale-95 cursor-pointer backdrop-blur-xs
                            ${colors.button}
                          `}
                          title="Statusu dəyişmək üçün vurun"
                        >
                          <span className="mr-1 flex items-center gap-2 truncate">
                            <span className={`h-2 w-2 shrink-0 rounded-full ring-2 ${colors.dot}`} />
                            <span className="truncate">
                              {statusLabel(task.status)}
                            </span>
                          </span>

                          <Icon
                            name="down"
                            className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-y-0.5"
                          />
                        </button>
                      </div>
                    </td>

                    {/* ƏMƏLİYYATLAR */}
                    <td className="py-3.5 pl-3 pr-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onDetail(task.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 transition-all active:scale-90 cursor-pointer"
                          title="Detallara bax"
                        >
                          <Icon name="eye" className="w-4 h-4" />
                        </button>

                        <button
                          onClick={onChat}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 transition-all active:scale-90 cursor-pointer"
                          title="Söhbətə keç"
                        >
                          <Icon name="chat" className="w-4 h-4" />
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

      {/* STATUS DROPDOWN PORTAL (Glassmorphism & Zərif kölgə) */}
      {dropdown &&
        createPortal(
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
            className="z-[9999] w-44 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-1.5 shadow-2xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-800/95 transition-all"
          >
            {(() => {
              const task = tasks.find((item) => item.id === dropdown);
              if (!task) return null;

              const status =
                task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;

              return taskStatuses.map((option) => {
                const optionColors =
                  statusColors[option] || statusColors['Gözləmədə'];

                const isCurrent = status === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onStatus(task.id, option);
                      setDropdown(null);
                    }}
                    className={`
                      flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold
                      transition-all duration-150 cursor-pointer
                      ${
                        isCurrent
                          ? `${optionColors.selected} font-bold shadow-2xs`
                          : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-700/60'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${optionColors.dot}`} />
                      {statusLabel(option)}
                    </span>

                    {isCurrent && (
                      <span className="text-xs font-black text-teal-600 dark:text-teal-400">
                        ✓
                      </span>
                    )}
                  </button>
                );
              });
            })()}
          </div>,
          document.body
        )}
    </div>
  );
}