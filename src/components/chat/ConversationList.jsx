import UserAvatar from "../common/UserAvatar.jsx";
import { useEffect, useMemo, useState } from 'react';
import Icon from '../common/Icons.jsx';
import GroupAvatar from './GroupAvatar.jsx';

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
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(readConversationIds)
      );
    }
  }, [readConversationIds]);

  const unreadCount = useMemo(
    () =>
      conversations.filter(
        (c) =>
          c.unread > 0 &&
          !readConversationIds.includes(c.id)
      ).length,
    [conversations, readConversationIds]
  );

  const markConversationAsRead = (conversationId) => {
    setReadConversationIds((prev) =>
      prev.includes(conversationId)
        ? prev
        : [...prev, conversationId]
    );
  };

  const list = conversations.filter((c) => {
    const isUnread =
      c.unread > 0 &&
      !readConversationIds.includes(c.id);

    return (
      (
        chatCategory === 'all' ||
        (
          chatCategory === 'unread'
            ? isUnread
            : c.type === chatCategory
        )
      ) &&
      `${c.name} ${c.lastSnippet}`
        .toLowerCase()
        .includes(search.toLowerCase())
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
    <aside className="chat-conversation-list h-full w-full min-w-0 shrink-0 select-none border-r border-slate-200 bg-slate-50 transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      <div className="flex h-full flex-col">

        {/* HEADER */}
        <header className="border-b border-slate-200 bg-white px-4 pb-3 pt-4 dark:border-slate-700 dark:bg-slate-900">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2.5">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400/70" />

              <div className="flex items-center gap-2">

                <h2 className="text-[1.2rem] font-extrabold tracking-[-0.025em] text-slate-950 dark:text-white">
                  Söhbətlər
                </h2>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {conversations.length} aktiv
                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={onNewChat}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:ring-1 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:text-emerald-300"
              title="Yeni Söhbət / Əlavə et"
            >
              <Icon
                name="plus"
                className="h-4 w-4"
                strokeWidth={2}
              />
            </button>

          </div>

          {/* SEARCH */}
          <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-emerald-400 dark:border-slate-700 dark:bg-slate-900">

            <div className="relative flex items-center gap-2">

              <Icon
                name="search"
                className="h-4 w-4 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Əlaqə və ya mesaj axtarışı..."
                className="
                  w-full
                  border-0
                  bg-transparent
                  text-sm
                  font-medium
                  text-slate-800
                  placeholder:text-slate-400
                  focus:outline-none
                  dark:text-slate-100
                  dark:placeholder:text-slate-500
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  title="Axtarışı təmizlə"
                  className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                  <Icon
                    name="close"
                    className="h-3.5 w-3.5"
                  />
                </button>
              )}

            </div>

          </div>

          {/* FILTERS */}
          <div className="chat-filters mt-3 flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">

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
                  className={`
                    flex-1
                    rounded-lg
                    px-2
                    py-2
                    text-[13px]
                    font-semibold
                    transition

                    ${
                      isTabActive
                        ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }
                  `}
                >
                  {label}

                  {id === 'unread' && unreadCount > 0 && (
                    <span className="ml-1 text-[10px]">
                      ({unreadCount})
                    </span>
                  )}

                </button>
              );
            })}

          </div>

        </header>

        {/* LIST */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">

          {!list.length && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm font-medium text-slate-400 dark:border-slate-700">
              Heç bir söhbət tapılmadı
            </div>
          )}

          <div className="space-y-2">

            {list.map((c) => {

              const active = c.id === activeChatId;

              const isUnread =
                c.unread > 0 &&
                !readConversationIds.includes(c.id);


              return (
                <div
                  key={c.id}
                  onClick={() =>
                    handleConversationClick(c.id)
                  }
                  className={`
                    group
                    relative
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-xl
                    border
                    p-3.5
                    transition-all
                    duration-200
                    dark:shadow-[0_2px_6px_rgba(2,6,23,0.14),inset_0_1px_0_rgba(255,255,255,0.07)]

                    ${
                      active
                        ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700/50 dark:bg-slate-800 dark:hover:bg-slate-700/60'
                        : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700/70 dark:bg-slate-800/50 dark:hover:bg-slate-800'
                    }
                  `}
                >

                  {active && (
                    <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-emerald-500 dark:bg-emerald-400/70" />
                  )}

                  <div className="flex min-w-0 flex-1 items-center gap-3.5 pl-1">

                    {/* AVATAR */}
                    <div className="relative shrink-0">

                      {c.type === 'group' ? (

                        <GroupAvatar className="h-12 w-12" />

                      ) : (

                        <UserAvatar
                          user={c}
                          alt={c.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />

                      )}

                      {c.type !== 'group' && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-800 dark:bg-emerald-400/70" />}

                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                      <div className="mb-1 flex items-center justify-between gap-2">

                        <h4
                          className={`
                            truncate
                            text-[15px]

                            ${
                              isUnread
                                ? 'font-bold text-slate-950 dark:text-white'
                                : 'font-semibold text-slate-800 dark:text-slate-200'
                            }
                          `}
                        >
                          {c.name}
                        </h4>

                        <span className="shrink-0 text-xs font-medium text-slate-400">
                          {c.time}
                        </span>

                      </div>

                      <p
                        className={`
                          truncate
                          text-[13px]

                          ${
                            isUnread
                              ? 'font-semibold text-slate-700 dark:text-slate-200'
                              : 'font-normal text-slate-500 dark:text-slate-400'
                          }
                        `}
                      >
                        {c.lastSnippet}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="ml-2 flex shrink-0 items-center gap-1.5">

                    {isUnread && (
                      <span
                        className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white dark:bg-slate-700 dark:text-slate-100"
                        aria-label={`Unread messages: ${c.unread}`}
                      >
                        {c.unread}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(c.id);
                      }}
                      className="
                        rounded-md
                        p-1.5
                        text-slate-400
                        opacity-0
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                        group-hover:opacity-100
                        dark:hover:bg-slate-700
                        dark:hover:text-slate-200
                      "
                      title="Söhbəti bağla"
                    >
                      <Icon
                        name="close"
                        className="h-3.5 w-3.5"
                      />
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
