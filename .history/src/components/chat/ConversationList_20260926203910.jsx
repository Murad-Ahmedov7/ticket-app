


// import { useEffect, useMemo, useState } from 'react';
// import Icon from '../common/Icons.jsx';

// const STORAGE_KEY = 'ticket-chat-read-state';

// function getStoredReadState() {
//   if (typeof window === 'undefined') return [];

//   try {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : [];
//   } catch {
//     return [];
//   }
// }

// export default function ConversationList({
//   conversations = [],
//   activeChatId,
//   chatCategory,
//   onCategory,
//   onSelect,
//   onDelete,
//   onNewChat,
// }) {
//   const [search, setSearch] = useState('');
//   const [readConversationIds, setReadConversationIds] = useState(() =>
//     getStoredReadState()
//   );

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(readConversationIds));
//     }
//   }, [readConversationIds]);

//   const unreadCount = useMemo(
//     () =>
//       conversations.filter(
//         (c) => c.unread > 0 && !readConversationIds.includes(c.id)
//       ).length,
//     [conversations, readConversationIds]
//   );

//   const markConversationAsRead = (conversationId) => {
//     setReadConversationIds((prev) =>
//       prev.includes(conversationId) ? prev : [...prev, conversationId]
//     );
//   };

//   const list = conversations.filter((c) => {
//     const isUnread = c.unread > 0 && !readConversationIds.includes(c.id);

//     return (
//       (chatCategory === 'all' ||
//         (chatCategory === 'unread' ? isUnread : c.type === chatCategory)) &&
//       `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const handleConversationClick = (id) => {
//     markConversationAsRead(id);
//     onSelect(id);
//   };

//   const handleTabClick = (id) => {
//     onCategory(id);
//   };

//   return (
//     <aside className="chat-conversation-list h-full w-full min-w-0 shrink-0 select-none border-r border-slate-200/80 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.1),_transparent_32%),linear-gradient(180deg,#f8fbff_0%,#f5f7fb_100%)] shadow-[inset_-1px_0_0_rgba(148,163,184,0.15)] transition-all duration-300 dark:border-slate-700 dark:bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.18),_transparent_28%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] dark:shadow-[inset_-1px_0_0_rgba(51,65,85,0.7)]">
//       <div className="flex h-full flex-col">
//         <header className="border-b border-slate-200/80 bg-white/75 px-4 pb-3 pt-4 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex items-center gap-2.5">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/80" />
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 shadow-[0_0_0_5px_rgba(13,148,136,0.08)]" />
//               </span>

//               <div className="flex items-center gap-2">
//                 <h2 className="text-[1.25rem] font-black tracking-[-0.03em] text-slate-900 dark:text-slate-100">
//                   Söhbətlər
//                 </h2>
//                 <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal-700 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200">
//                   {conversations.length} aktiv
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={onNewChat}
//               className="group flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 text-white shadow-[0_12px_18px_rgba(13,148,136,0.19)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(13,148,136,0.24)] active:scale-95"
//               title="Yeni Söhbət / Əlavə et"
//             >
//               <Icon
//                 name="plus"
//                 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
//                 strokeWidth={2.6}
//               />
//             </button>
//           </div>

//           <div className="group mt-3 rounded-2xl border border-slate-200/80 bg-white/90 px-2.5 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ring-1 ring-white/60 transition-all duration-200 focus-within:border-teal-300 focus-within:ring-2 focus-within:ring-teal-100 dark:border-slate-700 dark:bg-slate-800/80 dark:ring-slate-800 dark:focus-within:border-teal-400 dark:focus-within:ring-teal-500/20">
//             <div className="relative flex items-center gap-2">
//               <Icon
//                 name="search"
//                 className="h-4 w-4 text-slate-400 transition-colors duration-200 group-focus-within:text-teal-600 dark:text-slate-400 dark:group-focus-within:text-teal-300"
//               />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Əlaqə və ya mesaj axtarışı..."
//                 className="w-full border-0 bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
//               />
//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch('')}
//                   title="Axtarışı təmizlə"
//                   className="rounded-full p-1 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
//                 >
//                   <Icon name="close" className="h-3.5 w-3.5" />
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="chat-filters mt-3 flex items-center gap-1.5 rounded-2xl bg-slate-100/90 p-1.5 dark:bg-slate-800/80">
//             {[
//               ['all', 'Hamısı'],
//               ['direct', 'Şəxsi'],
//               ['group', 'Qruplar'],
//               ['unread', 'Oxunmamış'],
//             ].map(([id, label]) => {
//               const isTabActive = id === chatCategory;

//               return (
//                 <button
//                   key={id}
//                   type="button"
//                   onClick={() => handleTabClick(id)}
//                   className={`flex-1 rounded-xl px-2.5 py-2 text-[11px] font-bold tracking-[0.02em] transition-all duration-200 ${
//                     isTabActive
//                       ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_8px_18px_rgba(13,148,136,0.20)] ring-1 ring-teal-400/60 dark:from-teal-500 dark:to-emerald-500 dark:text-white dark:shadow-[0_8px_18px_rgba(13,148,136,0.35)]'
//                       : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/80 dark:hover:text-slate-100'
//                   } ${id === 'unread' && !isTabActive ? 'text-teal-700 dark:text-teal-300' : ''}`}
//                 >
//                   <span className="inline-flex items-center gap-1.5">
//                     {label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </header>

//         <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
//           {!list.length && (
//             <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-xs font-semibold text-slate-400 shadow-inner shadow-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:shadow-slate-950/30">
//               Heç bir söhbət tapılmadı
//             </div>
//           )}

//           <div className="space-y-2">
//             {list.map((c) => {
//               const active = c.id === activeChatId;
//               const isUnread = c.unread > 0 && !readConversationIds.includes(c.id);

//               return (
//                 <div
//                   key={c.id}
//                   onClick={() => handleConversationClick(c.id)}
//                   className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border p-3.5 transition-all duration-200 ease-out cursor-pointer ${
//                     active
//                       ? 'border-teal-200 bg-gradient-to-r from-white via-teal-50/30 to-emerald-50/20 shadow-[0_10px_18px_rgba(15,23,42,0.05)] dark:border-teal-500/30 dark:bg-gradient-to-r dark:from-slate-800 dark:via-slate-800 dark:to-teal-900/40 dark:shadow-[0_10px_18px_rgba(2,6,23,0.34)]'
//                       : 'border-slate-200/80 bg-white/80 hover:border-slate-200 hover:bg-white hover:shadow-[0_8px_16px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-slate-600 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_8px_16px_rgba(2,6,23,0.5)]'
//                   }`}
//                 >
//                   {active && (
//                     <span className="absolute inset-y-2 left-0 w-1.5 rounded-r-full bg-gradient-to-b from-teal-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.38)]" />
//                   )}

//                   <div className="flex min-w-0 flex-1 items-center gap-3.5 pl-1">
//                     <div className="relative shrink-0">
//                       <div
//                         className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.avatarGradient} text-base font-black text-white shadow-[0_12px_18px_rgba(15,23,42,0.12)] transition-transform duration-200 group-hover:scale-[1.03]`}
//                       >
//                         {c.type === 'group' ? (
//                           <Icon name="groups" className="h-5 w-5" />
//                         ) : (
//                           c.name.charAt(0).toUpperCase()
//                         )}
//                       </div>
//                       <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.12)]" />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <div className="mb-1 flex items-center justify-between gap-2">
//                         <h4
//                           className={`truncate text-[14px] tracking-[-0.02em] ${
//                             active ? 'font-black text-teal-950 dark:text-teal-100' : 'font-bold text-slate-800 dark:text-slate-100'
//                           }`}
//                         >
//                           {c.name}
//                         </h4>

//                         <span
//                           className={`shrink-0 text-[10px] font-bold ${
//                             active ? 'text-teal-700 dark:text-teal-300' : 'text-slate-400 dark:text-slate-400'
//                           }`}
//                         >
//                           {c.time}
//                         </span>
//                       </div>

//                       <p
//                         className={`truncate text-[11.5px] ${
//                           active
//                             ? 'font-semibold text-teal-900/80 dark:text-teal-100/80'
//                             : 'font-medium text-slate-500 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-slate-200'
//                         } ${isUnread ? 'font-semibold text-slate-700 dark:text-slate-200' : ''}`}
//                       >
//                         {c.lastSnippet}
//                     </p>
//                     </div>
//                   </div>

//                   <div className="ml-2 flex shrink-0 items-center gap-1.5">
//                     {isUnread && (
//                       <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-500 px-1.5 text-[10px] font-black text-white shadow-[0_0_0_3px_rgba(239,68,68,0.12)]" aria-label={`Unread messages: ${c.unread}`}>
//                         {c.unread}
//                       </span>
//                     )}

//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDelete(c.id);
//                       }}
//                       className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 active:scale-90 dark:text-slate-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
//                       title="Söhbəti bağla"
//                     >
//                       <Icon name="close" className="h-3.5 w-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }
