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
    <div className="w-80 md:w-96 border-r border-slate-200/70 bg-red-400 backdrop-blur-xl flex flex-col shrink-0 select-none h-full transition-all">
      {/* ÜST PANEL */}
      <div className="flex flex-col">
        {/* Başlık ve Yeni Sohbet Butonu */}
        <div className="p-4 pb-3 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500 shadow-xs" />
            </span>
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              Söhbətlər
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-800 border border-teal-500/20 shadow-xs">
              {conversations.length} aktiv
            </span>
          </div>

          <button
            onClick={onNewChat}
            className="group w-9 h-9 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-500/25 transition-all duration-300 active:scale-95 cursor-pointer"
            title="Yeni Söhbət / Əlavə et"
          >
            <Icon 
              name="plus" 
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" 
              strokeWidth={2.6} 
            />
          </button>
        </div>

        {/* Arama Alanı */}
        <div className="px-4 py-2.5 bg-white/40 backdrop-blur-xs">
          <div className="relative flex items-center group">
            <Icon
              name="search"
              className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors duration-200 absolute left-3.5 pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Əlaqə və ya mesaj axtarışı..."
              className="w-full pl-10 pr-9 py-2 bg-white/80 hover:bg-white focus:bg-white text-xs font-medium rounded-xl text-slate-900 placeholder-slate-400 border border-slate-200/60 focus:border-teal-500/60 focus:ring-3 focus:ring-teal-500/10 outline-none transition-all duration-200 shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                title="Axtarışı təmizlə"
                className="text-slate-400 hover:text-slate-600 hover:scale-110 active:scale-95 absolute right-3 p-0.5 transition-transform cursor-pointer"
              >
                <Icon name="close" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Kategori Tabları */}
        <div className="px-4 pb-3 flex items-center gap-1.5 border-b border-slate-200/50 bg-white/40">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                  isTabActive
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-2xs border border-slate-200/40'
                } ${id === 'unread' && !isTabActive ? 'text-teal-700 font-extrabold' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* SOHBET LİSTESİ */}
        <div className="overflow-y-auto px-3 py-2.5 space-y-1.5 flex-1">
          {!list.length && (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              Heç bir söhbət tapılmadı
            </div>
          )}

          {list.map((c) => {
            const active = c.id === activeChatId;
            return (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`group relative flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 ease-out backdrop-blur-md ${
                  active
                    ? 'bg-white/95 border border-teal-500/30 shadow-sm shadow-teal-900/10 translate-x-1'
                    : 'bg-white/70 hover:bg-white/95 border border-slate-200/40 hover:border-slate-200 shadow-2xs hover:shadow-xs hover:translate-x-0.5'
                }`}
              >
                {/* Aktif sohbet sol şeridi */}
                {active && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-teal-500 rounded-r-full shadow-xs" />
                )}

                <div className="flex items-center gap-3.5 min-w-0 flex-1 pl-1">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-white font-black text-sm shadow-xs transition-transform duration-200 group-hover:scale-105`}
                    >
                      {c.type === 'group' ? (
                        <Icon name="groups" className="w-5 h-5" />
                      ) : (
                        c.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
                  </div>

                  {/* Metinler */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4
                        className={`text-sm tracking-tight truncate transition-colors duration-150 ${
                          active
                            ? 'text-teal-950 font-black'
                            : 'font-bold text-slate-800 group-hover:text-slate-950'
                        }`}
                      >
                        {c.name}
                      </h4>
                      <span
                        className={`text-[11px] font-semibold ml-2 shrink-0 transition-colors ${
                          active ? 'text-teal-700 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {c.time}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate transition-colors ${
                        active
                          ? 'text-teal-900/80 font-semibold'
                          : 'text-slate-500 group-hover:text-slate-600 font-normal'
                      }`}
                    >
                      {c.lastSnippet}
                    </p>
                  </div>
                </div>

                {/* Sağ taraf: Okunmamış rozeti ve Silme butonu */}
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  {c.unread > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full text-xs font-black bg-teal-600 text-white flex items-center justify-center shadow-xs animate-pulse">
                      {c.unread}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c.id);
                    }}
                    className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 active:scale-90 cursor-pointer"
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
    </div>
  );
}