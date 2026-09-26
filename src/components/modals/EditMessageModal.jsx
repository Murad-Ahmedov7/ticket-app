import { getMessageContent } from '../../utils/messageReply.js';
import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function EditMessageModal({ message, onSave, onClose }) {
  const [text, setText] = useState(getMessageContent(message).text);
  return <div role="dialog" aria-modal="true" aria-label="Mesajı Redaktə Et" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white">Mesajı Redaktə Et</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <div className="mt-4 space-y-3"><textarea aria-label="Mesaj" value={text} onChange={e => setText(e.target.value)} rows="3" className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:border-emerald-500 resize-none" /></div>
    <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800"><button onClick={onClose} className="px-3.5 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button onClick={() => { if (text.trim()) onSave(message.id, text.trim()); }} className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow">Dəyişikliyi Yadda saxla</button></div>
  </div></div>;
}
