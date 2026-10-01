import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../common/Icons.jsx";
import {
  taskStatuses,
  statusLabel,
  acceptedStatusStyles,
} from "../../utils/helpers.js";

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
    "Gözləmədə": {
      dot: "bg-amber-500",
      button:
        "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/40",
      selected:
        "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    },

    "Icra olunur": {
      dot: "bg-blue-500",
      button:
        "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/40",
      selected:
        "bg-blue-50 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
    },

    "Pauzada": {
      dot: "bg-violet-500",
      button:
        "bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/40",
      selected:
        "bg-violet-50 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
    },

    "Qəbul olundu": {
      dot: acceptedStatusStyles.dot,
      button: `${acceptedStatusStyles.surface} ${acceptedStatusStyles.border}`,
      selected: acceptedStatusStyles.surface,
      idle: `${acceptedStatusStyles.text} ${acceptedStatusStyles.hover}`,
    },

    "Bitmiş": {
      dot: "bg-emerald-500",
      button:
        "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40",
      selected:
        "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    },

    "Silinmiş": {
      dot: "bg-rose-600",
      button:
        "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/40",
      selected:
        "bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
    },
  };

  useEffect(() => {
    const close = () => setDropdown(null);

    document.addEventListener("click", close);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);

    return () => {
      document.removeEventListener("click", close);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
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
    <div className="relative task-table-enter">

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
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                  dark:border-slate-800
                  dark:bg-slate-800/60
                  dark:text-slate-400
                "
              >
                {[
                  "№",
                  "Task Adı",
                  "Mesaj / Təsvir",
                  "Təyin Edən",
                  "Yaradılma",
                  "Dedlayn",
                  "İcraçı",
                  "Status",
                  "Əməliyyat",
                ].map((label, i) => (
                  <th
                    key={label}
                    className={`py-4 ${
                      i === 0
                        ? "w-12 pl-6 pr-3 text-center"
                        : i === 8
                        ? "pl-4 pr-6 text-right"
                        : "px-4"
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-sm text-slate-700 dark:text-slate-200">
              {tasks.map((task, index) => {
                const status =
                  task.status === "Tamamlandı"
                    ? "Bitmiş"
                    : task.status;

                const colors =
                  statusColors[status] ||
                  statusColors["Gözləmədə"];

                return (
                  <tr
                    key={task.id}
                    style={{
                      animationDelay: `${100 + index * 75}ms`,
                    }}
                    className="
                      task-row-enter
                      border-b
                      border-slate-100/80
                      transition-colors
                      duration-200
                      last:border-b-0
                      hover:bg-emerald-50/40
                      dark:border-slate-800/80
                      dark:hover:bg-slate-800/50
                    "
                  >
                    {/* ID */}
                    <td className="py-4 pl-6 pr-3 font-mono text-[13px] font-bold text-slate-400">
                      #{task.id}
                    </td>

                    {/* TASK NAME */}
                    <td
                      className="
                        cursor-pointer
                        py-4
                        px-4
                        text-[15px]
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                      onClick={() => onDetail(task.id)}
                    >
                      {task.title}
                    </td>

                    {/* MESSAGE */}
                    <td
                      className="
                        max-w-xs
                        cursor-pointer
                        truncate
                        py-4
                        px-4
                        text-sm
                        text-slate-600
                        dark:text-slate-300
                      "
                      onClick={() => onDetail(task.id)}
                    >
                      {task.message || "-"}
                    </td>

                    {/* CREATOR */}
                    <td className="py-4 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {task.creator}
                    </td>

                    {/* CREATED DATE */}
                    <td className="py-4 px-4 font-mono text-[13px] text-slate-500">
                      {task.createdAt}
                    </td>

                    {/* DEADLINE */}
                    <td className="py-4 px-4 font-mono text-[13px] font-bold text-rose-600">
                      {task.deadline}
                    </td>

                    {/* ASSIGNEE */}
                    <td className="py-4 px-4 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {task.assignee}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-4">
                      <div
                        className="relative inline-block text-left"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <button
                          type="button"
                          onClick={(event) =>
                            openDropdown(event, task.id)
                          }
                          className={`
                            inline-flex
                            min-w-[130px]
                            items-center
                            justify-between
                            rounded-xl
                            border
                            px-3.5
                            py-2
                            text-[13px]
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
                            p-2
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
                            p-2
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
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
            className="
              z-[9999]
              w-44
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
                task.status === "Tamamlandı"
                  ? "Bitmiş"
                  : task.status;

              return taskStatuses.map((option) => {
                const optionColors =
                  statusColors[option] ||
                  statusColors["Gözləmədə"];

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
                      py-2.5
                      text-left
                      text-[13px]
                      transition

                      ${
                        status === option
                          ? `${optionColors.selected} font-bold`
                          : optionColors.idle || `
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

      {/* ANIMATION */}
      <style>{`
        @keyframes taskTableEnter {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.992);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes taskRowEnter {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .task-table-enter {
          animation:
            taskTableEnter
            0.65s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .task-row-enter {
          opacity: 0;

          animation:
            taskRowEnter
            0.5s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .task-table-enter,
          .task-row-enter {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
