import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function PollModal({ onClose, onSave, notify }) {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  function submit() {
    if (!question.trim()) return notify('Zəhmət olmasa sualı daxil edin');
    onSave(question.trim(), option1.trim() || 'Hə', option2.trim() || 'Yox');
  }
  return <div role="dialog" aria-modal="true" aria-label="Yeni Sorğu Təşkil Et" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4">
    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2"><span className="p-1.5 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 13h4v8H3zm7-5h4v13h-4zm7-7h4v20h-4z" /></svg></span>Yeni Sorğu Təşkil Et</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
      <div className="space-y-3 mt-4 text-xs">
        <div><label htmlFor="poll-question" className="block font-semibold mb-1">Sual:</label><input id="poll-question" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Məs: test tapşırıqları təsdiqlənsin?" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
        <div><label htmlFor="poll-option1" className="block font-semibold mb-1">Variant 1:</label><input id="poll-option1" value={option1} onChange={e => setOption1(e.target.value)} placeholder="test tapşırıqlarının 1" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
        <div><label htmlFor="poll-option2" className="block font-semibold mb-1">Variant 2:</label><input id="poll-option2" value={option2} onChange={e => setOption2(e.target.value)} placeholder="test tapşırıqlarının 2" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800"><button onClick={onClose} className="px-3.5 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button onClick={submit} className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Sorğunu Başlat</button></div>
    </div>
  </div>;
}
