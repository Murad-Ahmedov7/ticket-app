import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Icon from "../common/Icons.jsx";

export default function OperatorView({
  approvals,
  operatorTab,
  onTab,
  onApprove,
}) {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const total = approvals.length;

  const pending = approvals.filter(
    (item) => item.status === "pending"
  ).length;

  const approved = approvals.filter(
    (item) => item.status === "approved"
  ).length;

  const getAvatar = (name = "") => {
    const normalized = name
      .trim()
      .toLowerCase();

    let hash = 0;

    for (
      let i = 0;
      i < normalized.length;
      i++
    ) {
      hash =
        normalized.charCodeAt(i) +
        ((hash << 5) - hash);

      hash |= 0;
    }

    const imageNumber =
      (Math.abs(hash) % 70) + 1;

    return `https://i.pravatar.cc/80?img=${imageNumber}`;
  };

  const companies = useMemo(() => {
    const map = new Map();

    approvals.forEach((item) => {
      const value =
        item.company?.trim();

      if (!value) return;

      const key =
        value.toLocaleLowerCase("az");

      if (!map.has(key)) {
        map.set(key, value);
      }
    });

    return [...map.values()].sort(
      (a, b) =>
        a.localeCompare(b, "az", {
          sensitivity: "base",
        })
    );
  }, [approvals]);

  const filteredList = useMemo(() => {
    const searchValue = search
      .trim()
      .toLocaleLowerCase("az");

    return approvals.filter((item) => {
      const matchesTab =
        operatorTab === "all" ||
        item.status === operatorTab;

      const matchesSearch = [
        item.name,
        item.email,
        item.phone,
        item.position,
        item.company,
        item.approvedAs,
      ].some((text) =>
        (text || "")
          .toLocaleLowerCase("az")
          .includes(searchValue)
      );

      const matchesCompany =
        !company ||
        (item.company || "")
          .trim()
          .toLocaleLowerCase("az") ===
          company
            .trim()
            .toLocaleLowerCase("az");

      return (
        matchesTab &&
        matchesSearch &&
        matchesCompany
      );
    });
  }, [
    approvals,
    operatorTab,
    search,
    company,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredList.length / pageSize
    )
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    company,
    operatorTab,
    pageSize,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const list = useMemo(() => {
    const start =
      (currentPage - 1) * pageSize;

    return filteredList.slice(
      start,
      start + pageSize
    );
  }, [
    filteredList,
    currentPage,
    pageSize,
  ]);

  const firstItem =
    filteredList.length === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const lastItem = Math.min(
    currentPage * pageSize,
    filteredList.length
  );

  const visiblePages = useMemo(() => {
    const pages = [];

    const start = Math.max(
      1,
      currentPage - 2
    );

    const end = Math.min(
      totalPages,
      currentPage + 2
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    return pages;
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(
        Math.max(page, 1),
        totalPages
      )
    );
  };

  const tabs = [
    {
      value: "all",
      label: "Ümumi",
      count: total,
    },
    {
      value: "pending",
      label: "Təsdiqə gələnlər",
      count: pending,
    },
    {
      value: "approved",
      label: "Təsdiqləndi",
      count: approved,
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setCompany("");
    setCurrentPage(1);
  };

  const BriefcaseIcon = ({
    className = "w-4 h-4",
  }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
      />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );

  const BuildingIcon = ({
    className = "w-4 h-4",
  }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10" />
      <path d="M8 7h4" />
      <path d="M8 11h4" />
      <path d="M8 15h4" />
      <path d="M9 21v-3h2v3" />
      <path d="M3 21h18" />
    </svg>
  );

  const RefreshIcon = ({
    className = "w-4 h-4",
  }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M18.5 9A7 7 0 0 0 6.2 6.5L4 9" />
      <path d="M5.5 15A7 7 0 0 0 17.8 17.5L20 15" />
    </svg>
  );

  return (
    <section className="flex-1 min-w-0 h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(7px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <header className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 scale-[1.8]" />
              </span>

              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Operator təsdiq
              </h1>
            </div>

            <p className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">
              Qeydiyyatdan keçən müştərilərin və istifadəçilərin operator tərəfindən təsdiqi
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-flex min-w-max items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {tabs.map((tab) => {
                const active =
                  operatorTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    onClick={() =>
                      onTab(tab.value)
                    }
                    className={`
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-lg
                      text-xs
                      font-bold
                      whitespace-nowrap
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                      }
                    `}
                  >
                    {tab.label}

                    <span
                      className={`
                        min-w-[22px]
                        h-[22px]
                        px-1.5
                        rounded-md
                        flex
                        items-center
                        justify-center
                        text-[11px]
                        font-black
                        ${
                          tab.value === "pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            : tab.value === "approved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-200"
                        }
                      `}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-[0_6px_24px_rgba(15,23,42,0.045)] overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[20px] font-black text-slate-900 dark:text-white">
                İstifadəçilər
              </h2>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[11px] font-bold border border-emerald-100 dark:border-emerald-900">
                <Icon
                  name="users"
                  className="w-3.5 h-3.5"
                />
                {filteredList.length} istifadəçi
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full xl:w-auto">
              <div className="relative w-full sm:w-[320px] xl:w-[390px]">
                <Icon
                  name="search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Ad, email, vəzifə və ya şirkət üzrə axtar..."
                  className="
                    w-full
                    h-10
                    pl-10
                    pr-4
                    bg-slate-50
                    dark:bg-slate-800
                    text-[13px]
                    text-slate-900
                    dark:text-slate-100
                    placeholder:text-slate-400
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    outline-none
                    transition-all
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              {companies.length > 1 && (
                <div className="relative">
                  <BuildingIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <select
                    value={company}
                    onChange={(e) =>
                      setCompany(e.target.value)
                    }
                    className="
                      h-10
                      min-w-[175px]
                      pl-9
                      pr-9
                      rounded-xl
                      bg-slate-50
                      dark:bg-slate-800
                      border
                      border-slate-200
                      dark:border-slate-700
                      text-[13px]
                      font-semibold
                      text-slate-700
                      dark:text-slate-200
                      outline-none
                      transition
                      focus:border-emerald-400
                      focus:ring-4
                      focus:ring-emerald-500/10
                    "
                  >
                    <option value="">
                      Bütün şirkətlər
                    </option>

                    {companies.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="
                  h-10
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  text-[13px]
                  font-bold
                  text-slate-600
                  dark:text-slate-300
                  hover:bg-slate-100
                  dark:hover:bg-slate-700
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <RefreshIcon className="w-[17px] h-[17px]" />
                <span>Sıfırla</span>
              </button>
            </div>
          </div>

          {filteredList.length ? (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800">
                      {[
                        "Ad / Soyad",
                        "E-mail",
                        "Telefon",
                        "Vəzifə",
                        "Şirkət",
                        "Əməliyyat",
                      ].map((label, index) => (
                        <th
                          key={label}
                          className={`
                            px-5
                            py-3.5
                            text-[11px]
                            uppercase
                            tracking-[0.08em]
                            font-black
                            text-slate-400
                            ${index === 0 ? "pl-5" : ""}
                            ${index === 5 ? "pr-5 text-right" : ""}
                          `}
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {list.map((item, index) => (
                      <tr
                        key={item.id}
                        style={{
                          animation: `fadeSlideIn 260ms ease-out ${
                            index * 45
                          }ms both`,
                        }}
                        className="
                          group
                          relative
                          hover:bg-emerald-50/40
                          dark:hover:bg-emerald-950/20
                          transition-all
                          duration-200
                        "
                      >
                        <td className="relative px-5 py-4 whitespace-nowrap">
                          <span
                            className={`
                              absolute
                              left-0
                              top-2
                              bottom-2
                              w-[3px]
                              rounded-r-full
                              transition-all
                              duration-200
                              group-hover:w-[4px]
                              ${
                                item.status === "pending"
                                  ? "bg-amber-400"
                                  : "bg-emerald-500"
                              }
                            `}
                          />

                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={getAvatar(item.name)}
                                alt={item.name}
                                className="
                                  w-10
                                  h-10
                                  rounded-full
                                  object-cover
                                  ring-1
                                  ring-slate-200
                                  dark:ring-slate-700
                                "
                              />

                              <span
                                className={`
                                  absolute
                                  right-0
                                  bottom-0
                                  w-2.5
                                  h-2.5
                                  rounded-full
                                  ring-2
                                  ring-white
                                  dark:ring-slate-900
                                  ${
                                    item.status === "approved"
                                      ? "bg-emerald-500"
                                      : "bg-amber-400"
                                  }
                                `}
                              />
                            </div>

                            <span className="text-sm font-black text-slate-900 dark:text-white">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {item.email}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {item.phone}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <BriefcaseIcon className="w-4 h-4 shrink-0 text-slate-400" />
                            <span>
                              {item.position}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-lg
                              bg-slate-100
                              dark:bg-slate-800
                              text-slate-700
                              dark:text-slate-300
                              border
                              border-slate-200
                              dark:border-slate-700
                              text-xs
                              font-bold
                            "
                          >
                            <BuildingIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            {item.company}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          {item.status === "pending" ? (
                            <button
                              onClick={() =>
                                onApprove(item.id)
                              }
                              className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                min-w-[108px]
                                px-4
                                py-2.5
                                rounded-lg
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                text-xs
                                font-bold
                                shadow-sm
                                transition-all
                                active:scale-[0.98]
                              "
                            >
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>

                              Təsdiqlə
                            </button>
                          ) : (
                            <span
                              className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                min-w-[108px]
                                px-3.5
                                py-2
                                rounded-lg
                                bg-emerald-50
                                dark:bg-emerald-950/40
                                text-emerald-700
                                dark:text-emerald-300
                                border
                                border-emerald-200
                                dark:border-emerald-900
                                text-xs
                                font-bold
                              "
                            >
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                                ✓
                              </span>

                              Təsdiqləndi
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {list.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      animation: `fadeSlideIn 260ms ease-out ${
                        index * 45
                      }ms both`,
                    }}
                    className="relative p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={getAvatar(item.name)}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                        />

                        <div className="min-w-0">
                          <h3 className="text-base font-black text-slate-900 dark:text-white truncate">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-[13px] text-slate-500 truncate">
                            {item.email}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
                        <BuildingIcon className="w-3.5 h-3.5" />
                        {item.company}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                          Telefon
                        </p>

                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                          {item.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                          Vəzifə
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <BriefcaseIcon className="w-4 h-4 text-slate-400" />
                          {item.position}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      {item.status === "pending" ? (
                        <button
                          onClick={() =>
                            onApprove(item.id)
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all active:scale-[0.99]"
                        >
                          ✓ Təsdiqlə
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 text-sm font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Təsdiqləndi
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {firstItem}-{lastItem}
                  </span>{" "}
                  / {filteredList.length} istifadəçi
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    «
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      goToPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
                    className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
                    className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    »
                  </button>

                  <select
                    value={pageSize}
                    onChange={(e) =>
                      setPageSize(
                        Number(e.target.value)
                      )
                    }
                    className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
            </>
          ) : (
            <div className="min-h-[320px] flex flex-col items-center justify-center text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500 border border-emerald-100 dark:border-emerald-900">
                <Icon
                  name="search"
                  className="w-6 h-6"
                />
              </div>

              <h3 className="mt-4 text-base font-black text-slate-800 dark:text-slate-200">
                Məlumat tapılmadı
              </h3>

              <p className="mt-1.5 max-w-sm text-[13px] text-slate-400">
                Axtarışa, şirkətə və ya seçilmiş kateqoriyaya uyğun istifadəçi yoxdur.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300"
              >
                Filtrləri sıfırla
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}