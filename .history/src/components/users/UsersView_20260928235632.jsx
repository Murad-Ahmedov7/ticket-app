import { useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";

export default function UsersView({
  users,
  onCreate,
  onStatus,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("name-az");

  const list = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const matchesStatus = !status || user.status === status;

      const matchesSearch = [
        user.name,
        user.company,
        user.email,
        user.position,
      ].some((text) =>
        text?.toLowerCase().includes(query)
      );

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

  return (
    <section
      className="
        flex-1
        flex flex-col
        h-full
        bg-slate-50
        dark:bg-slate-950
        overflow-hidden
        min-w-0
      "
    >
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
            İstifadəçilər
          </h1>

          <p
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
              mt-1
            "
          >
            Sistem istifadəçiləri və giriş hüquqları
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

          Yeni istifadəçi
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
            "
          >
            {/* USER COUNT */}
            <div
              className="
                inline-flex
                items-center
                gap-3
                w-fit
                px-3.5
                py-2
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
                  w-8
                  h-8
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
                  className="w-4 h-4"
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
                    text-[13px]
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  istifadəçi göstərilir
                </span>
              </div>
            </div>

            {/* SEARCH + FILTER + SORT */}
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
              <div className="relative w-full sm:w-[320px]">
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
                  placeholder="Ad, şirkət, e-mail və ya vəzifə..."
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

              {/* STATUS FILTER */}
              <select
                aria-label="İstifadəçi statusu"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                <option value="">
                  Bütün statuslar
                </option>

                <option value="Aktiv">
                  Aktiv
                </option>

                <option value="Gözləmədə">
                  Gözləmədə
                </option>
              </select>

              {/* SORT */}
              <select
                aria-label="İstifadəçi sıralaması"
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

                <option value="company-az">
                  Şirkət: A → Z
                </option>

                <option value="active-first">
                  Status: Aktiv əvvəl
                </option>

                <option value="waiting-first">
                  Status: Gözləmədə əvvəl
                </option>
              </select>
            </div>
          </div>

          {/* TABLE ANIMATION */}
          <div className="users-table-enter">

            {/* TABLE CARD */}
            <div
              className="
                w-full
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                shadow-[0_4px_18px_rgba(15,23,42,0.05)]
                dark:shadow-none
                overflow-hidden
                relative
              "
            >
              {/* GREEN SWEEP LINE */}
              <div className="users-green-line" />

              <div className="overflow-x-auto">
                <table
                  className="
                    w-full
                    text-left
                    border-collapse
                    min-w-[950px]
                  "
                >
                  {/* TABLE HEADER */}
                  <thead>
                    <tr
                      className="
                        border-b
                        border-slate-200/70
                        dark:border-slate-800
                        bg-slate-50/90
                        dark:bg-slate-800/40
                        text-xs
                        uppercase
                        tracking-[0.08em]
                        font-bold
                        text-slate-400
                      "
                    >
                      <th className="py-4.5 px-6">
                        Ad / Soyad
                      </th>

                      <th className="py-4.5 px-5">
                        Şirkət
                      </th>

                      <th className="py-4.5 px-5">
                        E-mail
                      </th>

                      <th className="py-4.5 px-5">
                        Vəzifə
                      </th>

                      <th className="py-4.5 px-5">
                        Status
                      </th>

                      <th className="py-4.5 px-6 text-right">
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
                      list.map((user) => (
                        <tr
                          key={user.id}
                          className="
                            group
                            hover:bg-emerald-50/35
                            dark:hover:bg-emerald-500/[0.035]
                            transition-colors
                            duration-200
                          "
                        >
                          {/* NAME */}
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3.5">

                              {/* AVATAR */}
                              <div
                                className="
                                  w-10
                                  h-10
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
                                  shadow-emerald-500/15
                                  group-hover:scale-105
                                  transition-transform
                                  duration-200
                                "
                              >
                                {user.name
                                  ?.split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>

                              <span
                                className="
                                  font-bold
                                  text-sm
                                  text-slate-900
                                  dark:text-white
                                "
                              >
                                {user.name}
                              </span>
                            </div>
                          </td>

                          {/* COMPANY */}
                          <td
                            className="
                              py-5
                              px-5
                              text-[13px]
                              font-semibold
                              text-emerald-600
                              dark:text-emerald-400
                            "
                          >
                            {user.company}
                          </td>

                          {/* EMAIL */}
                          <td
                            className="
                              py-5
                              px-5
                              font-mono
                              text-xs
                              text-slate-600
                              dark:text-slate-300
                            "
                          >
                            {user.email}
                          </td>

                          {/* POSITION */}
                          <td
                            className="
                              py-5
                              px-5
                              text-[13px]
                              text-slate-600
                              dark:text-slate-300
                            "
                          >
                            {user.position}
                          </td>

                          {/* STATUS */}
                          <td className="py-5 px-5">
                            <button
                              type="button"
                              onClick={() => onStatus(user.id)}
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
                                transition-all

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

                                  ${
                                    user.status === "Aktiv"
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                                  }
                                `}
                              />

                              {user.status === "Aktiv"
                                ? "Aktiv"
                                : "Gözləmədə"}
                            </button>
                          </td>

                          {/* ACTIONS */}
                          <td className="py-5 px-6 text-right">
                            <div
                              className="
                                flex
                                items-center
                                justify-end
                                gap-1.5
                              "
                            >
                              {/* STATUS */}
                              <button
                                type="button"
                                onClick={() => onStatus(user.id)}
                                className="
                                  w-10
                                  h-10
                                  inline-flex
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

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() => onDelete(user.id)}
                                className="
                                  w-10
                                  h-10
                                  inline-flex
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
                              İstifadəçi tapılmadı
                            </p>

                            <p
                              className="
                                text-sm
                                text-slate-400
                                mt-1
                              "
                            >
                              Axtarış, status və ya sıralamanı dəyiş
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
        @keyframes usersTableEnter {
          from {
            opacity: 0;
            transform: translateY(5px) scale(0.995);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes greenLineSweep {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .users-table-enter {
          animation:
            usersTableEnter
            0.4s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .users-green-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(16, 185, 129, 0.75),
              transparent
            );

          transform-origin: left center;

          animation:
            greenLineSweep
            0.65s
            cubic-bezier(0.22, 1, 0.36, 1)
            0.1s
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .users-table-enter,
          .users-green-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}