// import Icon from "../common/Icons.jsx";

// export default function GroupsView({ groups, onBulk, onNewUser, onChat }) {
//   return (
//     <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
//       <header className="h-20 px-6 md:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-between shrink-0 z-10">
//         <div>
//           <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
//             Qrup və İstifadəçilər
//           </h1>
//           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
//             Departament və layihə işçi qruplarının idarə edilməsi
//           </p>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <button
//             onClick={onBulk}
//             className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//               />
//             </svg>
//             Qrup halında istifadəçi əlavə et
//           </button>
//           <button
//             onClick={onNewUser}
//             className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
//           >
//             <Icon name="plus" />
//             Yeni İstifadəçi
//           </button>
//         </div>
//       </header>
//       <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {groups.map((group) => (
//             <div
//               key={group.id}
//               className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition"
//             >
//               <div className="flex items-center justify-between">
//                 <div
//                   className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${group.color} flex items-center justify-center text-white font-bold shadow-md`}
//                 >
//                   {group.name.charAt(0)}
//                 </div>
//                 <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200">
//                   {group.members.length} iştirakçı
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-slate-900 dark:text-white">
//                   {group.name}
//                 </h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   {group.description}
//                 </p>
//               </div>
//               <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
//                 <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//                   İştirakçılar
//                 </label>
//                 <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
//                   {group.members.map((member) => (
//                     <div
//                       key={member}
//                       className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
//                     >
//                       <span className="font-medium text-slate-700 dark:text-slate-200">
//                         {member}
//                       </span>
//                       <span className="w-2 h-2 rounded-full bg-emerald-500" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="pt-2 flex items-center gap-2">
//                 <button
//                   onClick={onChat}
//                   className="flex-1 py-2 text-center rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs transition"
//                 >
//                   Qrup Söhbətinə Keç
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import Icon from "../common/Icons.jsx";

export default function GroupsView({
  groups,
  onBulk,
  onNewUser,
  onChat,
}) {
  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden min-w-0">
      {/* HEADER */}
      <header className="shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* TITLE */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 scale-[1.8]" />
              </span>

              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Qrup və İstifadəçilər
              </h1>
            </div>

            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5">
              Departament və layihə işçi qruplarının idarə edilməsi
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={onBulk}
              className="
                group
                px-4
                py-2.5
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                text-xs
                font-bold
                shadow-sm
                shadow-emerald-500/10
                hover:-translate-y-[1px]
                hover:shadow-md
                hover:shadow-emerald-500/20
                active:translate-y-0
                active:scale-[0.98]
                transition-all
                duration-200
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
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

              Qrup halında əlavə et
            </button>

            <button
              onClick={onNewUser}
              className="
                group
                px-4
                py-2.5
                rounded-xl
                bg-white
                dark:bg-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-700
                text-slate-800
                dark:text-white
                border
                border-slate-200
                dark:border-slate-700
                text-xs
                font-bold
                shadow-sm
                hover:-translate-y-[1px]
                hover:shadow-md
                active:translate-y-0
                active:scale-[0.98]
                transition-all
                duration-200
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span className="transition-transform duration-200 group-hover:rotate-90">
                <Icon name="plus" />
              </span>

              Yeni İstifadəçi
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {groups.map((group, index) => (
            <div
              key={group.id}
              style={{
                animation: `groupCardIn 280ms ease-out ${index * 60}ms both`,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-white
                dark:bg-slate-900
                border
                border-slate-200/80
                dark:border-slate-800
                shadow-sm
                hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]
                dark:hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)]
                hover:-translate-y-1
                transition-all
                duration-250
              "
            >
              {/* SOFT TOP ACCENT */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[3px]
                  bg-gradient-to-r
                  from-emerald-400
                  via-emerald-500
                  to-teal-400
                  opacity-70
                  group-hover:opacity-100
                  transition-opacity
                  duration-200
                "
              />

              <div className="p-5 sm:p-6">
                {/* TOP */}
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="
                      relative
                      w-11
                      h-11
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      bg-slate-50
                      dark:bg-slate-800
                      border
                      border-slate-200
                      dark:border-slate-700
                      shadow-sm
                      overflow-hidden
                    "
                  >
                    <div
                      className={`
                        absolute
                        inset-[4px]
                        rounded-xl
                        bg-gradient-to-tr
                        ${group.color}
                        opacity-90
                      `}
                    />

                    <span className="relative z-10 text-white font-black text-sm">
                      {group.name.charAt(0)}
                    </span>
                  </div>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5
                      py-1.5
                      rounded-lg
                      bg-emerald-50
                      dark:bg-emerald-950/35
                      text-emerald-700
                      dark:text-emerald-300
                      border
                      border-emerald-100
                      dark:border-emerald-900
                      text-[11px]
                      font-bold
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {group.members.length} iştirakçı
                  </span>
                </div>

                {/* TITLE */}
                <div className="mt-5">
                  <h3 className="text-[17px] font-black text-slate-900 dark:text-white">
                    {group.name}
                  </h3>

                  <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* MEMBERS */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.12em]">
                      İştirakçılar
                    </label>

                    <span className="text-[10px] font-bold text-slate-400">
                      {group.members.length}
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {group.members.map((member) => (
                      <div
                        key={member}
                        className="
                          group/member
                          flex
                          items-center
                          justify-between
                          gap-3
                          px-3
                          py-2.5
                          rounded-xl
                          bg-slate-50
                          dark:bg-slate-800/60
                          hover:bg-emerald-50/70
                          dark:hover:bg-emerald-950/20
                          border
                          border-transparent
                          hover:border-emerald-100
                          dark:hover:border-emerald-900
                          transition-all
                          duration-200
                        "
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="
                              w-7
                              h-7
                              rounded-lg
                              bg-white
                              dark:bg-slate-700
                              border
                              border-slate-200
                              dark:border-slate-600
                              flex
                              items-center
                              justify-center
                              text-[10px]
                              font-black
                              text-slate-600
                              dark:text-slate-200
                              shrink-0
                              transition
                              group-hover/member:border-emerald-200
                              dark:group-hover/member:border-emerald-800
                            "
                          >
                            {member.charAt(0)}
                          </span>

                          <span className="font-semibold text-[12px] text-slate-700 dark:text-slate-200 truncate">
                            {member}
                          </span>
                        </div>

                        <span
                          className="
                            w-2
                            h-2
                            rounded-full
                            bg-emerald-500
                            shadow-[0_0_0_3px_rgba(16,185,129,0.10)]
                            shrink-0
                          "
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION */}
                <div className="mt-5">
                  <button
                    onClick={onChat}
                    className="
                      group/chat
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-2.5
                      rounded-xl
                      bg-emerald-50
                      hover:bg-emerald-100
                      dark:bg-emerald-950/30
                      dark:hover:bg-emerald-950/50
                      text-emerald-700
                      dark:text-emerald-300
                      border
                      border-emerald-100
                      dark:border-emerald-900
                      font-bold
                      text-xs
                      transition-all
                      duration-200
                    "
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/chat:translate-x-0.5"
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
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes groupCardIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}