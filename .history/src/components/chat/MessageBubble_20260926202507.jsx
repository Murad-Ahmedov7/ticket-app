import ReplyQuote from './ReplyQuote.jsx';
import { getMessageContent } from '../../utils/messageReply.js';
import Icon from '../common/Icons.jsx';
import VoiceNote from './VoiceNote.jsx';

function MentionText({ text = '', outgoing = false }) {
  return text.split(/(@[a-zA-Z0-9_ğüşıöçƏĞÜŞİÖÇ\s]+)/g).map((part, index) => part.startsWith('@') ? <span key={index} className={`inline-block max-w-full [overflow-wrap:anywhere] px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${outgoing ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50'}`}>{part}</span> : part);
}

export default function MessageBubble({ message, onReactionPicker, onReaction, onReply, onEdit, onCreateTask, onTaskDetail, onVote, playing, onPlay, notify, onJumpToMessage }) {
  const { text: bodyText, replyTo } = getMessageContent(message);
  const outgoing = message.isOutgoing;
  const totalVotes = message.options?.reduce((sum, option) => sum + option.votes, 0) || 0;
  // Older saved image messages contain markup. Read only the expected data URL;
  // all text and image elements are still rendered by React, never as raw HTML.
  const legacyImage = !message.image && message.text?.startsWith('📷 Şəkil göndərildi:') ? message.text.match(/<img src="(data:image\/[^"\s]+)"/)?.[1] : null;
  const image = message.image || legacyImage;
  const actions = <div className="message-actions opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-0.5 px-1 py-0.5 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 mb-2">
    <button onClick={event => onReactionPicker(event, message.id)} className="p-1 hover:text-amber-500 transition" title="Reaksiya bildir"><Icon name="smile" className="w-3.5 h-3.5" /></button>
    <button onClick={() => onReply(message)} className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition" title="Cavab ver"><Icon name="reply" className="w-3.5 h-3.5" /></button>
    <button onClick={() => onCreateTask(message)} className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition" title="Tapşırıq yarat (Halal 16)"><Icon name="tasks" className="w-3.5 h-3.5" /></button>
    {outgoing && <button onClick={() => onEdit(message)} className="p-1 hover:text-teal-700 dark:hover:text-teal-300 transition" title="Düzəliş et"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg></button>}
  </div>;
  return <div data-message-id={message.id} className={`message-row group flex w-full min-w-0 relative items-end gap-1.5 ${outgoing ? 'justify-end' : 'justify-start'}`}>
    {outgoing && actions}
    <div className={`message-bubble min-w-0 max-w-[85%] md:max-w-[70%] rounded-2xl p-3.5 shadow-sm transition-all relative ${outgoing ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-tr-xs shadow-[0_10px_20px_rgba(16,185,129,0.15)] dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-800 dark:shadow-[0_10px_20px_rgba(0,0,0,0.18)]' : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))] text-slate-800 border border-emerald-100/80 rounded-tl-xs shadow-[0_8px_18px_rgba(16,185,129,0.07)] dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.98),rgba(17,47,46,0.96))] dark:text-slate-100 dark:border-emerald-900/60 dark:shadow-[0_8px_18px_rgba(0,0,0,0.16)]'}`}>
      {!outgoing && message.sender && <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300"><span>{message.sender}</span></div>}
      {replyTo && <div className="mb-2 w-[260px] max-w-full"><ReplyQuote reply={replyTo} outgoing={outgoing} onJump={onJumpToMessage} /></div>}
      {message.type === 'voice' ? <VoiceNote message={message} playing={playing} onToggle={onPlay} notify={notify} /> : message.type === 'poll' ?
        <div className="space-y-2.5 message-poll w-[280px] max-w-full min-w-0 rounded-[18px] border border-emerald-300/80 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-2.5 text-white shadow-[0_12px_26px_rgba(16,185,129,0.19)] dark:border-emerald-600/50 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-950 dark:shadow-[0_12px_26px_rgba(0,0,0,0.16)]">
          <div className="flex items-center gap-2 border-b border-white/15 pb-1.5"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white"><svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-5h5v5zm0-7H7V7h5v3zm7 7h-5V7h5v10z" /></svg></span><span className="text-xs font-bold tracking-wide text-white">Ümumi Sorğu</span></div>
          <p className="text-sm font-bold text-white">{message.question}</p>
          <div className="space-y-1.5">{message.options.map(option => {
            const percent = totalVotes ? Math.round(option.votes / totalVotes * 100) : 0;
            const selected = message.userVoted === option.id;
            return <div key={option.id} onClick={() => onVote(message.id, option.id)} className={`relative group overflow-hidden rounded-xl border p-2.5 transition ${selected ? 'border-white/15 bg-white/10' : 'border-white/15 bg-emerald-500/20'} cursor-pointer`}>
              <div className="absolute inset-y-0 left-0 rounded-lg bg-white/10 transition-all duration-500" style={{ width: `${percent}%` }} />
              <div className="relative flex items-center justify-between text-xs font-semibold text-white"><div className="flex items-center gap-2"><span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${selected ? 'border-white bg-white text-emerald-700 font-bold' : 'border-white/60 bg-transparent text-transparent'}`}>{selected ? '✓' : ''}</span><span>{option.text}</span></div><span className="font-mono text-[11px] font-bold text-white">{percent}%</span></div>
            </div>;
          })}</div>
          <div className="text-[10px] text-emerald-100 text-right pt-0.5">{totalVotes} səs toplanıb</div>
        </div> : <>
          <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]"><MentionText text={legacyImage ? '📷 Şəkil göndərildi:' : bodyText} outgoing={outgoing} /></div>
          {image && <img src={image} alt={message.fileName || 'Göndərilən şəkil'} className="rounded-xl max-h-48 my-1 object-cover border border-white/20 shadow" />}
          {message.embeddedTask && <div onClick={() => onTaskDetail(message.embeddedTask.id)} className={`mt-2.5 p-2.5 rounded-xl ${outgoing ? 'bg-white/15 hover:bg-white/25 border border-white/25' : 'bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600/60 border border-slate-200 dark:border-slate-600'} cursor-pointer transition flex items-center justify-between gap-3 shadow-sm`}>
            <div className="flex items-center gap-2.5 min-w-0"><div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">#{message.embeddedTask.id}</div><div className="min-w-0"><h5 className={`text-xs font-bold truncate ${outgoing ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{message.embeddedTask.title}</h5><p className={`text-[10px] font-mono ${outgoing ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>Dedlayn: {message.embeddedTask.deadline}</p></div></div><span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${outgoing ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'} shadow-sm shrink-0`}>Baxış</span>
          </div>}
        </>}
      {!!Object.keys(message.reactions || {}).length && <div className={`flex flex-wrap items-center gap-1 mt-1.5 pt-1 border-t ${outgoing ? 'border-white/10' : 'border-slate-100 dark:border-slate-700'}`}>
        {Object.entries(message.reactions).map(([emoji, count]) => <button key={emoji} onClick={() => onReaction(message.id, emoji)} className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 transition ${outgoing ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}><span>{emoji}</span><span className="font-mono text-[10px] font-bold">{count}</span></button>)}
      </div>}
      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${outgoing ? 'text-white/80' : 'text-slate-400'} select-none`}>
        <span>{message.time}</span>
        {outgoing && (() => {
          const tickColor = '#2563eb';
          return <svg className="w-3.5 h-3.5 ml-1 inline" viewBox="0 0 16 16" fill="none" aria-label="sent status">
            <path d="M1 8.5L4.5 12L9 6.5" stroke={tickColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 8.5L9.5 12L14 6.5" stroke={tickColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>;
        })()}
      </div>
    </div>
    {!outgoing && actions}
  </div>;
}
