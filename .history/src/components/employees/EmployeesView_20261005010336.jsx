import { useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";
import { getAvatarByGender } from "../groups/avatars.js";

function EmployeeAvatar({ employee }) {
  const source = getAvatarByGender(employee);
  const [failedSource, setFailedSource] = useState(null);

  const fallback = getAvatarByGender({
    id: employee.id,
    username: employee.username,
    name: employee.name,
    gender: "neutral",
  });

  return (
    <div
      className="
        w-11 h-11
        shrink-0
        overflow-hidden
        rounded-xl
        border border-slate-200
        bg-slate-100
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <img
        src={failedSource === source ? fallback : source}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailedSource(source)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function CellIcon({ name }) {
  return (
    <span
      className="
        w-8 h-8
        shrink-0
        inline-flex
        items-center
        justify-center
        rounded-lg
        border border-slate-200
        bg-white
        text-slate-400
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-400
      "
    >
      <Icon name={name} className="w-[15px] h-[15px]" />
    </span>
  );
}

export default function EmployeesView({
  employees,
  onCreate,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name-az");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
    Math.ceil(list.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const pageStart =
    list.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const pageEnd = Math.min(
    currentPage * pageSize,
    list.length
  );

  const paginatedList = useMemo(() => {
    const start =
      (currentPage - 1) * pageSize;

    return list.slice(
      start,
      start + pageSize
    );
  }, [list, currentPage, pageSize]);

  const visiblePages = useMemo(() => {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ).filter(
      (pageNumber) =>
        totalPages <= 5 ||
        pageNumber === 1 ||
        pageNumber === totalPages ||
        Math.abs(pageNumber - currentPage) <= 1
    );
  }, [totalPages, currentPage]);

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
          px-6 md:px-8
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
          p-4 md:p-6 lg:p-8
        "
      >
        <div className="w-full space-y-4">
          {/* TOOLBAR */}
          <div
            className="
              employees-toolbar-enter
              flex
              flex-col
              lg:flex-row
              lg:items-center
              justify-between
              gap-3
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
                  w-9 h-9
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
                <Icon
                  name="users"
                  className="w-[18px] h-[18px]"
                />
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
                sm:items-center
                gap-2
              "
            >
              {/* SEARCH */}
              <div className="relative w-full sm:w-[360px]">
                <Icon
                  name="search"
                  className="
                    w-4 h-4
                    text-slate-400
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                  "
                />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
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
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    aria-label="Axtarışı təmizlə"
                    title="Axtarışı təmizlə"
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
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
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
              {/* GREEN ACCENT */}
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
                    min-w-[1050px]
                    table-fixed
                    border-collapse
                    text-left
                  "
                >
                  {/* WIDTHS */}
                  <colgroup>
                    <col className="w-[22%]" />
                    <col className="w-[14%]" />
                    <col className="w-[25%]" />
                    <col className="w-[27%]" />
                    <col className="w-[12%]" />
                  </colgroup>

                  {/* HEADER */}
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
                          text-[12px]
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon
                            name="user"
                            className="w-[15px] h-[15px]"
                          />
                          Ad / Soyad
                        </span>
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-[12px]
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon
                            name="circleDot"
                            className="w-[15px] h-[15px]"
                          />
                          Status
                        </span>
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-[12px]
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon
                            name="clipboard"
                            className="w-[15px] h-[15px]"
                          />
                          Öhdəlik
                        </span>
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-[12px]
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon
                            name="briefcase"
                            className="w-[15px] h-[15px]"
                          />
                          Əlaqə / Vəzifə
                        </span>
                      </th>

                      <th
                        className="
                          px-6
                          py-4
                          text-right
                          text-[12px]
                          uppercase
                          tracking-[0.07em]
                          font-extrabold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon
                            name="moreHorizontal"
                            className="w-[15px] h-[15px]"
                          />
                          Əməliyyatlar
                        </span>
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
                        (employee, index) => (
                          <tr
                            key={employee.id}
                            style={{
                              "--employee-delay": `${
                                390 +
                                Math.min(index, 10) * 18
                              }ms`,
                            }}
                            className="
                              employee-row-enter
                              group
                              hover:bg-emerald-50/40
                              dark:hover:bg-emerald-500/[0.035]
                              transition-colors
                              duration-200
                            "
                          >
                            {/* NAME */}
                            <td className="px-5 py-[15px]">
                              <div className="flex items-center gap-3 min-w-0">
                                <EmployeeAvatar
                                  employee={employee}
                                />

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
                            <td className="px-5 py-[15px]">
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
                                    employee.status ===
                                    "Aktiv"
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
                            <td className="px-5 py-[15px]">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <CellIcon name="clipboard" />

                                <span
                                  className="
                                    min-w-0
                                    truncate
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    dark:text-slate-300
                                  "
                                  title={
                                    employee.liability
                                  }
                                >
                                  {employee.liability ||
                                    "-"}
                                </span>
                              </div>
                            </td>

                            {/* POSITION / PHONE */}
                            <td className="px-5 py-[15px]">
                              <div className="flex items-center gap-3 min-w-0">
                                <CellIcon name="briefcase" />

                                <div className="min-w-0">
                                  <div
                                    className="
                                      truncate
                                      text-sm
                                      font-semibold
                                      text-slate-700
                                      dark:text-slate-300
                                    "
                                  >
                                    {employee.position ||
                                      "Vəzifə qeyd edilməyib"}
                                  </div>

                                  <div
                                    className="
                                      mt-1
                                      flex
                                      items-center
                                      gap-1.5
                                      text-xs
                                      text-slate-400
                                      dark:text-slate-500
                                    "
                                  >
                                    <Icon
                                      name="phone"
                                      className="w-3 h-3"
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
                            <td className="px-6 py-[15px]">
                              <div className="flex items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onEdit(employee)
                                  }
                                  aria-label={`${employee.name}: Redaktə et`}
                                  title="Redaktə et"
                                  className="
                                    w-9
                                    h-9
                                    shrink-0
                                    flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    text-slate-400
                                    bg-white
                                    dark:bg-slate-900
                                    hover:text-emerald-600
                                    hover:border-emerald-200
                                    hover:bg-emerald-50
                                    dark:hover:bg-emerald-500/10
                                    dark:hover:border-emerald-500/30
                                    transition-all
                                  "
                                >
                                  <Icon
                                    name="edit"
                                    className="w-[17px] h-[17px]"
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
                              Axtarış və ya sıralamanı
                              dəyiş
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {list.length > 0 && (
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    justify-between
                    gap-3
                    px-5
                    py-3.5
                    border-t
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-slate-900
                  "
                >
                  <div
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {pageStart}-{pageEnd} /{" "}
                    {list.length} işçi
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* FIRST */}
                    <button
                      type="button"
                      onClick={() => setPage(1)}
                      disabled={currentPage === 1}
                      aria-label="İlk səhifə"
                      title="İlk səhifə"
                      className="
                        w-9 h-9
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-slate-500
                        dark:text-slate-400
                        hover:bg-slate-50
                        dark:hover:bg-slate-800
                        disabled:opacity-35
                        disabled:cursor-not-allowed
                        transition
                      "
                    >
                      «
                    </button>

                    {/* PREVIOUS */}
                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) =>
                          Math.max(1, p - 1)
                        )
                      }
                      disabled={currentPage === 1}
                      aria-label="Əvvəlki səhifə"
                      title="Əvvəlki səhifə"
                      className="
                        w-9 h-9
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-slate-500
                        dark:text-slate-400
                        hover:bg-slate-50
                        dark:hover:bg-slate-800
                        disabled:opacity-35
                        disabled:cursor-not-allowed
                        transition
                      "
                    >
                      ‹
                    </button>

                    {/* PAGE NUMBERS */}
                    {visiblePages.map(
                      (pageNumber, index) => (
                        <div
                          key={pageNumber}
                          className="flex items-center gap-1.5"
                        >
                          {index > 0 &&
                            pageNumber -
                              visiblePages[
                                index - 1
                              ] >
                              1 && (
                              <span className="px-1 text-slate-400">
                                …
                              </span>
                            )}

                          <button
                            type="button"
                            onClick={() =>
                              setPage(pageNumber)
                            }
                            className={`
                              w-9 h-9
                              inline-flex
                              items-center
                              justify-center
                              rounded-lg
                              border
                              text-sm
                              font-bold
                              transition
                              ${
                                currentPage ===
                                pageNumber
                                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                              }
                            `}
                          >
                            {pageNumber}
                          </button>
                        </div>
                      )
                    )}

                    {/* NEXT */}
                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(
                            totalPages,
                            p + 1
                          )
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      aria-label="Növbəti səhifə"
                      title="Növbəti səhifə"
                      className="
                        w-9 h-9
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-slate-500
                        dark:text-slate-400
                        hover:bg-slate-50
                        dark:hover:bg-slate-800
                        disabled:opacity-35
                        disabled:cursor-not-allowed
                        transition
                      "
                    >
                      ›
                    </button>

                    {/* LAST */}
                    <button
                      type="button"
                      onClick={() =>
                        setPage(totalPages)
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      aria-label="Son səhifə"
                      title="Son səhifə"
                      className="
                        w-9 h-9
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-slate-500
                        dark:text-slate-400
                        hover:bg-slate-50
                        dark:hover:bg-slate-800
                        disabled:opacity-35
                        disabled:cursor-not-allowed
                        transition
                      "
                    >
                      »
                    </button>

                    {/* PAGE SIZE */}
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(
                          Number(e.target.value)
                        );
                        setPage(1);
                      }}
                      aria-label="Səhifədə işçi sayı"
                      className="
                        h-9
                        ml-1
                        px-3
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-900
                        text-sm
                        font-semibold
                        text-slate-600
                        dark:text-slate-300
                        outline-none
                        cursor-pointer
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

        @keyframes employeeRowEnter {
          from {
            opacity: 0;
            transform: translateY(5px);
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

        .employee-row-enter {
          animation:
            employeeRowEnter
            0.25s
            cubic-bezier(0.22, 1, 0.36, 1)
            var(--employee-delay)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .employees-toolbar-enter,
          .employees-table-enter,
          .employee-row-enter {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}