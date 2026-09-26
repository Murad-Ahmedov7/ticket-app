import { useState } from 'react';
import Icon from '../common/Icons.jsx';

// Retained from the source, which defines this modal without a visible launcher.
export default function CreateGroupModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return <div role="dialog" aria-modal="true" aria-label="Yeni Qrup Yarat" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white">Yeni Qrup Yarat</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <form onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), description: description.trim() }); }} className="space-y-3 mt-4 text-xs"><div><label htmlFor="group-name" className="block font-semibold mb-1">Qrupun adı:</label><input id="group-name" required value={name} onChange={e => setName(e.target.value)} placeholder="Məs: Logistika və Nəqliyyat" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div><div><label htmlFor="group-description" className="block font-semibold mb-1">Təsvir:</label><textarea id="group-description" rows="2" required value={description} onChange={e => setDescription(e.target.value)} placeholder="Qrupun fəaliyyət sahəsi" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" /></div><div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800"><button type="button" onClick={onClose} className="px-3.5 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button type="submit" className="px-4 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Qrupu Yarat</button></div></form>
  </div></div>;
}
