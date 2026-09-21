// import Icon from './common/Icons.jsx';

// const navigation = [
//   ['chat', 'Söhbətlər (Chat)'], ['tasks', 'Tapşırıqlar və Təqvim'],
//   ['operator', 'Operator Təsdiqi'], ['groups', 'Qrup və İstifadəçilər'],
//   ['companies', 'Şirkətlər Siyahısı'], ['users', 'İstifadəçilər Reyestri'],
//   ['employees', 'İşçilər və Öhdəliklər'],
// ];

// export default function Sidebar({ activeView, onNavigate, taskCount, pendingCount, dark, onToggleTheme, notify }) {
//   return (
//     <aside className="w-16 md:w-20 bg-gradient-to-b from-brand-700 via-brand-600 to-brand-900 flex flex-col items-center py-4 justify-between shadow-2xl z-30 shrink-0 select-none">
//       <div className="flex flex-col items-center gap-4 w-full">
//         <button className="relative group cursor-pointer" onClick={() => { onNavigate('chat'); notify('Halal Əsas İdarəetmə Paneli'); }} title="Halal">
//           <span className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"><Icon name="home" className="w-6 h-6" strokeWidth={2.3} /></span>
//         </button>
//         <div className="relative group cursor-pointer" onClick={() => notify('Profil: Emil Xanciqazov')} title="Emil Xanciqazov">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 to-orange-400 border-2 border-white/80 flex items-center justify-center text-brand-900 font-extrabold text-xs shadow-lg">EX</div>
//           <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-700" />
//         </div>
//         <nav className="flex flex-col items-center gap-2 w-full px-2 mt-1">
//           {navigation.map(([view, label]) => <button key={view} id={`nav-btn-${view}`} onClick={() => onNavigate(view)} title={label} className={`relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${activeView === view ? 'bg-white/25 text-white shadow-inner' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
//             <Icon name={view} className="w-5 h-5" strokeWidth={view === 'chat' ? 2.2 : 2} />
//             {view === 'chat' && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-700" />}
//             {view === 'tasks' && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{taskCount}</span>}
//             {view === 'operator' && pendingCount > 0 && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-emerald-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{pendingCount}</span>}
//           </button>)}
//         </nav>
//       </div>
//       <div className="flex flex-col items-center gap-2.5 w-full px-2">
//         <button onClick={onToggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition" title="Gecə / Gündüz Rejimi"><Icon name={dark ? 'sun' : 'moon'} className={`w-5 h-5 ${dark ? 'text-amber-300' : 'text-white'}`} /></button>
//         <button onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')} className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-300 hover:text-rose-100 hover:bg-rose-500/25 transition" title="Çıxış"><Icon name="logout" className="w-5 h-5" /></button>
//       </div>
//     </aside>
//   );



// }











import Icon from './common/Icons.jsx';

const navigation = [
  ['chat', 'Söhbətlər (Chat)'], ['tasks', 'Tapşırıqlar və Təqvim'],
  ['operator', 'Operator Təsdiqi'], ['groups', 'Qrup və İstifadəçilər'],
  ['companies', 'Şirkətlər Siyahısı'], ['users', 'İstifadəçilər Reyestri'],
  ['employees', 'İşçilər və Öhdəliklər'],
];

export default function Sidebar({ activeView, onNavigate, taskCount, pendingCount, dark, onToggleTheme, notify }) {
  return (
    <aside className="w-16 md:w-20 bg-gradient-to-b from-brand-700 via-brand-600 to-brand-900 flex flex-col items-center py-4 justify-between shadow-2xl z-30 shrink-0 select-none">
      <div className="flex flex-col items-center gap-4 w-full">
        <button className="relative group cursor-pointer" onClick={() => { onNavigate('chat'); notify('Halal Əsas İdarəetmə Paneli'); }} title="Halal">
          <span className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"><Icon name="home" className="w-6 h-6" strokeWidth={2.3} /></span>
        </button>
        <div className="relative group cursor-pointer" onClick={() => notify('Profil: Emil Xanciqazov')} title="Emil Xanciqazov">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 to-orange-400 border-2 border-white/80 flex items-center justify-center text-brand-900 font-extrabold text-xs shadow-lg">EX</div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-700" />
        </div>
        <nav className="flex flex-col items-center gap-2 w-full px-2 mt-1">
          {navigation.map(([view, label]) => <button key={view} id={`nav-btn-${view}`} onClick={() => onNavigate(view)} title={label} className={`relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${activeView === view ? 'bg-white/25 text-white shadow-inner' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            <Icon name={view} className="w-5 h-5" strokeWidth={view === 'chat' ? 2.2 : 2} />
            {view === 'chat' && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-700" />}
            {view === 'tasks' && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{taskCount}</span>}
            {view === 'operator' && pendingCount > 0 && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-emerald-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{pendingCount}</span>}
          </button>)}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-2.5 w-full px-2">
        <button onClick={onToggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition" title="Gecə / Gündüz Rejimi"><Icon name={dark ? 'sun' : 'moon'} className={`w-5 h-5 ${dark ? 'text-amber-300' : 'text-white'}`} /></button>
        <button onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')} className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-300 hover:text-rose-100 hover:bg-rose-500/25 transition" title="Çıxış"><Icon name="logout" className="w-5 h-5" /></button>
      </div>
    </aside>
  );



}

