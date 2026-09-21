import { useState } from 'react';
import Icon from './common/Icons.jsx';

const navigation = [
  ['chat', 'Söhbətlər (Chat)'],
  ['tasks', 'Tapşırıqlar və Təqvim'],
  ['operator', 'Operator Təsdiqi'],
  ['groups', 'Qrup və İstifadəçilər'],
  ['companies', 'Şirkətlər Siyahısı'],
  ['users', 'İstifadəçilər Reyestri'],
  ['employees', 'İşçilər və Öhdəliklər'],
];

export default function Sidebar({
  activeView,
  onNavigate,
  taskCount,
  pendingCount,
  dark,
  onToggleTheme,
  notify,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`relative bg-gradient-to-b from-[#0c2f35] via-[#092328] to-[#051518] border-r border-teal-500/10 flex flex-col justify-between py-5 shadow-2xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64 px-4' : 'w-16 md:w-20 px-2'
      }`}
    >
      {/* Sidebar Açma / Bağlama Düyməsi (Border üzərində pambıq/pill düymə) */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        title={isExpanded ? 'Menyunu Yığ' : 'Menyunu Genişləndir'}
        className="absolute -right-3.5 top-7 w-7 h-7 rounded-full bg-[#092328] border border-teal-400/40 text-teal-300 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all shadow-md z-40 group cursor-pointer"
      >
        <span
          className={`transform transition-transform duration-300 flex items-center justify-center ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <Icon name="chevron-right" className="w-4 h-4" strokeWidth={2.5} />
        </span>
      </button>

      {/* YUXARI HİSSƏ: Başlıq/Loqo, Profil və Naviqasiya */}
      <div className="flex flex-col items-center w-full gap-4">
        {/* Əsas İdarəetmə Paneli (Home / Loqo Düyməsi) */}
        <button
          onClick={() => {
            onNavigate('chat');
            notify('Halal Əsas İdarəetmə Paneli');
          }}
          title="Halal Əsas İdarəetmə Paneli"
          className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
            activeView === 'chat'
              ? 'bg-teal-500/25 border border-teal-400 text-white shadow-[0_0_12px_rgba(45,212,191,0.25)]'
              : 'bg-teal-500/10 border border-teal-400/25 text-teal-300 hover:bg-teal-500/20 hover:text-white'
          } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
        >
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
          </div>
          {isExpanded && (
            <div className="flex flex-col text-left overflow-hidden transition-opacity duration-300">
              <span className="font-extrabold tracking-wide text-sm text-white leading-tight">
                HALAL
              </span>
              <span className="text-[10px] text-teal-300/80 uppercase font-semibold tracking-wider whitespace-nowrap">
                Technologies
              </span>
            </div>
          )}
        </button>

        {/* Profil Kartı */}
        <div
          onClick={() => notify('Profil: Emil Xanciqazov')}
          title="Emil Xanciqazov"
          className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200 ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}
        >
          <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-teal-400/30 group-hover:ring-teal-400/80 transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-[#00A896] flex items-center justify-center text-[#051518] font-black text-xs shadow-md">
              EX
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#092328]" />
          </div>
          {isExpanded && (
            <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
              <span className="text-xs font-bold text-slate-100 truncate">
                Emil Xanciqazov
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Çevrimiçi
              </span>
            </div>
          )}
        </div>

        <div className="w-full h-[1px] bg-white/10 my-0.5" />

        {/* Əsas Menyu Düymələri */}
        <nav className="flex flex-col gap-1.5 w-full">
          {navigation.map(([view, label]) => {
            const isActive = activeView === view;
            return (
              <button
                key={view}
                id={`nav-btn-${view}`}
                onClick={() => onNavigate(view)}
                title={!isExpanded ? label : undefined}
                className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                    : 'text-slate-400 hover:text-teal-200 hover:bg-white/5'
                } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
              >
                {/* Aktiv element sol xətti */}
                {isActive && (
                  <span className="absolute left-0 w-1 h-5 bg-teal-400 rounded-r-full shadow-[0_0_8px_#2dd4bf]" />
                )}

                <div className="relative shrink-0 flex items-center justify-center">
                  <Icon
                    name={view}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {/* Yığılmış vəziyyətdə bildiriş nöqtələri */}
                  {!isExpanded && view === 'chat' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_6px_#2dd4bf]" />
                  )}
                  {!isExpanded && view === 'tasks' && taskCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {taskCount}
                    </span>
                  )}
                  {!isExpanded && view === 'operator' && pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-teal-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {pendingCount}
                    </span>
                  )}
                </div>

                {/* Genişlənmiş rejimdə bənd adları və bildiriş sayı */}
                {isExpanded && (
                  <div className="flex items-center justify-between w-full ml-3 overflow-hidden">
                    <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide">
                      {label}
                    </span>
                    {view === 'tasks' && taskCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {taskCount}
                      </span>
                    )}
                    {view === 'operator' && pendingCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-teal-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* AŞAĞI HİSSƏ: Gecə/Gündüz Rejimi və Çıxış */}
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-[1px] bg-white/10 mb-1" />

        <button
          onClick={onToggleTheme}
          title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon
            name={dark ? 'sun' : 'moon'}
            className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
              dark ? 'text-amber-300' : 'text-slate-300'
            }`}
          />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap">
              {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
            </span>
          )}
        </button>

        <button
          onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
          title={!isExpanded ? 'Çıxış' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon name="logout" className="w-5 h-5 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-300">
              Çıxış
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}