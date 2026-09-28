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
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#f5f6f7] dark:bg-slate-950">
      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        <div className="overflow-hidden rounded-[24px] border border-slate-200/90 bg-white/80 shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-[#f8f9f9] px-3 py-3 md:flex-row md:items-center md:justify-between md:px-4">
            <div className="relative w-full md:max-w-[420px]">
              <Icon name="search" className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ümumi axtarış (ad, mesaj, icraçı)..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 md:justify-end">
              <select
                aria-label="Tapşırıq statusu"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="">Bütün Statuslar</option>
                {taskStatuses.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
              </select>

              <button
                onClick={() => { setSearch(''); setStatus(''); notify('Filtirlər sıfırlandı'); }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
    </section>
  );
}
