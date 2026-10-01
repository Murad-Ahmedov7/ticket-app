import { useId } from 'react';

export default function KanbanEmptyState({ color, iconPath }) {
  const id = useId();

  return (
    <div
      className={`kanban-empty-state relative isolate flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 py-6 text-center ${color}`}
    >
      <svg
        className="relative z-10 h-32 w-40 max-w-full shrink-0"
        viewBox="0 0 160 128"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${id}-paper`}
            x1="80"
            y1="34"
            x2="80"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient
            id={`${id}-clip`}
            x1="80"
            y1="22"
            x2="80"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0.30" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        {/* soft background decoration */}
        <path
          d="M24 79C12 57 27 39 46 43c10-20 36-23 50-8 21-8 43 8 41 29 20 14 11 39-13 41H49c-17 1-27-9-25-26Z"
          fill="currentColor"
          opacity="0.045"
        />

        <circle
          cx="25"
          cy="49"
          r="3"
          fill="currentColor"
          opacity="0.2"
        />

        <circle
          cx="137"
          cy="87"
          r="7"
          fill="currentColor"
          opacity="0.07"
        />

        <path
          d="m35 30 3 5m-11 2 4 2M135 54l4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* clipboard body */}
        <rect
          x="49"
          y="35"
          width="62"
          height="76"
          rx="9"
          fill={`url(#${id}-paper)`}
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.7"
        />

        {/* clipboard top clip */}
        <path
          d="M68 36v-5c0-5 4-9 9-9h6c5 0 9 4 9 9v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <rect
          x="66"
          y="30"
          width="28"
          height="13"
          rx="6.5"
          fill={`url(#${id}-clip)`}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />

        {/* empty task lines */}
        <circle
          cx="64"
          cy="58"
          r="3"
          stroke="currentColor"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        />

        <path
          d="M73 58h24"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <circle
          cx="64"
          cy="73"
          r="3"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />

        <path
          d="M73 73h19"
          stroke="currentColor"
          strokeOpacity="0.34"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <circle
          cx="64"
          cy="88"
          r="3"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        <path
          d="M73 88h27"
          stroke="currentColor"
          strokeOpacity="0.26"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* status badge */}
        <circle
          cx="117"
          cy="34"
          r="16"
          fill="var(--empty-tray-base)"
        />

        <circle
          cx="117"
          cy="34"
          r="16"
          fill="currentColor"
          fillOpacity="0.13"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />

        <svg
          x="107"
          y="24"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconPath} />
        </svg>
      </svg>

      <p className="relative z-10 max-w-[240px] text-sm font-medium leading-[22px] text-slate-600 dark:text-slate-300">
        Bu mərhələdə tapşırıq yoxdur
      </p>
    </div>
  );
}