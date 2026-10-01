


import { useState } from 'react';
import Icon from '../common/Icons.jsx';
import { normalizeTaskStatus, acceptedStatusStyles } from '../../utils/helpers.js';

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
      return `${acceptedStatusStyles.surface} ${acceptedStatusStyles.border} ${acceptedStatusStyles.hover}`;
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
                hover:z-20

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
                      hover:z-30
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
                          z-40
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
