


import { useState } from 'react';
import Icon from './common/Icons.jsx';

const navigation = [
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
    <>
    {isExpanded && <button type="button" className="sidebar-backdrop" aria-label="Menyunu bağla" onClick={() => setIsExpanded(false)} />}
    <aside
      data-expanded={isExpanded}
      className={`app-sidebar bg-[#171c24] border-r border-slate-800 flex flex-col justify-between py-4 shadow-xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-72 px-3.5' : 'w-16 md:w-20 px-2'
      }`}
    >
      {/* YUXARI HİSSƏ */}
      <div className="flex flex-col items-center w-full gap-3">
        
        {/* 1. SIRA: Hamburger / Bağlama (X) Düyməsi */}
        <div
          className={`w-full flex items-center h-10 transition-all ${
            isExpanded ? 'justify-end px-1' : 'justify-center'
          }`}
        >
          <button
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
            title={isExpanded ? 'Menyunu Yığ' : 'Menyunu Genişləndir'}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            {isExpanded ? (
              <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="w-5 h-[2px] bg-slate-300 rounded-sm" />
                <span className="w-5 h-[2px] bg-slate-300 rounded-sm" />
                <span className="w-5 h-[2px] bg-slate-300 rounded-sm" />
              </div>
            )}
          </button>
        </div>

        {/* Hamburger altındakı ayırıcı zolaq */}
        <div className="w-full h-px bg-slate-800" />

        {/* 2. SIRA: Home Düyməsi */}
        <button
          onClick={() => {
            onNavigate('chat');
            notify('Halal Portal');
          }}
          title="Halal Portal"
          className={`w-full flex items-center p-2 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-200 cursor-pointer transition-all ${
            isExpanded ? 'justify-start gap-3 px-3' : 'justify-center'
          }`}
        >
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
          </div>
          {isExpanded && (
            <span className="font-extrabold text-sm tracking-wide text-white whitespace-nowrap">
              Halal Portal
            </span>
          )}
        </button>

        {/* 3. SIRA: Profil Kartı (Mühəndis • Halal P ilə yeniləndi) */}
        <div
          onClick={() => notify('Profil: Emil Xanciqazov')}
          title="Emil Xanciqazov (Mühəndis • Halal P)"
          className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-slate-800/70 transition-all duration-200 ${
            isExpanded ? 'justify-start px-2' : 'justify-center'
          }`}
        >
          <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-slate-700 transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-100 font-black text-sm shadow-sm">
              EX
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#171c24]" />
          </div>
          {isExpanded && (
            <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
              <span className="text-sm font-bold text-white tracking-wide truncate">
                Emil Xanciqazov
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Mühəndis • Halal P
              </span>
            </div>
          )}
        </div>

        {/* Profil altındakı ayırıcı xətt */}
        <div className="w-full h-px bg-slate-800" />

        {/* 4. SIRA: Xüsusi Çat Düyməsi */}
        <div className="w-full">
          <button
            id="nav-btn-chat"
            onClick={() => onNavigate('chat')}
            title={!isExpanded ? 'Söhbətlər (Chat)' : undefined}
            className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
              activeView === 'chat'
                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
          >
            {activeView === 'chat' && (
              <span className="absolute left-0 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
            )}

            <div className="relative shrink-0 flex items-center justify-center">
              <Icon
                name="chat"
                className="w-5 h-5 transition-transform group-hover:scale-110"
                strokeWidth={activeView === 'chat' ? 2.3 : 1.8}
              />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </div>

            {isExpanded && (
              <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide ml-3">
                Söhbətlər (Chat)
              </span>
            )}
          </button>
        </div>

        {/* 5. SIRA: Digər Modullar */}
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
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
              >
                {isActive && (
                  <span className="absolute left-0 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
                )}

                <div className="relative shrink-0 flex items-center justify-center">
                  <Icon
                    name={view}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {!isExpanded && view === 'tasks' && taskCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-slate-200 text-slate-900 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {taskCount}
                    </span>
                  )}
                  {!isExpanded && view === 'operator' && pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {pendingCount}
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="flex items-center justify-between w-full ml-3 overflow-hidden">
                    <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide">
                      {label}
                    </span>
                    {view === 'tasks' && taskCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-slate-200 text-slate-900 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {taskCount}
                      </span>
                    )}
                    {view === 'operator' && pendingCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
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

      {/* AŞAĞI HİSSƏ */}
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-px bg-slate-800 mb-1" />

        <button
          onClick={onToggleTheme}
          title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
          className={`w-full h-10 rounded-lg flex items-center text-slate-400 hover:text-white hover:bg-slate-800/70 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon
            name={dark ? 'sun' : 'moon'}
            className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
              dark ? 'text-slate-300' : 'text-slate-400'
            }`}
          />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-slate-300">
              {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
            </span>
          )}
        </button>

        <button
          onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
          title={!isExpanded ? 'Çıxış' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon name="logout" className="w-5 h-5 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-200">
              Çıxış
            </span>
          )}
        </button>
      </div>
    </aside>
    </>
  );
}






