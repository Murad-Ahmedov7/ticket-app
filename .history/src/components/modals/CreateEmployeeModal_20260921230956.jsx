import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateEmployeeModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [liability, setLiability] = useState('');
  return <div role="dialog" aria-modal="true" aria-label="İşçi Əlavə Et" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2"><span className="p-1.5 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg></span>İşçi Əlavə Et (Halal 11)</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <form onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), phone: phone.trim(), position: position.trim(), email: email.trim(), liability: liability.trim(), status: 'Aktiv' }); }} className="space-y-3 mt-4 text-xs">
      <div><label htmlFor="employee-name" className="block font-semibold mb-1">Ad soyad:</label><input id="employee-name" required placeholder="Ad soyad" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="employee-phone" className="block font-semibold mb-1">Nömrə:</label><input id="employee-phone" required placeholder="Mobil nömrə" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="employee-position" className="block font-semibold mb-1">Vəzifə:</label><input id="employee-position" required placeholder="Vəzifə" value={position} onChange={e => setPosition(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="employee-email" className="block font-semibold mb-1">E-mail:</label><input id="employee-email" type="email" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="employee-liability" className="block font-semibold mb-1">Öhdəlik:</label><input id="employee-liability" required placeholder="Öhdəlik" value={liability} onChange={e => setLiability(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800"><button type="button" onClick={onClose} className="px-3.5 py-2 text-xs text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Yadda saxla</button></div>
    </form>
  </div></div>;
}
