import Icon from "../common/Icons.jsx";

const avatarTones = [
  "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30",
  "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30",
  "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-400/15 dark:text-violet-300 dark:border-violet-400/30",
  "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30",
  "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/30",
  "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-400/15 dark:text-teal-300 dark:border-teal-400/30",
];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) return "?";

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getDepartmentInitial(name = "") {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function getAvatarTone(name = "") {
  const sum = [...name].reduce(
    (total, char) => total + char.charCodeAt(0),
    0
  );

  return avatarTones[sum % avatarTones.length];
}

function getDepartmentChatColor(color = "") {
  const value = color.toLowerCase();

  if (
    value.includes("violet") ||
    value.includes("purple") ||
    value.includes("indigo") ||
    value.includes("fuchsia")
  ) {
    return {
      rgb: "124, 58, 237",
      lightText: "#6d28d9",
      darkText: "#ddd6fe",
    };
  }

  if (
    value.includes("blue") ||
    value.includes("sky") ||
    value.includes("cyan")
  ) {
    return {
      rgb: "14, 165, 233",
      lightText: "#0369a1",
      darkText: "#bae6fd",
    };
  }

  if (
    value.includes("emerald") ||
    value.includes("green") ||
    value.includes("teal")
  ) {
    return {
      rgb: "16, 185, 129",
      lightText: "#047857",
      darkText: "#a7f3d0",
    };
  }

  if (
    value.includes("orange") ||
    value.includes("amber") ||
    value.includes("yellow")
  ) {
    return {
      rgb: "249, 115, 22",
      lightText: "#c2410c",
      darkText: "#fed7aa",
    };
  }

  return {
    rgb: "100, 116, 139",
    lightText: "#475569",
    darkText: "#cbd5e1",
  };
}

function getDepartmentTheme(color = "") {
  const value = color.toLowerCase();

  if (
    value.includes("violet") ||
    value.includes("purple") ||
    value.includes("indigo") ||
    value.includes("fuchsia")
  ) {
    return {
      card: `
        bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.11),transparent_40%),linear-gradient(145deg,#ffffff_0%,#faf7ff_48%,#f5f7fb_100%)]
        dark:bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.38),transparent_40%),linear-gradient(145deg,#211336_0%,#121018_46%,#0d0d12_100%)]
      `,
      border:
        "border-violet-200/80 hover:border-violet-300 dark:border-violet-400/35 dark:hover:border-violet-400/65",
      frame:
        "border-violet-200/70 dark:border-violet-400/60",
      deco:
        "border-violet-300 dark:border-violet-400/70",
      line:
        "bg-violet-400/70",
      logo:
        "bg-violet-600",
      glow:
        "hover:shadow-[0_14px_32px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_18px_45px_rgba(109,40,217,0.20)]",
      member:
        "hover:border-violet-200 hover:bg-violet-50/80 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/[0.07]",
    };
  }

  if (
    value.includes("blue") ||
    value.includes("sky") ||
    value.includes("cyan")
  ) {
    return {
      card: `
        bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.11),transparent_40%),linear-gradient(145deg,#ffffff_0%,#f4fbff_48%,#f4f7fb_100%)]
        dark:bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.30),transparent_40%),linear-gradient(145deg,#10263d_0%,#10151d_48%,#0c0e12_100%)]
      `,
      border:
        "border-sky-200/80 hover:border-sky-300 dark:border-sky-400/35 dark:hover:border-sky-400/65",
      frame:
        "border-sky-200/70 dark:border-sky-400/60",
      deco:
        "border-sky-300 dark:border-sky-400/70",
      line:
        "bg-sky-400/70",
      logo:
        "bg-sky-600",
      glow:
        "hover:shadow-[0_14px_32px_rgba(14,165,233,0.12)] dark:hover:shadow-[0_18px_45px_rgba(14,165,233,0.18)]",
      member:
        "hover:border-sky-200 hover:bg-sky-50/80 dark:hover:border-sky-400/30 dark:hover:bg-sky-400/[0.07]",
    };
  }

  if (
    value.includes("emerald") ||
    value.includes("green") ||
    value.includes("teal")
  ) {
    return {
      card: `
        bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.11),transparent_40%),linear-gradient(145deg,#ffffff_0%,#f3fcf8_48%,#f3f7f6_100%)]
        dark:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.30),transparent_40%),linear-gradient(145deg,#0e2d28_0%,#101816_48%,#0c100f_100%)]
      `,
      border:
        "border-emerald-200/80 hover:border-emerald-300 dark:border-emerald-400/35 dark:hover:border-emerald-400/65",
      frame:
        "border-emerald-200/70 dark:border-emerald-400/60",
      deco:
        "border-emerald-300 dark:border-emerald-400/70",
      line:
        "bg-emerald-400/70",
      logo:
        "bg-emerald-600",
      glow:
        "hover:shadow-[0_14px_32px_rgba(16,185,129,0.12)] dark:hover:shadow-[0_18px_45px_rgba(16,185,129,0.18)]",
      member:
        "hover:border-emerald-200 hover:bg-emerald-50/80 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/[0.07]",
    };
  }

  if (
    value.includes("orange") ||
    value.includes("amber") ||
    value.includes("yellow")
  ) {
    return {
      card: `
        bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.11),transparent_40%),linear-gradient(145deg,#ffffff_0%,#fff8f3_48%,#f8f5f2_100%)]
        dark:bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.30),transparent_40%),linear-gradient(145deg,#352010_0%,#19140f_48%,#100e0c_100%)]
      `,
      border:
        "border-orange-200/80 hover:border-orange-300 dark:border-orange-400/35 dark:hover:border-orange-400/65",
      frame:
        "border-orange-200/70 dark:border-orange-400/60",
      deco:
        "border-orange-300 dark:border-orange-400/70",
      line:
        "bg-orange-400/70",
      logo:
        "bg-orange-500",
      glow:
        "hover:shadow-[0_14px_32px_rgba(249,115,22,0.12)] dark:hover:shadow-[0_18px_45px_rgba(249,115,22,0.18)]",
      member:
        "hover:border-orange-200 hover:bg-orange-50/80 dark:hover:border-orange-400/30 dark:hover:bg-orange-400/[0.07]",
    };
  }

  return {
    card:
      "bg-white dark:bg-[linear-gradient(145deg,#1e293b,#0c0e12)]",
    border:
      "border-slate-200 hover:border-slate-300 dark:border-slate-500/40 dark:hover:border-slate-400",
    frame:
      "border-slate-200 dark:border-slate-500/60",
    deco:
      "border-slate-300 dark:border-slate-400",
    line:
      "bg-slate-400",
    logo:
      "bg-slate-600",
    glow:
      "hover:shadow-xl",
    member:
      "hover:bg-slate-50 dark:hover:bg-white/[0.04]",
  };
}

export default function GroupsView({
  groups,
  onBulk,
  onNewUser,
  onChat,
}) {
  return (
    <section className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#f4f7f7] dark:bg-[#050811]">

      {/* HEADER */}
      <header className="shrink-0 bg-white/95 dark:bg-[#0c111b] border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3">
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400/30 scale-[1.8]" />
              </span>

              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Qrup və İstifadəçilər
              </h1>
            </div>

            <p className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">
              Departament və layihə işçi qruplarının idarə edilməsi
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onBulk}
              className="
                inline-flex items-center justify-center gap-2
                px-4 py-2.5 rounded-xl

                bg-emerald-50 hover:bg-emerald-100
                dark:bg-emerald-400/15 dark:hover:bg-emerald-400/25

                text-emerald-700 dark:text-emerald-200

                border border-emerald-200 dark:border-emerald-400/30

                text-xs font-bold

                shadow-sm
                hover:shadow-md
                hover:-translate-y-[1px]

                active:translate-y-0
                active:scale-[0.98]

                transition-all duration-200
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>

              Qrupa istifadəçi əlavə et
            </button>

            <button
              onClick={onNewUser}
              className="
                inline-flex items-center justify-center gap-2
                px-4 py-2.5 rounded-xl

                bg-teal-600 hover:bg-teal-700
                dark:bg-teal-500 dark:hover:bg-teal-400

                text-white

                border border-teal-500 dark:border-teal-400

                text-xs font-bold

                shadow-sm shadow-teal-500/15

                hover:shadow-md
                hover:-translate-y-[1px]

                active:translate-y-0
                active:scale-[0.98]

                transition-all duration-200
              "
            >
              <Icon name="plus" />

              Yeni istifadəçi
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {groups.map((group, index) => {
            const theme = getDepartmentTheme(group.color);
            const chatColor = getDepartmentChatColor(group.color);

            return (
              <article
                key={group.id}

                style={{
                  animationDelay: `${index * 140}ms`,
                }}

                className={`
                  group
                  group-card-enter

                  relative
                  min-w-0
                  flex
                  flex-col
                  overflow-hidden

                  rounded-[22px]

                  border
                  shadow-sm

                  hover:-translate-y-[3px]

                  transition-[transform,box-shadow,border-color]
                  duration-200

                  ${theme.card}
                  ${theme.border}
                  ${theme.glow}
                `}
              >
                {/* INNER FRAME */}
                <div
                  className={`
                    pointer-events-none
                    absolute
                    inset-[7px]
                    border
                    opacity-70
                    ${theme.frame}
                  `}
                />

                {/* CORNERS */}
                <div className="pointer-events-none absolute left-[7px] top-[7px] w-10 h-10">
                  <span
                    className={`absolute top-0 left-0 w-10 h-px ${theme.line}`}
                  />

                  <span
                    className={`absolute top-0 left-0 w-px h-10 ${theme.line}`}
                  />

                  <span
                    className={`absolute -top-[4px] -left-[4px] w-2.5 h-2.5 border ${theme.deco} bg-white dark:bg-[#101217]`}
                  />

                  <span
                    className={`absolute top-[5px] left-[5px] w-2 h-2 rotate-45 border ${theme.deco}`}
                  />
                </div>

                <div className="pointer-events-none absolute right-[7px] top-[7px] w-10 h-10">
                  <span
                    className={`absolute top-0 right-0 w-10 h-px ${theme.line}`}
                  />

                  <span
                    className={`absolute top-0 right-0 w-px h-10 ${theme.line}`}
                  />

                  <span
                    className={`absolute -top-[4px] -right-[4px] w-2.5 h-2.5 border ${theme.deco} bg-white dark:bg-[#101217]`}
                  />

                  <span
                    className={`absolute top-[5px] right-[5px] w-2 h-2 rotate-45 border ${theme.deco}`}
                  />
                </div>

                <div className="pointer-events-none absolute left-[7px] bottom-[7px] w-10 h-10">
                  <span
                    className={`absolute bottom-0 left-0 w-10 h-px ${theme.line}`}
                  />

                  <span
                    className={`absolute bottom-0 left-0 w-px h-10 ${theme.line}`}
                  />

                  <span
                    className={`absolute -bottom-[4px] -left-[4px] w-2.5 h-2.5 border ${theme.deco} bg-white dark:bg-[#101217]`}
                  />

                  <span
                    className={`absolute bottom-[5px] left-[5px] w-2 h-2 rotate-45 border ${theme.deco}`}
                  />
                </div>

                <div className="pointer-events-none absolute right-[7px] bottom-[7px] w-10 h-10">
                  <span
                    className={`absolute bottom-0 right-0 w-10 h-px ${theme.line}`}
                  />

                  <span
                    className={`absolute bottom-0 right-0 w-px h-10 ${theme.line}`}
                  />

                  <span
                    className={`absolute -bottom-[4px] -right-[4px] w-2.5 h-2.5 border ${theme.deco} bg-white dark:bg-[#101217]`}
                  />

                  <span
                    className={`absolute bottom-[5px] right-[5px] w-2 h-2 rotate-45 border ${theme.deco}`}
                  />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 p-6 flex-1 flex flex-col">

                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">

                      <div
                        className={`
                          w-11 h-11
                          rounded-full
                          ${theme.logo}
                          flex items-center justify-center
                          text-white text-sm font-black
                          shadow-md shrink-0
                          group-hover:scale-105
                          transition-transform duration-200
                        `}
                      >
                        {getDepartmentInitial(group.name)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[18px] font-black text-slate-900 dark:text-white truncate">
                          {group.name}
                        </h3>

                        <p className="mt-1 text-[13px] text-slate-600 dark:text-white/65 line-clamp-2">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                        shrink-0
                        inline-flex items-center gap-1.5
                        px-2.5 py-1
                        rounded-md
                        border border-emerald-200 dark:border-emerald-400/35
                        bg-emerald-50 dark:bg-emerald-400/10
                        text-emerald-700 dark:text-emerald-300
                        text-[11px] font-bold
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />

                      {group.members.length}
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-5 flex items-center gap-2">
                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

                    <span className={`w-2 h-2 rotate-45 border ${theme.deco}`} />

                    <span className={`w-8 h-px ${theme.line}`} />

                    <span className={`w-2 h-2 rotate-45 border ${theme.deco}`} />

                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                  </div>

                  {/* MEMBERS */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3.5">

                      <span className="text-[11px] uppercase tracking-[0.15em] font-black text-slate-400 dark:text-white/40">
                        İştirakçılar
                      </span>

                      <span className="text-xs font-bold text-slate-400 dark:text-white/35">
                        {group.members.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {group.members.map((member) => (
                        <div
                          key={member}
                          className={`
                            group/member
                            flex items-center justify-between gap-3.5
                            px-3.5 py-3
                            rounded-[15px]

                            bg-white/85
                            dark:bg-black/20

                            border
                            border-slate-100
                            dark:border-white/[0.06]

                            ${theme.member}

                            transition-[background-color,border-color]
                            duration-150
                          `}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">

                            <span
                              className={`
                                w-10 h-10
                                rounded-full
                                border
                                flex items-center justify-center
                                text-xs font-black
                                shrink-0

                                group-hover/member:scale-105

                                transition-transform
                                duration-150

                                ${getAvatarTone(member)}
                              `}
                            >
                              {getInitials(member)}
                            </span>

                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-700 dark:text-white/90">
                                {member}
                              </div>

                              <div className="mt-0.5 text-[11px] text-slate-400 dark:text-white/35">
                                İştirakçı
                              </div>
                            </div>
                          </div>

                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHAT */}
                  <div className="mt-5 pt-4">
                    <button
                      onClick={() => onChat(group)}
                      style={{
                        "--dept-rgb": chatColor.rgb,
                        "--dept-light-text": chatColor.lightText,
                        "--dept-dark-text": chatColor.darkText,
                      }}
                      className="
                        dept-chat
                        group/chat
                        relative
                        w-full
                        h-10
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        text-xs
                        font-bold
                        shadow-sm
                        hover:-translate-y-[1px]
                        active:translate-y-0
                        active:scale-[0.99]
                        transition-all
                        duration-200
                      "
                    >
                      <span
                        className="
                          dept-chat-diamond
                          absolute
                          left-[-4px]
                          w-2
                          h-2
                          rotate-45
                          border
                          bg-white
                          dark:bg-[#0c0e12]
                        "
                      />

                      <span
                        className="
                          dept-chat-diamond
                          absolute
                          right-[-4px]
                          w-2
                          h-2
                          rotate-45
                          border
                          bg-white
                          dark:bg-[#0c0e12]
                        "
                      />

                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover/chat:-translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a10.4 10.4 0 01-4.2-.86L3 20l1.28-3.2A7.41 7.41 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>

                      Qrup söhbətinə keç

                      <svg
                        className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover/chat:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>
        {`
          /* CARD ENTER ANIMATION */
          @keyframes groupCardEnter {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.985);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .group-card-enter {
            opacity: 0;

            animation:
              groupCardEnter
              0.75s
              cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
          }

          .dept-chat {
            color: var(--dept-light-text);
            border-color: rgba(var(--dept-rgb), 0.30);
            background: rgba(var(--dept-rgb), 0.07);
          }

          .dept-chat:hover {
            border-color: rgba(var(--dept-rgb), 0.50);
            background: rgba(var(--dept-rgb), 0.13);
            box-shadow: 0 5px 16px rgba(var(--dept-rgb), 0.10);
          }

          .dept-chat-diamond {
            border-color: rgba(var(--dept-rgb), 0.70);
          }

          .dark .dept-chat {
            color: var(--dept-dark-text);
            border-color: rgba(var(--dept-rgb), 0.50);

            background:
              linear-gradient(
                90deg,
                rgba(var(--dept-rgb), 0.24) 0%,
                rgba(var(--dept-rgb), 0.12) 46%,
                rgba(0, 0, 0, 0.44) 100%
              );
          }

          .dark .dept-chat:hover {
            border-color: rgba(var(--dept-rgb), 0.72);

            background:
              linear-gradient(
                90deg,
                rgba(var(--dept-rgb), 0.36) 0%,
                rgba(var(--dept-rgb), 0.18) 48%,
                rgba(0, 0, 0, 0.50) 100%
              );

            box-shadow:
              0 5px 18px rgba(var(--dept-rgb), 0.16);
          }

          .dark .dept-chat-diamond {
            border-color: rgba(var(--dept-rgb), 0.78);
          }

          @media (prefers-reduced-motion: reduce) {
            .group-card-enter {
              opacity: 1;
              animation: none;
            }
          }
        `}
      </style>
    </section>
  );
}