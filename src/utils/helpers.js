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
export function normalizeTaskStatus(status) {
  if (status === 'Tamamlandı') return 'Bitmiş';
  if (status === 'İcra olunur') return 'Icra olunur';
  return status || 'Gözləmədə';
}
export const statusLabel = status => normalizeTaskStatus(status);
// Accepted tasks share the active navigation accent in both themes.
export const acceptedStatusStyles = {
  dot: 'bg-[var(--navigation-active-accent)]',
  text: 'text-[var(--navigation-active-accent)]',
  surface: 'bg-[color-mix(in_srgb,var(--navigation-active-accent)_12%,transparent)] text-[var(--navigation-active-accent)]',
  border: 'border-[color-mix(in_srgb,var(--navigation-active-accent)_40%,transparent)]',
  hover: 'hover:bg-[color-mix(in_srgb,var(--navigation-active-accent)_20%,transparent)]',
};
export const statusClasses = {
  'Gözləmədə': 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  'Icra olunur': 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-200 border-blue-500 dark:border-blue-400',
  'Pauzada': 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700',
  'Qəbul olundu': `${acceptedStatusStyles.surface} ${acceptedStatusStyles.border} ${acceptedStatusStyles.hover}`,
  'Bitmiş': 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  'Silinmiş': 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700',
};
export const statusDots = { 'Gözləmədə': 'bg-amber-400', 'Icra olunur': 'bg-amber-500 animate-pulse', 'Pauzada': 'bg-purple-500', 'Qəbul olundu': acceptedStatusStyles.dot, 'Bitmiş': 'bg-emerald-500', 'Silinmiş': 'bg-rose-500' };
