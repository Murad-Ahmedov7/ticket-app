import { useId } from 'react';

export default function KanbanEmptyState({ color, iconPath }) {
  const id = useId();

  return (
    <div className={`kanban-empty-state relative isolate flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 py-6 text-center ${color}`}>
      <svg className="relative z-10 h-32 w-44 max-w-full shrink-0" viewBox="0 0 176 128" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-front`} x1="88" y1="78" x2="88" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={`${id}-rim`} x1="88" y1="54" x2="88" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        <path d="M25 81C10 56 23 32 45 39c11-26 42-22 53-7 27-11 53 9 46 31 27 23 5 47-18 42H53c-17 3-27-7-28-24Z" fill="currentColor" opacity="0.045" />
        <ellipse cx="86" cy="114" rx="43" ry="4" fill="currentColor" opacity="0.06" />
        <circle cx="24" cy="48" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="152" cy="91" r="8" fill="currentColor" opacity="0.07" />
        <path d="m38 28 3 5m-11 3 4 2M145 57l3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

        <path d="M43 80h86v22a9 9 0 0 1-9 9H52a9 9 0 0 1-9-9V80Z" fill="var(--empty-tray-base)" />
        <path d="M43 80h86v22a9 9 0 0 1-9 9H52a9 9 0 0 1-9-9V80Z" fill={`url(#${id}-front)`} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="m43 80 11-22a4 4 0 0 1 4-2h13l3 6a5 5 0 0 0 4 3h16a5 5 0 0 0 4-3l3-6h13a4 4 0 0 1 4 2l11 22a2 2 0 0 1-2 3H45a2 2 0 0 1-2-3Z" fill="var(--empty-tray-base)" />
        <path d="m43 80 11-22a4 4 0 0 1 4-2h13l3 6a5 5 0 0 0 4 3h16a5 5 0 0 0 4-3l3-6h13a4 4 0 0 1 4 2l11 22a2 2 0 0 1-2 3H45a2 2 0 0 1-2-3Z" fill={`url(#${id}-rim)`} stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.5" strokeLinejoin="round" />

        <circle cx="123" cy="31" r="17" fill="var(--empty-tray-base)" />
        <circle cx="123" cy="31" r="17" fill="currentColor" fillOpacity="0.13" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <svg x="113" y="21" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPath} />
        </svg>
      </svg>
      <p className="relative z-10 max-w-[240px] text-sm font-medium leading-[22px] text-slate-600 dark:text-slate-300">
        Bu mərhələdə tapşırıq yoxdur
      </p>
    </div>
  );
}
