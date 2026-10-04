import UserAvatar from "../common/UserAvatar.jsx";
import Icon from "../common/Icons.jsx";
import KanbanEmptyState from "./KanbanEmptyState.jsx";
import {
  normalizeTaskStatus,
  taskStatuses,
  acceptedStatusStyles,
} from "../../utils/helpers.js";


export default function TaskKanban({
  tasks,
  onDetail,
  onCycle,
}) {

  const getDeadlineStyle = (deadline) => {
    if (!deadline) {
      return "text-slate-400 ring-transparent dark:text-slate-500";
    }

    const datePart = deadline.split(" ")[0];
    const parts = datePart.split("-");

    if (parts.length !== 3) {
      return "text-slate-500 ring-transparent dark:text-slate-400";
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
        bg-red-50
        text-red-700
        ring-red-200
        dark:bg-red-500/15
        dark:text-red-300
        dark:ring-red-400/25
      `;
    }

    if (daysLeft <= 3) {
      return `
        bg-amber-50
        text-amber-700
        ring-amber-200/80
        dark:bg-amber-500/10
        dark:text-amber-400
        dark:ring-amber-400/20
      `;
    }

    return `
      bg-slate-50
      text-slate-600
      ring-slate-200/80
      dark:bg-slate-900/40
      dark:text-slate-300
      dark:ring-slate-700
    `;
  };

  const columns = taskStatuses.map((status) => {
    const styles =
      status === "Gözləmədə"
        ? {
            iconColor: "text-amber-600 dark:text-amber-400",
            iconPath: "M5 3h14M5 21h14M6 3c0 5 3 6 6 9-3 3-6 4-6 9M18 3c0 5-3 6-6 9 3 3 6 4 6 9",
            emptyIconPath: "M3 13l3-8h12l3 8v7H3ZM3 13h5l2 3h4l2-3h5",
            badge:
              "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
            accent: "bg-amber-500",
          }
        : status === "Icra olunur"
        ? {
            iconColor: "text-blue-600 dark:text-blue-400",
            iconPath: "M5 3.5 20 12 5 20.5Z",
            emptyIconPath: "M3 19V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2M3 19l3-9h15l-3 11H5a2 2 0 0 1-2-2Z",
            badge:
              "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
            accent: "bg-blue-500",
          }
        : status === "Pauzada"
        ? {
            iconColor: "text-purple-600 dark:text-purple-400",
            iconPath: "M5 3h3v18H5ZM16 3h3v18h-3Z",
            emptyIconPath: "M7 2l1 3M14 2l-1 3M3 9h15v5c0 5-3 8-7.5 8S3 19 3 14V9ZM18 10h1a3 3 0 0 1 0 6h-1",
            badge:
              "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300",
            accent: "bg-purple-500",
          }
        : status === "Qəbul olundu"
        ? {
            iconColor: acceptedStatusStyles.text,
            titleColor: acceptedStatusStyles.text,
            emptyIconColor: acceptedStatusStyles.text,
            accentOpacity: "opacity-100",
            iconPath: "M8 5H6a2 2 0 0 0-2 2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2h-2M9 3h6a1 1 0 0 1 1 1v3H8V4a1 1 0 0 1 1-1ZM8 13l3 3 5-5",
            emptyIconPath: "M5 19H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12M7 4h13a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM10 9h7M10 12h7M10 15h7",
            badge: acceptedStatusStyles.surface,
            accent: acceptedStatusStyles.dot,
          }
        : status === "Bitmiş"
        ? {
            iconColor: "text-green-600 dark:text-green-400",
            iconPath: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7.5 12l3 3 6-6",
            emptyIconPath: "M3 3h18v5H3ZM5 8v13h14V8M9 12h6",
            badge:
              "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300",
            accent: "bg-green-500",
          }
        : {
            iconColor: "text-red-600 dark:text-red-400",
            iconPath: "M3 6h18M8 6l1-4h6l1 4M5 6l1 15h12l1-15M10 10v7M14 10v7",
            emptyIconPath: "M3 8l9-5 9 5-9 5ZM3 8v9l9 5 9-5V8M12 13v9",
            badge:
              "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
            accent: "bg-red-600",
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
    <div className="grid min-h-full grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
      {columns.map((column) => (
        <section
          key={column.label}
          aria-label={column.label}
          className="flex min-h-[clamp(340px,42vh,480px)] min-w-0 flex-col overflow-hidden rounded-[10px] border border-slate-200/80 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/70"
        >
          <header className="relative flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/60 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-800/30">
            <span aria-hidden="true" className={`absolute inset-x-4 bottom-0 h-0.5 ${column.accentOpacity || "opacity-70"} ${column.accent}`} />
            <h3 className={`flex min-w-0 items-center gap-3 text-[15px] font-semibold ${column.titleColor || "text-slate-800 dark:text-slate-100"}`}>
              <svg
                className={`h-5 w-5 shrink-0 ${column.iconColor}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={column.iconPath} />
              </svg>
              {column.label}
            </h3>
            <span className={`min-w-7 rounded-md px-2 py-1 text-center text-[13px] font-semibold tabular-nums ${column.badge}`}>
              {column.tasks.length}
            </span>
          </header>

          <div
            className={`flex flex-1 flex-col gap-3.5 p-3 ${
              column.tasks.length > 4
                ? "kanban-scroll max-h-[660px] overflow-y-auto"
                : ""
            }`}
          >
            {column.tasks.length === 0 ? (
              <KanbanEmptyState
                color={column.emptyIconColor || column.iconColor}
                iconPath={column.iconPath}
              />
            ) : (
              column.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onDetail(task.id)}
                  className="group relative shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white p-[18px] shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-150 hover:border-slate-300 hover:shadow-[0_3px_8px_rgba(15,23,42,0.07)] dark:border-slate-700 dark:bg-slate-800 dark:shadow-none dark:hover:border-slate-500 motion-reduce:transition-none"
                >
                  <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
                    <span className="rounded-md border border-slate-200/70 bg-slate-50 px-2 py-1 font-mono text-[11px] font-medium tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                      TASK-{task.id}
                    </span>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold tabular-nums ring-1 ring-inset ${getDeadlineStyle(task.deadline)}`}>
                      <Icon name="calendar" className="h-3.5 w-3.5" />
                      {task.deadline?.split(" ")[0] || "—"}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold leading-6 tracking-[-0.01em] text-slate-900 [overflow-wrap:anywhere] dark:text-slate-100">
                    {task.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[21px] text-slate-500 dark:text-slate-400">
                    {task.message || "Açıqlama yoxdur"}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-700/60">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600">
                        <UserAvatar
                          user={{ name: task.assignee, avatar: task.assigneeAvatar }}
                          alt=""
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <span className="truncate text-[13px] font-medium text-slate-600 dark:text-slate-300">
                        {task.assignee}
                      </span>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onCycle(task.id);
                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition-colors duration-150 hover:border-teal-600/30 hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-600/70 dark:bg-slate-700/40 dark:text-slate-300 dark:hover:border-teal-400/30 dark:hover:bg-teal-400/10 dark:hover:text-teal-300 motion-reduce:transition-none"
                      title="Növbəti statusa keçir"
                    >
                      <Icon name="right" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
