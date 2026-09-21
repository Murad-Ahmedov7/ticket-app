import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateCompanyModal({ onClose, onSave, notify }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [warning, setWarning] = useState(false);
  function submit(event) {
    event.preventDefault();
    if (!logo) { setWarning(true); notify('Loqo əlavə olunmalıdır!'); return; }
    onSave({ name: name.trim(), email: email.trim(), address: address.trim(), phone: phone.trim(), logo: name.trim().slice(0, 2).toUpperCase() });
  }
  return <div role="dialog" aria-modal="true" aria-label="Şirkət Yarat" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2"><span className="p-1.5 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="companies" strokeWidth={2.5} /></span>Şirkət Yarat (Halal 7)</h3><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
    <form onSubmit={submit} className="space-y-3 mt-4 text-xs">
      <div className="grid grid-cols-2 gap-3"><div><label htmlFor="company-name" className="block font-semibold mb-1">Şirkət adı:</label><input id="company-name" required placeholder="Şirkət adı" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div><div><label htmlFor="company-email" className="block font-semibold mb-1">E-mail:</label><input id="company-email" type="email" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div></div>
      <div className="grid grid-cols-2 gap-3"><div><label htmlFor="company-address" className="block font-semibold mb-1">Ünvan:</label><input id="company-address" required placeholder="Ünvan" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div><div><label htmlFor="company-phone" className="block font-semibold mb-1">Mobil nömrə:</label><input id="company-phone" required placeholder="Mobil nömrə" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" /></div></div>
      <div><label className="block font-semibold mb-1">Logo:</label><div className="flex items-center gap-3"><label className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold cursor-pointer hover:bg-brand-100 transition flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Yüklə<input type="file" className="hidden" onChange={e => { setLogo(e.target.files[0] || null); setWarning(false); }} /></label><span className="text-slate-400 text-[11px]">{logo?.name || 'Fayl seçilməyib'}</span></div>{warning && <p className="text-rose-500 text-[11px] font-semibold mt-1">Loqo əlavə olunmalıdır!</p>}</div>
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800"><button type="button" onClick={onClose} className="px-3.5 py-2 text-xs text-slate-500 hover:bg-slate-100 rounded-xl">Ləğv et</button><button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow">Yadda saxla</button></div>
    </form>
  </div></div>;
}
