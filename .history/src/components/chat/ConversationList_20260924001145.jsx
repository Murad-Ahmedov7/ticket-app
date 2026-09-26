// import { useState } from 'react';
// import Icon from '../common/Icons.jsx';

// export default function ConversationList({ conversations, activeChatId, chatCategory, onCategory, onSelect, onDelete, onNewChat }) {
//   const [search, setSearch] = useState('');
//   const list = conversations.filter(c => (chatCategory === 'all' || (chatCategory === 'unread' ? c.unread > 0 : c.type === chatCategory)) && `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="w-80 md:w-96 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
//       <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">Söhbətlər <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">4 aktiv</span></h2>
//           <button onClick={onNewChat} className="w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-500/20 transition active:scale-95" title="Yeni Söhbət / Əlavə et"><Icon name="plus" strokeWidth={2.4} /></button>
//         </div>
//         <div className="relative">
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Əlaqə və ya mesaj axtarışı..." className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition" />
//           <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
//           {search && <button onClick={() => setSearch('')} title="Axtarışı təmizlə" className="text-slate-400 hover:text-slate-600 absolute right-2.5 top-2.5"><Icon name="close" className="w-3.5 h-3.5" /></button>}
//         </div>
//         <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 pt-0.5">
//           {[['all', 'Hamısı'], ['direct', 'Şəxsi'], ['group', 'Qruplar'], ['unread', 'Oxunmamış']].map(([id, label]) => <button key={id} onClick={() => onCategory(id)} className={`px-2.5 py-1 rounded-lg transition ${id === chatCategory ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'} ${id === 'unread' ? 'ml-auto text-brand-600 dark:text-brand-400 font-bold' : ''}`}>{label}</button>)}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto divide-y divide-slate-100/60 dark:divide-slate-800/60 p-2 space-y-1">
//         {!list.length && <div className="p-6 text-center text-xs text-slate-400">Heç bir söhbət tapılmadı</div>}
//         {list.map(c => {
//           const active = c.id === activeChatId;
//           return <div key={c.id} onClick={() => onSelect(c.id)} className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'}`}>
//             <div className="flex items-center gap-3 min-w-0 flex-1">
//               <div className="relative shrink-0">
//                 <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>{c.type === 'group' ? <Icon name="groups" className="w-5 h-5" /> : c.name.charAt(0).toUpperCase()}</div>
//                 <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 ${active ? 'border-brand-600' : 'border-white dark:border-slate-900'}`} />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center justify-between"><h4 className={`text-xs font-bold truncate ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{c.name}</h4><span className={`text-[10px] font-medium ml-1 shrink-0 ${active ? 'text-white/80' : 'text-slate-400'}`}>{c.time}</span></div>
//                 <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>{c.lastSnippet}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1.5 ml-2">
//               {c.unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">{c.unread}</span>}
//               <button onClick={e => { e.stopPropagation(); onDelete(c.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" title="Söhbəti bağla"><Icon name="close" className="w-3.5 h-3.5" /></button>
//             </div>
//           </div>;
//         })}
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function ConversationList({
  conversations = [],
  activeChatId,
  chatCategory,
  onCategory,
  onSelect,
  onDelete,
  onNewChat,
}) {
  const [search, setSearch] = useState('');

  const list = conversations.filter(
    (c) =>
      (chatCategory === 'all' ||
        (chatCategory === 'unread' ? c.unread > 0 : c.type === chatCategory)) &&
      `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 md:w-96 border-r border-[#0d363d]/15 bg-[#eef4f5] dark:bg-[#0c181c] flex flex-col justify-between shrink-0 select-none">
      {/* YUXARI HİSSƏ */}
      <div className="flex flex-col">
        <div className="p-4 border-b border-[#0d363d]/10 space-y-3.5 bg-white/80 dark:bg-[#0f2227]/80 backdrop-blur-md">
          {/* Başlıq və Yeni Çat Düyməsi */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
              </span>
              <h2 className="text-base font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
                Söhbətlər
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-teal-500/15 to-emerald-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 shadow-xs">
                  {conversations.length} aktiv
                </span>
              </h2>
            </div>

            <button
              onClick={onNewChat}
              className="group relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#11454e] via-[#0d363d] to-[#082a30] hover:shadow-lg hover:shadow-teal-900/30 text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer border border-teal-400/20"
              title="Yeni Söhbət / Əlavə et"
            >
              <Icon name="plus" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
            </button>
          </div>

          {/* Axtarış sahəsi */}
          <div className="relative group">
            <Icon
              name="search"
              className="w-4 h-4 text-slate-400 group-focus-within:text-[#11454e] dark:group-focus-within:text-teal-400 absolute left-3 top-2.5 transition-colors"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Əlaqə və ya mesaj axtarışı..."
              className="w-full pl-9 pr-8 py-2 bg-white/90 dark:bg-[#132d33]/80 text-xs rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-[#0d363d]/15 focus:border-[#11454e] focus:bg-white dark:focus:bg-[#132d33] focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xs"
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

          {/* Kateqoriya Tabları (Zərif pill dizayn) */}
          <div className="flex items-center gap-1 p-1 bg-[#dfe9eb] dark:bg-[#14282c] rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            {[
              ['all', 'Hamısı'],
              ['direct', 'Şəxsi'],
              ['group', 'Qruplar'],
              ['unread', 'Oxunmamış'],
            ].map(([id, label]) => {
              const isTabActive = id === chatCategory;
              return (
                <button
                  key={id}
                  onClick={() => onCategory(id)}
                  className={`flex-1 py-1 rounded-lg text-center transition-all duration-200 cursor-pointer ${
                    isTabActive
                      ? 'bg-gradient-to-r from-white to-slate-50 dark:from-[#1f3f45] dark:to-[#173338] text-[#11454e] dark:text-teal-200 font-black shadow-xs border border-white/60 dark:border-teal-400/20'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                  } ${id === 'unread' && !isTabActive ? 'text-teal-700 dark:text-teal-400 font-bold' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SÖHBƏT SİYAHISI */}
        <div className="overflow-y-auto p-2.5 space-y-2 max-h-[calc(100vh-210px)] custom-scrollbar">
          {!list.length && (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
              <div className="w-10 h-10 rounded-full bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Icon name="chat" className="w-5 h-5 opacity-60" />
              </div>
              <span className="text-xs font-medium">Heç bir söhbət tapılmadı</span>
            </div>
          )}

          {list.map((c, index) => {
            const active = c.id === activeChatId;
            const isTyping = index === 0; // Birinci çatda canlı "yazır..." animasiyası nümayişi
            const isPinned = index === 0;

            return (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`group relative flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                  active
                    ? 'bg-white dark:bg-[#153138] border border-teal-500/30 dark:border-teal-400/40 shadow-sm shadow-teal-900/5'
                    : 'bg-white/70 dark:bg-[#102328]/50 hover:bg-white dark:hover:bg-[#153138]/90 border border-slate-200/50 dark:border-teal-500/10 hover:border-teal-400/30 hover:shadow-xs'
                }`}
              >
                {/* Aktiv halın sol zümrüd zolağı */}
                {active && (
                  <span className="absolute left-0 top-3 bottom-3 w-1.5 bg-gradient-to-b from-teal-400 to-[#11454e] rounded-r-full shadow-xs" />
                )}

                <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
                  {/* Avatar və Onlayn status halqası */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-white font-black text-xs shadow-xs ring-2 ring-white dark:ring-[#0f2227]`}
                    >
                      {c.type === 'group' ? (
                        <Icon name="groups" className="w-5 h-5" />
                      ) : (
                        c.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#153138] shadow-2xs" />
                  </div>

                  {/* Çat məlumatları */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <h4
                          className={`text-xs truncate ${
                            active
                              ? 'font-black text-[#11454e] dark:text-teal-100'
                              : 'font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#11454e] dark:group-hover:text-teal-300'
                          }`}
                        >
                          {c.name}
                        </h4>
                        {isPinned && (
                          <span className="text-[10px] text-amber-500 dark:text-amber-400 font-bold shrink-0" title="Bərkidilib">
                            📌
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 ml-1">
                        {c.time}
                      </span>
                    </div>

                    {/* Mesaj önizləməsi və ya "Yazır..." effekti */}
                    {isTyping ? (
                      <div className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-semibold animate-pulse">
                        <span>yazır</span>
                        <span className="flex gap-0.5 items-center mt-1">
                          <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {/* Oxundu quş işarəsi (Double-check) */}
                        <svg className="w-3.5 h-3.5 text-teal-500/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l4.5 4.5m0 0l9-9m-5 9l4.5-4.5" />
                        </svg>
                        <p
                          className={`text-[11px] truncate ${
                            active
                              ? 'text-slate-600 dark:text-teal-200/80 font-medium'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {c.lastSnippet}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sağ tərəf: Unread Badge və Hover Hərəkət Düymələri */}
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  {c.unread > 0 && (
                    <span className="min-w-4 h-4 px-1 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                      {c.unread}
                    </span>
                  )}

                  {/* Sürətli əməliyyat düyməsi (Hover olanda açılır) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(c.id);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                      title="Söhbəti bağla"
                    >
                      <Icon name="close" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AŞAĞI HİSSƏ: TƏHLÜKƏSİZLİK VƏ ŞƏBƏKƏ STATUSU */}
      <div className="p-3 border-t border-[#0d363d]/15 bg-white/60 dark:bg-[#0f2227]/60 backdrop-blur-xs flex items-center justify-between text-[11px] text-slate-500 dark:text-teal-200/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-600 dark:text-slate-300">
            Uçdan-uca şifrələnib
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-extrabold text-teal-700 dark:text-teal-400">
          <span className="px-1.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20">
            TLS 1.3
          </span>
        </div>
      </div>
    </div>
  );
}