import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function UsersView({ users, onCreate, onStatus, onDelete }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const list = users.filter(
    (user) =>
      (!status || user.status === status) &&
      [user.name, user.company, user.email, user.position].some((text) =>
        text.toLowerCase().includes(search.toLowerCase()),
      ),
  );
  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            İstifadəçilər
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sistem istifadəçiləri və giriş hüquqları (Halal 8 &amp; 9)
          </p>
        </div>
        <button
          onClick={onCreate}
          className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 active:scale-95 transition flex items-center gap-1.5"
        >
          <Icon name="plus" strokeWidth={2.2} />
          Yeni İstifadəçi
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ad, şirkət, vəzifə üzrə axtar..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Icon
              name="search"
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="İstifadəçi statusu"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              <option value="">Bütün Statuslar</option>
              <option>Aktiv</option>
              <option>Gözləmədə</option>
            </select>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  {[
                    "Ad / Soyad",
                    "Şirkət",
                    "E-mail",
                    "Vəzifə",
                    "Status",
                    "Əməliyyatlar",
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
                {list.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3.5 pl-6 px-4 font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-600 dark:text-brand-400">
                      {user.company}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {user.position}
                    </td>
                    <td
                      className="py-3.5 px-4 cursor-pointer"
                      onClick={() => onStatus(user.id)}
                    >
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${user.status === "Aktiv" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200"}`}
                      >
                        {user.status === "Aktiv" ? "Aktiv" : "Gözləmədə"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-6 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onStatus(user.id)}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                          title="Statusu dəyiş"
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
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDelete(user.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                          title="Sil"
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
