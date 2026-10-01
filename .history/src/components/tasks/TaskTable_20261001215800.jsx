import { useEffect, useMemo, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const totalPages = Math.max(
    1,
    Math.ceil(tasks.length / pageSize)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, currentPage, pageSize]);

  const firstItem =
    tasks.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const lastItem = Math.min(
    currentPage * pageSize,
    tasks.length
  );

  const openDropdown = (event, taskId) => {
    event.stopPropagation();

    if (dropdown === taskId) {
      setDropdown(null);
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 6,
      left: rect.left,
    });

    setDropdown(taskId);
  };

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) return "?";

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  };

  const visiblePages = useMemo(() => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(
      totalPages,
      currentPage + 2
    );

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="relative task-table-enter">
      <div
        className="
          relative
          z-10
          overflow-visible
          rounded-[24px]
          border
          border-slate-200/80
          bg-white
          shadow-[0_16px_40px_rgba(15,23,42,0.055)]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/80
                  bg-slate-50/90
                  text-[11px]
                  font-extrabold
                  uppercase
                  tracking-[0.11em]
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
                        ? "w-14 pl-6 pr-3 text-center"
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

            <tbody className="text-sm text-slate-700 dark:text-slate-200">
              {paginatedTasks.map(
                (task, index) => {
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
                        animationDelay: `${
                          80 + index * 55
                        }ms`,
                      }}
                      className="
                        task-row-enter
                        group
                        border-b
                        border-slate-100/90
                        transition-all
                        duration-200
                        last:border-b-0
                        hover:bg-slate-50/80
                        dark:border-slate-800/80
                        dark:hover:bg-slate-800/45
                      "
                    >
                      <td className="py-4 pl-6 pr-3 text-center font-mono text-[12px] font-bold text-slate-400">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2 py-1 dark:bg-slate-800">
                          #{task.id}
                        </span>
                      </td>

                      <td
                        className="
                          cursor-pointer
                          px-4
                          py-4
                          text-[15px]
                          font-bold
                          text-slate-900
                          transition-colors
                          group-hover:text-emerald-700
                          dark:text-white
                          dark:group-hover:text-emerald-300
                        "
                        onClick={() =>
                          onDetail(task.id)
                        }
                      >
                        {task.title}
                      </td>

                      <td
                        className="
                          max-w-xs
                          cursor-pointer
                          truncate
                          px-4
                          py-4
                          text-sm
                          text-slate-600
                          dark:text-slate-300
                        "
                        onClick={() =>
                          onDetail(task.id)
                        }
                        title={
                          task.message || "-"
                        }
                      >
                        {task.message || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-emerald-200
                              bg-emerald-100
                              text-[10px]
                              font-extrabold
                              text-emerald-700
                              dark:border-emerald-500/30
                              dark:bg-emerald-500/15
                              dark:text-emerald-300
                            "
                          >
                            {getInitials(
                              task.creator
                            )}
                          </div>

                          <span className="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                            {task.creator}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-mono text-[12px] text-slate-500 dark:text-slate-400">
                        {task.createdAt}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            rounded-lg
                            bg-rose-50
                            px-2.5
                            py-1.5
                            font-mono
                            text-[12px]
                            font-bold
                            text-rose-600
                            dark:bg-rose-500/10
                            dark:text-rose-300
                          "
                        >
                          <Icon
                            name="calendar"
                            className="h-3.5 w-3.5"
                          />
                          {task.deadline}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-teal-200
                              bg-teal-100
                              text-[10px]
                              font-extrabold
                              text-teal-700
                              dark:border-teal-500/30
                              dark:bg-teal-500/15
                              dark:text-teal-300
                            "
                          >
                            {getInitials(
                              task.assignee
                            )}
                          </div>

                          <span className="whitespace-nowrap text-sm font-bold text-emerald-700 dark:text-emerald-300">
                            {task.assignee}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div
                          className="relative inline-block text-left"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            onClick={(event) =>
                              openDropdown(
                                event,
                                task.id
                              )
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
                                {statusLabel(
                                  task.status
                                )}
                              </span>
                            </span>

                            <Icon
                              name="down"
                              className="h-3.5 w-3.5 shrink-0 opacity-70"
                            />
                          </button>
                        </div>
                      </td>

                      <td className="py-4 pl-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() =>
                              onDetail(task.id)
                            }
                            className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition-all
                              duration-150
                              hover:bg-slate-100
                              hover:text-emerald-600
                              active:scale-95
                              dark:hover:bg-slate-800
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
                              transition-all
                              duration-150
                              hover:bg-emerald-50
                              hover:text-emerald-700
                              active:scale-95
                              dark:hover:bg-emerald-500/10
                              dark:hover:text-emerald-300
                            "
                            title="Söhbətə keç"
                          >
                            <Icon name="chat" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

        {tasks.length > 0 && (
          <div
            className="
              flex
              flex-col
              gap-4
              border-t
              border-slate-200/80
              px-6
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              dark:border-slate-800
            "
          >
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {firstItem}-{lastItem}
              </span>{" "}
              / {tasks.length} tapşırıq
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-2
                  text-sm
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                  dark:hover:bg-slate-700
                "
              >
                «
              </button>

              <button
                type="button"
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-2
                  text-sm
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                  dark:hover:bg-slate-700
                "
              >
                ‹
              </button>

              {visiblePages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    goToPage(page)
                  }
                  className={`
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-3
                    text-sm
                    font-semibold
                    transition
                    ${
                      currentPage === page
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                disabled={
                  currentPage === totalPages
                }
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-2
                  text-sm
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                  dark:hover:bg-slate-700
                "
              >
                ›
              </button>

              <button
                type="button"
                onClick={() =>
                  goToPage(totalPages)
                }
                disabled={
                  currentPage === totalPages
                }
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-2
                  text-sm
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                  dark:hover:bg-slate-700
                "
              >
                »
              </button>

              <select
                value={pageSize}
                onChange={(event) =>
                  setPageSize(
                    Number(event.target.value)
                  )
                }
                className="
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  text-slate-600
                  outline-none
                  transition
                  focus:border-emerald-400
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                <option value={5}>
                  5 / səhifə
                </option>
                <option value={10}>
                  10 / səhifə
                </option>
                <option value={20}>
                  20 / səhifə
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

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
                (item) =>
                  item.id === dropdown
              );

              if (!task) return null;

              const status =
                task.status === "Tamamlandı"
                  ? "Bitmiş"
                  : task.status;

              return taskStatuses.map(
                (option) => {
                  const optionColors =
                    statusColors[option] ||
                    statusColors[
                      "Gözləmədə"
                    ];

                  return (
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
                        py-2.5
                        text-left
                        text-[13px]
                        transition
                        ${
                          status === option
                            ? `${optionColors.selected} font-bold`
                            : optionColors.idle ||
                              `
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
                }
              );
            })()}
          </div>,
          document.body
        )}

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