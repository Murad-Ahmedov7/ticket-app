


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
      className={`app-sidebar dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 dark:border-slate-700 bg-gradient-to-b from-[#057a73] via-[#066f69] to-[#076560] border-r border-teal-400/20 flex flex-col justify-between py-4 shadow-2xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
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
            className="w-10 h-10 rounded-xl bg-white/10 dark:bg-teal-500/15 hover:bg-[#108078] dark:hover:bg-teal-500/25 border border-white/25 dark:border-teal-400/30 text-teal-50 dark:text-teal-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            {isExpanded ? (
              <svg className="w-5 h-5 text-teal-50 dark:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
              </div>
            )}
          </button>
        </div>

        {/* Hamburger altındakı ayırıcı zolaq */}
        <div className="w-full h-[1px] bg-white/20 dark:bg-[color-mix(in_srgb,var(--navigation-active-accent)_15%,transparent)]" />

        {/* 2. SIRA: Home Düyməsi */}
        <button
          onClick={() => {
            onNavigate('chat');
            notify('Halal Portal');
          }}
          title="Halal Portal"
          className={`w-full flex items-center p-2 rounded-2xl bg-teal-950/15 dark:bg-teal-400/10 border border-white/20 dark:border-teal-300/30 text-teal-50 dark:text-teal-200 cursor-pointer transition-all ${
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
          className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-[#108078] dark:hover:bg-white/10 transition-all duration-200 ${
            isExpanded ? 'justify-start px-2' : 'justify-center'
          }`}
        >
          <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-teal-300/40 group-hover:ring-teal-300/80 transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-300 to-[#00A896] flex items-center justify-center text-[#082227] font-black text-sm shadow-md">
              EX
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#066f69] dark:border-slate-900" />
          </div>
          {isExpanded && (
            <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
              <span className="text-sm font-bold text-white tracking-wide truncate">
                Emil Xanciqazov
              </span>
              <span className="text-xs text-teal-50 dark:text-teal-200 font-semibold flex items-center gap-1.5 mt-0.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Mühəndis • Halal P
              </span>
            </div>
          )}
        </div>

        {/* Profil altındakı ayırıcı xətt */}
        <div className="w-full h-[1px] bg-white/20 dark:bg-[color-mix(in_srgb,var(--navigation-active-accent)_15%,transparent)]" />

        {/* 4. SIRA: Xüsusi Çat Düyməsi */}
        <div className="w-full">
          <button
            id="nav-btn-chat"
            onClick={() => onNavigate('chat')}
            title={!isExpanded ? 'Söhbətlər (Chat)' : undefined}
            className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
              activeView === 'chat'
                ? 'bg-[var(--navigation-active-accent)] dark:bg-[color-mix(in_srgb,var(--navigation-active-accent)_15%,transparent)] text-white dark:text-teal-100 shadow-[0_2px_6px_rgba(0,0,0,0.10)] dark:shadow-[0_0_14px_rgba(45,212,191,0.12)] border border-teal-300/30 dark:border-teal-300/40'
                : 'text-teal-50 dark:text-slate-300 hover:text-white hover:bg-[#108078] dark:hover:bg-white/10'
            } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
          >
            {activeView === 'chat' && (
              <span className="absolute left-0 w-1 h-5 bg-teal-200/80 dark:bg-teal-300 rounded-r-full dark:shadow-[0_0_8px_#5eead4]" />
            )}

            <div className="relative shrink-0 flex items-center justify-center">
              <Icon
                name="chat"
                className="w-5 h-5 transition-transform group-hover:scale-110"
                strokeWidth={activeView === 'chat' ? 2.3 : 1.8}
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-600 dark:bg-teal-300 rounded-full dark:shadow-[0_0_6px_#5eead4]" />
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
                    ? 'bg-[var(--navigation-active-accent)] dark:bg-[color-mix(in_srgb,var(--navigation-active-accent)_15%,transparent)] text-white dark:text-teal-100 shadow-[0_2px_6px_rgba(0,0,0,0.10)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-teal-300/30 dark:border-teal-300/20'
                    : 'text-teal-50 dark:text-slate-300 hover:text-white hover:bg-[#108078] dark:hover:bg-white/10'
                } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
              >
                {isActive && (
                  <span className="absolute left-0 w-1 h-5 bg-teal-200/80 dark:bg-teal-300 rounded-r-full dark:shadow-[0_0_8px_#5eead4]" />
                )}

                <div className="relative shrink-0 flex items-center justify-center">
                  <Icon
                    name={view}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {!isExpanded && view === 'tasks' && taskCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {taskCount}
                    </span>
                  )}
                  {!isExpanded && view === 'operator' && pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-teal-300 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
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
                      <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {taskCount}
                      </span>
                    )}
                    {view === 'operator' && pendingCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-teal-300 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
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
        <div className="w-full h-[1px] bg-white/20 dark:bg-[color-mix(in_srgb,var(--navigation-active-accent)_15%,transparent)] mb-1" />

        <button
          onClick={onToggleTheme}
          title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-teal-50 dark:text-slate-300 hover:text-white hover:bg-[#108078] dark:hover:bg-white/10 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon
            name={dark ? 'sun' : 'moon'}
            className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
              dark ? 'text-amber-300' : 'text-teal-50 dark:text-teal-200'
            }`}
          />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-teal-100">
              {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
            </span>
          )}
        </button>

        <button
          onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
          title={!isExpanded ? 'Çıxış' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-rose-100 dark:text-rose-300 hover:text-white dark:hover:text-rose-200 hover:bg-rose-500/15 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon name="logout" className="w-5 h-5 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-100 dark:text-rose-200">
              Çıxış
            </span>
          )}
        </button>
      </div>
    </aside>
    </>
  );
}






