import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function EditEmployeeModal({ employee, onClose, onSave, onDelete }) {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position || '');
  const [liability, setLiability] = useState(employee.liability || '');
  const [phone, setPhone] = useState(employee.phone || '');
  const [status, setStatus] = useState(employee.status || 'Aktiv');
  return <div role="dialog" aria-modal="true" aria-label="İşçini Redaktə Et" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white">İşçini Redaktə Et</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <form onSubmit={e => { e.preventDefault(); onSave({ ...employee, name: name.trim(), position: position.trim(), liability: liability.trim(), phone: phone.trim(), status }); }} className="space-y-3 mt-4 text-xs">
      <div><label htmlFor="edit-employee-name" className="block font-semibold mb-1">Ad soyad:</label><input id="edit-employee-name" required value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="edit-employee-position" className="block font-semibold mb-1">Vəzifə:</label><input id="edit-employee-position" required value={position} onChange={e => setPosition(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="edit-employee-liability" className="block font-semibold mb-1">Öhdəlik:</label><input id="edit-employee-liability" required value={liability} onChange={e => setLiability(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="edit-employee-phone" className="block font-semibold mb-1">Mobil nömrə:</label><input id="edit-employee-phone" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
      <div><label htmlFor="edit-employee-status" className="block font-semibold mb-1">Status:</label><select id="edit-employee-status" value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><option>Aktiv</option><option>Gözləmədə</option></select></div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800"><button type="button" onClick={() => onDelete(employee.id)} className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold">Sil</button><div className="flex items-center gap-2"><button type="button" onClick={onClose} className="px-3.5 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button type="submit" className="px-4 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Yadda saxla</button></div></div>
    </form>
  </div></div>;
}
