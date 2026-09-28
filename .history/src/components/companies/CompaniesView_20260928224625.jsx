import { useEffect, useMemo, useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CompaniesView({
  companies,
  onCreate,
  onEdit,
  isActive,
}) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    setIsVisible(false);

    let frame2;

    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      cancelAnimationFrame(frame1);

      if (frame2) {
        cancelAnimationFrame(frame2);
      }
    };
  }, [isActive]);

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = companies.filter((company) =>
      company.name?.toLowerCase().includes(query) ||
      company.address?.toLowerCase().includes(query) ||
      company.phone?.toLowerCase().includes(query) ||
      company.email?.toLowerCase().includes(query)
    );

    return [...filtered].sort((a, b) => {
      const first = a.name?.toLowerCase() || '';
      const second = b.name?.toLowerCase() || '';

      return sortOrder === 'az'
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });
  }, [companies, search, sortOrder]);

  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">

      {/* HEADER */}
      <header
        className="
          min-h-20
          px-6 md:px-8
          border-b border-slate-200/80 dark:border-slate-800/80
          bg-white/95 dark:bg-slate-900/95
          backdrop-blur
          flex items-center justify-between
          gap-4
          shrink-0
          z-10
        "
      >
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Şirkətlər Siyahısı
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Platformada qeydiyyatdan keçmiş tərəfdaş və müştəri şirkətlər
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            px-6 py-3
            rounded-xl
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            text-sm
            font-bold
            shadow-md
            shadow-emerald-500/20
            hover:shadow-lg
            hover:shadow-emerald-500/25
            active:scale-[0.97]
            transition-all
            duration-200
            flex items-center
            gap-2.5
          "
        >
          <Icon
            name="plus"
            strokeWidth={2.5}
            className="w-[18px] h-[18px]"
          />

          Əlavə et
        </button>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="w-full space-y-4">

          {/* TOOLBAR */}
          <div
            className={`
              flex flex-col
              lg:flex-row
              lg:items-center
              justify-between
              gap-3
              transition-all
              duration-500
              ease-out

              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }
            `}
          >
            {/* COMPANY COUNT */}
            <div
              className="
                inline-flex
                items-center
                gap-3
                w-fit
                px-3.5 py-2
                rounded-xl
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                shadow-sm
              "
            >
              <div
                className="
                  w-8 h-8
                  rounded-lg
                  bg-emerald-50
                  dark:bg-emerald-500/10
                  flex items-center justify-center
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
                    d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1m4 0h1M9 14h1m4 0h1M9 18h1m4 0h1"
                  />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {filteredCompanies.length}
                </span>

                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  şirkət göstərilir
                </span>
              </div>
            </div>

            {/* SEARCH + SORT */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">

              {/* SEARCH */}
              <div className="relative w-full sm:w-[340px]">
                <svg
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    w-4 h-4
                    text-slate-400
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Şirkət axtar..."
                  className="
                    w-full
                    h-11
                    pl-10 pr-10
                    rounded-xl
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    text-sm
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400
                    outline-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                  "
                />

                {search && (
                  <button
                    onClick={() => setSearch('')}
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
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  text-xs font-semibold
                  text-slate-600 dark:text-slate-300
                  outline-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                  cursor-pointer
                "
              >
                <option value="az">
                  Ad: A → Z
                </option>

                <option value="za">
                  Ad: Z → A
                </option>
              </select>
            </div>
          </div>

          {/* TABLE ANIMATION */}
          <div
            className={`
              transition-all
              duration-700
              ease-out

              ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-5 scale-[0.99]'
              }
            `}
            style={{
              transitionDelay: isVisible ? '80ms' : '0ms',
            }}
          >
            {/* TABLE CARD */}
            <div
              className="
                w-full
                bg-white dark:bg-slate-900
                rounded-2xl
                border border-slate-200/80 dark:border-slate-800
                shadow-sm
                overflow-hidden
                relative
              "
            >

              {/* GREEN TOP ACCENT */}
              <div
                className="
                  absolute
                  top-0 left-0 right-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-emerald-500/70
                  to-transparent
                "
              />

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">

                  {/* TABLE HEADER */}
                  <thead>
                    <tr
                      className="
                        bg-slate-50/90
                        dark:bg-slate-800/40
                        border-b
                        border-slate-200/70
                        dark:border-slate-800
                        text-[11px]
                        uppercase
                        tracking-[0.08em]
                        font-bold
                        text-slate-400
                      "
                    >
                      <th className="py-4 px-6 w-[85px]">
                        Logo
                      </th>

                      <th className="py-4 px-5">
                        Şirkət adı
                      </th>

                      <th className="py-4 px-5">
                        Ünvan
                      </th>

                      <th className="py-4 px-5 whitespace-nowrap">
                        Əlaqə nömrəsi
                      </th>

                      <th className="py-4 px-5 whitespace-nowrap">
                        Elektron poçt ünvanı
                      </th>

                      <th className="py-4 px-6 text-right w-[110px]">
                        Əməliyyat
                      </th>
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company, index) => (
                        <tr
                          key={company.id}
                          className={`
                            group
                            hover:bg-emerald-50/40
                            dark:hover:bg-emerald-500/[0.04]
                            transition-all
                            duration-500

                            ${
                              isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2'
                            }
                          `}
                          style={{
                            transitionDelay: isVisible
                              ? `${150 + index * 55}ms`
                              : '0ms',
                          }}
                        >

                          {/* LOGO */}
                          <td className="py-4 px-6">
                            <div
                              className="
                                w-10 h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-emerald-500
                                to-teal-600
                                flex items-center justify-center
                                text-white
                                font-black
                                text-xs
                                shadow-sm
                                shadow-emerald-500/20
                                group-hover:scale-105
                                transition-transform
                                duration-200
                              "
                            >
                              {company.logo}
                            </div>
                          </td>

                          {/* COMPANY NAME */}
                          <td className="py-4 px-5">
                            <div className="font-bold text-[13px] text-slate-900 dark:text-white">
                              {company.name}
                            </div>
                          </td>

                          {/* ADDRESS */}
                          <td
                            className="
                              py-4 px-5
                              text-[12px]
                              text-slate-500
                              dark:text-slate-400
                              max-w-[380px]
                            "
                          >
                            <span className="line-clamp-1">
                              {company.address}
                            </span>
                          </td>

                          {/* PHONE */}
                          <td
                            className="
                              py-4 px-5
                              text-[12px]
                              font-mono
                              text-slate-600
                              dark:text-slate-300
                              whitespace-nowrap
                            "
                          >
                            {company.phone}
                          </td>

                          {/* EMAIL */}
                          <td
                            className="
                              py-4 px-5
                              text-[12px]
                              font-mono
                              text-slate-600
                              dark:text-slate-300
                              whitespace-nowrap
                            "
                          >
                            {company.email}
                          </td>

                          {/* ACTION */}
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => onEdit(company)}
                              title="Redaktə et"
                              className="
                                inline-flex
                                items-center
                                justify-center
                                w-9 h-9
                                rounded-lg
                                text-slate-400
                                hover:text-emerald-600
                                hover:bg-emerald-50
                                dark:hover:bg-emerald-500/10
                                group-hover:text-emerald-500
                                transition-all
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
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div
                            className="
                              py-20
                              flex flex-col
                              items-center justify-center
                              text-center
                            "
                          >
                            <div
                              className="
                                w-12 h-12
                                rounded-xl
                                bg-emerald-50
                                dark:bg-emerald-500/10
                                flex items-center justify-center
                                mb-3
                                text-emerald-500
                              "
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>

                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                              Şirkət tapılmadı
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Axtarış kriteriyasını dəyiş
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
    </section>
  );
}