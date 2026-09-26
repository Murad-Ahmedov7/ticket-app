import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function ConversationList({ conversations, activeChatId, chatCategory, onCategory, onSelect, onDelete, onNewChat }) {
  const [search, setSearch] = useState('');
  const list = conversations.filter(c => (chatCategory === 'all' || (chatCategory === 'unread' ? c.unread > 0 : c.type === chatCategory)) && `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase()));
  return (
 <div className="w-80 md:w-96 border-r border-teal-500/20 bg-gradient-to-b from-[#0b292e] via-[#082024] to-[#051518] flex flex-col shrink-0 select-none text-slate-200">
      {/* BAŞLIQ VƏ FİLTRLƏR */}
      <div className="p-4 border-b border-teal-400/15 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            Söhbətlər 
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-400/15 text-teal-300 border border-teal-400/30">
              4 aktiv
            </span>
          </h2>
          <button 
            onClick={onNewChat} 
            className="w-9 h-9 rounded-xl bg-teal-500/20 hover:bg-teal-500/35 border border-teal-400/30 text-teal-200 hover:text-white flex items-center justify-center shadow-lg shadow-teal-950/40 transition active:scale-95 cursor-pointer" 
            title="Yeni Söhbət / Əlavə et"
          >
            <Icon name="plus" strokeWidth={2.4} />
          </button>
        </div>

        {/* AXtARIŞ SAHƏSİ */}
        <div className="relative">
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Əlaqə və ya mesaj axtarışı..." 
            className="w-full pl-9 pr-8 py-2 bg-teal-950/40 text-xs rounded-xl text-teal-100 placeholder-teal-300/40 border border-teal-400/20 focus:border-teal-400/50 focus:bg-teal-900/30 focus:outline-none transition shadow-inner" 
          />
          <Icon name="search" className="w-4 h-4 text-teal-300/50 absolute left-3 top-2.5" />
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

        {/* KATEQORİYA TABLARI */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-200/60 pt-0.5">
          {[['all', 'Hamısı'], ['direct', 'Şəxsi'], ['group', 'Qruplar'], ['unread', 'Oxunmamış']].map(([id, label]) => (
            <button 
              key={id} 
              onClick={() => onCategory(id)} 
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                id === chatCategory 
                  ? 'bg-teal-400/20 text-teal-200 border border-teal-300/30 font-bold shadow-sm' 
                  : 'hover:bg-white/5 hover:text-teal-100'
              } ${id === 'unread' ? 'ml-auto text-amber-300 font-bold' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* SÖHBƏT SİYAHISI */}
      <div className="flex-1 overflow-y-auto divide-y divide-teal-500/10 p-2 space-y-1 custom-scrollbar">
        {!list.length && (
          <div className="p-6 text-center text-xs text-teal-200/40">
            Heç bir söhbət tapılmadı
          </div>
        )}
        {list.map(c => {
          const active = c.id === activeChatId;
          return (
            <div 
              key={c.id} 
              onClick={() => onSelect(c.id)} 
              className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                active 
                  ? 'bg-teal-400/25 text-white shadow-md shadow-teal-950/50 border border-teal-300/40' 
                  : 'hover:bg-white/5 text-teal-100/70 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.avatarGradient} flex items-center justify-center text-slate-950 font-bold text-sm shadow-md ring-1 ring-white/20`}>
                    {c.type === 'group' ? <Icon name="groups" className="w-5 h-5 text-white" /> : c.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 ${active ? 'border-[#0e3b43]' : 'border-[#082024]'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold truncate ${active ? 'text-white' : 'text-teal-100'}`}>
                      {c.name}
                    </h4>
                    <span className={`text-[10px] font-medium ml-1 shrink-0 ${active ? 'text-teal-200' : 'text-teal-300/40'}`}>
                      {c.time}
                    </span>
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-teal-100/90' : 'text-teal-200/50'}`}>
                    {c.lastSnippet}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                {c.unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-sm">
                    {c.unread}
                  </span>
                )}
                <button 
                  onClick={e => { e.stopPropagation(); onDelete(c.id); }} 
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 transition cursor-pointer" 
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
