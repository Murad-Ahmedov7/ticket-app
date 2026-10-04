import { useState } from "react";
import Icon from "../common/Icons.jsx";
import TaskTable from "./TaskTable.jsx";
import TaskKanban from "./TaskKanban.jsx";
import TaskCalendar from "./TaskCalendar.jsx";
import {
  taskStatuses,
  statusLabel,
} from "../../utils/helpers.js";

export default function TasksView({
  tasks,
  onCreate,
  onDetail,
  onStatus,
  onCycle,
  onChat,
  calendarYear,
  calendarMonth,
  onMonth,
  onResetCalendar,
  notify,
}) {
  const [tab, setTab] = useState("list");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("none");

  const parseDate = (value) => {
    if (!value) return null;

    const [datePart, timePart = "00:00"] =
      value.split(" ");

    const [day, month, year] =
      datePart.split("-");

    if (!day || !month || !year) {
      return null;
    }

    return new Date(
      `${year}-${month}-${day}T${timePart}:00`
    );
  };

  const filtered = tasks
    .filter(
      (task) =>
        (!status || task.status === status) &&
        [
          task.title,
          task.message,
          task.assignee,
        ].some((text) =>
          (text || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sort === "none") {
        return 0;
      }

      if (sort === "deadline-asc") {
        const dateA = parseDate(a.deadline);
        const dateB = parseDate(b.deadline);

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateA - dateB;
      }

      if (sort === "deadline-desc") {
        const dateA = parseDate(a.deadline);
        const dateB = parseDate(b.deadline);

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB - dateA;
      }

      if (sort === "created-desc") {
        const dateA = parseDate(a.createdAt);
        const dateB = parseDate(b.createdAt);

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB - dateA;
      }

      if (sort === "created-asc") {
        const dateA = parseDate(a.createdAt);
        const dateB = parseDate(b.createdAt);

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateA - dateB;
      }

      if (sort === "title-asc") {
        return (a.title || "").localeCompare(
          b.title || "",
          "az",
          {
            sensitivity: "base",
          }
        );
      }

      if (sort === "title-desc") {
        return (b.title || "").localeCompare(
          a.title || "",
          "az",
          {
            sensitivity: "base",
          }
        );
      }

      return 0;
    });

  return (
    <section
      className="
        flex
        min-w-0
        flex-1
        flex-col
        h-full
        overflow-hidden
        bg-slate-50
        dark:bg-slate-950
      "
    >
      {/* HEADER */}
      <header
        className="
          z-10
          flex
          h-20
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200/80
          bg-white/95
          px-6
          backdrop-blur
          md:px-8
          dark:border-slate-800/80
          dark:bg-slate-900/95
        "
      >
        <div className="flex items-center gap-7">
          <div>
            <div className="flex items-center gap-3">
              <h1
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-slate-900
                  md:text-2xl
                  dark:text-white
                "
              >
                Tapşırıq Siyahısı
              </h1>

              <span
                className="
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-2.5
                  py-0.5
                  text-xs
                  font-bold
                  text-emerald-700
                  dark:border-emerald-800
                  dark:bg-emerald-950
                  dark:text-emerald-300
                "
              >
                Halal Ticket v2.6
              </span>
            </div>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Komanda tapşırıqları, müştəri
              biletləri və planlaşdırma
            </p>
          </div>

          {/* VIEW TABS */}
          <div
            className="
              hidden
              items-center
              rounded-xl
              border
              border-slate-200/60
              bg-slate-100
              p-1.5
              sm:flex
              dark:border-slate-700/60
              dark:bg-slate-800/80
            "
          >
            {[
              ["list", "Siyahı"],
              ["kanban", "Kanban"],
              ["calendar", "Təqvim"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  text-sm
                  transition-all
                  ${
                    tab === id
                      ? `
                        bg-white
                        font-bold
                        text-emerald-600
                        shadow-sm
                        dark:bg-slate-700
                        dark:text-emerald-300
                      `
                      : `
                        font-semibold
                        text-slate-600
                        hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <Icon
                  name={id}
                  className="h-4 w-4"
                />

                {label}
              </button>
            ))}
          </div>
        </div>

        {/* CREATE BUTTON */}
        <button
          onClick={() => onCreate()}
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-teal-600
            px-4
            text-sm
            font-bold
            text-white
            shadow-md
            shadow-emerald-500/25
            transition
            hover:from-emerald-600
            hover:to-teal-700
            active:scale-95
          "
        >
          <Icon
            name="plus"
            strokeWidth={2.5}
          />

          Yeni Tapşırıq
        </button>
      </header>

      {/* CONTENT */}
      <div
        className={`
          flex-1
          min-h-0
          overflow-y-auto
          ${
            tab === "kanban"
              ? "p-3 md:p-5"
              : "p-4 md:p-8 space-y-6"
          }
        `}
      >
        {/* FILTER BAR */}
        {tab === "list" && (
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-4
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-4
              shadow-sm
              lg:flex-row
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* SEARCH */}
            <div className="relative w-full lg:w-96">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Ad, mesaj və ya icraçı üzrə axtar..."
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-10
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-500/20
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-100
                "
              />

              <Icon
                name="search"
                className="
                  absolute
                  left-3.5
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>

            {/* FILTERS */}
            <div
              className="
                grid
                w-full
                flex-1
                grid-cols-1
                items-center
                justify-end
                gap-2.5
                sm:flex
                sm:w-auto
              "
            >
              {/* STATUS */}
              <select
                aria-label="Tapşırıq statusu"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-500/20
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                "
              >
                <option value="">
                  Bütün Statuslar
                </option>

                {taskStatuses.map((s) => (
                  <option
                    key={s}
                    value={s}
                  >
                    {statusLabel(s)}
                  </option>
                ))}
              </select>

              {/* SORT */}
              <select
                aria-label="Tapşırıqları sırala"
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="
                  h-10
                  min-w-[165px]
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-500/20
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                "
              >
                <option value="none">
                  Sıralama
                </option>

                <option value="deadline-asc">
                  Dedlayn: yaxın → uzaq
                </option>

                <option value="deadline-desc">
                  Dedlayn: uzaq → yaxın
                </option>

                <option value="created-desc">
                  Yaradılma: yeni → köhnə
                </option>

                <option value="created-asc">
                  Yaradılma: köhnə → yeni
                </option>

                <option value="title-asc">
                  Task adı: A → Z
                </option>

                <option value="title-desc">
                  Task adı: Z → A
                </option>
              </select>

              {/* RESET */}
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("");
                  setSort("none");
                  notify(
                    "Filtirlər sıfırlandı"
                  );
                }}
                className="
                  inline-flex
                  h-10
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  duration-150
                  hover:border-slate-300
                  hover:bg-slate-100
                  hover:text-slate-800
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500/20
                  focus-visible:border-emerald-400
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:border-slate-600
                  dark:hover:bg-slate-700
                  dark:hover:text-slate-200
                "
              >
                <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
                Sıfırla
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        {tab === "list" && (
          <TaskTable
            tasks={filtered}
            onDetail={onDetail}
            onStatus={onStatus}
            onChat={onChat}
          />
        )}

        {/* KANBAN */}
        {tab === "kanban" && (
          <TaskKanban
            tasks={tasks}
            onDetail={onDetail}
            onCycle={onCycle}
          />
        )}

        {/* CALENDAR */}
        {tab === "calendar" && (
          <TaskCalendar
            tasks={tasks}
            calendarYear={calendarYear}
            calendarMonth={calendarMonth}
            onMonth={onMonth}
            onReset={onResetCalendar}
            onDetail={onDetail}
            onCreate={(date) =>
              onCreate({ date })
            }
          />
        )}
      </div>
    </section>
  );
}
