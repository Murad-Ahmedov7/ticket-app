import { useId, useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";
import UserAvatar from "../common/UserAvatar.jsx";
import { filterGroups, normalize } from "./directory.js";
import "./GroupsView.css";

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";
const control = `h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition-colors duration-150 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 ${focus}`;
const primary = `inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-teal-700/20 bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-teal-700 dark:border-teal-400/20 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 ${focus}`;

function CategoryIcon({ name, large = false }) {
  const value = normalize(name);
  let drawing = <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 4v2" /></>;
  if (/inkişaf|^it\b|^ıt\b/.test(value)) {
    drawing = <><rect x="3" y="3" width="18" height="13" rx="2" /><path d="m7 7 3 3-3 3m6 0h4m-5 3v5m-4 0h8" /></>;
  } else if (/mühəndis|servis/.test(value)) {
    drawing = <><path d="m10 3 .6 2 2 .8 1.8-1 1.8 1.8-1 1.8.8 2 2 .6v2l-2 .6M9 17l-2-.8-1.8 1-1.8-1.8 1-1.8-.8-2-2-.6v-2l2-.6.8-2-1-1.8L5.2 3l1.8 1L9 3.4Z" /><circle cx="9" cy="10" r="2.5" /><path d="m12 21 6-6a4 4 0 0 0 4-5l-3 3-2-2 3-3a4 4 0 0 0-5 4l-6 6a2.1 2.1 0 0 0 3 3Z" /></>;
  } else if (/kommersiya|satış/.test(value)) {
    drawing = <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a22 22 0 0 0 18 0m-9 0v4" /></>;
  } else if (/dəstək/.test(value)) {
    drawing = <><path d="M4 14v-3a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-4" /><rect x="3" y="11" width="4" height="7" rx="2" /><rect x="17" y="11" width="4" height="7" rx="2" /></>;
  }
  return <span className={`flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-teal-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-teal-400 ${large ? "h-[var(--group-icon-large,56px)] w-[var(--group-icon-large,56px)]" : "h-[var(--group-icon-size,48px)] w-[var(--group-icon-size,48px)]"}`}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={large ? "h-6 w-6" : "h-5 w-5"}>{drawing}</svg></span>;
}

function Avatar({ name, user, small = false }) {
  return <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-100 text-xs font-semibold text-slate-600 ring-1 ring-slate-900/5 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/5 ${small ? "h-9 w-9" : "h-[var(--member-avatar,42px)] w-[var(--member-avatar,42px)]"}`}>
    <UserAvatar user={user || { name }} className="absolute inset-0 h-full w-full object-cover" />
  </span>;
}

function Members({ members, usersByName }) {
  return <ul className="group-members flex flex-col px-2 pb-2 sm:px-3">
    {members.map(name => {
      const user = usersByName.get(normalize(name));
      // Preserve explicit offline data when supplied.
      const online = user?.isOnline !== false;
      return <li key={name} className="flex min-h-[var(--member-row-height,68px)] items-center gap-4 border-b border-slate-200/80 px-4 py-[var(--member-padding-y,10px)] transition-colors duration-150 last:border-b-0 hover:bg-slate-50/80 sm:gap-5 sm:px-5 dark:border-slate-700/60 dark:hover:bg-slate-800/50">
        <Avatar name={name} user={user} />
        <div className="min-w-0 flex-1"><p className="break-words text-[length:var(--member-name-size,16px)] font-semibold leading-5 text-slate-900 dark:text-slate-100">{name}</p>{user?.position && <p className="mt-0.5 break-words text-[length:var(--member-role-size,14px)] leading-5 text-slate-500 dark:text-slate-400">{user.position}</p>}</div>
        <span title={online ? "Onlayn" : "Oflayn"} className="flex w-20 shrink-0 items-center justify-end gap-2 text-[13px] font-medium text-slate-500 dark:text-slate-400"><span aria-hidden="true" className={`h-[11px] w-[11px] rounded-full ${online ? "bg-emerald-500 dark:bg-emerald-400" : "bg-slate-400"}`} /><span>{online ? "Onlayn" : "Oflayn"}</span></span>
      </li>;
    })}
    {!members.length && <li className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">Bu qrupda hələ iştirakçı yoxdur.</li>}
  </ul>;
}
function ChatAction({ group, onChat, inline = false }) {
  const button = <button type="button" onClick={() => onChat(group)} className={primary}><Icon name="chat" />Qrup söhbətinə keç<Icon name="right" className="h-3.5 w-3.5" /></button>;
  if (inline) return button;
  return <footer className="flex min-h-[72px] items-center justify-end border-t border-slate-200 bg-slate-50 px-5 py-3 sm:px-7 dark:border-slate-800 dark:bg-slate-800/35">{button}</footer>;
}

export default function GroupsView({ groups, users = [], onBulk, onNewUser, onChat }) {
  const id = useId();
  const [view, setView] = useState("directory");
  const [selectedId, setSelectedId] = useState(null);
  const [openGroups, setOpenGroups] = useState(() => new Set());
  const usersByName = useMemo(() => new Map(users.map(user => [normalize(user.name), user])), [users]);
  const visibleGroups = useMemo(() => filterGroups(groups), [groups]);
  const selected = visibleGroups.find(group => group.id === selectedId) || visibleGroups[0];
  function toggleGroup(groupId) { setOpenGroups(previous => { const next = new Set(previous); if (next.has(groupId)) next.delete(groupId); else next.add(groupId); return next; }); }

  return (
    <section className="groups-page flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="relative shrink-0 border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-[26px]">Qrup və istifadəçilər</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Departament və layihə işçi qruplarının idarə edilməsi</p>
          </div>
          <div className="groups-actions flex flex-wrap gap-2.5">
            <button type="button" onClick={onBulk} className={`${control} inline-flex items-center justify-center gap-2 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800`}><Icon name="addMember" />Qrupa istifadəçi əlavə et</button>
            <button type="button" onClick={onNewUser} className={primary}><Icon name="plus" />Yeni istifadəçi</button>
          </div>
        </div>
          <div className="groups-view-switch absolute right-4 top-full z-10 mt-3 flex justify-end sm:right-6 lg:right-8">
              <div role="group" aria-label="Görünüş rejimi" className="ml-auto inline-flex h-[46px] shrink-0 items-stretch rounded-lg border border-slate-300 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-950/40">
                {[["directory", "Siyah\u0131", "directory"], ["accordion", "Akkordeon", "list"]].map(([value, label, icon]) => (
                  <button key={value} type="button" title={`${label} görünüşü`} aria-pressed={view === value} onClick={() => setView(value)} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3.5 text-[15px] font-semibold transition-colors duration-150 ${focus} ${view === value ? "border-teal-200 bg-teal-50 text-teal-800 shadow-sm dark:border-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300" : "border-transparent text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"}`}><Icon name={icon} className="h-[18px] w-[18px]" />{label}</button>
                ))}
              </div>
          </div>
      </header>
      <div className="groups-scroll flex min-h-0 min-w-0 flex-1 items-start justify-center overflow-y-auto pb-4 pt-3 [scrollbar-gutter:stable_both-edges] sm:pb-6">
        <div className="groups-content mx-auto flex w-[95%] min-w-0 max-w-none shrink-0 flex-col [&>.grid]:self-center">
          <div aria-hidden="true" className="groups-switch-spacer mb-3 h-11 shrink-0" />
          {!visibleGroups.length ? (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Icon name="search" className="mx-auto mb-4 h-7 w-7 text-slate-400" />
              <h2 className="font-semibold">{groups.length ? "Nəticə tapılmadı" : "Hələ qrup yoxdur"}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{groups.length ? "Başqa ad axtarın və ya axtarışı təmizləyin." : "Qruplar əlavə edildikdə burada görünəcək."}</p>
            </div>
          ) : view === "directory" ? (
            <div className="groups-directory mt-2 grid h-fit w-[calc(98.5%/0.95)] max-w-none shrink-0 lg:min-h-[60vh] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_18px_-8px_rgba(15,23,42,0.16)] [--group-icon-size:52px] [--group-icon-large:56px] [--member-avatar:50px] [--member-row-height:84px] [--member-padding-y:16px] [--member-name-size:16px] lg:grid-cols-[minmax(320px,30%)_minmax(0,1fr)] dark:border-slate-800 dark:bg-slate-900">
              <nav aria-label="Qruplar" className="relative min-h-0 min-w-0 border-b border-slate-200 bg-slate-50/80 p-3 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:[contain:size] dark:border-slate-800 dark:bg-slate-800/30">
                <div className="mb-3 flex items-center justify-between px-2 pt-1">
                  <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300">Qruplar</h2>
                  <span aria-live="polite" className="text-xs tabular-nums text-slate-400">{visibleGroups.length} / {groups.length}</span>
                </div>
                <div className="flex flex-col gap-2 pb-0">
                  {visibleGroups.map(group => (
                    <button key={group.id} type="button" aria-current={selected.id === group.id ? "true" : undefined} onClick={() => setSelectedId(group.id)} className={`relative flex min-h-[96px] w-full shrink-0 items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors duration-150 lg:w-full ${focus} ${selected.id === group.id ? "border-teal-300/70 bg-teal-50/80 shadow-sm dark:border-teal-500/35 dark:bg-teal-500/[0.08]" : "border-transparent hover:border-slate-200 hover:bg-white dark:hover:border-slate-700 dark:hover:bg-slate-800/70"}`}>
                      {selected.id === group.id && <span aria-hidden="true" className="absolute bottom-5 left-0 top-5 w-0.5 rounded-full bg-teal-600 dark:bg-teal-400" />}
                      <CategoryIcon name={group.name} />
                      <span className="min-w-0 flex-1"><span className={`block break-words text-base leading-6 ${selected.id === group.id ? "font-bold text-teal-900 dark:text-teal-200" : "font-semibold"}`}>{group.name}</span><span className="mt-1 block line-clamp-2 text-sm leading-5 font-normal text-slate-500 dark:text-slate-400">{group.description}</span></span>
                      <span className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md border border-slate-200/80 bg-white/70 px-1.5 text-xs font-semibold tabular-nums dark:border-slate-700 dark:bg-slate-900/60 ${selected.id === group.id ? "text-teal-700 dark:text-teal-300" : "text-slate-500 dark:text-slate-400"}`}>{group.members.length}</span>
                    </button>
                  ))}
                </div>
              </nav>
              <article aria-label={selected.name} className="flex min-w-0 flex-col pb-3 [&>ul>li]:gap-5 [&>ul>li]:border-slate-200/80 [&>ul>li]:px-5 sm:[&>ul>li]:px-6 dark:[&>ul>li]:border-slate-700/70 [&>ul>li>span[title]]:text-[13px] [&>ul>li>span[title]>span[aria-hidden]]:h-3 [&>ul>li>span[title]>span[aria-hidden]]:w-3">
                <div className="flex min-h-[120px] items-center border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7 dark:border-slate-700/70 dark:bg-slate-800/45">
                  <div className="flex w-full flex-wrap items-center gap-5">
                    <CategoryIcon name={selected.name} large />
                    <div className="min-w-0 flex-1 basis-48">
                      <h2 className="text-[22px] font-bold tracking-tight">{selected.name}</h2>
                      <p className="mt-1.5 text-[15px] leading-6 text-slate-600 dark:text-slate-400">{selected.description}</p>
                    </div>
                    <p className="flex shrink-0 items-center gap-2 text-[15px] font-medium text-slate-500 dark:text-slate-400"><Icon name="users" className="h-4 w-4" /><span className="font-semibold text-slate-700 dark:text-slate-300">{selected.members.length} nəfər</span></p>
                    <div className="ml-auto [&>button]:h-12 [&>button]:px-5"><ChatAction group={selected} onChat={onChat} inline /></div>
                  </div>
                </div>
                <div className="flex min-h-[56px] items-center justify-between border-b border-slate-100 bg-slate-50/40 px-5 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-7">
                  <h3 className="text-base font-semibold">İştirakçılar <span className="ml-1.5 text-sm font-normal tabular-nums text-slate-400">{selected.members.length}</span></h3>

                </div>
                <Members members={selected.members} usersByName={usersByName} />
              </article>
            </div>
          ) : (
            <div className="space-y-3">
              <p aria-live="polite" className="px-1 text-xs font-medium text-slate-500 dark:text-slate-400">{visibleGroups.length} qrup <span className="mx-1 text-slate-300 dark:text-slate-600">/</span> {groups.length} ümumi</p>
              {visibleGroups.map(group => {
                const open = openGroups.has(group.id);
                const panelId = `${id}-panel-${group.id}`;
                const triggerId = `${id}-trigger-${group.id}`;
                return (
                  <article key={group.id} className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-colors duration-200 dark:bg-slate-900 ${open ? "border-teal-300/70 shadow-[0_4px_18px_-8px_rgba(15,23,42,0.16)] dark:border-teal-500/35" : "border-slate-200 dark:border-slate-700/70"}`}>
                    <h2>
                      <button id={triggerId} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => toggleGroup(group.id)} className={`flex min-h-[96px] w-full flex-wrap items-center gap-4 px-5 py-4 text-left transition-colors duration-150 sm:flex-nowrap sm:gap-5 sm:px-7 ${open ? "bg-slate-50 text-teal-950 dark:bg-slate-800/60 dark:text-teal-100" : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50"} ${focus} focus-visible:ring-inset`}>
                        <CategoryIcon name={group.name} large />
                        <span className="min-w-0 flex-1"><span className="block text-lg font-bold tracking-tight">{group.name}</span><span className="mt-1 block text-sm font-normal leading-5 text-slate-500 dark:text-slate-400">{group.description}</span></span>
                        <span className="groups-avatar-stack hidden -space-x-2 md:flex">
                          {group.members.slice(0, 4).map(name => <Avatar key={name} name={name} user={usersByName.get(normalize(name))} small />)}
                          {group.members.length > 4 && <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[11px] font-medium text-slate-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-300">+{group.members.length - 4}</span>}
                        </span>
                        <span className="whitespace-nowrap text-sm font-medium tabular-nums text-slate-600 sm:ml-1 dark:text-slate-400">{group.members.length} nəfər</span>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${open ? "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300" : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800"}`}><Icon name="down" className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} /></span>
                      </button>
                    </h2>
                    <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!open} inert={!open} className={`grid transition-[grid-template-rows,visibility] duration-200 motion-reduce:transition-none ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-t border-slate-200 dark:border-slate-800">
                          <div className="w-full overflow-hidden bg-white [--member-avatar:48px] [--member-row-height:80px] [--member-padding-y:14px] [--member-name-size:16px] [--member-role-size:14px] dark:bg-slate-900">
                            <div className="flex min-h-[52px] items-center justify-between border-b border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-7 dark:border-slate-800 dark:bg-slate-800/20"><h3 className="text-base font-semibold">İştirakçılar <span className="ml-1.5 font-normal text-slate-400">{group.members.length}</span></h3></div>
                            <Members members={group.members} usersByName={usersByName} />
                            <ChatAction group={group} onChat={onChat} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
