import { useMemo, useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CompaniesView({ companies, onCreate, onEdit }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('az');

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = companies.filter((company) => {
      return (
        company.name?.toLowerCase().includes(query) ||
        company.address?.toLowerCase().includes(query) ||
        company.phone?.toLowerCase().includes(query) ||
        company.email?.toLowerCase().includes(query)
      );
    });

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
      <header className="min-h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between gap-4 shrink-0 z-10">
        <div className="min-w-0">
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
            shrink-0
            px-4 py-2.5
            rounded-xl
            bg-brand-600 hover:bg-brand-700
            text-white
            text-xs font-bold
            shadow-md shadow-brand-500/20
            active:scale-[0.97]
            transition-all
            flex items-center gap-2
          "
        >
          <Icon name="plus" strokeWidth={2.5} />

          <span className="hidden sm:inline">
            Əlavə et
          </span>
        </button>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">

        <div className="max-w-[1800px] mx-auto space-y-4">

          {/* TOOLBAR */}
          <div className="
            flex flex-col md:flex-row
            md:items-center
            justify-between
            gap-3
          ">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {filteredCompanies.length}
              </span>

              <span className="text-slate-400">
                şirkət
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">

              {/* SEARCH */}
              <div className="relative w-full sm:w-[320px]">
                <svg
                  className="
                    absolute left-3.5 top-1/2 -translate-y-1/2
                    w-4 h-4
                    text-slate-400
                    pointer-events-none
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
                    h-10
                    pl-10 pr-10
                    rounded-xl
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    text-sm
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400
                    outline-none
                    focus:border-brand-400
                    focus:ring-4 focus:ring-brand-500/10
                    transition
                  "
                />

                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                      dark:hover:text-white
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
                  h-10
                  px-3
                  rounded-xl
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  text-xs font-semibold
                  text-slate-600 dark:text-slate-300
                  outline-none
                  focus:border-brand-400
                  transition
                  cursor-pointer
                "
              >
                <option value="az">Ad: A → Z</option>
                <option value="za">Ad: Z → A</option>
              </select>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200/80 dark:border-slate-800
            shadow-sm
            overflow-hidden
          ">
            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse min-w-[900px]">

                {/* TABLE HEADER */}
                <thead>
                  <tr className="
                    bg-slate-50/80 dark:bg-slate-800/40
                    border-b border-slate-200/70 dark:border-slate-800
                    text-[10px]
                    uppercase
                    tracking-[0.08em]
                    font-bold
                    text-slate-400
                  ">
                    <th className="py-3 px-5 w-[75px]">
                      Logo
                    </th>

                    <th className="py-3 px-4">
                      Şirkət adı
                    </th>

                    <th className="py-3 px-4">
                      Ünvan
                    </th>

                    <th className="py-3 px-4 whitespace-nowrap">
                      Əlaqə nömrəsi
                    </th>

                    <th className="py-3 px-4 whitespace-nowrap">
                      Elektron poçt ünvanı
                    </th>

                    <th className="py-3 px-5 text-right w-[100px]">
                      Əməliyyat
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">

                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <tr
                        key={company.id}
                        className="
                          group
                          hover:bg-slate-50/70
                          dark:hover:bg-slate-800/30
                          transition-colors
                        "
                      >

                        {/* LOGO */}
                        <td className="py-3.5 px-5">
                          <div className="
                            w-9 h-9
                            rounded-xl
                            bg-gradient-to-br
                            from-brand-600
                            to-indigo-600
                            flex items-center justify-center
                            text-white
                            font-black text-[11px]
                            shadow-sm
                            shadow-brand-500/20
                          ">
                            {company.logo}
                          </div>
                        </td>

                        {/* NAME */}
                        <td className="py-3.5 px-4">
                          <div className="
                            font-bold
                            text-[13px]
                            text-slate-900
                            dark:text-white
                          ">
                            {company.name}
                          </div>
                        </td>

                        {/* ADDRESS */}
                        <td className="
                          py-3.5 px-4
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                          max-w-[350px]
                        ">
                          <span className="line-clamp-1">
                            {company.address}
                          </span>
                        </td>

                        {/* PHONE */}
                        <td className="
                          py-3.5 px-4
                          text-[11px]
                          font-mono
                          text-slate-600
                          dark:text-slate-300
                          whitespace-nowrap
                        ">
                          {company.phone}
                        </td>

                        {/* EMAIL */}
                        <td className="
                          py-3.5 px-4
                          text-[11px]
                          font-mono
                          text-slate-600
                          dark:text-slate-300
                          whitespace-nowrap
                        ">
                          {company.email}
                        </td>

                        {/* ACTION */}
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => onEdit(company)}
                            title="Redaktə et"
                            className="
                              inline-flex
                              items-center justify-center
                              w-8 h-8
                              rounded-lg
                              text-slate-400
                              hover:text-brand-600
                              hover:bg-brand-50
                              dark:hover:bg-brand-500/10
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
                        <div className="
                          py-16
                          flex flex-col
                          items-center justify-center
                          text-center
                        ">
                          <div className="
                            w-11 h-11
                            rounded-xl
                            bg-slate-100
                            dark:bg-slate-800
                            flex items-center justify-center
                            mb-3
                            text-slate-400
                          ">
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

                          <p className="
                            text-sm
                            font-bold
                            text-slate-700
                            dark:text-slate-200
                          ">
                            Şirkət tapılmadı
                          </p>

                          <p className="
                            text-xs
                            text-slate-400
                            mt-1
                          ">
                            Axtarış kriteriyasını dəyişməyə çalış
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
    </section>
  );
}