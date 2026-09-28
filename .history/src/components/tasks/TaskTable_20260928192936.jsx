

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../common/Icons.jsx';
import {
  taskStatuses,
  statusLabel,
} from '../../utils/helpers.js';

export default function TaskTable({
  tasks,
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
      dot: 'bg-amber-500',
      button:
        'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/40',
      selected:
        'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
    },

    'Icra olunur': {
      dot: 'bg-blue-500',
      button:
        'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/40',
      selected:
        'bg-blue-50 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
    },

    'Pauzada': {
      dot: 'bg-violet-500',
      button:
        'bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/40',
      selected:
        'bg-violet-50 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
    },

    'Qəbul olundu': {
      dot: 'bg-fuchsia-500',
      button:
        'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-fuchsia-500/40',
      selected:
        'bg-fuchsia-50 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
    },

    'Bitmiş': {
      dot: 'bg-emerald-500',
      button:
        'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40',
      selected:
        'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
    },

    'Silinmiş': {
      dot: 'bg-rose-600',
      button:
        'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/40',
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
    <div className="relative">
      {/* NEON BORDER EFFECT */}
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      >
        <defs>
          <filter
            id="movingGlow"
            x="-50%"
            y="-100%"
            width="200%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="2.2"
              result="blurStrong"
            />

            <feGaussianBlur
              stdDeviation="0.8"
              result="blurSoft"
            />

            <feMerge>
              <feMergeNode in="blurStrong" />
              <feMergeNode in="blurSoft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="baseGlow"
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
          >
            <feGaussianBlur
              stdDeviation="0.5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient
            id="movingGreen"
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
              offset="45%"
              stopColor="#10b981"
              stopOpacity="0.06"
            />

            <stop
              offset="72%"
              stopColor="#34d399"
              stopOpacity="0.25"
            />

            <stop
              offset="90%"
              stopColor="#6ee7b7"
              stopOpacity="0.8"
            />

            <stop
              offset="100%"
              stopColor="#ecfdf5"
              stopOpacity="1"
            />
          </linearGradient>
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="27.5"
          ry="27.5"
          pathLength="1000"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.1"
          vectorEffect="non-scaling-stroke"
          filter="url(#baseGlow)"
        />

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="27.5"
          ry="27.5"
          pathLength="1000"
          fill="none"
          stroke="url(#movingGreen)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="260 740"
          vectorEffect="non-scaling-stroke"
          filter="url(#movingGlow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-1000"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="27.5"
          ry="27.5"
          pathLength="1000"
          fill="none"
          stroke="#a7f3d0"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="55 945"
          vectorEffect="non-scaling-stroke"
          filter="url(#movingGlow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="-205"
            to="-1205"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* MAIN TABLE */}
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
            {/* HEADER */}
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/80
                  bg-slate-50/90
                  text-[11px]
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
                    className={`py-4 ${
                      i === 0
                        ? 'w-12 pl-6 pr-3 text-center'
                        : i === 8
                          ? 'pl-4 pr-6 text-right'
                          : 'px-4'
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-[13px] text-slate-700 dark:text-slate-200">
              {tasks.map((task) => {
                const status =
                  task.status === 'Tamamlandı'
                    ? 'Bitmiş'
                    : task.status;

                const colors =
                  statusColors[status] ||
                  statusColors['Gözləmədə'];

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
                    <td className="py-4 pl-6 pr-3 font-mono text-[12px] font-bold text-slate-400">
                      #{task.id}
                    </td>

                    {/* TASK NAME */}
                    <td
                      className="cursor-pointer py-4 px-4 text-sm font-bold text-slate-900 dark:text-white"
                      onClick={() => onDetail(task.id)}
                    >
                      {task.title}
                    </td>

                    {/* MESSAGE */}
                    <td
                      className="max-w-xs cursor-pointer truncate py-4 px-4 text-slate-600 dark:text-slate-300"
                      onClick={() => onDetail(task.id)}
                    >
                      {task.message || '-'}
                    </td>

                    {/* CREATOR */}
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      {task.creator}
                    </td>

                    {/* CREATED DATE */}
                    <td className="py-4 px-4 font-mono text-[12px] text-slate-500">
                      {task.createdAt}
                    </td>

                    {/* DEADLINE */}
                    <td className="py-4 px-4 font-mono text-[12px] font-bold text-rose-600">
                      {task.deadline}
                    </td>

                    {/* ASSIGNEE */}
                    <td className="py-4 px-4 font-bold text-emerald-700 dark:text-emerald-300">
                      {task.assignee}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-4">
                      <div
                        className="relative inline-block text-left"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(event) =>
                            openDropdown(event, task.id)
                          }
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
                            ${colors.button}
                          `}
                          title="Statusu dəyişmək üçün vurun"
                        >
                          <span className="mr-1 flex items-center gap-1.5 truncate">
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${colors.dot}`}
                            />

                            <span className="truncate">
                              {statusLabel(task.status)}
                            </span>
                          </span>

                          <Icon
                            name="down"
                            className="h-3.5 w-3.5 shrink-0 opacity-70"
                          />
                        </button>
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onDetail(task.id)}
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

      {/* STATUS DROPDOWN PORTAL */}
      {dropdown &&
        createPortal(
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
            className="
              z-[9999]
              w-40
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
            {(() => {
              const task = tasks.find(
                (item) => item.id === dropdown
              );

              if (!task) return null;

              const status =
                task.status === 'Tamamlandı'
                  ? 'Bitmiş'
                  : task.status;

              return taskStatuses.map((option) => {
                const optionColors =
                  statusColors[option] ||
                  statusColors['Gözləmədə'];

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onStatus(task.id, option);
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
                          ? `${optionColors.selected} font-bold`
                          : `
                            text-slate-700
                            hover:bg-slate-50
                            dark:text-slate-200
                            dark:hover:bg-slate-700/60
                          `
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${optionColors.dot}`}
                      />

                      {statusLabel(option)}
                    </span>

                    {status === option && (
                      <span className="font-bold">
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