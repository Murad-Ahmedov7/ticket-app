import { useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";
import "./UsersView.css";
import { getAvatarByGender } from "../groups/avatars.js";

function RegistryAvatar({ user }) {
  const source = getAvatarByGender(user);
  const [failedSource, setFailedSource] = useState(null);

  const fallback = getAvatarByGender({
    id: user.id,
    username: user.username,
    name: user.name,
    gender: "neutral",
  });

  return (
    <div className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
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

export default function UsersView({
  users,
  onCreate,
  onStatus,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("name-az");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const list = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const matchesStatus = !status || user.status === status;

      const matchesSearch = [
        user.name,
        user.company,
        user.email,
        user.position,
      ].some((text) => text?.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "name-az":
          return (a.name || "").localeCompare(b.name || "");

        case "name-za":
          return (b.name || "").localeCompare(a.name || "");

        case "company-az":
          return (a.company || "").localeCompare(b.company || "");

        case "active-first":
          if (a.status === b.status) return 0;
          return a.status === "Aktiv" ? -1 : 1;

        case "waiting-first":
          if (a.status === b.status) return 0;
          return a.status === "Gözləmədə" ? -1 : 1;

        default:
          return 0;
      }
    });
  }, [users, search, status, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageStart =
    list.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const pageEnd = Math.min(currentPage * pageSize, list.length);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, currentPage, pageSize]);

  const visiblePages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).filter(
      (pageNumber) =>
        totalPages <= 5 ||
        pageNumber === 1 ||
        pageNumber === totalPages ||
        Math.abs(pageNumber - currentPage) <= 1
    );
  }, [totalPages, currentPage]);

  return (
    <section className="users-page flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      {/* HEADER */}
      <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            İstifadəçilər
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sistem istifadəçiləri və giriş hüquqları
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            px-5 py-3
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

          Yeni istifadəçi
        </button>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="w-full space-y-4">
          {/* TOOLBAR */}
          <div className="users-toolbar flex flex-col xl:flex-row xl:items-center justify-between gap-3">
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
                    d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                  />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-slate-900 dark:text-white">
                  {list.length}
                </span>

                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  istifadəçi göstərilir
                </span>
              </div>
            </div>

            {/* SEARCH / FILTER / SORT */}
            <div className="users-controls flex flex-col sm:flex-row gap-2">
              {/* SEARCH */}
              <div className="relative w-full sm:w-[330px]">
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  aria-label="İstifadəçi axtar"
                  placeholder="Ad, şirkət, e-mail və ya vəzifə..."
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-9
                    rounded-xl
                    bg-white
                    dark:bg-slate-900
                    border
                    border-slate-200
                    dark:border-slate-800
                    text-sm
                    text-slate-900
                    dark:text-white
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

              {/* STATUS */}
              <select
                aria-label="İstifadəçi statusu"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
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
                  cursor-pointer
                "
              >
                <option value="">Bütün statuslar</option>
                <option value="Aktiv">Aktiv</option>
                <option value="Gözləmədə">Gözləmədə</option>
              </select>

              {/* SORT */}
              <select
                aria-label="İstifadəçiləri sırala"
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
                  cursor-pointer
                "
              >
                <option value="name-az">Ad: A → Z</option>
                <option value="name-za">Ad: Z → A</option>
                <option value="company-az">Şirkət: A → Z</option>
                <option value="active-first">Aktiv əvvəl</option>
                <option value="waiting-first">Gözləmədə əvvəl</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="users-table-enter">
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
              <div className="users-green-line" />

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
                  {/* COLUMN WIDTHS */}
                  <colgroup>
                    <col className="w-[18%]" />
                    <col className="w-[15%]" />
                    <col className="w-[21%]" />
                    <col className="w-[17%]" />
                    <col className="w-[15%]" />
                    <col className="w-[14%]" />
                  </colgroup>

                  {/* TABLE HEADER */}
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
                      <th className="px-5 py-4 text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="user" />
                          Ad / Soyad
                        </span>
                      </th>

                      <th className="px-5 py-4 text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="building2" />
                          Şirkət
                        </span>
                      </th>

                      <th className="px-5 py-4 text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="mail" />
                          E-mail
                        </span>
                      </th>

                      <th className="px-5 py-4 text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="briefcase" />
                          Vəzifə
                        </span>
                      </th>

                      <th className="px-5 py-4 text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="circleDot" />
                          Status
                        </span>
                      </th>

                      <th className="pl-5 pr-7 py-4 text-right text-[12px] uppercase tracking-[0.07em] font-extrabold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="moreHorizontal" />
                          Əməliyyatlar
                        </span>
                      </th>
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paginatedList.length > 0 ? (
                      paginatedList.map((user, index) => (
                        <tr
                          key={user.id}
                          style={{
                            "--user-enter-delay": `${
                              560 + Math.min(index, 10) * 18
                            }ms`,
                          }}
                          className="
                            group
                            hover:bg-emerald-50/40
                            dark:hover:bg-emerald-500/[0.035]
                            transition-colors
                          "
                        >
                          {/* NAME */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <RegistryAvatar user={user} />

                              <span className="truncate text-[15px] font-bold text-slate-900 dark:text-white">
                                {user.name}
                              </span>
                            </div>
                          </td>

                          {/* COMPANY */}
                          <td className="px-5 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            <div className="users-cell-detail">
                              <span className="users-cell-icon">
                                <Icon name="building2" />
                              </span>

                              <span
                                className="min-w-0 truncate"
                                title={user.company}
                              >
                                {user.company}
                              </span>
                            </div>
                          </td>

                          {/* EMAIL */}
                          <td className="px-5 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <div className="users-cell-detail">
                              <span className="users-cell-icon">
                                <Icon name="mail" />
                              </span>

                              <span
                                className="min-w-0 truncate"
                                title={user.email}
                              >
                                {user.email}
                              </span>
                            </div>
                          </td>

                          {/* POSITION */}
                          <td className="px-5 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <div className="users-cell-detail">
                              <span className="users-cell-icon">
                                <Icon name="briefcase" />
                              </span>

                              <span
                                className="min-w-0 truncate"
                                title={user.position}
                              >
                                {user.position}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              title="Statusu dəyiş"
                              data-status={user.status}
                              onClick={() => onStatus(user.id)}
                              aria-label={`${user.name}: Statusu dəyiş`}
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
                                transition
                                ${
                                  user.status === "Aktiv"
                                    ? `
                                      bg-emerald-50
                                      text-emerald-700
                                      border-emerald-200
                                      hover:bg-emerald-100
                                      dark:bg-emerald-500/10
                                      dark:text-emerald-400
                                      dark:border-emerald-500/20
                                    `
                                    : `
                                      bg-amber-50
                                      text-amber-700
                                      border-amber-200
                                      hover:bg-amber-100
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
                                  shrink-0
                                  ${
                                    user.status === "Aktiv"
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                                  }
                                `}
                              />

                              {user.status}
                            </button>
                          </td>

                          {/* ACTIONS */}
                          <td className="pl-5 pr-7 py-4">
                            <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                              {/* STATUS BUTTON */}
                              <button
                                type="button"
                                onClick={() => onStatus(user.id)}
                                aria-label={`${user.name}: Statusu dəyiş`}
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
                                title="Statusu dəyiş"
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
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                              </button>

                              {/* DELETE BUTTON */}
                              <button
                                type="button"
                                onClick={() => onDelete(user.id)}
                                className="
                                  w-9
                                  h-9
                                  shrink-0
                                  flex
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  hover:text-rose-600
                                  hover:bg-rose-50
                                  dark:hover:bg-rose-500/10
                                  transition-all
                                "
                                title="Sil"
                                aria-label={`${user.name}: Sil`}
                              >
                                <svg
                                  className="w-[18px] h-[18px]"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.9"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="py-20 flex flex-col items-center justify-center text-center">
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

                            <p className="text-base font-bold text-slate-700 dark:text-slate-200">
                              İstifadəçi tapılmadı
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                              Axtarış, status və ya sıralamanı dəyiş
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {pageStart}-{pageEnd} / {list.length} istifadəçi
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
                        inline-flex items-center justify-center
                        rounded-lg
                        border border-slate-200 dark:border-slate-700
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-50 dark:hover:bg-slate-800
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
                        setPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      aria-label="Əvvəlki səhifə"
                      title="Əvvəlki səhifə"
                      className="
                        w-9 h-9
                        inline-flex items-center justify-center
                        rounded-lg
                        border border-slate-200 dark:border-slate-700
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-50 dark:hover:bg-slate-800
                        disabled:opacity-35
                        disabled:cursor-not-allowed
                        transition
                      "
                    >
                      ‹
                    </button>

                    {/* PAGE NUMBERS */}
                    {visiblePages.map((pageNumber, index) => (
                      <div
                        key={pageNumber}
                        className="flex items-center gap-1.5"
                      >
                        {index > 0 &&
                          pageNumber - visiblePages[index - 1] > 1 && (
                            <span className="px-1 text-slate-400">
                              …
                            </span>
                          )}

                        <button
                          type="button"
                          onClick={() => setPage(pageNumber)}
                          className={`
                            w-9 h-9
                            inline-flex items-center justify-center
                            rounded-lg
                            border
                            text-sm font-bold
                            transition
                            ${
                              currentPage === pageNumber
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }
                          `}
                        >
                          {pageNumber}
                        </button>
                      </div>
                    ))}

                    {/* NEXT */}
                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      aria-label="Növbəti səhifə"
                      title="Növbəti səhifə"
                      className="
                        w-9 h-9
                        inline-flex items-center justify-center
                        rounded-lg
                        border border-slate-200 dark:border-slate-700
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-50 dark:hover:bg-slate-800
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
                      onClick={() => setPage(totalPages)}
                      disabled={currentPage === totalPages}
                      aria-label="Son səhifə"
                      title="Son səhifə"
                      className="
                        w-9 h-9
                        inline-flex items-center justify-center
                        rounded-lg
                        border border-slate-200 dark:border-slate-700
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-50 dark:hover:bg-slate-800
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
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      aria-label="Səhifədə istifadəçi sayı"
                      className="
                        h-9
                        ml-1
                        px-3
                        rounded-lg
                        border border-slate-200
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
                      <option value={10}>10 / səhifə</option>
                      <option value={20}>20 / səhifə</option>
                      <option value={50}>50 / səhifə</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}