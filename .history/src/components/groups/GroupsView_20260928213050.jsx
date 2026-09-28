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



// import Icon from "../common/Icons.jsx";

// const avatarTones = [
//   "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
//   "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
//   "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800",
//   "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
//   "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
//   "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800",
// ];

// function getInitials(name = "") {
//   const parts = name.trim().split(/\s+/).filter(Boolean);

//   if (!parts.length) return "?";

//   if (parts.length === 1) {
//     return parts[0][0].toUpperCase();
//   }

//   return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
// }

// function getDepartmentInitial(name = "") {
//   return name.trim().charAt(0).toUpperCase() || "?";
// }

// function getAvatarTone(name = "") {
//   const sum = [...name].reduce(
//     (total, char) => total + char.charCodeAt(0),
//     0
//   );

//   return avatarTones[sum % avatarTones.length];
// }

// export default function GroupsView({
//   groups,
//   onBulk,
//   onNewUser,
//   onChat,
// }) {
//   return (
//     <section
//       className="
//         flex-1
//         flex
//         flex-col
//         h-full
//         min-w-0
//         overflow-hidden
//         bg-[#f3f7f6]
//         dark:bg-[#0b111d]
//       "
//     >
//       {/* HEADER */}
//       <header
//         className="
//           shrink-0
//           bg-[#f8fbfa]
//           dark:bg-slate-900
//           border-b
//           border-slate-200/80
//           dark:border-slate-800
//         "
//       >
//         <div
//           className="
//             px-4
//             sm:px-6
//             lg:px-8
//             py-4
//             flex
//             flex-col
//             lg:flex-row
//             lg:items-center
//             lg:justify-between
//             gap-4
//           "
//         >
//           {/* TITLE */}
//           <div>
//             <div className="flex items-center gap-3">
//               <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0">
//                 <span className="absolute inset-0 scale-[1.8] rounded-full bg-emerald-400/30" />
//               </span>

//               <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
//                 Qrup və İstifadəçilər
//               </h1>
//             </div>

//             <p className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">
//               Departament və layihə işçi qruplarının idarə edilməsi
//             </p>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex flex-col sm:flex-row gap-2.5">
//             <button
//               onClick={onBulk}
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 gap-2
//                 px-4
//                 py-2.5
//                 rounded-lg
//                 bg-emerald-600
//                 hover:bg-emerald-700
//                 text-white
//                 text-xs
//                 font-bold
//                 shadow-sm
//                 hover:-translate-y-[1px]
//                 active:translate-y-0
//                 transition-[background-color,transform,box-shadow]
//                 duration-200
//               "
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//                 />
//               </svg>

//               Qrupa istifadəçi əlavə et
//             </button>

//             <button
//               onClick={onNewUser}
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 gap-2
//                 px-4
//                 py-2.5
//                 rounded-lg
//                 bg-slate-800
//                 hover:bg-slate-900
//                 dark:bg-slate-700
//                 dark:hover:bg-slate-600
//                 text-white
//                 text-xs
//                 font-bold
//                 shadow-sm
//                 hover:-translate-y-[1px]
//                 active:translate-y-0
//                 transition-[background-color,transform,box-shadow]
//                 duration-200
//               "
//             >
//               <Icon name="plus" />
//               Yeni istifadəçi
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* CONTENT */}
//       <div
//         className="
//           flex-1
//           overflow-y-auto
//           p-4
//           sm:p-5
//           lg:p-6
//           bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.055),transparent_30%),linear-gradient(to_bottom,#f3f7f6,#edf3f1)]
//           dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.055),transparent_30%)]
//         "
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {groups.map((group) => (
//             <article
//               key={group.id}
//               className="
//                 group
//                 relative
//                 min-w-0
//                 flex
//                 flex-col
//                 bg-[#fbfdfc]
//                 dark:bg-[#111827]
//                 border
//                 border-emerald-100/70
//                 dark:border-slate-700
//                 shadow-sm
//                 hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]
//                 dark:hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)]
//                 hover:-translate-y-[2px]
//                 transition-[transform,box-shadow,border-color]
//                 duration-200
//               "
//             >
//               {/* SOFT TOP TINT */}
//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-x-0
//                   top-0
//                   h-28
//                   bg-gradient-to-b
//                   from-emerald-50/70
//                   via-emerald-50/20
//                   to-transparent
//                   dark:from-emerald-950/10
//                 "
//               />

//               {/* INNER FRAME */}
//               <div className="pointer-events-none absolute inset-[7px] border border-emerald-200/60 dark:border-slate-600/70" />

//               {/* TOP LEFT */}
//               <div className="pointer-events-none absolute left-[7px] top-[7px] w-10 h-10">
//                 <span className="absolute top-0 left-0 w-10 h-px bg-emerald-400" />
//                 <span className="absolute top-0 left-0 w-px h-10 bg-emerald-400" />

//                 <span className="absolute -top-[4px] -left-[4px] w-2.5 h-2.5 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />

//                 <span className="absolute top-[5px] left-[5px] w-2 h-2 rotate-45 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />
//               </div>

//               {/* TOP RIGHT */}
//               <div className="pointer-events-none absolute right-[7px] top-[7px] w-10 h-10">
//                 <span className="absolute top-0 right-0 w-10 h-px bg-emerald-400" />
//                 <span className="absolute top-0 right-0 w-px h-10 bg-emerald-400" />

//                 <span className="absolute -top-[4px] -right-[4px] w-2.5 h-2.5 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />

//                 <span className="absolute top-[5px] right-[5px] w-2 h-2 rotate-45 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />
//               </div>

//               {/* BOTTOM LEFT */}
//               <div className="pointer-events-none absolute left-[7px] bottom-[7px] w-10 h-10">
//                 <span className="absolute bottom-0 left-0 w-10 h-px bg-emerald-400" />
//                 <span className="absolute bottom-0 left-0 w-px h-10 bg-emerald-400" />

//                 <span className="absolute -bottom-[4px] -left-[4px] w-2.5 h-2.5 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />

//                 <span className="absolute bottom-[5px] left-[5px] w-2 h-2 rotate-45 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />
//               </div>

//               {/* BOTTOM RIGHT */}
//               <div className="pointer-events-none absolute right-[7px] bottom-[7px] w-10 h-10">
//                 <span className="absolute bottom-0 right-0 w-10 h-px bg-emerald-400" />
//                 <span className="absolute bottom-0 right-0 w-px h-10 bg-emerald-400" />

//                 <span className="absolute -bottom-[4px] -right-[4px] w-2.5 h-2.5 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />

//                 <span className="absolute bottom-[5px] right-[5px] w-2 h-2 rotate-45 border border-emerald-400 bg-[#fbfdfc] dark:bg-[#111827]" />
//               </div>

//               {/* CARD CONTENT */}
//               <div className="relative z-10 p-6 flex-1 flex flex-col">
//                 {/* TOP */}
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div
//                       className={`
//                         w-11
//                         h-11
//                         rounded-full
//                         bg-gradient-to-tr
//                         ${group.color}
//                         flex
//                         items-center
//                         justify-center
//                         text-white
//                         text-sm
//                         font-black
//                         shadow-sm
//                         shrink-0
//                         group-hover:scale-105
//                         transition-transform
//                         duration-200
//                       `}
//                     >
//                       {getDepartmentInitial(group.name)}
//                     </div>

//                     <div className="min-w-0">
//                       <h3 className="text-[18px] font-black text-slate-900 dark:text-white truncate">
//                         {group.name}
//                       </h3>

//                       <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2">
//                         {group.description}
//                       </p>
//                     </div>
//                   </div>

//                   <span
//                     className="
//                       shrink-0
//                       inline-flex
//                       items-center
//                       gap-1.5
//                       px-2.5
//                       py-1
//                       border
//                       border-emerald-200
//                       dark:border-emerald-800
//                       bg-emerald-50/80
//                       dark:bg-emerald-950/30
//                       text-emerald-700
//                       dark:text-emerald-300
//                       text-[11px]
//                       font-bold
//                     "
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
//                     {group.members.length}
//                   </span>
//                 </div>

//                 {/* DECO DIVIDER */}
//                 <div className="my-5 flex items-center gap-2">
//                   <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />

//                   <span className="w-2 h-2 rotate-45 border border-emerald-400" />

//                   <span className="w-8 h-px bg-emerald-400" />

//                   <span className="w-2 h-2 rotate-45 border border-emerald-400" />

//                   <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />
//                 </div>

//                 {/* MEMBERS */}
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-[10px] uppercase tracking-[0.16em] font-black text-slate-400">
//                       İştirakçılar
//                     </span>

//                     <span className="text-[11px] font-bold text-slate-400">
//                       {group.members.length}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     {group.members.map((member) => (
//                       <div
//                         key={member}
//                         className="
//                           group/member
//                           flex
//                           items-center
//                           justify-between
//                           gap-3
//                           px-3
//                           py-2.5
//                           bg-slate-50/90
//                           dark:bg-slate-800/60
//                           border
//                           border-slate-100
//                           dark:border-slate-700/60
//                           hover:bg-emerald-50
//                           dark:hover:bg-emerald-950/15
//                           hover:border-emerald-200
//                           dark:hover:border-emerald-800
//                           transition-[background-color,border-color]
//                           duration-150
//                         "
//                       >
//                         <div className="flex items-center gap-3 min-w-0">
//                           <span
//                             className={`
//                               w-9
//                               h-9
//                               rounded-full
//                               border
//                               flex
//                               items-center
//                               justify-center
//                               text-[11px]
//                               font-black
//                               shrink-0
//                               group-hover/member:scale-105
//                               transition-transform
//                               duration-150
//                               ${getAvatarTone(member)}
//                             `}
//                           >
//                             {getInitials(member)}
//                           </span>

//                           <div className="min-w-0">
//                             <div className="truncate text-[13px] font-semibold text-slate-700 dark:text-slate-200">
//                               {member}
//                             </div>

//                             <div className="text-[10px] text-slate-400 dark:text-slate-500">
//                               İştirakçı
//                             </div>
//                           </div>
//                         </div>

//                         <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* CHAT */}
//                 <div className="mt-5 pt-4">
//                   <button
//                     onClick={onChat}
//                     className="
//                       group/chat
//                       relative
//                       w-full
//                       h-10
//                       flex
//                       items-center
//                       justify-center
//                       gap-2
//                       text-xs
//                       font-bold
//                       text-emerald-700
//                       dark:text-emerald-300
//                       border-y
//                       border-emerald-300
//                       dark:border-emerald-700
//                       bg-emerald-50/35
//                       hover:bg-emerald-100/70
//                       dark:bg-emerald-950/10
//                       dark:hover:bg-emerald-950/25
//                       transition-colors
//                       duration-150
//                     "
//                   >
//                     <span
//                       className="
//                         absolute
//                         left-[-5px]
//                         w-2.5
//                         h-2.5
//                         rotate-45
//                         border
//                         border-emerald-400
//                         bg-[#fbfdfc]
//                         dark:bg-[#111827]
//                       "
//                     />

//                     <span
//                       className="
//                         absolute
//                         right-[-5px]
//                         w-2.5
//                         h-2.5
//                         rotate-45
//                         border
//                         border-emerald-400
//                         bg-[#fbfdfc]
//                         dark:bg-[#111827]
//                       "
//                     />

//                     <svg
//                       className="w-4 h-4"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a10.4 10.4 0 01-4.2-.86L3 20l1.28-3.2A7.41 7.41 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>

//                     Qrup söhbətinə keç

//                     <svg
//                       className="
//                         w-3.5
//                         h-3.5
//                         transition-transform
//                         duration-150
//                         group-hover/chat:translate-x-1
//                       "
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


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

function getDepartmentTheme(color = "") {
  const value = color.toLowerCase();

  // VIOLET
  if (value.includes("violet") || value.includes("purple")) {
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

      action: `
        text-violet-700
        border-violet-200
        bg-violet-50/80
        hover:bg-violet-100

        dark:text-violet-200
        dark:border-violet-400/45
        dark:bg-[linear-gradient(90deg,rgba(124,58,237,0.18),rgba(0,0,0,0.32))]
        dark:hover:bg-[linear-gradient(90deg,rgba(124,58,237,0.29),rgba(0,0,0,0.38))]
      `,
    };
  }

  // BLUE
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

      action: `
        text-sky-700
        border-sky-200
        bg-sky-50/80
        hover:bg-sky-100

        dark:text-sky-200
        dark:border-sky-400/45
        dark:bg-[linear-gradient(90deg,rgba(14,165,233,0.18),rgba(0,0,0,0.32))]
        dark:hover:bg-[linear-gradient(90deg,rgba(14,165,233,0.29),rgba(0,0,0,0.38))]
      `,
    };
  }

  // EMERALD
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

      action: `
        text-emerald-700
        border-emerald-200
        bg-emerald-50/80
        hover:bg-emerald-100

        dark:text-emerald-200
        dark:border-emerald-400/45
        dark:bg-[linear-gradient(90deg,rgba(16,185,129,0.18),rgba(0,0,0,0.32))]
        dark:hover:bg-[linear-gradient(90deg,rgba(16,185,129,0.29),rgba(0,0,0,0.38))]
      `,
    };
  }

  // ORANGE
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

      action: `
        text-orange-700
        border-orange-200
        bg-orange-50/80
        hover:bg-orange-100

        dark:text-orange-200
        dark:border-orange-400/45
        dark:bg-[linear-gradient(90deg,rgba(249,115,22,0.18),rgba(0,0,0,0.32))]
        dark:hover:bg-[linear-gradient(90deg,rgba(249,115,22,0.29),rgba(0,0,0,0.38))]
      `,
    };
  }

  // DEFAULT
  return {
    card: `
      bg-white
      dark:bg-[linear-gradient(145deg,#1e293b,#0c0e12)]
    `,

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

    action: `
      text-slate-700
      border-slate-200
      bg-slate-50
      hover:bg-slate-100

      dark:text-slate-200
      dark:border-slate-500/50
      dark:bg-[linear-gradient(90deg,rgba(100,116,139,0.18),rgba(0,0,0,0.32))]
    `,
  };
}

export default function GroupsView({
  groups,
  onBulk,
  onNewUser,
  onChat,
}) {
  return (
    <section
      className="
        flex-1
        flex
        flex-col
        h-full
        min-w-0
        overflow-hidden
        bg-[#f4f7f7]
        dark:bg-[#050811]
      "
    >
      {/* HEADER */}
      <header
        className="
          shrink-0
          bg-white/95
          dark:bg-[#0c111b]
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div
          className="
            px-4
            sm:px-6
            lg:px-8
            py-4

            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
          "
        >
          {/* TITLE */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="
                  relative
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-emerald-500
                  shrink-0
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-emerald-400/30
                    scale-[1.8]
                  "
                />
              </span>

              <h1
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                Qrup və İstifadəçilər
              </h1>
            </div>

            <p
              className="
                mt-1.5
                text-[13px]
                text-slate-500
                dark:text-slate-400
              "
            >
              Departament və layihə işçi qruplarının idarə edilməsi
            </p>
          </div>

          {/* HEADER ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* ADD USER TO GROUP */}
            <button
              onClick={onBulk}
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                px-4
                py-2.5

                rounded-xl

                bg-emerald-600
                hover:bg-emerald-700

                dark:bg-emerald-500
                dark:hover:bg-emerald-400

                text-white

                border
                border-emerald-500
                dark:border-emerald-400

                text-xs
                font-bold

                shadow-sm
                shadow-emerald-500/20

                hover:shadow-md
                hover:shadow-emerald-500/25
                hover:-translate-y-[1px]

                active:translate-y-0
                active:scale-[0.98]

                transition-all
                duration-200
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

            {/* NEW USER */}
            <button
              onClick={onNewUser}
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                px-4
                py-2.5

                rounded-xl

                bg-teal-600
                hover:bg-teal-700

                dark:bg-teal-500
                dark:hover:bg-teal-400

                text-white

                border
                border-teal-500
                dark:border-teal-400

                text-xs
                font-bold

                shadow-sm
                shadow-teal-500/15

                hover:shadow-md
                hover:shadow-teal-500/20
                hover:-translate-y-[1px]

                active:translate-y-0
                active:scale-[0.98]

                transition-all
                duration-200
              "
            >
              <Icon name="plus" />

              Yeni istifadəçi
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div
        className="
          flex-1
          overflow-y-auto

          p-4
          sm:p-5
          lg:p-6

          bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.035),transparent_28%)]

          dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.04),transparent_30%)]
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {groups.map((group) => {
            const theme = getDepartmentTheme(group.color);

            return (
              <article
                key={group.id}
                className={`
                  group
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
                {/* INNER ART DECO FRAME */}
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

                {/* TOP LEFT */}
                <div className="pointer-events-none absolute left-[7px] top-[7px] w-10 h-10">
                  <span
                    className={`
                      absolute
                      top-0
                      left-0
                      w-10
                      h-px
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      top-0
                      left-0
                      w-px
                      h-10
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      -top-[4px]
                      -left-[4px]
                      w-2.5
                      h-2.5

                      border
                      ${theme.deco}

                      bg-white
                      dark:bg-[#101217]
                    `}
                  />

                  <span
                    className={`
                      absolute
                      top-[5px]
                      left-[5px]

                      w-2
                      h-2

                      rotate-45

                      border
                      ${theme.deco}
                    `}
                  />
                </div>

                {/* TOP RIGHT */}
                <div className="pointer-events-none absolute right-[7px] top-[7px] w-10 h-10">
                  <span
                    className={`
                      absolute
                      top-0
                      right-0
                      w-10
                      h-px
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      top-0
                      right-0
                      w-px
                      h-10
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      -top-[4px]
                      -right-[4px]
                      w-2.5
                      h-2.5

                      border
                      ${theme.deco}

                      bg-white
                      dark:bg-[#101217]
                    `}
                  />

                  <span
                    className={`
                      absolute
                      top-[5px]
                      right-[5px]

                      w-2
                      h-2

                      rotate-45

                      border
                      ${theme.deco}
                    `}
                  />
                </div>

                {/* BOTTOM LEFT */}
                <div className="pointer-events-none absolute left-[7px] bottom-[7px] w-10 h-10">
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      w-10
                      h-px
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      w-px
                      h-10
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      -bottom-[4px]
                      -left-[4px]

                      w-2.5
                      h-2.5

                      border
                      ${theme.deco}

                      bg-white
                      dark:bg-[#101217]
                    `}
                  />

                  <span
                    className={`
                      absolute
                      bottom-[5px]
                      left-[5px]

                      w-2
                      h-2

                      rotate-45

                      border
                      ${theme.deco}
                    `}
                  />
                </div>

                {/* BOTTOM RIGHT */}
                <div className="pointer-events-none absolute right-[7px] bottom-[7px] w-10 h-10">
                  <span
                    className={`
                      absolute
                      bottom-0
                      right-0
                      w-10
                      h-px
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      bottom-0
                      right-0
                      w-px
                      h-10
                      ${theme.line}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      -bottom-[4px]
                      -right-[4px]

                      w-2.5
                      h-2.5

                      border
                      ${theme.deco}

                      bg-white
                      dark:bg-[#101217]
                    `}
                  />

                  <span
                    className={`
                      absolute
                      bottom-[5px]
                      right-[5px]

                      w-2
                      h-2

                      rotate-45

                      border
                      ${theme.deco}
                    `}
                  />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 p-6 flex-1 flex flex-col">
                  {/* CARD HEADER */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* DEPARTMENT */}
                      <div
                        className={`
                          w-11
                          h-11

                          rounded-full

                          ${theme.logo}

                          flex
                          items-center
                          justify-center

                          text-white
                          text-sm
                          font-black

                          shadow-md

                          shrink-0

                          group-hover:scale-105

                          transition-transform
                          duration-200
                        `}
                      >
                        {getDepartmentInitial(group.name)}
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="
                            text-[18px]
                            font-black
                            text-slate-900
                            dark:text-white
                            truncate
                          "
                        >
                          {group.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[13px]
                            text-slate-600
                            dark:text-white/65
                            line-clamp-2
                          "
                        >
                          {group.description}
                        </p>
                      </div>
                    </div>

                    {/* COUNT */}
                    <span
                      className="
                        shrink-0

                        inline-flex
                        items-center
                        gap-1.5

                        px-2.5
                        py-1

                        rounded-md

                        border
                        border-emerald-200
                        dark:border-emerald-400/35

                        bg-emerald-50
                        dark:bg-emerald-400/10

                        text-emerald-700
                        dark:text-emerald-300

                        text-[11px]
                        font-bold
                      "
                    >
                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-emerald-500
                          dark:bg-emerald-400
                        "
                      />

                      {group.members.length}
                    </span>
                  </div>

                  {/* ART DECO DIVIDER */}
                  <div className="my-5 flex items-center gap-2">
                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

                    <span
                      className={`
                        w-2
                        h-2
                        rotate-45
                        border
                        ${theme.deco}
                      `}
                    />

                    <span
                      className={`
                        w-8
                        h-px
                        ${theme.line}
                      `}
                    />

                    <span
                      className={`
                        w-2
                        h-2
                        rotate-45
                        border
                        ${theme.deco}
                      `}
                    />

                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                  </div>

                  {/* MEMBERS */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.16em]
                          font-black

                          text-slate-400
                          dark:text-white/40
                        "
                      >
                        İştirakçılar
                      </span>

                      <span
                        className="
                          text-[11px]
                          font-bold

                          text-slate-400
                          dark:text-white/35
                        "
                      >
                        {group.members.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.members.map((member) => (
                        <div
                          key={member}
                          className={`
                            group/member

                            flex
                            items-center
                            justify-between
                            gap-3

                            px-3
                            py-2.5

                            rounded-[14px]

                            bg-white/80
                            dark:bg-black/20

                            border
                            border-slate-100
                            dark:border-white/[0.06]

                            ${theme.member}

                            transition-[background-color,border-color]
                            duration-150
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* AVATAR */}
                            <span
                              className={`
                                w-9
                                h-9

                                rounded-full

                                border

                                flex
                                items-center
                                justify-center

                                text-[11px]
                                font-black

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
                              <div
                                className="
                                  truncate

                                  text-[13px]
                                  font-semibold

                                  text-slate-700
                                  dark:text-white/85
                                "
                              >
                                {member}
                              </div>

                              <div
                                className="
                                  text-[10px]
                                  text-slate-400
                                  dark:text-white/30
                                "
                              >
                                İştirakçı
                              </div>
                            </div>
                          </div>

                          {/* STATUS */}
                          <span
                            className="
                              w-2
                              h-2
                              rounded-full

                              bg-emerald-500
                              dark:bg-emerald-400

                              shrink-0
                            "
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GROUP CHAT */}
                  <div className="mt-5 pt-4">
                    <button
                      onClick={() => onChat(group)}
                      className={`
                        group/chat
                        relative

                        w-full
                        h-10

                        flex
                        items-center
                        justify-center
                        gap-2

                        rounded-md

                        border-y

                        text-xs
                        font-bold

                        shadow-sm

                        hover:-translate-y-[1px]

                        active:translate-y-0
                        active:scale-[0.99]

                        transition-all
                        duration-200

                        ${theme.action}
                      `}
                    >
                      {/* LEFT DIAMOND */}
                      <span
                        className={`
                          absolute
                          left-[-5px]

                          w-2.5
                          h-2.5

                          rotate-45

                          border
                          ${theme.deco}

                          bg-white
                          dark:bg-[#0c0e12]
                        `}
                      />

                      {/* RIGHT DIAMOND */}
                      <span
                        className={`
                          absolute
                          right-[-5px]

                          w-2.5
                          h-2.5

                          rotate-45

                          border
                          ${theme.deco}

                          bg-white
                          dark:bg-[#0c0e12]
                        `}
                      />

                      {/* CHAT ICON */}
                      <svg
                        className="
                          w-4
                          h-4

                          transition-transform
                          duration-200

                          group-hover/chat:-translate-x-0.5
                        "
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

                      {/* ARROW */}
                      <svg
                        className="
                          w-3.5
                          h-3.5

                          opacity-60

                          transition-transform
                          duration-200

                          group-hover/chat:translate-x-1
                        "
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
    </section>
  );
}