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

  const list = conversations.filter((c) => {
    const matchesCategory =
      chatCategory === 'all' ||
      (chatCategory === 'unread'
        ? c.unread > 0
        : c.type === chatCategory);

    const matchesSearch = `${c.name} ${c.lastSnippet}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const unreadCount = conversations.reduce(
    (total, conversation) =>
      total + (conversation.unread > 0 ? 1 : 0),
    0
  );

  const tabs = [
    {
      id: 'all',
      label: 'Hamısı',
    },
    {
      id: 'direct',
      label: 'Şəxsi',
    },
    {
      id: 'group',
      label: 'Qruplar',
    },
    {
      id: 'unread',
      label: 'Oxunmamış',
      count: unreadCount,
    },
  ];

  return (
    <aside className="w-80 md:w-96 h-full shrink-0 border-r border-slate-200 bg-white flex flex-col select-none">
      {/* HEADER */}
      <div className="shrink-0 border-b border-slate-200">
        {/* Başlıq */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Söhbətlər
              </h2>

              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500">
                {conversations.length}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Son mesajlar və aktiv söhbətlər
            </p>
          </div>

          {/* Yeni söhbət */}
          <button
            type="button"
            onClick={onNewChat}
            title="Yeni söhbət"
            className="
              w-9 h-9 shrink-0
              rounded-xl
              bg-teal-600
              hover:bg-teal-700
              text-white
              flex items-center justify-center
              shadow-sm shadow-teal-600/20
              transition-all duration-200
              active:scale-95
              cursor-pointer
            "
          >
            <Icon
              name="plus"
              className="w-4.5 h-4.5"
              strokeWidth={2.4}
            />
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3">
          <div className="relative flex items-center group">
            <Icon
              name="search"
              className="
                absolute left-3.5
                w-4 h-4
                text-slate-400
                pointer-events-none
                group-focus-within:text-teal-600
                transition-colors
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Söhbətlərdə axtar..."
              className="
                w-full h-10
                pl-10 pr-10
                rounded-xl
                bg-slate-100
                hover:bg-slate-100/80
                focus:bg-white
                border border-transparent
                focus:border-teal-300
                focus:ring-4 focus:ring-teal-500/10
                outline-none
                text-sm
                text-slate-800
                placeholder:text-slate-400
                transition-all duration-200
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                title="Axtarışı təmizlə"
                className="
                  absolute right-3
                  w-6 h-6
                  rounded-lg
                  flex items-center justify-center
                  text-slate-400
                  hover:text-slate-700
                  hover:bg-slate-200/70
                  transition-all
                  active:scale-90
                  cursor-pointer
                "
              >
                <Icon
                  name="close"
                  className="w-3.5 h-3.5"
                />
              </button>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100">
            {tabs.map((tab) => {
              const isActive = chatCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onCategory(tab.id)}
                  className={`
                    flex-1
                    min-w-0
                    px-2 py-2
                    rounded-lg
                    text-[11px]
                    font-semibold
                    flex items-center justify-center gap-1.5
                    transition-all duration-200
                    cursor-pointer

                    ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                    }
                  `}
                >
                  <span className="truncate">
                    {tab.label}
                  </span>

                  {tab.count > 0 && (
                    <span
                      className={`
                        min-w-4.5 h-4.5
                        px-1
                        rounded-full
                        flex items-center justify-center
                        text-[9px] font-bold

                        ${
                          isActive
                            ? 'bg-teal-600 text-white'
                            : 'bg-teal-100 text-teal-700'
                        }
                      `}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {/* nəticə məlumatı */}
        {search && list.length > 0 && (
          <div className="px-2.5 pt-1 pb-2">
            <span className="text-[11px] font-medium text-slate-400">
              {list.length} nəticə tapıldı
            </span>
          </div>
        )}

        {/* boş siyahı */}
        {!list.length && (
          <div className="h-full min-h-48 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <Icon
                name="search"
                className="w-5 h-5 text-slate-400"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              Söhbət tapılmadı
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Axtarış sözünü və ya seçilmiş kateqoriyanı dəyiş.
            </p>
          </div>
        )}

        {/* söhbətlər */}
        <div className="space-y-1">
          {list.map((c) => {
            const active = c.id === activeChatId;

            return (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`
                  group
                  relative
                  flex items-center
                  gap-3
                  px-3 py-3
                  rounded-2xl
                  border
                  cursor-pointer
                  transition-all duration-200

                  ${
                    active
                      ? 'bg-teal-50/70 border-teal-100 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }
                `}
              >
                {/* Aktiv indikator */}
                {active && (
                  <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-teal-600" />
                )}

                {/* AVATAR */}
                <div className="relative shrink-0">
                  <div
                    className={`
                      w-11 h-11
                      rounded-2xl
                      bg-gradient-to-br ${c.avatarGradient}
                      flex items-center justify-center
                      text-white
                      font-bold
                      text-sm
                      shadow-sm
                      ring-2 ring-white
                      transition-transform duration-200
                      group-hover:scale-[1.03]
                    `}
                  >
                    {c.type === 'group' ? (
                      <Icon
                        name="groups"
                        className="w-5 h-5"
                      />
                    ) : (
                      c.name?.charAt(0)?.toUpperCase()
                    )}
                  </div>

                  {/* online status yalnız varsa */}
                  {c.isOnline && (
                    <span
                      className="
                        absolute
                        -bottom-0.5 -right-0.5
                        w-3 h-3
                        rounded-full
                        bg-emerald-500
                        border-2 border-white
                      "
                    />
                  )}
                </div>

                {/* MƏTN */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`
                        min-w-0
                        flex-1
                        truncate
                        text-sm
                        tracking-tight

                        ${
                          active
                            ? 'font-bold text-slate-950'
                            : c.unread > 0
                              ? 'font-bold text-slate-900'
                              : 'font-semibold text-slate-800'
                        }
                      `}
                    >
                      {c.name}
                    </h4>

                    <span
                      className={`
                        shrink-0
                        text-[10px]
                        font-medium

                        ${
                          active
                            ? 'text-teal-700'
                            : 'text-slate-400'
                        }
                      `}
                    >
                      {c.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <p
                      className={`
                        min-w-0
                        flex-1
                        truncate
                        text-xs

                        ${
                          c.unread > 0
                            ? 'font-medium text-slate-700'
                            : active
                              ? 'text-slate-600'
                              : 'text-slate-500'
                        }
                      `}
                    >
                      {c.lastSnippet}
                    </p>

                    {/* unread */}
                    {c.unread > 0 && (
                      <span
                        className="
                          shrink-0
                          min-w-5 h-5
                          px-1.5
                          rounded-full
                          bg-teal-600
                          text-white
                          text-[10px]
                          font-bold
                          flex items-center justify-center
                        "
                      >
                        {c.unread > 99 ? '99+' : c.unread}
                      </span>
                    )}
                  </div>
                </div>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(c.id);
                  }}
                  title="Söhbəti bağla"
                  className="
                    absolute
                    right-2 top-1/2
                    -translate-y-1/2
                    w-7 h-7
                    rounded-lg
                    flex items-center justify-center
                    bg-white
                    border border-slate-200
                    text-slate-400
                    shadow-sm

                    opacity-0
                    pointer-events-none
                    group-hover:opacity-100
                    group-hover:pointer-events-auto

                    hover:text-rose-600
                    hover:bg-rose-50
                    hover:border-rose-100

                    transition-all duration-150
                    active:scale-90
                    cursor-pointer
                  "
                >
                  <Icon
                    name="close"
                    className="w-3.5 h-3.5"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}