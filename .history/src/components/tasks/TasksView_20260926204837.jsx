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
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_30%),_linear-gradient(to_bottom,_#f8fafc,_#f1f5f9)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),_linear-gradient(to_bottom,_#020617,_#0f172a)]">
      <header className="z-10 flex h-20 shrink-0 items-center justify-between border-b border-emerald-100 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 md:px-8">
        <div className="flex items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white md:text-2xl">Tapşırıq Siyahısı</h1>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Halal Ticket v2.6</span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Komanda tapşırıqları, müştəri biletləri və planlaşdırma</p>
          </div>

          <div className="hidden items-center rounded-2xl border border-slate-200 bg-slate-100/80 p-1 shadow-inner dark:border-slate-700 dark:bg-slate-800/80 sm:flex">
            {[['list', 'Siyahı'], ['kanban', 'Kanban'], ['calendar', 'Təqvim']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs transition-all ${
                  tab === id
                    ? 'bg-white font-bold text-emerald-600 shadow-sm ring-1 ring-emerald-100 dark:bg-slate-700 dark:text-emerald-300 dark:ring-emerald-900/70'
                    : 'font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Icon name={id} className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onCreate()}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98]"
        >
          <Icon name="plus" strokeWidth={2.5} />
          Yeni Tapşırıq
        </button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-8">
        <div className="flex flex-col items-center justify-between gap-3 rounded-[26px] border border-emerald-100 bg-white/90 p-4 shadow-[0_18px_40px_rgba(16,185,129,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 lg:flex-row">
          <div className="relative w-full lg:w-80">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Ümumi axtarış (ad, mesaj, icraçı)..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <Icon name="search" className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="grid w-full items-center gap-2.5 sm:flex sm:w-auto sm:justify-end">
            <select
              aria-label="Tapşırıq statusu"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
    </section>
  );
}
