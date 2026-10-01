import Icon from '../common/Icons.jsx';

export default function GroupAvatar({ className = '' }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-xl bg-slate-50 text-emerald-700 ring-1 ring-emerald-600/25 transition-colors hover:ring-emerald-600/40 group-hover:ring-emerald-600/40 dark:bg-slate-900 dark:text-emerald-400 dark:ring-emerald-500/30 dark:hover:ring-emerald-500/45 dark:group-hover:ring-emerald-500/45 ${className}`}
    >
      <Icon name="groups" className="h-[18px] w-[18px]" />
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-50 bg-emerald-500 dark:border-slate-900" />
    </div>
  );
}
