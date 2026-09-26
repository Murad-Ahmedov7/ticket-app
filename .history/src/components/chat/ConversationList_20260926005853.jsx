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



import { useEffect, useMemo, useState } from 'react';
import Icon from '../common/Icons.jsx';

const STORAGE_KEY = 'ticket-chat-read-state';

function getStoredReadState() {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

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
  const [readConversationIds, setReadConversationIds] = useState(() =>
    getStoredReadState()
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readConversationIds));
    }
  }, [readConversationIds]);

  const unreadCount = useMemo(
    () =>
      conversations.filter(
        (c) => c.unread > 0 && !readConversationIds.includes(c.id)
      ).length,
    [conversations, readConversationIds]
  );

  const markConversationAsRead = (conversationId) => {
    setReadConversationIds((prev) =>
      prev.includes(conversationId) ? prev : [...prev, conversationId]
    );
  };

  const list = conversations.filter((c) => {
    const isUnread = c.unread > 0 && !readConversationIds.includes(c.id);

    return (
      (chatCategory === 'all' ||
        (chatCategory === 'unread' ? isUnread : c.type === chatCategory)) &&
      `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleConversationClick = (id) => {
    markConversationAsRead(id);
    onSelect(id);
  };

  const handleTabClick = (id) => {
    onCategory(id);
  };

  return (
    <aside className="h-full w-80 shrink-0 select-none border-r border-slate-200/80 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.1),_transparent_32%),linear-gradient(180deg,#f8fbff_0%,#f5f7fb_100%)] shadow-[inset_-1px_0_0_rgba(148,163,184,0.15)] transition-all duration-300 md:w-96">
      <div className="flex h-full flex-col">
        <header className="border-b border-slate-200/80 bg-white/75 px-4 pb-3 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 shadow-[0_0_0_5px_rgba(13,148,136,0.08)]" />
              </span>

              <div className="flex items-center gap-2">
                <h2 className="text-[1.25rem] font-black tracking-[-0.03em] text-slate-900">
                  Söhbətlər
                </h2>
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal-700">
                  aktiv
                </span>
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal-700">
                  {conversations.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onNewChat}
              className="group flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 text-white shadow-[0_12px_18px_rgba(13,148,136,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(13,148,136,0.28)] active:scale-95"
              title="Yeni Söhbət / Əlavə et"
            >
              <Icon
                name="plus"
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                strokeWidth={2.6}
              />
            </button>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white/90 px-2.5 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ring-1 ring-white/60">
            <div className="relative flex items-center gap-2">
              <Icon
                name="search"
                className="h-4 w-4 text-slate-400 transition-colors duration-200 group-focus-within:text-teal-600"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Əlaqə və ya mesaj axtarışı..."
                className="w-full border-0 bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  title="Axtarışı təmizlə"
                  className="rounded-full p-1 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600"
                >
                  <Icon name="close" className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-2xl bg-slate-100/90 p-1.5">
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
                  type="button"
                  onClick={() => handleTabClick(id)}
                  className={`flex-1 rounded-xl px-2.5 py-2 text-[11px] font-bold tracking-[0.02em] transition-all duration-200 ${
                    isTabActive
                      ? 'bg-white text-slate-900 shadow-[0_6px_16px_rgba(15,23,42,0.08)]'
                      : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                  } ${id === 'unread' && !isTabActive ? 'text-teal-700' : ''}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {!list.length && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-xs font-semibold text-slate-400 shadow-inner shadow-slate-100">
              Heç bir söhbət tapılmadı
            </div>
          )}

          <div className="space-y-2">
            {list.map((c) => {
              const active = c.id === activeChatId;
              const isUnread = c.unread > 0 && !readConversationIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => handleConversationClick(c.id)}
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border p-3.5 transition-all duration-200 ease-out cursor-pointer ${
                    active
                      ? 'border-teal-200 bg-gradient-to-r from-white via-teal-50/30 to-emerald-50/20 shadow-[0_10px_18px_rgba(15,23,42,0.05)]'
                      : 'border-slate-200/80 bg-white/80 hover:border-slate-200 hover:bg-white hover:shadow-[0_8px_16px_rgba(15,23,42,0.04)]'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-1.5 rounded-r-full bg-gradient-to-b from-teal-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]" />
                  )}

                  <div className="flex min-w-0 flex-1 items-center gap-3.5 pl-1">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.avatarGradient} text-base font-black text-white shadow-[0_12px_18px_rgba(15,23,42,0.12)] transition-transform duration-200 group-hover:scale-[1.03]`}
                      >
                        {c.type === 'group' ? (
                          <Icon name="groups" className="h-5 w-5" />
                        ) : (
                          c.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.12)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h4
                          className={`truncate text-[14px] tracking-[-0.02em] ${
                            active ? 'font-black text-teal-950' : 'font-bold text-slate-800'
                          }`}
                        >
                          {c.name}
                        </h4>

                        <span
                          className={`shrink-0 text-[10px] font-bold ${
                            active ? 'text-teal-700' : 'text-slate-400'
                          }`}
                        >
                          {c.time}
                        </span>
                      </div>

                      <p
                        className={`truncate text-[11.5px] ${
                          active
                            ? 'font-semibold text-teal-900/80'
                            : 'font-medium text-slate-500 group-hover:text-slate-600'
                        } ${isUnread ? 'font-semibold text-slate-700' : ''}`}
                      >
                        {c.lastSnippet}
                    </p>
                    </div>
                  </div>

                  <div className="ml-2 flex shrink-0 items-center gap-1.5">
                    {isUnread && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[9px] font-black text-white shadow-sm">
                        {c.unread}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(c.id);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 active:scale-90"
                      title="Söhbəti bağla"
                    >
                      <Icon name="close" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}