export const storeKeys = ['conversations', 'messages', 'tasks', 'operatorApprovals', 'groups', 'companies', 'users', 'employees'];

export function messageTime() {
  const now = new Date();
  return `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
}

export function newMessage(values) {
  return { id: Date.now(), date: 'Today', type: 'text', time: 'İndi', isOutgoing: true, status: 'read', reactions: {}, ...values };
}

export function loadStore(initialState) {
  const state = structuredClone(initialState);
  try {
    const saved = JSON.parse(localStorage.getItem('halal_platform_store') || 'null');
    for (const key of storeKeys) {
      if (key === 'messages' ? saved?.messages && typeof saved.messages === 'object' && !Array.isArray(saved.messages) : Array.isArray(saved?.[key])) state[key] = saved[key];
    }
  } catch (error) {
    console.warn('LocalStorage load failed:', error);
  }
  return state;
}

export const taskStatuses = ['Gözləmədə', 'Icra olunur', 'Pauzada', 'Qəbul olundu', 'Bitmiş', 'Silinmiş'];
export const statusLabel = status => status === 'Icra olunur' ? 'İcra olunur' : status === 'Tamamlandı' ? 'Bitmiş' : status;
export const statusClasses = {
  'Gözləmədə': 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  'Icra olunur': 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 border-emerald-500 dark:border-emerald-400',
  'Pauzada': 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  'Qəbul olundu': 'bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700',
  'Bitmiş': 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  'Silinmiş': 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
};
export const statusDots = { 'Gözləmədə': 'bg-emerald-500', 'Icra olunur': 'bg-emerald-500 animate-pulse', 'Pauzada': 'bg-emerald-500', 'Qəbul olundu': 'bg-teal-500', 'Bitmiş': 'bg-emerald-500', 'Silinmiş': 'bg-emerald-600' };
