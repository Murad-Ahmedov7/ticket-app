import Icon from './common/Icons.jsx';

const navigation = [
  ['chat', 'Söhbətlər (Chat)'], ['tasks', 'Tapşırıqlar və Təqvim'],
  ['operator', 'Operator Təsdiqi'], ['groups', 'Qrup və İstifadəçilər'],
  ['companies', 'Şirkətlər Siyahısı'], ['users', 'İstifadəçilər Reyestri'],
  ['employees', 'İşçilər və Öhdəliklər'],
];

export default function Sidebar({ activeView, onNavigate, taskCount, pendingCount, dark, onToggleTheme, notify }) {
  // return (
  //   <aside className="w-16 md:w-20 bg-gradient-to-b from-brand-700 via-brand-600 to-brand-900 flex flex-col items-center py-4 justify-between shadow-2xl z-30 shrink-0 select-none">
  //     <div className="flex flex-col items-center gap-4 w-full">
  //       <button className="relative group cursor-pointer" onClick={() => { onNavigate('chat'); notify('Halal Əsas İdarəetmə Paneli'); }} title="Halal">
  //         <span className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"><Icon name="home" className="w-6 h-6" strokeWidth={2.3} /></span>
  //       </button>
  //       <div className="relative group cursor-pointer" onClick={() => notify('Profil: Emil Xanciqazov')} title="Emil Xanciqazov">
  //         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 to-orange-400 border-2 border-white/80 flex items-center justify-center text-brand-900 font-extrabold text-xs shadow-lg">EX</div>
  //         <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-700" />
  //       </div>
  //       <nav className="flex flex-col items-center gap-2 w-full px-2 mt-1">
  //         {navigation.map(([view, label]) => <button key={view} id={`nav-btn-${view}`} onClick={() => onNavigate(view)} title={label} className={`relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${activeView === view ? 'bg-white/25 text-white shadow-inner' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
  //           <Icon name={view} className="w-5 h-5" strokeWidth={view === 'chat' ? 2.2 : 2} />
  //           {view === 'chat' && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-700" />}
  //           {view === 'tasks' && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{taskCount}</span>}
  //           {view === 'operator' && pendingCount > 0 && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-emerald-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{pendingCount}</span>}
  //         </button>)}
  //       </nav>
  //     </div>
  //     <div className="flex flex-col items-center gap-2.5 w-full px-2">
  //       <button onClick={onToggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition" title="Gecə / Gündüz Rejimi"><Icon name={dark ? 'sun' : 'moon'} className={`w-5 h-5 ${dark ? 'text-amber-300' : 'text-white'}`} /></button>
  //       <button onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')} className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-300 hover:text-rose-100 hover:bg-rose-500/25 transition" title="Çıxış"><Icon name="logout" className="w-5 h-5" /></button>
  //     </div>
  //   </aside>
  // );


return (
  <aside className="w-16 md:w-20 bg-gradient-to-b from-[#0c2f35] via-[#092328] to-[#051518] border-r border-teal-500/10 flex flex-col items-center py-5 justify-between shadow-2xl z-30 shrink-0 select-none">
    {/* Yuxarı Hissə: Home, Profil və Əsas Naviqasiya */}
    <div className="flex flex-col items-center w-full gap-4">
      
      {/* Əsas İdarəetmə Paneli / Home Düyməsi */}
      <button
        onClick={() => { onNavigate('home'); notify('Halal Əsas İdarəetmə Paneli'); }}
        title="Halal Ana Səhifə"
        className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-lg transition-transform hover:scale-105 active:scale-95 hover:bg-teal-500/25 hover:text-white"
      >
        <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
      </button>

      {/* Profil Avatarı */}
      <div 
        className="relative group cursor-pointer p-0.5 rounded-full ring-2 ring-teal-400/30 hover:ring-teal-400/80 transition-all duration-300"
        onClick={() => notify('Profil: Emil Xanciqazov')} 
        title="Emil Xanciqazov"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-[#00A896] flex items-center justify-center text-[#051518] font-black text-xs shadow-md">
          EX
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#092328]" />
      </div>

      <div className="w-8 h-[1px] bg-white/10 my-0.5" />

      {/* Əsas Menyu Düymələri */}
      <nav className="flex flex-col items-center gap-2 w-full px-2">
        {navigation.map(([view, label]) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              id={`nav-btn-${view}`}
              onClick={() => onNavigate(view)}
              title={label}
              className={`relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 group ${
                isActive
                  ? 'bg-teal-500/20 text-teal-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'text-slate-400 hover:text-teal-200 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <span className="absolute -left-2 w-1 h-5 bg-teal-400 rounded-r-full shadow-[0_0_8px_#2dd4bf]" />
              )}

              <Icon
                name={view}
                className="w-5 h-5 transition-transform group-hover:scale-110"
                strokeWidth={isActive ? 2.3 : 1.8}
              />

              {view === 'chat' && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_6px_#2dd4bf]" />
              )}
              {view === 'tasks' && taskCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {taskCount}
                </span>
              )}
              {view === 'operator' && pendingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-teal-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>

    {/* Aşağı Hissə: Mövzu və Çıxış */}
    <div className="flex flex-col items-center gap-2 w-full px-2">
      <div className="w-8 h-[1px] bg-white/10 mb-1" />

      <button
        onClick={onToggleTheme}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        title="Gecə / Gündüz Rejimi"
      >
        <Icon
          name={dark ? 'sun' : 'moon'}
          className={`w-5 h-5 transition-transform hover:rotate-12 ${dark ? 'text-amber-300' : 'text-slate-300'}`}
        />
      </button>

      <button
        onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
        title="Çıxış"
      >
        <Icon name="logout" className="w-5 h-5" />
      </button>
    </div>
  </aside>
);
}
