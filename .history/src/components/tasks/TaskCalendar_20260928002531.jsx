import Icon from '../common/Icons.jsx';

const monthNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

export default function TaskCalendar({ calendarYear, calendarMonth, onMonth, onReset, onDetail, onCreate }) {
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const days = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const previousDays = new Date(calendarYear, calendarMonth, 0).getDate();
  return <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800"><div className="flex items-center gap-3"><div className="flex items-center gap-1"><button onClick={() => onMonth(-1)} title="Əvvəlki ay" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"><Icon name="left" /></button><h3 className="text-base font-black text-slate-900 dark:text-white px-2">{calendarYear} {monthNames[calendarMonth]}</h3><button onClick={() => onMonth(1)} title="Növbəti ay" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"><Icon name="right" /></button></div><button onClick={onReset} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition">Bu gün</button></div><span className="text-xs text-slate-500">Halal 12 İnteraktiv Təqvim Sistemi</span></div>
    <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 py-1">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>
    <div className="grid grid-cols-7 gap-2 min-h-[480px]">{Array.from({ length: 42 }, (_, i) => {
      const current = i >= firstDay && i < firstDay + days;
      const day = i < firstDay ? previousDays - firstDay + i + 1 : i >= firstDay + days ? i - firstDay - days + 1 : i - firstDay + 1;
      const date = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const september = current && calendarYear === 2026 && calendarMonth === 8;
      return <div key={i} className={`min-h-[72px] p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between transition hover:border-brand-300 dark:hover:border-brand-700 ${current ? 'bg-white dark:bg-slate-800/80' : 'opacity-40'}`}>
        <div className="flex items-center justify-between"><span className={`text-xs font-bold ${current ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>{day}</span><button onClick={() => onCreate(date)} className="opacity-0 hover:opacity-100 p-0.5 rounded text-brand-600 hover:bg-brand-50" title="Bu günə task əlavə et">+</button></div>
        <div className="mt-1 space-y-1">
          {september && day <= 10 && <div onClick={() => onDetail(10)} className="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1" title="tur">13:43 - tur</div>}
          {september && day === 16 && <div onClick={() => onDetail(112)} className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1" title="yenilk">12:00 - yenilk</div>}
          {september && day === 25 && <div onClick={() => onDetail(113)} className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[9px] font-bold truncate cursor-pointer hover:underline mb-1" title="nofication">10:14 - nofication</div>}
        </div>
      </div>;
    })}</div>
  </div>;
}
