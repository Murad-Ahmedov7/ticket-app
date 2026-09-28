// import { useState } from "react";
// import Icon from "../common/Icons.jsx";

// export default function OperatorView({
//   approvals,
//   operatorTab,
//   onTab,
//   onApprove,
// }) {
//   const [search, setSearch] = useState("");
//   const pending = approvals.filter((item) => item.status === "pending").length;
//   const list = approvals.filter(
//     (item) =>
//       (operatorTab === "all" || item.status === operatorTab) &&
//       [
//         item.name,
//         item.email,
//         item.position,
//         item.company,
//         item.approvedAs,
//       ].some((text) =>
//         (text || "").toLowerCase().includes(search.toLowerCase()),
//       ),
//   );
//   return (
//     <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
//       <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
//         <div>
//           <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
//             Operator təsdiq
//           </h1>
//           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
//             Qeydiyyatdan keçən müştərilərin və istifadəçilərin operator
//             tərəfindən təsdiqi
//           </p>
//         </div>
//         <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
//           {[
//             ["all", "Ümumi"],
//             ["pending", "Təsdiqə gələnlər"],
//             ["approved", "Təsdiqləndi"],
//           ].map(([tab, label]) => (
//             <button
//               key={tab}
//               onClick={() => onTab(tab)}
//               className={`px-3.5 py-1.5 rounded-lg transition-all ${operatorTab === tab ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"} ${tab === "pending" ? "flex items-center gap-1.5" : ""}`}
//             >
//               {label}
//               {tab === "pending" && (
//                 <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
//                   {pending}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </header>
//       <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
//         <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
//           <div className="relative w-full sm:w-80">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Ad, email, vəzifə və ya şirkət axtar..."
//               className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
//             />
//             <Icon
//               name="search"
//               className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
//             />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
//           {list.length ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse min-w-[900px]">
//                 <thead>
//                   <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider font-bold text-slate-400">
//                     {[
//                       "Ad / Soyad",
//                       "E-mail",
//                       "Telefon",
//                       "Vəzifə",
//                       "Şirkət",
//                       "Əməliyyat",
//                     ].map((label, i) => (
//                       <th
//                         key={label}
//                         className={`py-3.5 px-4 ${i === 0 ? "pl-6" : i === 5 ? "pr-6 text-right" : ""}`}
//                       >
//                         {label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
//                   {list.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
//                     >
//                       <td className="py-3.5 pl-6 px-4 font-bold text-slate-900 dark:text-white">
//                         {item.name}
//                       </td>
//                       <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
//                         {item.email}
//                       </td>
//                       <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
//                         {item.phone}
//                       </td>
//                       <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
//                         {item.position}
//                       </td>
//                       <td className="py-3.5 px-4 font-semibold text-brand-600 dark:text-brand-400">
//                         {item.company}
//                       </td>
//                       <td className="py-3.5 pr-6 px-4 text-right">
//                         {item.status === "pending" ? (
//                           <button
//                             onClick={() => onApprove(item.id)}
//                             className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition active:scale-95"
//                           >
//                             Təsdiqlə
//                           </button>
//                         ) : (
//                           <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
//                             Təsdiqləndi
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
//               <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//                   />
//                 </svg>
//               </div>
//               <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
//                 No data
//               </h4>
//               <p className="text-xs text-slate-400 max-w-sm">
//                 Hal-hazırda bu kateqoriyada heç bir müraciət tapılmadı.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function OperatorView({
  approvals,
  operatorTab,
  onTab,
  onApprove,
}) {
  const [search, setSearch] = useState('');

  const total = approvals.length;

  const pending = approvals.filter(
    (item) => item.status === 'pending'
  ).length;

  const approved = approvals.filter(
    (item) => item.status === 'approved'
  ).length;

  const list = approvals.filter(
    (item) =>
      (operatorTab === 'all' || item.status === operatorTab) &&
      [
        item.name,
        item.email,
        item.phone,
        item.position,
        item.company,
        item.approvedAs,
      ].some((text) =>
        (text || '').toLowerCase().includes(search.toLowerCase())
      )
  );

  const getInitials = (name = '') => {
    return name
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
  };

  const tabs = [
    {
      value: 'all',
      label: 'Ümumi',
      count: total,
    },
    {
      value: 'pending',
      label: 'Təsdiqə gələnlər',
      count: pending,
    },
    {
      value: 'approved',
      label: 'Təsdiqləndi',
      count: approved,
    },
  ];

  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      {/* HEADER */}
      <header className="min-h-20 px-6 md:px-8 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.10)]" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Operator təsdiq
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Qeydiyyatdan keçən müştərilərin və istifadəçilərin operator tərəfindən təsdiqi
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold overflow-x-auto">
          {tabs.map((tab) => {
            const active = operatorTab === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => onTab(tab.value)}
                className={`
                  flex items-center gap-2 whitespace-nowrap
                  px-3.5 py-2 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                <span
                  className={
                    active
                      ? 'font-bold text-brand-600 dark:text-brand-300'
                      : ''
                  }
                >
                  {tab.label}
                </span>

                <span
                  className={`
                    min-w-5 h-5 px-1.5 rounded-md
                    flex items-center justify-center
                    text-[10px] font-black
                    ${
                      tab.value === 'pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : tab.value === 'approved'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-200'
                    }
                  `}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* TABLE TOOLBAR */}
          <div className="px-5 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  İstifadəçilər
                </h3>

                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-100 dark:border-emerald-900">
                  {list.length} qeyd
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1">
                Qeydiyyatdan keçən istifadəçiləri yoxlayın və təsdiqləyin
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <Icon
                name="search"
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ad, email, vəzifə və ya şirkət..."
                className="
                  w-full pl-9 pr-4 py-2.5
                  bg-slate-50 dark:bg-slate-800
                  rounded-xl
                  text-xs text-slate-900 dark:text-slate-100
                  border border-slate-200 dark:border-slate-700
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2 focus:ring-emerald-500/20
                  focus:border-emerald-400
                  transition
                "
              />
            </div>
          </div>

          {list.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                {/* HEAD */}
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-[10px] uppercase tracking-[0.08em] font-black text-slate-400">
                    {[
                      'Ad / Soyad',
                      'E-mail',
                      'Telefon',
                      'Vəzifə',
                      'Şirkət',
                      'Əməliyyat',
                    ].map((label, i) => (
                      <th
                        key={label}
                        className={`
                          py-3.5 px-4
                          ${i === 0 ? 'pl-6' : ''}
                          ${i === 5 ? 'pr-6 text-right' : ''}
                        `}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {list.map((item) => {
                    const isPending = item.status === 'pending';

                    return (
                      <tr
                        key={item.id}
                        className="
                          group relative
                          hover:bg-slate-50/80
                          dark:hover:bg-slate-800/35
                          transition-colors duration-150
                        "
                      >
                        {/* NAME */}
                        <td className="relative py-3.5 pl-6 pr-4">
                          {isPending && (
                            <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-amber-400" />
                          )}

                          {!isPending && (
                            <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-emerald-400/70" />
                          )}

                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                w-8 h-8 rounded-lg
                                flex items-center justify-center
                                text-[10px] font-black shrink-0
                                border
                                ${
                                  isPending
                                    ? 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900'
                                }
                              `}
                            >
                              {getInitials(item.name)}
                            </div>

                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.name}
                              </div>

                              <div className="text-[10px] text-slate-400 mt-0.5">
                                ID #{item.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                            {item.email}
                          </span>
                        </td>

                        {/* PHONE */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                            {item.phone}
                          </span>
                        </td>

                        {/* POSITION */}
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                          {item.position}
                        </td>

                        {/* COMPANY */}
                        <td className="py-3.5 px-4">
                          <span
                            className="
                              inline-flex items-center
                              px-2.5 py-1
                              rounded-lg
                              bg-violet-50 dark:bg-violet-950/40
                              text-violet-700 dark:text-violet-300
                              border border-violet-100 dark:border-violet-900
                              font-bold text-[11px]
                            "
                          >
                            {item.company}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td className="py-3.5 pr-6 px-4 text-right">
                          {isPending ? (
                            <button
                              onClick={() => onApprove(item.id)}
                              className="
                                inline-flex items-center gap-1.5
                                px-3.5 py-2
                                rounded-lg
                                bg-brand-600 hover:bg-brand-700
                                text-white
                                font-bold text-[11px]
                                shadow-sm shadow-brand-500/20
                                hover:shadow-md hover:shadow-brand-500/20
                                active:scale-[0.97]
                                transition-all duration-150
                              "
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
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
                                inline-flex items-center gap-1.5
                                px-3 py-1.5
                                rounded-lg
                                text-[11px] font-bold
                                bg-emerald-50
                                text-emerald-700
                                dark:bg-emerald-950/40
                                dark:text-emerald-300
                                border border-emerald-200
                                dark:border-emerald-900
                              "
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Təsdiqləndi
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="py-20 px-6 text-center flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-emerald-400/10 blur-xl rounded-full" />

                <div className="relative w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>

              <h4 className="text-sm font-black text-slate-700 dark:text-slate-200">
                Məlumat tapılmadı
              </h4>

              <p className="text-xs text-slate-400 max-w-sm mt-1.5">
                Hal-hazırda bu kateqoriyada uyğun müraciət yoxdur.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}