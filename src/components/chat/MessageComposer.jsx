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
    {reply && <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs"><div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Icon name="reply" className="w-4 h-4 text-brand-600 rotate-180" /><span className="font-bold text-brand-600">{reply.isOutgoing ? 'Özünüzə' : reply.sender || 'Həmkarınıza'}:</span><span className="truncate max-w-xs md:max-w-md">{reply.text || (reply.type === 'voice' ? 'Səsli mesaj' : 'Sorğu')}</span></div><button onClick={onCancelReply} title="Cavabı ləğv et" className="text-slate-400 hover:text-slate-600 p-1"><Icon name="close" /></button></div>}
    <div className="p-3 md:p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
      <form onSubmit={submit} className="relative flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl p-2 border border-slate-200/60 dark:border-slate-700">
        <button type="button" onClick={() => fileInput.current.click()} className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Fayl və ya sənəd əlavə et"><Icon name="attachment" className="w-5 h-5" /></button>
        <input ref={fileInput} type="file" className="hidden" onChange={e => { if (e.target.files[0]) onFile(e.target.files[0]); e.target.value = ''; }} />
        <button type="button" onClick={onLocation} className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Məkan paylaş"><Icon name="location" className="w-5 h-5" /></button>
        <button type="button" onClick={onPoll} className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Sorğu təşkil et"><Icon name="poll" className="w-5 h-5" /></button>
        <textarea ref={input} rows="1" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) submit(e); }} placeholder="Mesajınızı daxil edin (@ ilə qeyd et)..." className="flex-1 bg-transparent text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none py-2 px-1 max-h-32" />
        <button type="button" onClick={() => { if (recording) onVoice(); else notify('Mikrofon yazır... Tamamlamaq üçün yenidən vurun'); setRecording(!recording); }} className={`p-2.5 rounded-xl ${recording ? 'text-rose-500 animate-pulse' : 'text-slate-500'} hover:text-brand-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition`} title="Səsli mesaj yaz"><Icon name="mic" className="w-5 h-5" /></button>
        <button type="submit" className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition shadow-md shadow-brand-500/25 active:scale-95" title="Göndər"><Icon name="send" className="w-5 h-5 rotate-90" strokeWidth={2.2} /></button>
      </form>
    </div>
  </>;
}
