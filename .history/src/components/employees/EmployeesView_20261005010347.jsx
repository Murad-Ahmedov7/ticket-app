import { useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";

export default function EmployeesView({
  employees,
  onCreate,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name-az");

  const list = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = employees.filter((employee) =>
      [
        employee.name,
        employee.status,
        employee.liability,
        employee.position,
        employee.phone,
      ].some((text) =>
        text?.toLowerCase().includes(query)
      )
    );

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "name-az":
          return (a.name || "").localeCompare(b.name || "");

        case "name-za":
          return (b.name || "").localeCompare(a.name || "");

        case "active-first":
          if (a.status === b.status) return 0;
          return a.status === "Aktiv" ? -1 : 1;

        case "waiting-first":
          if (a.status === b.status) return 0;
          return a.status === "Gözləmədə" ? -1 : 1;

        case "position-az":
          return (a.position || "").localeCompare(b.position || "");

        default:
          return 0;
      }
    });
  }, [employees, search, sortOrder]);

  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">

      {/* HEADER */}
      <header
        className="
          h-20
          px-6 md:px-8
          border-b
          border-slate-200/80
          dark:border-slate-800/80
          bg-white/95
          dark:bg-slate-900/95
          backdrop-blur
          flex
          items-center
          justify-between
          shrink-0
          z-10
        "
      >
        <div>
          <h1
            className="
              text-xl
              md:text-2xl
              font-black
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            İşçilər
          </h1>

          <p
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
              mt-1
            "
          >
            Təyin olunmuş işçilər və öhdəliklər
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            px-5
            py-3
            rounded-xl
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            text-sm
            font-bold
            shadow-sm
            shadow-emerald-500/20
            hover:shadow-md
            hover:shadow-emerald-500/20
            active:scale-[0.98]
            transition-all
            duration-200
            flex
            items-center
            gap-2
          "
        >
          <Icon
            name="plus"
            strokeWidth={2.4}
            className="w-[18px] h-[18px]"
          />

          İşçi əlavə et
        </button>
      </header>

      {/* CONTENT */}
      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          md:p-6
          lg:p-8
        "
      >
        <div className="w-full space-y-4">

          {/* TOOLBAR */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              justify-between
              gap-3
              employees-toolbar-enter
            "
          >
            {/* COUNT */}
            <div
              className="
                inline-flex
                items-center
                gap-3
                w-fit
                px-4
                py-2.5
                rounded-xl
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                dark:shadow-none
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-emerald-50
                  dark:bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.74-.479 3 3 0 0 0-4.682-2.72m.942 3.198v.001A9.087 9.087 0 0 1 12 21c-2.676 0-5.216-1.16-6.96-3.182m12.96.902a5.972 5.972 0 0 0-.942-3.198m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72A9.094 9.094 0 0 0 6 18.72m6-8.97a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span
                  className="
                    text-base
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  {list.length}
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  işçi göstərilir
                </span>
              </div>
            </div>

            {/* SEARCH + SORT */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-2
                sm:items-center
              "
            >
              {/* SEARCH */}
              <div className="relative w-full sm:w-[340px]">
                <Icon
                  name="search"
                  className="
                    w-4
                    h-4
                    text-slate-400
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                  "
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ad, öhdəlik, vəzifə və ya telefon..."
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-10
                    rounded-xl
                    bg-white
                    dark:bg-slate-900
                    border
                    border-slate-200
                    dark:border-slate-800
                    text-sm
                    text-slate-900
                    dark:text-slate-100
                    placeholder:text-slate-400
                    outline-none
                    shadow-[0_2px_10px_rgba(15,23,42,0.03)]
                    dark:shadow-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                      dark:hover:text-white
                      transition
                    "
                  >
                    ×
                  </button>
                )}
              </div>

              {/* SORT */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="
                  h-11
                  px-4
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-800
                  text-sm
                  font-semibold
                  text-slate-600
                  dark:text-slate-300
                  outline-none
                  shadow-[0_2px_10px_rgba(15,23,42,0.03)]
                  dark:shadow-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                  cursor-pointer
                "
              >
                <option value="name-az">
                  Ad: A → Z
                </option>

                <option value="name-za">
                  Ad: Z → A
                </option>

                <option value="position-az">
                  Vəzifə: A → Z
                </option>

                <option value="active-first">
                  Aktiv əvvəl
                </option>

                <option value="waiting-first">
                  Gözləmədə əvvəl
                </option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="employees-table-enter">
            <div
              className="
                relative
                w-full
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                shadow-[0_5px_20px_rgba(15,23,42,0.055)]
                dark:shadow-none
                overflow-hidden
              "
            >
              {/* STATIC GREEN ACCENT */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-emerald-500/70
                  to-transparent
                "
              />

              <div className="overflow-x-auto">
                <table
                  className="
                    w-full
                    min-w-[950px]
                    table-fixed
                    border-collapse
                    text-left
                  "
                >
                  {/* WIDTHS */}
                  <colgroup>
                    <col className="w-[23%]" />
                    <col className="w-[13%]" />
                    <col className="w-[27%]" />
                    <col className="w-[25%]" />
                    <col className="w-[12%]" />
                  </colgroup>

                  {/* HEAD */}
                  <thead>
                    <tr
                      className="
                        bg-slate-50/90
                        dark:bg-slate-800/40
                        border-b
                        border-slate-200
                        dark:border-slate-800
                      "
                    >
                      <th
                        className="
                          px-5
                          py-4
                          text-xs
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Ad / Soyad
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-xs
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Status
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-xs
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Öhdəlik
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-xs
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Əlaqə / Vəzifə
                      </th>

                      <th
                        className="
                          px-6
                          py-4
                          text-right
                          text-xs
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Əməliyyatlar
                      </th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody
                    className="
                      divide-y
                      divide-slate-100
                      dark:divide-slate-800/70
                    "
                  >
                    {list.length > 0 ? (
                      list.map((employee) => (
                        <tr
                          key={employee.id}
                          className="
                            group
                            hover:bg-emerald-50/40
                            dark:hover:bg-emerald-500/[0.035]
                            transition-colors
                            duration-200
                          "
                        >
                          {/* NAME */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="
                                  w-10
                                  h-10
                                  shrink-0
                                  rounded-xl
                                  bg-gradient-to-br
                                  from-emerald-500
                                  to-teal-600
                                  flex
                                  items-center
                                  justify-center
                                  text-white
                                  text-xs
                                  font-black
                                  shadow-sm
                                  shadow-emerald-500/20
                                  group-hover:scale-105
                                  transition-transform
                                  duration-200
                                "
                              >
                                {employee.name
                                  ?.split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>

                              <span
                                className="
                                  truncate
                                  text-[15px]
                                  font-bold
                                  text-slate-900
                                  dark:text-white
                                "
                              >
                                {employee.name}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-5 py-4">
                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-1.5
                                rounded-full
                                text-xs
                                font-bold
                                border
                                whitespace-nowrap

                                ${
                                  employee.status === "Aktiv"
                                    ? `
                                      bg-emerald-50
                                      text-emerald-700
                                      border-emerald-200
                                      dark:bg-emerald-500/10
                                      dark:text-emerald-400
                                      dark:border-emerald-500/20
                                    `
                                    : `
                                      bg-amber-50
                                      text-amber-700
                                      border-amber-200
                                      dark:bg-amber-500/10
                                      dark:text-amber-400
                                      dark:border-amber-500/20
                                    `
                                }
                              `}
                            >
                              <span
                                className={`
                                  w-1.5
                                  h-1.5
                                  rounded-full

                                  ${
                                    employee.status === "Aktiv"
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                                  }
                                `}
                              />

                              {employee.status === "Aktiv"
                                ? "Aktiv"
                                : "Gözləmədə"}
                            </span>
                          </td>

                          {/* LIABILITY */}
                          <td
                            className="
                              px-5
                              py-4
                              text-sm
                              font-medium
                              text-slate-700
                              dark:text-slate-300
                            "
                          >
                            <span className="block truncate">
                              {employee.liability || "-"}
                            </span>
                          </td>

                          {/* POSITION / PHONE */}
                          <td className="px-5 py-4">
                            <div className="space-y-1">
                              <div
                                className="
                                  text-sm
                                  font-semibold
                                  text-slate-700
                                  dark:text-slate-300
                                  truncate
                                "
                              >
                                {employee.position ||
                                  "Vəzifə qeyd edilməyib"}
                              </div>

                              <div
                                className="
                                  text-xs
                                  text-slate-400
                                  dark:text-slate-500
                                "
                              >
                                {employee.phone || "Telefon yoxdur"}
                              </div>
                            </div>
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() => onEdit(employee)}
                                className="
                                  w-9
                                  h-9
                                  shrink-0
                                  flex
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  hover:text-emerald-600
                                  hover:bg-emerald-50
                                  dark:hover:bg-emerald-500/10
                                  transition-all
                                "
                                title="Redaktə et"
                              >
                                <svg
                                  className="w-[18px] h-[18px]"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">
                          <div
                            className="
                              py-20
                              flex
                              flex-col
                              items-center
                              justify-center
                              text-center
                            "
                          >
                            <div
                              className="
                                w-12
                                h-12
                                rounded-xl
                                bg-emerald-50
                                dark:bg-emerald-500/10
                                flex
                                items-center
                                justify-center
                                text-emerald-500
                                mb-3
                              "
                            >
                              <Icon
                                name="search"
                                className="w-5 h-5"
                              />
                            </div>

                            <p
                              className="
                                text-base
                                font-bold
                                text-slate-700
                                dark:text-slate-200
                              "
                            >
                              İşçi tapılmadı
                            </p>

                            <p
                              className="
                                text-sm
                                text-slate-400
                                mt-1
                              "
                            >
                              Axtarış və ya sıralamanı dəyiş
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes employeesToolbarEnter {
          from {
            opacity: 0;
            transform: translateX(10px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes employeesTableEnter {
          from {
            opacity: 0;
            transform: scale(0.985);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .employees-toolbar-enter {
          animation:
            employeesToolbarEnter
            0.35s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .employees-table-enter {
          animation:
            employeesTableEnter
            0.45s
            cubic-bezier(0.22, 1, 0.36, 1)
            0.05s
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .employees-toolbar-enter,
          .employees-table-enter {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}