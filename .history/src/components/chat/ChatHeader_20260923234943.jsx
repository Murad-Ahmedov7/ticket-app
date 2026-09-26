import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember }) {
  return (
    // <header className="h-20 px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
    //   <div className="flex items-center gap-3.5">
    //     <div className="relative"><div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold flex items-center justify-center shadow-md"><Icon name="groups" className="w-5 h-5" /></div><span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" /></div>
    //     <div><div className="flex items-center gap-2"><h2 className="text-base font-bold text-slate-900 dark:text-white">{conversation.type === 'group' ? 'Chat with ' : ''}{conversation.name}</h2><span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{conversation.type === 'group' ? 'Qrup' : 'Şəxsi'}</span></div><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{conversation.type === 'group' ? `${conversation.members.length} iştirakçı • ${conversation.members.join(', ')}` : 'Onlayn • Halal Portal'}</p></div>
    //   </div>
    //   <div className="flex items-center gap-2">
    //     <button onClick={onCall} className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition flex items-center gap-2 border border-emerald-200 dark:border-emerald-800 shadow-sm active:scale-95" title="Zəng et"><Icon name="phone" className="w-4 h-4 text-emerald-600" /><span className="hidden sm:inline">Zəng et</span></button>
    //     <button onClick={onCreateTask} className="px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-bold transition flex items-center gap-1.5 border border-brand-200 dark:border-brand-800" title="Söhbətdən tapşırıq yarat (Halal 16)"><Icon name="plus" className="w-4 h-4 text-brand-600" strokeWidth={2.2} /><span className="hidden md:inline">Tapşırıq yarat</span></button>
    //     <button onClick={onInfo} className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200/80 dark:border-slate-800" title="Ətraflı məlumat"><Icon name="edit" /></button>
    //     <button onClick={onAddMember} className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition active:scale-95" title="İştirakçı əlavə et"><Icon name="addMember" strokeWidth={2.4} /></button>
    //   </div>
    // </header>

    <>
    </>
  );
}
