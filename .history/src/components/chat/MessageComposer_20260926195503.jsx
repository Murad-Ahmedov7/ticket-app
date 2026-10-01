import ReplyQuote from './ReplyQuote.jsx';
import { createReplySnapshot } from '../../utils/messageReply.js';
import { useEffect, useRef, useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function MessageComposer({ reply, onCancelReply, onSend, onFile, onLocation, onPoll, onVoice, notify }) {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const input = useRef(null);
  const fileInput = useRef(null);
  useEffect(() => { if (reply) input.current?.focus(); }, [reply]);
  function submit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }
  return <>
    {reply && <div className="chat-reply flex min-w-0 shrink-0 items-center gap-2 border-t border-slate-200/80 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
      <div className="min-w-0 flex-1"><ReplyQuote reply={createReplySnapshot(reply)} /></div>
      <button type="button" onClick={onCancelReply} title="Cavabı ləğv et" aria-label="Cavabı ləğv et" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-300"><Icon name="close" /></button>
    </div>}
    <div className="chat-composer p-3 md:p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
      <form onSubmit={submit} className="chat-compose-form relative flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl p-2 border border-slate-200/60 dark:border-slate-700">
        <button type="button" onClick={() => fileInput.current.click()} className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/40 transition" title="Fayl və ya sənəd əlavə et"><Icon name="attachment" className="w-5 h-5" /></button>
        <input ref={fileInput} type="file" className="hidden" onChange={e => { if (e.target.files[0]) onFile(e.target.files[0]); e.target.value = ''; }} />
        <button type="button" onClick={onLocation} className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/40 transition" title="Məkan paylaş"><Icon name="location" className="w-5 h-5" /></button>
        <button type="button" onClick={onPoll} className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/40 transition" title="Sorğu təşkil et"><Icon name="poll" className="w-5 h-5" /></button>
        <textarea ref={input} rows="1" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) submit(e); }} placeholder="Mesajınızı daxil edin (@ ilə qeyd et)..." className="min-w-0 w-0 flex-1 bg-transparent text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none py-2 px-1 max-h-32" />
        <button type="button" onClick={() => { if (recording) onVoice(); else notify('Mikrofon yazır... Tamamlamaq üçün yenidən vurun'); setRecording(!recording); }} className={`p-2.5 rounded-xl ${recording ? 'text-rose-500 animate-pulse' : 'text-slate-500'} hover:text-emerald-700 hover:bg-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/40 transition`} title="Səsli mesaj yaz"><Icon name="mic" className="w-5 h-5" /></button>
        <button type="submit" className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-md shadow-emerald-500/25 active:scale-95" title="Göndər"><Icon name="send" className="w-5 h-5 rotate-90" strokeWidth={2.2} /></button>
      </form>
    </div>
  </>;
}
