import { useState } from "react"; 
import Icon from "../common/Icons.jsx"; 
import TaskTable from "./TaskTable.jsx"; 
import TaskKanban from "./TaskKanban.jsx"; 
import TaskCalendar from "./TaskCalendar.jsx"; 
import { taskStatuses, statusLabel } from "../../utils/helpers.js"; 
 
export default function TasksView({ 
  tasks, 
  onCreate, 
  onDetail, 
  onStatus, 
  onCycle, 
  onChat, 
  calendarYear, 
  calendarMonth, 
  onMonth, 
  onResetCalendar, 
  notify, 
}) { 
  const [tab, setTab] = useState("list"); 
  const [search, setSearch] = useState(""); 
  const [status, setStatus] = useState(""); 

  const filtered = tasks.filter( 
    (task) => 
      (!status || task.status === status) && 
      [task.title, task.message, task.assignee].some((text) => 
        (text || "").toLowerCase().includes(search.toLowerCase()), 
      ), 
  ); 

  return ( 
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0"> 
      <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10"> 
        <div className="flex items-center gap-6"> 
          <div> 
            <div className="flex items-center gap-3"> 
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white"> 
                Tapşırıq Siyahısı 
              </h1> 

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"> 
                Halal Ticket v2.6 
              </span> 
            </div> 

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5"> 
              Komanda tapşırıqları, müştəri biletləri və planlaşdırma 
            </p> 
          </div> 

          <div className="hidden sm:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60"> 
            {[ 
              ["list", "Siyahı"], 
              ["kanban", "Kanban"], 
              ["calendar", "Təqvim"], 
            ].map(([id, label]) => ( 
              <button 
                key={id} 
                onClick={() => setTab(id)} 
                className={`px-3.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                  tab === id 
                    ? "font-bold bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm" 
                    : "font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`} 
              > 
                <Icon name={id} className="w-3.5 h-3.5" /> 
                {label} 
              </button> 
            ))} 
          </div> 
        </div> 

        <button 
          onClick={() => onCreate()} 
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-500/25 active:scale-95 transition flex items-center gap-2" 
        > 
          <Icon name="plus" strokeWidth={2.5} /> 
          Yeni Tapşırıq 
        </button> 
      </header> 

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"> 
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3"> 
          <div className="relative w-full lg:w-80"> 
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Ümumi axtarış (ad, mesaj, icraçı)..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            /> 

            <Icon 
              name="search" 
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" 
            /> 
          </div> 

          {tab !== "kanban" && (
            <div className="w-full sm:w-auto flex-1 grid grid-cols-2 sm:flex items-center gap-2.5 justify-end"> 
              <select 
                aria-label="Tapşırıq statusu" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              > 
                <option value="">Bütün Statuslar</option> 

                {taskStatuses.map((s) => ( 
                  <option key={s} value={s}> 
                    {statusLabel(s)} 
                  </option> 
                ))} 
              </select> 

              <button 
                onClick={() => { 
                  setSearch(""); 
                  setStatus(""); 
                  notify("Filtirlər sıfırlandı"); 
                }} 
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition" 
              > 
                Sıfırla 
              </button> 
            </div> 
          )}
        </div> 

        {tab === "list" && ( 
          <TaskTable 
            tasks={filtered} 
            onDetail={onDetail} 
            onStatus={onStatus} 
            onChat={onChat} 
          /> 
        )} 

        {tab === "kanban" && ( 
          <TaskKanban 
            tasks={tasks} 
            onDetail={onDetail} 
            onCycle={onCycle} 
          /> 
        )} 

        {tab === "calendar" && ( 
          <TaskCalendar 
            calendarYear={calendarYear} 
            calendarMonth={calendarMonth} 
            onMonth={onMonth} 
            onReset={onResetCalendar} 
            onDetail={onDetail} 
            onCreate={(date) => onCreate({ date })} 
          /> 
        )} 
      </div> 
    </section> 
  ); 
}