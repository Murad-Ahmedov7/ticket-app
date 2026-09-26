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




    <div className="w-80 md:w-96 border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0c131a] flex flex-col shrink-0 select-none">
      {/* BAŞLIQ VƏ AXTARIŞ BÖLMƏSİ */}
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 space-y-3.5 bg-white/60 dark:bg-[#0f1722]/60 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Söhbətlər
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              4 aktiv
            </span>
          </div>

          <button 
            onClick={onNewChat} 
            className="w-8 h-8 rounded-xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center shadow-sm shadow-teal-700/20 transition-all active:scale-90 cursor-pointer" 
            title="Yeni Söhbət / Əlavə et"
          >
            <Icon name="plus" className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* AXTARIŞ XANASI */}
        <div className="relative">
          <Icon name="search" className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Əlaqə və ya mesaj axtar..." 
            className="w-full pl-9 pr-8 py-2 bg-slate-100/80 dark:bg-slate-800/50 text-xs rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-transparent focus:border-teal-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all" 
          />
          {search && (
            <button 
              onClick={() => setSearch('')} 
              title="Axtarışı təmizlə" 
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2.5 top-2.5 cursor-pointer"
            >
              <Icon name="close" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* FİLTR TABLARI (KAPSUL DİZAYN) */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/50 dark:bg-slate-800/40 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {[['all', 'Hamısı'], ['direct', 'Şəxsi'], ['group', 'Qruplar'], ['unread', 'Oxunmamış']].map(([id, label]) => {
            const isTabActive = id === chatCategory;
            return (
              <button 
                key={id} 
                onClick={() => onCategory(id)} 
                className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                  isTabActive 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs' 
                    : 'hover:text-slate-800 dark:hover:text-slate-200'
                } ${id === 'unread' && !isTabActive ? 'text-teal-600 dark:text-teal-400' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SÖHBƏT SİYAHISI */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {!list.length && (
          <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            Heç bir söhbət tapılmadı
          </div>
        )}
        {list.map(c => {
          const active = c.id === activeChatId;
          return (
            <div 
              key={c.id} 
              onClick={() => onSelect(c.id)} 
              className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                active 
                  ? 'bg-white dark:bg-slate-800/90 shadow-sm border border-slate-200/80 dark:border-slate-700/60' 
                  : 'hover:bg-white/60 dark:hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              {/* Aktiv kartın sol tərəfindəki zümrüd zolaq */}
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal-500 rounded-r-full" />
              )}

              <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-white font-bold text-xs shadow-xs`}>
                    {c.type === 'group' ? <Icon name="groups" className="w-5 h-5" /> : c.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c131a]`} />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs tracking-tight truncate ${active ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-800 dark:text-slate-200'}`}>
                      {c.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1.5 shrink-0">
                      {c.time}
                    </span>
                  </div>
                  <p className="text-[11px] truncate mt-0.5 text-slate-500 dark:text-slate-400 font-normal">
                    {c.lastSnippet}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 ml-2">
                {c.unread > 0 && (
                  <span className="min-w-4 h-4 px-1 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    {c.unread}
                  </span>
                )}
                <button 
                  onClick={e => { e.stopPropagation(); onDelete(c.id); }} 
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer" 
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
  );
}
