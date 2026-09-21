import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateUserModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Aktiv');
  return <div role="dialog" aria-modal="true" aria-label="Yeni İstifadəçi Əlavə Et" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2"><span className="p-1.5 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="plus" strokeWidth={2.5} /></span>Yeni İstifadəçi Əlavə Et</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <form onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), company: company.trim(), email: email.trim(), position: position.trim(), status }); }} className="space-y-3 mt-4 text-xs">
      <div><label htmlFor="user-name" className="block font-semibold mb-1">Ad / Soyad:</label><input id="user-name" required placeholder="Məs: Rəşad Əliyev" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="user-company" className="block font-semibold mb-1">Şirkət:</label><input id="user-company" required placeholder="Məs: HALAL-P MMC" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="user-email" className="block font-semibold mb-1">E-mail:</label><input id="user-email" type="email" required placeholder="rashad@halal.az" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="user-position" className="block font-semibold mb-1">Vəzifə:</label><input id="user-position" required placeholder="Məs: Sistem Administratoru" value={position} onChange={e => setPosition(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="user-status" className="block font-semibold mb-1">Status:</label><select id="user-status" value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><option>Aktiv</option><option>Gözləmədə</option></select></div>
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800"><button type="button" onClick={onClose} className="px-3.5 py-2 text-xs text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Yadda saxla</button></div>
    </form>
  </div></div>;
}
