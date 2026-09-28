import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function OperatorView({
  approvals,
  operatorTab,
  onTab,
  onApprove,
}) {
  const [search, setSearch] = useState("");
  const pending = approvals.filter((item) => item.status === "pending").length;
  const list = approvals.filter(
    (item) =>
      (operatorTab === "all" || item.status === operatorTab) &&
      [
        item.name,
        item.email,
        item.position,
        item.company,
        item.approvedAs,
      ].some((text) =>
        (text || "").toLowerCase().includes(search.toLowerCase()),
      ),
  );
  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Operator təsdiq
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Qeydiyyatdan keçən müştərilərin və istifadəçilərin operator
            tərəfindən təsdiqi
          </p>
        </div>
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
          {[
            ["all", "Ümumi"],
            ["pending", "Təsdiqə gələnlər"],
            ["approved", "Təsdiqləndi"],
          ].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => onTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${operatorTab === tab ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"} ${tab === "pending" ? "flex items-center gap-1.5" : ""}`}
            >
              {label}
              {tab === "pending" && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                  {pending}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ad, email, vəzifə və ya şirkət axtar..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Icon
              name="search"
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          {list.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    {[
                      "Ad / Soyad",
                      "E-mail",
                      "Telefon",
                      "Vəzifə",
                      "Şirkət",
                      "Əməliyyat",
                    ].map((label, i) => (
                      <th
                        key={label}
                        className={`py-3.5 px-4 ${i === 0 ? "pl-6" : i === 5 ? "pr-6 text-right" : ""}`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {list.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="py-3.5 pl-6 px-4 font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {item.email}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {item.phone}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        {item.position}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-brand-600 dark:text-brand-400">
                        {item.company}
                      </td>
                      <td className="py-3.5 pr-6 px-4 text-right">
                        {item.status === "pending" ? (
                          <button
                            onClick={() => onApprove(item.id)}
                            className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition active:scale-95"
                          >
                            Təsdiqlə
                          </button>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                            Təsdiqləndi
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <svg
                  className="w-8 h-8"
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
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                No data
              </h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Hal-hazırda bu kateqoriyada heç bir müraciət tapılmadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
