import Icon from '../common/Icons.jsx';
import VoiceNote from './VoiceNote.jsx';

function MentionText({ text = '', outgoing = false }) {
  return text.split(/(@[a-zA-Z0-9_ğüşıöçƏĞÜŞİÖÇ\s]+)/g).map((part, index) => part.startsWith('@') ? <span key={index} className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${outgoing ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{part}</span> : part);
}

export default function MessageBubble({ message, onReactionPicker, onReaction, onReply, onEdit, onCreateTask, onTaskDetail, onVote, playing, onPlay, notify }) {
  const outgoing = message.isOutgoing;
  const totalVotes = message.options?.reduce((sum, option) => sum + option.votes, 0) || 0;
  // Older saved image messages contain markup. Read only the expected data URL;
  // all text and image elements are still rendered by React, never as raw HTML.
  const legacyImage = !message.image && message.text?.startsWith('📷 Şəkil göndərildi:') ? message.text.match(/<img src="(data:image\/[^"\s]+)"/)?.[1] : null;
  const image = message.image || legacyImage;
  const actions = <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 px-1 py-0.5 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 mb-2">
    <button onClick={event => onReactionPicker(event, message.id)} className="p-1 hover:text-amber-500 transition" title="Reaksiya bildir"><Icon name="smile" className="w-3.5 h-3.5" /></button>
    <button onClick={() => onReply(message)} className="p-1 hover:text-emerald-600 transition" title="Cavab ver"><Icon name="reply" className="w-3.5 h-3.5" /></button>
    <button onClick={() => onCreateTask(message)} className="p-1 hover:text-emerald-600 transition" title="Tapşırıq yarat (Halal 16)"><Icon name="tasks" className="w-3.5 h-3.5" /></button>
    {outgoing && <button onClick={() => onEdit(message)} className="p-1 hover:text-teal-700 transition" title="Düzəliş et"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg></button>}
  </div>;
  return <div className={`group flex w-full relative items-end gap-1.5 ${outgoing ? 'justify-end' : 'justify-start'}`}>
    {outgoing && actions}
    <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3.5 shadow-sm transition-all relative ${outgoing ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-tr-xs shadow-[0_10px_20px_rgba(16,185,129,0.18)]' : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))] text-slate-800 border border-emerald-100/80 rounded-tl-xs shadow-[0_8px_18px_rgba(16,185,129,0.08)]'}`}>
      {!outgoing && message.sender && <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700"><span>{message.sender}</span></div>}
      {message.type === 'voice' ? <VoiceNote message={message} playing={playing} onToggle={onPlay} notify={notify} /> : message.type === 'poll' ?
        <div className="space-y-2.5 min-w-[240px] md:min-w-[280px]">
          <div className="flex items-center gap-2 pb-1 border-b border-white/15"><span className="p-1 rounded-md bg-white/20 text-white"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-5h5v5zm0-7H7V7h5v3zm7 7h-5V7h5v10z" /></svg></span><span className="text-xs font-bold tracking-wide">Ümumi Sorğu</span></div>
          <p className="text-sm font-bold text-white">{message.question}</p>
          <div className="space-y-1.5">{message.options.map(option => {
            const percent = totalVotes ? Math.round(option.votes / totalVotes * 100) : 0;
            const selected = message.userVoted === option.id;
            return <div key={option.id} onClick={() => onVote(message.id, option.id)} className={`relative group p-2.5 rounded-xl border ${selected ? 'border-brand-400 bg-white/20' : 'border-white/20 hover:bg-white/10'} cursor-pointer transition overflow-hidden`}>
              <div className="absolute left-0 top-0 bottom-0 bg-white/25 transition-all duration-500 rounded-lg" style={{ width: `${percent}%` }} />
              <div className="relative flex items-center justify-between text-xs font-semibold"><div className="flex items-center gap-2"><span className={`w-4 h-4 rounded-full border border-white/60 flex items-center justify-center text-[9px] ${selected ? 'bg-white text-brand-700 font-bold' : ''}`}>{selected ? '✓' : ''}</span><span>{option.text}</span></div><span className="font-mono text-[11px] font-bold">{percent}%</span></div>
            </div>;
          })}</div>
          <div className="text-[10px] text-white/70 text-right pt-0.5">{totalVotes} səs toplanıb</div>
        </div> : <>
          <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words"><MentionText text={legacyImage ? '📷 Şəkil göndərildi:' : message.text} outgoing={outgoing} /></div>
          {image && <img src={image} alt={message.fileName || 'Göndərilən şəkil'} className="rounded-xl max-h-48 my-1 object-cover border border-white/20 shadow" />}
          {message.embeddedTask && <div onClick={() => onTaskDetail(message.embeddedTask.id)} className={`mt-2.5 p-2.5 rounded-xl ${outgoing ? 'bg-white/15 hover:bg-white/25 border border-white/25' : 'bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 border border-slate-200 dark:border-slate-600'} cursor-pointer transition flex items-center justify-between gap-3 shadow-sm`}>
            <div className="flex items-center gap-2.5 min-w-0"><div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">#{message.embeddedTask.id}</div><div className="min-w-0"><h5 className={`text-xs font-bold truncate ${outgoing ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{message.embeddedTask.title}</h5><p className={`text-[10px] font-mono ${outgoing ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>Dedlayn: {message.embeddedTask.deadline}</p></div></div><span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${outgoing ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'} shadow-sm shrink-0`}>Baxış</span>
          </div>}
        </>}
      {!!Object.keys(message.reactions || {}).length && <div className={`flex flex-wrap items-center gap-1 mt-1.5 pt-1 border-t ${outgoing ? 'border-white/10' : 'border-slate-100 dark:border-slate-700'}`}>
        {Object.entries(message.reactions).map(([emoji, count]) => <button key={emoji} onClick={() => onReaction(message.id, emoji)} className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 transition ${outgoing ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'}`}><span>{emoji}</span><span className="font-mono text-[10px] font-bold">{count}</span></button>)}
      </div>}
      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${outgoing ? 'text-white/80' : 'text-slate-400'} select-none`}><span>{message.time}</span>{outgoing && <svg className="w-3.5 h-3.5 text-cyan-300 ml-1 inline" viewBox="0 0 16 16" fill="none"><path d="M1 8.5L4.5 12L9 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 8.5L9.5 12L14 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div>
    </div>
    {!outgoing && actions}
  </div>;
}
