import { useEffect, useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";

function HeaderLabel({ icon, children, right = false }) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        right ? "justify-end" : ""
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-400 dark:text-slate-500">
        {icon}
      </span>

      <span className="leading-none">{children}</span>
    </div>
  );
}

function CellIcon({ children }) {
  return (
    <span
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-slate-200
        bg-slate-50
        text-slate-400
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-400
      "
    >
      {children}
    </span>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function EmployeesView({
  employees,
  onCreate,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name-az");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredList = useMemo(() => {
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
          return (a.position || "").localeCompare(
            b.position || ""
          );

        default:
          return 0;
      }
    });
  }, [employees, search, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredList.length / pageSize)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortOrder, pageSize]);

  const paginatedList = useMemo(() => {
    const start =
      (currentPage - 1) * pageSize;

    return filteredList.slice(
      start,
      start + pageSize
    );
  }, [filteredList, currentPage, pageSize]);

  const startItem =
    filteredList.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    filteredList.length
  );

  const visiblePages = useMemo(() => {
    const pages = [];

    let start = Math.max(
      1,
      currentPage - 1
    );

    let end = Math.min(
      totalPages,
      start + 2
    );

    if (end - start < 2) {
      start = Math.max(
        1,
        end - 2
      );
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <section
      className="
        flex-1
        flex
        flex-col
        h-full
        min-w-0
        overflow-hidden
        bg-slate-50
        dark:bg-slate-950
      "
    >
      {/* HEADER */}
      <header
        className="
          h-20
          px-6
          md:px-8
          shrink-0
          z-10
          flex
          items-center
          justify-between
          border-b
          border-slate-200/80
          dark:border-slate-800/80
          bg-white/95
          dark:bg-slate-900/95
          backdrop-blur
        "
      >
        <div>
          <h1
            className="
              text-2xl
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
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Təyin olunmuş işçilər və öhdəliklər
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-sm
            shadow-emerald-500/20
            transition-all
            duration-200
            hover:bg-emerald-700
            hover:shadow-md
            active:scale-[0.98]
          "
        >
          <Icon
            name="plus"
            strokeWidth={2.4}
            className="h-[18px] w-[18px]"
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
              employees-toolbar-enter
              flex
              flex-col
              gap-3
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* COUNT */}
            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-none
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                <Icon
                  name="users"
                  className="h-[18px] w-[18px]"
                />
              </div>

              <div className="flex items-baseline gap-1.5">
                <span
                  className="
                    text-[17px]
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  {filteredList.length}
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

            {/* SEARCH / SORT */}
            <div
              className="
                flex
                flex-col
                gap-2
                sm:flex-row
                sm:items-center
              "
            >
              <div className="relative w-full sm:w-[360px]">
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

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Ad, öhdəlik, vəzifə və ya telefon..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-10
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:text-slate-100
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition
                      hover:text-slate-700
                      dark:hover:text-white
                    "
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="
                  h-11
                  cursor-pointer
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-slate-600
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-slate-300
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
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                shadow-[0_5px_20px_rgba(15,23,42,0.055)]
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-none
              "
            >
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
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
                    min-w-[1100px]
                    table-fixed
                    border-collapse
                    text-left
                  "
                >
                  <colgroup>
                    <col className="w-[23%]" />
                    <col className="w-[14%]" />
                    <col className="w-[25%]" />
                    <col className="w-[27%]" />
                    <col className="w-[11%]" />
                  </colgroup>

                  {/* TABLE HEADER */}
                  <thead>
                    <tr
                      className="
                        h-14
                        border-b
                        border-slate-200
                        bg-slate-50/90
                        dark:border-slate-800
                        dark:bg-slate-800/40
                      "
                    >
                      <th
                        className="
                          px-5
                          align-middle
                          text-[12px]
                          font-extrabold
                          uppercase
                          tracking-[0.07em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <HeaderLabel
                          icon={
                            <Icon
                              name="user"
                              className="h-4 w-4"
                            />
                          }
                        >
                          Ad / Soyad
                        </HeaderLabel>
                      </th>

                      <th
                        className="
                          px-5
                          align-middle
                          text-[12px]
                          font-extrabold
                          uppercase
                          tracking-[0.07em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <HeaderLabel
                          icon={
                            <Icon
                              name="circleDot"
                              className="h-4 w-4"
                            />
                          }
                        >
                          Status
                        </HeaderLabel>
                      </th>

                      <th
                        className="
                          px-5
                          align-middle
                          text-[12px]
                          font-extrabold
                          uppercase
                          tracking-[0.07em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <HeaderLabel
                          icon={
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.9"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z"
                              />
                            </svg>
                          }
                        >
                          Öhdəlik
                        </HeaderLabel>
                      </th>

                      <th
                        className="
                          px-5
                          align-middle
                          text-[12px]
                          font-extrabold
                          uppercase
                          tracking-[0.07em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <HeaderLabel
                          icon={
                            <Icon
                              name="briefcase"
                              className="h-4 w-4"
                            />
                          }
                        >
                          Əlaqə / Vəzifə
                        </HeaderLabel>
                      </th>

                      <th
                        className="
                          px-5
                          align-middle
                          text-[12px]
                          font-extrabold
                          uppercase
                          tracking-[0.07em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <HeaderLabel
                          right
                          icon={
                            <Icon
                              name="edit"
                              className="h-4 w-4"
                            />
                          }
                        >
                          Əməliyyatlar
                        </HeaderLabel>
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
                    {paginatedList.length > 0 ? (
                      paginatedList.map(
                        (employee) => (
                          <tr
                            key={employee.id}
                            className="
                              h-[72px]
                              group
                              transition-colors
                              duration-200
                              hover:bg-emerald-50/40
                              dark:hover:bg-emerald-500/[0.035]
                            "
                          >
                            {/* NAME */}
                            <td className="px-5 align-middle">
                              <div
                                className="
                                  flex
                                  min-w-0
                                  items-center
                                  gap-3.5
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-emerald-500
                                    to-teal-600
                                    text-[12px]
                                    font-black
                                    text-white
                                    shadow-sm
                                    shadow-emerald-500/20
                                    transition-transform
                                    duration-200
                                    group-hover:scale-105
                                  "
                                >
                                  {getInitials(
                                    employee.name
                                  )}
                                </div>

                                <span
                                  className="
                                    truncate
                                    text-[15px]
                                    font-bold
                                    leading-none
                                    text-slate-900
                                    dark:text-white
                                  "
                                >
                                  {employee.name}
                                </span>
                              </div>
                            </td>

                            {/* STATUS */}
                            <td className="px-5 align-middle">
                              <span
                                className={`
                                  inline-flex
                                  h-8
                                  items-center
                                  justify-center
                                  gap-1.5
                                  rounded-full
                                  border
                                  px-3.5
                                  text-[12px]
                                  font-bold
                                  leading-none
                                  whitespace-nowrap
                                  ${
                                    employee.status ===
                                    "Aktiv"
                                      ? `
                                        border-emerald-200
                                        bg-emerald-50
                                        text-emerald-700
                                        dark:border-emerald-500/20
                                        dark:bg-emerald-500/10
                                        dark:text-emerald-400
                                      `
                                      : `
                                        border-amber-200
                                        bg-amber-50
                                        text-amber-700
                                        dark:border-amber-500/20
                                        dark:bg-amber-500/10
                                        dark:text-amber-400
                                      `
                                  }
                                `}
                              >
                                <span
                                  className={`
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    ${
                                      employee.status ===
                                      "Aktiv"
                                        ? "bg-emerald-500"
                                        : "bg-amber-500"
                                    }
                                  `}
                                />

                                {employee.status ===
                                "Aktiv"
                                  ? "Aktiv"
                                  : "Gözləmədə"}
                              </span>
                            </td>

                            {/* LIABILITY */}
                            <td className="px-5 align-middle">
                              <div
                                className="
                                  flex
                                  min-w-0
                                  items-center
                                  gap-3
                                "
                              >
                                <CellIcon>
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.9"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z"
                                    />
                                  </svg>
                                </CellIcon>

                                <span
                                  title={
                                    employee.liability
                                  }
                                  className="
                                    min-w-0
                                    truncate
                                    text-[14px]
                                    font-semibold
                                    leading-none
                                    text-slate-700
                                    dark:text-slate-300
                                  "
                                >
                                  {employee.liability ||
                                    "-"}
                                </span>
                              </div>
                            </td>

                            {/* POSITION + PHONE */}
                            <td className="px-5 align-middle">
                              <div
                                className="
                                  flex
                                  min-w-0
                                  items-center
                                  gap-3
                                "
                              >
                                <CellIcon>
                                  <Icon
                                    name="briefcase"
                                    className="h-4 w-4"
                                  />
                                </CellIcon>

                                <div
                                  className="
                                    flex
                                    min-w-0
                                    flex-col
                                    justify-center
                                    gap-1.5
                                  "
                                >
                                  <div
                                    className="
                                      truncate
                                      text-[14px]
                                      font-semibold
                                      leading-none
                                      text-slate-700
                                      dark:text-slate-300
                                    "
                                  >
                                    {employee.position ||
                                      "Vəzifə qeyd edilməyib"}
                                  </div>

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-1.5
                                      text-[12px]
                                      leading-none
                                      text-slate-400
                                      dark:text-slate-500
                                    "
                                  >
                                    <Icon
                                      name="phone"
                                      className="h-3.5 w-3.5 shrink-0"
                                    />

                                    <span>
                                      {employee.phone ||
                                        "Telefon yoxdur"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* ACTION */}
                            <td className="px-5 align-middle">
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-end
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    onEdit(employee)
                                  }
                                  aria-label={`${employee.name}: Redaktə et`}
                                  title="Redaktə et"
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-400
                                    transition-all
                                    hover:border-emerald-200
                                    hover:bg-emerald-50
                                    hover:text-emerald-600
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                    dark:hover:border-emerald-500/30
                                    dark:hover:bg-emerald-500/10
                                  "
                                >
                                  <Icon
                                    name="edit"
                                    className="h-[17px] w-[17px]"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="5">
                          <div
                            className="
                              flex
                              flex-col
                              items-center
                              justify-center
                              py-20
                              text-center
                            "
                          >
                            <div
                              className="
                                mb-3
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-50
                                text-emerald-500
                                dark:bg-emerald-500/10
                              "
                            >
                              <Icon
                                name="search"
                                className="h-5 w-5"
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
                                mt-1
                                text-sm
                                text-slate-400
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

              {/* PAGINATION */}
              {filteredList.length > 0 && (
                <div
                  className="
                    flex
                    min-h-[58px]
                    flex-col
                    gap-3
                    border-t
                    border-slate-200
                    bg-white
                    px-5
                    py-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <div
                    className="
                      text-[14px]
                      font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {startItem}-{endItem} /{" "}
                    {filteredList.length} işçi
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-end
                      gap-1.5
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(1)
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                        disabled:pointer-events-none
                        disabled:opacity-35
                        dark:border-slate-700
                        dark:hover:bg-slate-800
                      "
                    >
                      «
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.max(1, p - 1)
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                        disabled:pointer-events-none
                        disabled:opacity-35
                        dark:border-slate-700
                        dark:hover:bg-slate-800
                      "
                    >
                      ‹
                    </button>

                    {visiblePages.map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`
                            flex
                            h-9
                            min-w-9
                            items-center
                            justify-center
                            rounded-lg
                            px-2
                            text-[13px]
                            font-bold
                            transition
                            ${
                              currentPage ===
                              page
                                ? `
                                  border
                                  border-emerald-600
                                  bg-emerald-600
                                  text-white
                                  shadow-sm
                                `
                                : `
                                  border
                                  border-slate-200
                                  text-slate-600
                                  hover:bg-slate-50
                                  dark:border-slate-700
                                  dark:text-slate-300
                                  dark:hover:bg-slate-800
                                `
                            }
                          `}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(
                            totalPages,
                            p + 1
                          )
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                        disabled:pointer-events-none
                        disabled:opacity-35
                        dark:border-slate-700
                        dark:hover:bg-slate-800
                      "
                    >
                      ›
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          totalPages
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                        disabled:pointer-events-none
                        disabled:opacity-35
                        dark:border-slate-700
                        dark:hover:bg-slate-800
                      "
                    >
                      »
                    </button>

                    <select
                      value={pageSize}
                      onChange={(e) =>
                        setPageSize(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        ml-1
                        h-9
                        cursor-pointer
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        text-[13px]
                        font-semibold
                        text-slate-600
                        outline-none
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-300
                      "
                    >
                      <option value={10}>
                        10 / səhifə
                      </option>

                      <option value={20}>
                        20 / səhifə
                      </option>

                      <option value={50}>
                        50 / səhifə
                      </option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes employeesToolbarEnter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes employeesTableEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .employees-toolbar-enter {
          animation:
            employeesToolbarEnter
            0.26s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .employees-table-enter {
          animation:
            employeesTableEnter
            0.3s
            cubic-bezier(0.22, 1, 0.36, 1)
            0.035s
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