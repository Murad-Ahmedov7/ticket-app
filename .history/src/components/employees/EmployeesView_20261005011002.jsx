import { useEffect, useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";

function HeadLabel({ icon, children, align = "left" }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      <span className="text-slate-400 dark:text-slate-500">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function SoftIconBox({ children }) {
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        w-6
        h-6
        rounded-lg
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800/70
        text-slate-400
        dark:text-slate-500
        shrink-0
      "
    >
      {children}
    </span>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
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
      ].some((text) => text?.toLowerCase().includes(query))
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

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortOrder, pageSize]);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  const startItem = filteredList.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredList.length);

  const visiblePages = useMemo(() => {
    const pages = [];
    const windowSize = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + windowSize - 1);

    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      {/* HEADER */}
      <header
        className="
          h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80
          bg-white/95 dark:bg-slate-900/95 backdrop-blur
          flex items-center justify-between shrink-0 z-10
        "
      >
        <div>
          <h1 className="text-[28px] leading-none font-black tracking-tight text-slate-900 dark:text-white">
            İşçilər
          </h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-1.5">
            Təyin olunmuş işçilər və öhdəliklər
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white
            text-[14px] font-bold shadow-sm shadow-emerald-500/20 hover:shadow-md
            hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200
            flex items-center gap-2
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="w-full space-y-4">
          {/* TOOLBAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 employees-toolbar-enter">
            {/* COUNT */}
            <div
              className="
                inline-flex items-center gap-3 w-fit px-4 py-2.5 rounded-xl bg-white
                dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                shadow-[0_2px_10px_rgba(15,23,42,0.04)] dark:shadow-none
              "
            >
              <div
                className="
                  w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10
                  flex items-center justify-center text-emerald-600 dark:text-emerald-400
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
                <span className="text-[17px] font-black text-slate-900 dark:text-white">
                  {filteredList.length}
                </span>
                <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                  işçi göstərilir
                </span>
              </div>
            </div>

            {/* SEARCH + SORT */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative w-full sm:w-[360px]">
                <Icon
                  name="search"
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ad, öhdəlik, vəzifə və ya telefon..."
                  className="
                    w-full h-11 pl-10 pr-10 rounded-xl bg-white dark:bg-slate-900 border
                    border-slate-200 dark:border-slate-800 text-[14px] text-slate-900
                    dark:text-slate-100 placeholder:text-slate-400 outline-none
                    shadow-[0_2px_10px_rgba(15,23,42,0.03)] dark:shadow-none
                    focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                      hover:text-slate-700 dark:hover:text-white transition
                    "
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="
                  h-11 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200
                  dark:border-slate-800 text-[14px] font-semibold text-slate-600
                  dark:text-slate-300 outline-none shadow-[0_2px_10px_rgba(15,23,42,0.03)]
                  dark:shadow-none focus:border-emerald-400 focus:ring-4
                  focus:ring-emerald-500/10 transition cursor-pointer
                "
              >
                <option value="name-az">Ad: A → Z</option>
                <option value="name-za">Ad: Z → A</option>
                <option value="position-az">Vəzifə: A → Z</option>
                <option value="active-first">Aktiv əvvəl</option>
                <option value="waiting-first">Gözləmədə əvvəl</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="employees-table-enter">
            <div
              className="
                relative w-full bg-white dark:bg-slate-900 rounded-2xl border
                border-slate-200/80 dark:border-slate-800
                shadow-[0_5px_20px_rgba(15,23,42,0.055)] dark:shadow-none overflow-hidden
              "
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />

              <div className="overflow-x-auto">
                <table
                  className="
                    w-full min-w-[1080px] table-fixed border-collapse text-left
                  "
                >
                  <colgroup>
                    <col className="w-[23%]" />
                    <col className="w-[13%]" />
                    <col className="w-[25%]" />
                    <col className="w-[27%]" />
                    <col className="w-[12%]" />
                  </colgroup>

                  <thead>
                    <tr
                      className="
                        bg-slate-50/90 dark:bg-slate-800/40 border-b
                        border-slate-200 dark:border-slate-800
                      "
                    >
                      <th className="px-5 py-4 text-[11px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <HeadLabel
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0" />
                            </svg>
                          }
                        >
                          AD / SOYAD
                        </HeadLabel>
                      </th>

                      <th className="px-5 py-4 text-[11px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <HeadLabel
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9m-9 4h5.25M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Z" />
                            </svg>
                          }
                        >
                          STATUS
                        </HeadLabel>
                      </th>

                      <th className="px-5 py-4 text-[11px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <HeadLabel
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z" />
                            </svg>
                          }
                        >
                          ÖHDƏLİK
                        </HeadLabel>
                      </th>

                      <th className="px-5 py-4 text-[11px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <HeadLabel
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15A2.25 2.25 0 0 1 21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Zm3.75 1.5 6 4.5 6-4.5" />
                            </svg>
                          }
                        >
                          ƏLAQƏ / VƏZİFƏ
                        </HeadLabel>
                      </th>

                      <th className="px-6 py-4 text-right text-[11px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <HeadLabel
                          align="right"
                          icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <circle cx="5" cy="12" r="1.7" />
                              <circle cx="12" cy="12" r="1.7" />
                              <circle cx="19" cy="12" r="1.7" />
                            </svg>
                          }
                        >
                          ƏMƏLİYYATLAR
                        </HeadLabel>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                    {paginatedList.length > 0 ? (
                      paginatedList.map((employee) => (
                        <tr
                          key={employee.id}
                          className="
                            group hover:bg-emerald-50/40 dark:hover:bg-emerald-500/[0.035]
                            transition-colors duration-200
                          "
                        >
                          {/* NAME */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="
                                  w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br
                                  from-emerald-500 to-teal-600 flex items-center justify-center
                                  text-white text-[12px] font-black shadow-sm shadow-emerald-500/20
                                  group-hover:scale-105 transition-transform duration-200
                                "
                              >
                                {getInitials(employee.name)}
                              </div>

                              <span className="truncate text-[15px] font-bold text-slate-900 dark:text-white">
                                {employee.name}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-5 py-4">
                            <span
                              className={`
                                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                text-[12px] font-bold border whitespace-nowrap
                                ${
                                  employee.status === "Aktiv"
                                    ? `
                                      bg-emerald-50 text-emerald-700 border-emerald-200
                                      dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20
                                    `
                                    : `
                                      bg-amber-50 text-amber-700 border-amber-200
                                      dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20
                                    `
                                }
                              `}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  employee.status === "Aktiv" ? "bg-emerald-500" : "bg-amber-500"
                                }`}
                              />
                              {employee.status === "Aktiv" ? "Aktiv" : "Gözləmədə"}
                            </span>
                          </td>

                          {/* LIABILITY */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <SoftIconBox>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z" />
                                </svg>
                              </SoftIconBox>

                              <span className="block truncate text-[14px] font-semibold text-slate-700 dark:text-slate-300">
                                {employee.liability || "-"}
                              </span>
                            </div>
                          </td>

                          {/* POSITION / PHONE */}
                          <td className="px-5 py-4">
                            <div className="flex items-start gap-2.5 min-w-0">
                              <SoftIconBox>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15A2.25 2.25 0 0 1 21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Zm3.75 1.5 6 4.5 6-4.5" />
                                </svg>
                              </SoftIconBox>

                              <div className="space-y-1 min-w-0">
                                <div className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                                  {employee.position || "Vəzifə qeyd edilməyib"}
                                </div>
                                <div className="text-[12px] text-slate-400 dark:text-slate-500">
                                  {employee.phone || "Telefon yoxdur"}
                                </div>
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
                                  w-9 h-9 shrink-0 flex items-center justify-center rounded-lg
                                  border border-slate-200 dark:border-slate-700
                                  bg-white dark:bg-slate-900 text-slate-400
                                  hover:text-emerald-600 hover:bg-emerald-50
                                  dark:hover:bg-emerald-500/10 transition-all
                                "
                                title="Redaktə et"
                              >
                                <svg
                                  className="w-[17px] h-[17px]"
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
                          <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div
                              className="
                                w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10
                                flex items-center justify-center text-emerald-500 mb-3
                              "
                            >
                              <Icon name="search" className="w-5 h-5" />
                            </div>

                            <p className="text-base font-bold text-slate-700 dark:text-slate-200">
                              İşçi tapılmadı
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
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
              <div
                className="
                  flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                  px-5 py-4 border-t border-slate-200 dark:border-slate-800
                  bg-white dark:bg-slate-900
                "
              >
                <div className="text-[14px] text-slate-500 dark:text-slate-400">
                  {startItem}-{endItem} / {filteredList.length} işçi
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="
                      w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700
                      flex items-center justify-center text-slate-400
                      hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800
                      disabled:opacity-40 disabled:pointer-events-none transition
                    "
                  >
                    «
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="
                      w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700
                      flex items-center justify-center text-slate-400
                      hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800
                      disabled:opacity-40 disabled:pointer-events-none transition
                    "
                  >
                    ‹
                  </button>

                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[34px] h-8 px-2 rounded-lg text-[13px] font-bold transition ${
                        currentPage === page
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="
                      w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700
                      flex items-center justify-center text-slate-400
                      hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800
                      disabled:opacity-40 disabled:pointer-events-none transition
                    "
                  >
                    ›
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="
                      w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700
                      flex items-center justify-center text-slate-400
                      hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800
                      disabled:opacity-40 disabled:pointer-events-none transition
                    "
                  >
                    »
                  </button>

                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="
                      h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700
                      bg-white dark:bg-slate-900 text-[13px] font-semibold
                      text-slate-600 dark:text-slate-300 outline-none
                    "
                  >
                    <option value={10}>10 / səhifə</option>
                    <option value={20}>20 / səhifə</option>
                    <option value={50}>50 / səhifə</option>
                  </select>
                </div>
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
          animation: employeesToolbarEnter 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .employees-table-enter {
          animation: employeesTableEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
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