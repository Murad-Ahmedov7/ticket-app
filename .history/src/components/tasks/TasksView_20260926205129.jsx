import { useState } from 'react';
import Icon from '../common/Icons.jsx';
import TaskTable from './TaskTable.jsx';
import TaskKanban from './TaskKanban.jsx';
import TaskCalendar from './TaskCalendar.jsx';
import { taskStatuses, statusLabel } from '../../utils/helpers.js';

export default function TasksView({ tasks, onCreate, onDetail, onStatus, onCycle, onChat, calendarYear, calendarMonth, onMonth, onResetCalendar, notify }) {
  const [tab, setTab] = useState('list');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = tasks.filter(task => (!status || task.status === status) && [task.title, task.message, task.assignee].some(text => (text || '').toLowerCase().includes(search.toLowerCase())));
  return (
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),transparent_25%),linear-gradient(180deg,#ecfdf5_0%,#f8fafc_25%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_25%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col p-4 md:p-8">
        <div className="overflow-hidden rounded-[30px] border border-emerald-100/80 bg-white/80 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/75 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60 md:px-7">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white md:text-2xl">Tapşırıq Siyahısı</h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Komanda tapşırıqları, müştəri biletləri və planlaşdırma</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/70 sm:flex">
                {[['list', 'Siyahı'], ['kanban', 'Kanban'], ['calendar', 'Təqvim']].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`rounded-xl px-3.5 py-1.5 text-[11px] font-semibold transition ${tab === id ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100 dark:bg-slate-700 dark:text-emerald-300 dark:ring-emerald-900/80' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onCreate()}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98]"
              >
                <Icon name="plus" strokeWidth={2.5} />
                Yeni Tapşırıq
              </button>
            </div>
          </header>

          <div className="space-y-5 p-4 md:p-6">
            <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/50 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Ümumi axtarış (ad, mesaj, icraçı)..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <Icon name="search" className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-2.5 lg:justify-end">
                <select
                  aria-label="Tapşırıq statusu"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="">Bütün Statuslar</option>
                  {taskStatuses.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
                </select>

                <button
                  onClick={() => { setSearch(''); setStatus(''); notify('Filtirlər sıfırlandı'); }}
                  className="rounded-2xl px-3 py-2.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  Sıfırla
                </button>
              </div>
            </div>

            {tab === 'list' && <TaskTable tasks={filtered} onDetail={onDetail} onStatus={onStatus} onChat={onChat} />}
            {tab === 'kanban' && <TaskKanban tasks={tasks} onDetail={onDetail} onCycle={onCycle} />}
            {tab === 'calendar' && <TaskCalendar calendarYear={calendarYear} calendarMonth={calendarMonth} onMonth={onMonth} onReset={onResetCalendar} onDetail={onDetail} onCreate={date => onCreate({ date })} />}
          </div>
        </div>
      </div>
    </section>
  );
}
