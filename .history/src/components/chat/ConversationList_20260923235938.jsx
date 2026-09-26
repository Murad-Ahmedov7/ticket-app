import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function ConversationList({ conversations, activeChatId, chatCategory, onCategory, onSelect, onDelete, onNewChat }) {
  const [search, setSearch] = useState('');
  const list = conversations.filter(c => (chatCategory === 'all' || (chatCategory === 'unread' ? c.unread > 0 : c.type === chatCategory)) && `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase()));
  return (
    // <div className="w-80 md:w-96 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
    //   <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
    //     <div className="flex items-center justify-between">
    //       <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">Söhbətlər <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">4 aktiv</span></h2>
    //       <button onClick={onNewChat} className="w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-500/20 transition active:scale-95" title="Yeni Söhbət / Əlavə et"><Icon name="plus" strokeWidth={2.4} /></button>
    //     </div>
    //     <div className="relative">
    //       <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Əlaqə və ya mesaj axtarışı..." className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition" />
    //       <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
    //       {search && <button onClick={() => setSearch('')} title="Axtarışı təmizlə" className="text-slate-400 hover:text-slate-600 absolute right-2.5 top-2.5"><Icon name="close" className="w-3.5 h-3.5" /></button>}
    //     </div>
    //     <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 pt-0.5">
    //       {[['all', 'Hamısı'], ['direct', 'Şəxsi'], ['group', 'Qruplar'], ['unread', 'Oxunmamış']].map(([id, label]) => <button key={id} onClick={() => onCategory(id)} className={`px-2.5 py-1 rounded-lg transition ${id === chatCategory ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'} ${id === 'unread' ? 'ml-auto text-brand-600 dark:text-brand-400 font-bold' : ''}`}>{label}</button>)}
    //     </div>
    //   </div>
    //   <div className="flex-1 overflow-y-auto divide-y divide-slate-100/60 dark:divide-slate-800/60 p-2 space-y-1">
    //     {!list.length && <div className="p-6 text-center text-xs text-slate-400">Heç bir söhbət tapılmadı</div>}
    //     {list.map(c => {
    //       const active = c.id === activeChatId;
    //       return <div key={c.id} onClick={() => onSelect(c.id)} className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'}`}>
    //         <div className="flex items-center gap-3 min-w-0 flex-1">
    //           <div className="relative shrink-0">
    //             <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>{c.type === 'group' ? <Icon name="groups" className="w-5 h-5" /> : c.name.charAt(0).toUpperCase()}</div>
    //             <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 ${active ? 'border-brand-600' : 'border-white dark:border-slate-900'}`} />
    //           </div>
    //           <div className="min-w-0 flex-1">
    //             <div className="flex items-center justify-between"><h4 className={`text-xs font-bold truncate ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{c.name}</h4><span className={`text-[10px] font-medium ml-1 shrink-0 ${active ? 'text-white/80' : 'text-slate-400'}`}>{c.time}</span></div>
    //             <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>{c.lastSnippet}</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-1.5 ml-2">
    //           {c.unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">{c.unread}</span>}
    //           <button onClick={e => { e.stopPropagation(); onDelete(c.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" title="Söhbəti bağla"><Icon name="close" className="w-3.5 h-3.5" /></button>
    //         </div>
    //       </div>;
    //     })}
    //   </div>
    // </div>




    <div className="w-80 md:w-96 border-r border-teal-500/15 bg-gradient-to-b from-[#0c2d33] via-[#082226] to-[#05171a] flex flex-col justify-between shrink-0 select-none text-slate-100">
      {/* YUXARI HİSSƏ: BAŞLIQ, AXTARIŞ VƏ FİLTRLƏR */}
      <div className="flex flex-col">
        <div className="p-4 border-b border-teal-400/10 space-y-3.5 bg-black/10 backdrop-blur-md">
          {/* Başlıq və Yeni Düyməsi */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <h2 className="text-base font-black tracking-wide text-white">
                Söhbətlər
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-400/15 text-teal-300 border border-teal-400/25">
                4 aktiv
              </span>
            </div>

            <button 
              onClick={onNewChat} 
              className="w-8 h-8 rounded-xl bg-teal-500/20 hover:bg-teal-500/35 border border-teal-400/30 text-teal-200 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm" 
              title="Yeni Söhbət / Əlavə et"
            >
              <Icon name="plus" className="w-4 h-4" strokeWidth={2.4} />
            </button>
          </div>

          {/* Axtarış Sahəsi */}
          <div className="relative group">
            <Icon name="search" className="w-4 h-4 text-teal-300/50 group-focus-within:text-teal-300 absolute left-3 top-2.5 transition-colors" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Əlaqə və ya mesaj axtar..." 
              className="w-full pl-9 pr-8 py-2 bg-black/25 text-xs rounded-xl text-teal-100 placeholder-teal-200/40 border border-teal-400/15 focus:border-teal-400/40 focus:bg-black/35 focus:outline-none transition-all shadow-inner" 
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                title="Axtarışı təmizlə" 
                className="text-teal-300/50 hover:text-teal-200 absolute right-2.5 top-2.5 cursor-pointer"
              >
                <Icon name="close" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Kateqoriya Tabları */}
          <div className="flex items-center gap-1 p-1 bg-black/20 border border-teal-400/10 rounded-xl text-[11px] font-medium text-teal-200/60">
            {[['all', 'Hamısı'], ['direct', 'Şəxsi'], ['group', 'Qruplar'], ['unread', 'Oxunmamış']].map(([id, label]) => {
              const isTabActive = id === chatCategory;
              return (
                <button 
                  key={id} 
                  onClick={() => onCategory(id)} 
                  className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                    isTabActive 
                      ? 'bg-teal-400/20 text-white font-bold border border-teal-300/30 shadow-sm' 
                      : 'hover:text-white hover:bg-white/5'
                  } ${id === 'unread' && !isTabActive ? 'text-amber-400' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SÖHBƏT SİYAHISI */}
        <div className="overflow-y-auto p-2 space-y-1 max-h-[calc(100vh-210px)]">
          {!list.length && (
            <div className="p-8 text-center text-xs text-teal-200/40 font-medium">
              Heç bir söhbət tapılmadı
            </div>
          )}
          {list.map(c => {
            const active = c.id === activeChatId;
            return (
              <div 
                key={c.id} 
                onClick={() => onSelect(c.id)} 
                className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  active 
                    ? 'bg-teal-400/20 border border-teal-300/30 shadow-[0_0_12px_rgba(45,212,191,0.15)] text-white' 
                    : 'hover:bg-white/5 border border-transparent text-teal-100/70 hover:text-white'
                }`}
              >
                {/* Aktiv kartın sol işıqlı çubuğu */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal-300 rounded-r-full shadow-[0_0_6px_#5eead4]" />
                )}

                <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
                  <div className="relative shrink-0">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-[#082227] font-black text-xs shadow-md ring-1 ring-white/20`}>
                      {c.type === 'group' ? <Icon name="groups" className="w-5 h-5 text-white" /> : c.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#092226]" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs tracking-wide truncate ${active ? 'font-bold text-white' : 'font-medium text-teal-100'}`}>
                        {c.name}
                      </h4>
                      <span className={`text-[10px] font-medium ml-1.5 shrink-0 ${active ? 'text-teal-200' : 'text-teal-300/40'}`}>
                        {c.time}
                      </span>
                    </div>
                    <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-teal-100/90 font-medium' : 'text-teal-200/50'}`}>
                      {c.lastSnippet}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-2">
                  {c.unread > 0 && (
                    <span className="min-w-4 h-4 px-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
                      {c.unread}
                    </span>
                  )}
                  <button 
                    onClick={e => { e.stopPropagation(); onDelete(c.id); }} 
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all cursor-pointer" 
                    title="Söhbəti bağla"
                  >
                    <Icon name="close" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AŞAĞI HİSSƏ: BAĞLANTI MƏLUMATI */}
      <div className="p-3 border-t border-teal-400/10 bg-black/15 flex items-center justify-between text-[11px] text-teal-300/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span className="font-medium text-teal-200/70">Uçdan-uca şifrələnib</span>
        </div>
        <span className="text-[10px] font-semibold text-teal-400/50">Portal v2.4</span>
      </div>
    </div>
  );
}
