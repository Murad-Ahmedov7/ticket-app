// import Icon from './common/Icons.jsx';

// const navigation = [
//   ['chat', 'Söhbətlər (Chat)'], ['tasks', 'Tapşırıqlar və Təqvim'],
//   ['operator', 'Operator Təsdiqi'], ['groups', 'Qrup və İstifadəçilər'],
//   ['companies', 'Şirkətlər Siyahısı'], ['users', 'İstifadəçilər Reyestri'],
//   ['employees', 'İşçilər və Öhdəliklər'],
// ];

// export default function Sidebar({ activeView, onNavigate, taskCount, pendingCount, dark, onToggleTheme, notify }) {
//   // return (
//   //   <aside className="w-16 md:w-20 bg-gradient-to-b from-brand-700 via-brand-600 to-brand-900 flex flex-col items-center py-4 justify-between shadow-2xl z-30 shrink-0 select-none">
//   //     <div className="flex flex-col items-center gap-4 w-full">
//   //       <button className="relative group cursor-pointer" onClick={() => { onNavigate('chat'); notify('Halal Əsas İdarəetmə Paneli'); }} title="Halal">
//   //         <span className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"><Icon name="home" className="w-6 h-6" strokeWidth={2.3} /></span>
//   //       </button>
//   //       <div className="relative group cursor-pointer" onClick={() => notify('Profil: Emil Xanciqazov')} title="Emil Xanciqazov">
//   //         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 to-orange-400 border-2 border-white/80 flex items-center justify-center text-brand-900 font-extrabold text-xs shadow-lg">EX</div>
//   //         <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-700" />
//   //       </div>
//   //       <nav className="flex flex-col items-center gap-2 w-full px-2 mt-1">
//   //         {navigation.map(([view, label]) => <button key={view} id={`nav-btn-${view}`} onClick={() => onNavigate(view)} title={label} className={`relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${activeView === view ? 'bg-white/25 text-white shadow-inner' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
//   //           <Icon name={view} className="w-5 h-5" strokeWidth={view === 'chat' ? 2.2 : 2} />
//   //           {view === 'chat' && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-700" />}
//   //           {view === 'tasks' && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{taskCount}</span>}
//   //           {view === 'operator' && pendingCount > 0 && <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-emerald-400 text-slate-900 text-[10px] font-black rounded-full shadow-sm">{pendingCount}</span>}
//   //         </button>)}
//   //       </nav>
//   //     </div>
//   //     <div className="flex flex-col items-center gap-2.5 w-full px-2">
//   //       <button onClick={onToggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition" title="Gecə / Gündüz Rejimi"><Icon name={dark ? 'sun' : 'moon'} className={`w-5 h-5 ${dark ? 'text-amber-300' : 'text-white'}`} /></button>
//   //       <button onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')} className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-300 hover:text-rose-100 hover:bg-rose-500/25 transition" title="Çıxış"><Icon name="logout" className="w-5 h-5" /></button>
//   //     </div>
//   //   </aside>
//   // );


// return (
//   <aside className="w-16 md:w-20 bg-gradient-to-b from-[#0c2f35] via-[#092328] to-[#051518] border-r border-teal-500/10 flex flex-col items-center py-5 justify-between shadow-2xl z-30 shrink-0 select-none">
//     {/* Yuxarı Hissə: Home, Profil və Əsas Naviqasiya */}
//     <div className="flex flex-col items-center w-full gap-4">
      
//       {/* Əsas İdarəetmə Paneli / Home Düyməsi -> Çatı açır */}
//       <button
//         onClick={() => { 
//           onNavigate('chat'); 
//           notify('Halal Əsas İdarəetmə Paneli'); 
//         }}
//         title="Halal Əsas İdarəetmə Paneli"
//         className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${
//           activeView === 'chat'
//             ? 'bg-teal-500/30 border border-teal-400 text-white shadow-[0_0_12px_rgba(45,212,191,0.35)]'
//             : 'bg-teal-500/15 border border-teal-400/30 text-teal-300 hover:bg-teal-500/25 hover:text-white'
//         }`}
//       >
//         <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
//       </button>

//       {/* Profil Avatarı */}
//       <div 
//         className="relative group cursor-pointer p-0.5 rounded-full ring-2 ring-teal-400/30 hover:ring-teal-400/80 transition-all duration-300"
//         onClick={() => notify('Profil: Emil Xanciqazov')} 
//         title="Emil Xanciqazov"
//       >
//         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-[#00A896] flex items-center justify-center text-[#051518] font-black text-xs shadow-md">
//           EX
//         </div>
//         <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#092328]" />
//       </div>

//       <div className="w-8 h-[1px] bg-white/10 my-0.5" />

//       {/* Əsas Menyu Düymələri */}
//       <nav className="flex flex-col items-center gap-2 w-full px-2">
//         {navigation.map(([view, label]) => {
//           const isActive = activeView === view;
//           return (
//             <button
//               key={view}
//               id={`nav-btn-${view}`}
//               onClick={() => onNavigate(view)}
//               title={label}
//               className={`relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 group ${
//                 isActive
//                   ? 'bg-teal-500/20 text-teal-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
//                   : 'text-slate-400 hover:text-teal-200 hover:bg-white/5'
//               }`}
//             >
//               {/* Aktiv element üçün sol göstərici */}
//               {isActive && (
//                 <span className="absolute -left-2 w-1 h-5 bg-teal-400 rounded-r-full shadow-[0_0_8px_#2dd4bf]" />
//               )}

//               <Icon
//                 name={view}
//                 className="w-5 h-5 transition-transform group-hover:scale-110"
//                 strokeWidth={isActive ? 2.3 : 1.8}
//               />

//               {view === 'chat' && (
//                 <span className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_6px_#2dd4bf]" />
//               )}
//               {view === 'tasks' && taskCount > 0 && (
//                 <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                   {taskCount}
//                 </span>
//               )}
//               {view === 'operator' && pendingCount > 0 && (
//                 <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-teal-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                   {pendingCount}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </nav>
//     </div>

//     {/* Aşağı Hissə: Mövzu və Çıxış */}
//     <div className="flex flex-col items-center gap-2 w-full px-2">
//       <div className="w-8 h-[1px] bg-white/10 mb-1" />

//       <button
//         onClick={onToggleTheme}
//         className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
//         title="Gecə / Gündüz Rejimi"
//       >
//         <Icon
//           name={dark ? 'sun' : 'moon'}
//           className={`w-5 h-5 transition-transform hover:rotate-12 ${dark ? 'text-amber-300' : 'text-slate-300'}`}
//         />
//       </button>

//       <button
//         onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
//         className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
//         title="Çıxış"
//       >
//         <Icon name="logout" className="w-5 h-5" />
//       </button>
//     </div>
//   </aside>
// );
// }


// import { useState } from 'react';
// import Icon from './common/Icons.jsx';

// const navigation = [
//   ['chat', 'Söhbətlər (Chat)'],
//   ['tasks', 'Tapşırıqlar və Təqvim'],
//   ['operator', 'Operator Təsdiqi'],
//   ['groups', 'Qrup və İstifadəçilər'],
//   ['companies', 'Şirkətlər Siyahısı'],
//   ['users', 'İstifadəçilər Reyestri'],
//   ['employees', 'İşçilər və Öhdəliklər'],
// ];

// export default function Sidebar({
//   activeView,
//   onNavigate,
//   taskCount,
//   pendingCount,
//   dark,
//   onToggleTheme,
//   notify,
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <aside
//       className={`relative bg-gradient-to-b from-[#0c2f35] via-[#092328] to-[#051518] border-r border-teal-500/10 flex flex-col justify-between py-4 shadow-2xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
//         isExpanded ? 'w-64 px-4' : 'w-16 md:w-20 px-2'
//       }`}
//     >
//       {/* YUXARI HİSSƏ */}
//       <div className="flex flex-col items-center w-full gap-3.5">
        
//         {/* ƏN ÜST BÖLMƏ: Hamburger (Yığılanda) və ya Menyu + X (Açılanda) */}
//         <div
//           className={`w-full flex items-center h-10 transition-all ${
//             isExpanded ? 'justify-between px-1' : 'justify-center'
//           }`}
//         >
//           {isExpanded && (
//             <div className="flex items-center gap-2 overflow-hidden">
//               <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
//               <span className="text-xs font-black text-white tracking-widest uppercase">
//                 Menyu
//               </span>
//             </div>
//           )}

//           {/* Menyu Açma / Bağlama Düyməsi (Sağ paneli örtmür, sidebar daxilindədir) */}
//           <button
//             onClick={() => setIsExpanded((prev) => !prev)}
//             title={isExpanded ? 'Menyunu Yığ' : 'Menyunu Genişləndir'}
//             className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-teal-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
//           >
//             {isExpanded ? (
//               /* Kapatma İkonu (X) */
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               /* Hamburger İkonu (3 Çizgi - Gömrük tərzi) */
//               <div className="flex flex-col items-center justify-center gap-1">
//                 <span className="w-4 h-0.5 bg-current rounded-full" />
//                 <span className="w-4 h-0.5 bg-current rounded-full" />
//                 <span className="w-4 h-0.5 bg-current rounded-full" />
//               </div>
//             )}
//           </button>
//         </div>

//         {/* Home / Əsas İdarəetmə Paneli Düyməsi */}
//         <button
//           onClick={() => {
//             onNavigate('chat');
//             notify('Halal Portal');
//           }}
//           title="Halal Əsas İdarəetmə Paneli"
//           className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
//             activeView === 'chat'
//               ? 'bg-teal-500/25 border border-teal-400 text-white shadow-[0_0_12px_rgba(45,212,191,0.25)]'
//               : 'bg-teal-500/10 border border-teal-400/25 text-teal-300 hover:bg-teal-500/20 hover:text-white'
//           } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
//         >
//           <div className="w-8 h-8 flex items-center justify-center shrink-0">
//             <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
//           </div>
//           {isExpanded && (
//             <div className="flex flex-col text-left overflow-hidden transition-opacity duration-300">
//               <span className="font-extrabold tracking-wide text-sm text-white leading-tight">
//                 HALAL
//               </span>
//               <span className="text-[10px] text-teal-300/80 uppercase font-semibold tracking-wider whitespace-nowrap">
//                 Technologies
//               </span>
//             </div>
//           )}
//         </button>

//         {/* Profil Kartı (Yazıları böyüdülmüş) */}
//         <div
//           onClick={() => notify('Profil: Emil Xanciqazov')}
//           title="Emil Xanciqazov"
//           className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200 ${
//             isExpanded ? 'justify-start px-2' : 'justify-center'
//           }`}
//         >
//           <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-teal-400/30 group-hover:ring-teal-400/80 transition-all">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-[#00A896] flex items-center justify-center text-[#051518] font-black text-sm shadow-md">
//               EX
//             </div>
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#092328]" />
//           </div>
//           {isExpanded && (
//             <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
//               <span className="text-sm font-bold text-white tracking-wide truncate">
//                 Emil Xanciqazov
//               </span>
//               <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                 Çevrimiçi
//               </span>
//             </div>
//           )}
//         </div>

//         <div className="w-full h-[1px] bg-white/10 my-0.5" />

//         {/* Əsas Menyu Düymələri */}
//         <nav className="flex flex-col gap-1.5 w-full">
//           {navigation.map(([view, label]) => {
//             const isActive = activeView === view;
//             return (
//               <button
//                 key={view}
//                 id={`nav-btn-${view}`}
//                 onClick={() => onNavigate(view)}
//                 title={!isExpanded ? label : undefined}
//                 className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
//                   isActive
//                     ? 'bg-teal-500/20 text-teal-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
//                     : 'text-slate-400 hover:text-teal-200 hover:bg-white/5'
//                 } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
//               >
//                 {/* Aktiv element sol zolağı */}
//                 {isActive && (
//                   <span className="absolute left-0 w-1 h-5 bg-teal-400 rounded-r-full shadow-[0_0_8px_#2dd4bf]" />
//                 )}

//                 <div className="relative shrink-0 flex items-center justify-center">
//                   <Icon
//                     name={view}
//                     className="w-5 h-5 transition-transform group-hover:scale-110"
//                     strokeWidth={isActive ? 2.3 : 1.8}
//                   />

//                   {/* Yığılmış vəziyyətdə bildirişlər */}
//                   {!isExpanded && view === 'chat' && (
//                     <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_6px_#2dd4bf]" />
//                   )}
//                   {!isExpanded && view === 'tasks' && taskCount > 0 && (
//                     <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                       {taskCount}
//                     </span>
//                   )}
//                   {!isExpanded && view === 'operator' && pendingCount > 0 && (
//                     <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-teal-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                       {pendingCount}
//                     </span>
//                   )}
//                 </div>

//                 {/* Genişlənmiş rejimdə etiketlər */}
//                 {isExpanded && (
//                   <div className="flex items-center justify-between w-full ml-3 overflow-hidden">
//                     <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide">
//                       {label}
//                     </span>
//                     {view === 'tasks' && taskCount > 0 && (
//                       <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
//                         {taskCount}
//                       </span>
//                     )}
//                     {view === 'operator' && pendingCount > 0 && (
//                       <span className="ml-2 px-1.5 py-0.5 bg-teal-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
//                         {pendingCount}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* AŞAĞI HİSSƏ */}
//       <div className="flex flex-col gap-2 w-full">
//         <div className="w-full h-[1px] bg-white/10 mb-1" />

//         <button
//           onClick={onToggleTheme}
//           title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
//           className={`w-full h-10 rounded-xl flex items-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${
//             isExpanded ? 'justify-start px-3' : 'justify-center'
//           }`}
//         >
//           <Icon
//             name={dark ? 'sun' : 'moon'}
//             className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
//               dark ? 'text-amber-300' : 'text-slate-300'
//             }`}
//           />
//           {isExpanded && (
//             <span className="text-xs font-medium ml-3 whitespace-nowrap">
//               {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
//             </span>
//           )}
//         </button>

//         <button
//           onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
//           title={!isExpanded ? 'Çıxış' : undefined}
//           className={`w-full h-10 rounded-xl flex items-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer ${
//             isExpanded ? 'justify-start px-3' : 'justify-center'
//           }`}
//         >
//           <Icon name="logout" className="w-5 h-5 shrink-0" />
//           {isExpanded && (
//             <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-300">
//               Çıxış
//             </span>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }



// import { useState } from 'react';
// import Icon from './common/Icons.jsx';

// const navigation = [
//   ['tasks', 'Tapşırıqlar və Təqvim'],
//   ['operator', 'Operator Təsdiqi'],
//   ['groups', 'Qrup və İstifadəçilər'],
//   ['companies', 'Şirkətlər Siyahısı'],
//   ['users', 'İstifadəçilər Reyestri'],
//   ['employees', 'İşçilər və Öhdəliklər'],
// ];

// export default function Sidebar({
//   activeView,
//   onNavigate,
//   taskCount,
//   pendingCount,
//   dark,
//   onToggleTheme,
//   notify,
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);

// return (
//     <aside
//       className={`bg-gradient-to-b from-[#11454e] via-[#0d363d] to-[#083038] border-r border-teal-400/20 flex flex-col justify-between py-4 shadow-2xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
//         isExpanded ? 'w-72 px-3.5' : 'w-16 md:w-20 px-2'
//       }`}
//     >
//       {/* YUXARI HİSSƏ */}
//       <div className="flex flex-col items-center w-full gap-3">
        
//         {/* 1. SIRA: Hamburger / Bağlama (X) Düyməsi */}
//         <div
//           className={`w-full flex items-center h-10 transition-all ${
//             isExpanded ? 'justify-end px-1' : 'justify-center'
//           }`}
//         >
//           <button
//             onClick={() => setIsExpanded((prev) => !prev)}
//             title={isExpanded ? 'Menyunu Yığ' : 'Menyunu Genişləndir'}
//             className="w-10 h-10 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 text-teal-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
//           >
//             {isExpanded ? (
//               <svg className="w-5 h-5 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <div className="flex flex-col items-center justify-center gap-1.5">
//                 <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
//                 <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
//                 <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
//               </div>
//             )}
//           </button>
//         </div>

//         {/* Hamburger altındakı ayırıcı zolaq */}
//         <div className="w-full h-[1px] bg-teal-400/15" />

//         {/* 2. SIRA: Home Düyməsi */}
//         <button
//           onClick={() => {
//             onNavigate('chat');
//             notify('Halal Portal');
//           }}
//           title="Halal Portal"
//           className={`w-full flex items-center p-2 rounded-2xl bg-teal-400/10 border border-teal-300/30 text-teal-200 cursor-pointer transition-all ${
//             isExpanded ? 'justify-start gap-3 px-3' : 'justify-center'
//           }`}
//         >
//           <div className="w-8 h-8 flex items-center justify-center shrink-0">
//             <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
//           </div>
//           {isExpanded && (
//             <span className="font-extrabold text-sm tracking-wide text-white whitespace-nowrap">
//               Halal Portal
//             </span>
//           )}
//         </button>

//         {/* 3. SIRA: Profil Kartı (Mühəndis • Halal P ilə yeniləndi) */}
//         <div
//           onClick={() => notify('Profil: Emil Xanciqazov')}
//           title="Emil Xanciqazov (Mühəndis • Halal P)"
//           className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 ${
//             isExpanded ? 'justify-start px-2' : 'justify-center'
//           }`}
//         >
//           <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-teal-300/40 group-hover:ring-teal-300/80 transition-all">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-300 to-[#00A896] flex items-center justify-center text-[#082227] font-black text-sm shadow-md">
//               EX
//             </div>
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d363d]" />
//           </div>
//           {isExpanded && (
//             <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
//               <span className="text-sm font-bold text-white tracking-wide truncate">
//                 Emil Xanciqazov
//               </span>
//               <span className="text-xs text-teal-200 font-semibold flex items-center gap-1.5 mt-0.5 truncate">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
//                 Mühəndis • Halal P
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Profil altındakı ayırıcı xətt */}
//         <div className="w-full h-[1px] bg-teal-400/15" />

//         {/* 4. SIRA: Xüsusi Çat Düyməsi */}
//         <div className="w-full">
//           <button
//             id="nav-btn-chat"
//             onClick={() => onNavigate('chat')}
//             title={!isExpanded ? 'Söhbətlər (Chat)' : undefined}
//             className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
//               activeView === 'chat'
//                 ? 'bg-teal-400/25 text-teal-100 shadow-[0_0_14px_rgba(45,212,191,0.3)] border border-teal-300/40'
//                 : 'text-teal-100/70 hover:text-white hover:bg-white/10'
//             } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
//           >
//             {activeView === 'chat' && (
//               <span className="absolute left-0 w-1 h-5 bg-teal-300 rounded-r-full shadow-[0_0_8px_#5eead4]" />
//             )}

//             <div className="relative shrink-0 flex items-center justify-center">
//               <Icon
//                 name="chat"
//                 className="w-5 h-5 transition-transform group-hover:scale-110"
//                 strokeWidth={activeView === 'chat' ? 2.3 : 1.8}
//               />
//               <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-300 rounded-full shadow-[0_0_6px_#5eead4]" />
//             </div>

//             {isExpanded && (
//               <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide ml-3">
//                 Söhbətlər (Chat)
//               </span>
//             )}
//           </button>
//         </div>

//         {/* 5. SIRA: Digər Modullar */}
//         <nav className="flex flex-col gap-1.5 w-full">
//           {navigation.map(([view, label]) => {
//             const isActive = activeView === view;
//             return (
//               <button
//                 key={view}
//                 id={`nav-btn-${view}`}
//                 onClick={() => onNavigate(view)}
//                 title={!isExpanded ? label : undefined}
//                 className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
//                   isActive
//                     ? 'bg-teal-400/20 text-teal-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-teal-300/20'
//                     : 'text-teal-100/70 hover:text-white hover:bg-white/10'
//                 } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
//               >
//                 {isActive && (
//                   <span className="absolute left-0 w-1 h-5 bg-teal-300 rounded-r-full shadow-[0_0_8px_#5eead4]" />
//                 )}

//                 <div className="relative shrink-0 flex items-center justify-center">
//                   <Icon
//                     name={view}
//                     className="w-5 h-5 transition-transform group-hover:scale-110"
//                     strokeWidth={isActive ? 2.3 : 1.8}
//                   />

//                   {!isExpanded && view === 'tasks' && taskCount > 0 && (
//                     <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                       {taskCount}
//                     </span>
//                   )}
//                   {!isExpanded && view === 'operator' && pendingCount > 0 && (
//                     <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-teal-300 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
//                       {pendingCount}
//                     </span>
//                   )}
//                 </div>

//                 {isExpanded && (
//                   <div className="flex items-center justify-between w-full ml-3 overflow-hidden">
//                     <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide">
//                       {label}
//                     </span>
//                     {view === 'tasks' && taskCount > 0 && (
//                       <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
//                         {taskCount}
//                       </span>
//                     )}
//                     {view === 'operator' && pendingCount > 0 && (
//                       <span className="ml-2 px-1.5 py-0.5 bg-teal-300 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
//                         {pendingCount}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* AŞAĞI HİSSƏ */}
//       <div className="flex flex-col gap-2 w-full">
//         <div className="w-full h-[1px] bg-teal-400/15 mb-1" />

//         <button
//           onClick={onToggleTheme}
//           title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
//           className={`w-full h-10 rounded-xl flex items-center text-teal-100/70 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer ${
//             isExpanded ? 'justify-start px-3' : 'justify-center'
//           }`}
//         >
//           <Icon
//             name={dark ? 'sun' : 'moon'}
//             className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
//               dark ? 'text-amber-300' : 'text-teal-200'
//             }`}
//           />
//           {isExpanded && (
//             <span className="text-xs font-medium ml-3 whitespace-nowrap text-teal-100">
//               {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
//             </span>
//           )}
//         </button>

//         <button
//           onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
//           title={!isExpanded ? 'Çıxış' : undefined}
//           className={`w-full h-10 rounded-xl flex items-center text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 transition-all duration-200 cursor-pointer ${
//             isExpanded ? 'justify-start px-3' : 'justify-center'
//           }`}
//         >
//           <Icon name="logout" className="w-5 h-5 shrink-0" />
//           {isExpanded && (
//             <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-200">
//               Çıxış
//             </span>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }



import { useState } from 'react';
import Icon from './common/Icons.jsx';

const navigation = [
  ['tasks', 'Tapşırıqlar və Təqvim'],
  ['operator', 'Operator Təsdiqi'],
  ['groups', 'Qrup və İstifadəçilər'],
  ['companies', 'Şirkətlər Siyahısı'],
  ['users', 'İstifadəçilər Reyestri'],
  ['employees', 'İşçilər və Öhdəliklər'],
];

export default function Sidebar({
  activeView,
  onNavigate,
  taskCount,
  pendingCount,
  dark,
  onToggleTheme,
  notify,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-gradient-to-b from-[#11454e] via-[#0d363d] to-[#083038] border-r border-teal-400/20 flex flex-col justify-between py-4 shadow-2xl z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-72 px-3.5' : 'w-16 md:w-20 px-2'
      }`}
    >
      {/* YUXARI HİSSƏ */}
      <div className="flex flex-col items-center w-full gap-3">
        
        {/* 1. SIRA: AÇIQ HALDA (Halal Portal kartı + yanında kiçildilmiş X) / BAĞLI HALDA (Tək Hamburger) */}
        {isExpanded ? (
          <div className="w-full flex items-center justify-between gap-2">
            {/* Halal Portal Kartı */}
            <button
              onClick={() => {
                onNavigate('chat');
                notify('Halal Portal');
              }}
              title="Halal Portal"
              className="flex-1 flex items-center gap-3 p-2 rounded-2xl bg-teal-400/10 border border-teal-300/30 text-teal-200 cursor-pointer transition-all hover:bg-white/5 overflow-hidden"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <span className="font-extrabold text-sm tracking-wide text-white whitespace-nowrap truncate">
                Halal Portal
              </span>
            </button>

            {/* Balacalaşdırılmış X Düyməsi */}
            <button
              onClick={() => setIsExpanded(false)}
              title="Menyunu Yığ"
              className="w-9 h-9 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 text-teal-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <svg className="w-4 h-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
            {/* Bağlı halda tək Hamburger */}
            <button
              onClick={() => setIsExpanded(true)}
              title="Menyunu Genişləndir"
              className="w-10 h-10 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 text-teal-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
                <span className="w-5 h-[2px] bg-teal-200 rounded-sm" />
              </div>
            </button>

            <div className="w-full h-[1px] bg-teal-400/15" />

            {/* Bağlı halda Home Düyməsi */}
            <button
              onClick={() => {
                onNavigate('chat');
                notify('Halal Portal');
              }}
              title="Halal Portal"
              className="w-full flex items-center justify-center p-2 rounded-2xl bg-teal-400/10 border border-teal-300/30 text-teal-200 cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Icon name="home" className="w-6 h-6" strokeWidth={2.2} />
              </div>
            </button>
          </div>
        )}

        {/* 2. SIRA: Profil Kartı */}
        <div
          onClick={() => notify('Profil: Emil Xanciqazov')}
          title="Emil Xanciqazov (Mühəndis • Halal P)"
          className={`w-full flex items-center gap-3 p-1.5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 ${
            isExpanded ? 'justify-start px-2' : 'justify-center'
          }`}
        >
          <div className="relative shrink-0 p-0.5 rounded-full ring-2 ring-teal-300/40 group-hover:ring-teal-300/80 transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-300 to-[#00A896] flex items-center justify-center text-[#082227] font-black text-sm shadow-md">
              EX
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d363d]" />
          </div>
          {isExpanded && (
            <div className="flex flex-col text-left overflow-hidden whitespace-nowrap">
              <span className="text-sm font-bold text-white tracking-wide truncate">
                Emil Xanciqazov
              </span>
              <span className="text-xs text-teal-200 font-semibold flex items-center gap-1.5 mt-0.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Mühəndis • Halal P
              </span>
            </div>
          )}
        </div>

        {/* Profil altındakı ayırıcı xətt */}
        <div className="w-full h-[1px] bg-teal-400/15" />

        {/* 3. SIRA: Xüsusi Çat Düyməsi */}
        <div className="w-full">
          <button
            id="nav-btn-chat"
            onClick={() => onNavigate('chat')}
            title={!isExpanded ? 'Söhbətlər (Chat)' : undefined}
            className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
              activeView === 'chat'
                ? 'bg-teal-400/25 text-teal-100 shadow-[0_0_14px_rgba(45,212,191,0.3)] border border-teal-300/40'
                : 'text-teal-100/70 hover:text-white hover:bg-white/10'
            } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
          >
            {activeView === 'chat' && (
              <span className="absolute left-0 w-1 h-5 bg-teal-300 rounded-r-full shadow-[0_0_8px_#5eead4]" />
            )}

            <div className="relative shrink-0 flex items-center justify-center">
              <Icon
                name="chat"
                className="w-5 h-5 transition-transform group-hover:scale-110"
                strokeWidth={activeView === 'chat' ? 2.3 : 1.8}
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-300 rounded-full shadow-[0_0_6px_#5eead4]" />
            </div>

            {isExpanded && (
              <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide ml-3">
                Söhbətlər (Chat)
              </span>
            )}
          </button>
        </div>

        {/* 4. SIRA: Digər Modullar */}
        <nav className="flex flex-col gap-1.5 w-full">
          {navigation.map(([view, label]) => {
            const isActive = activeView === view;
            return (
              <button
                key={view}
                id={`nav-btn-${view}`}
                onClick={() => onNavigate(view)}
                title={!isExpanded ? label : undefined}
                className={`relative w-full h-11 rounded-xl flex items-center transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-teal-400/20 text-teal-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-teal-300/20'
                    : 'text-teal-100/70 hover:text-white hover:bg-white/10'
                } ${isExpanded ? 'justify-start px-3' : 'justify-center'}`}
              >
                {isActive && (
                  <span className="absolute left-0 w-1 h-5 bg-teal-300 rounded-r-full shadow-[0_0_8px_#5eead4]" />
                )}

                <div className="relative shrink-0 flex items-center justify-center">
                  <Icon
                    name={view}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {!isExpanded && view === 'tasks' && taskCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {taskCount}
                    </span>
                  )}
                  {!isExpanded && view === 'operator' && pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 bg-teal-300 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                      {pendingCount}
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="flex items-center justify-between w-full ml-3 overflow-hidden">
                    <span className="text-xs font-semibold whitespace-nowrap truncate tracking-wide">
                      {label}
                    </span>
                    {view === 'tasks' && taskCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {taskCount}
                      </span>
                    )}
                    {view === 'operator' && pendingCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-teal-300 text-slate-950 text-[10px] font-black rounded-full shrink-0 shadow-sm">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* AŞAĞI HİSSƏ */}
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-[1px] bg-teal-400/15 mb-1" />

        <button
          onClick={onToggleTheme}
          title={!isExpanded ? 'Gecə / Gündüz Rejimi' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-teal-100/70 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon
            name={dark ? 'sun' : 'moon'}
            className={`w-5 h-5 shrink-0 transition-transform hover:rotate-12 ${
              dark ? 'text-amber-300' : 'text-teal-200'
            }`}
          />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-teal-100">
              {dark ? 'Gündüz Rejimi' : 'Gecə Rejimi'}
            </span>
          )}
        </button>

        <button
          onClick={() => notify('Çıxış əməliyyatı simulyasiya edildi')}
          title={!isExpanded ? 'Çıxış' : undefined}
          className={`w-full h-10 rounded-xl flex items-center text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'justify-start px-3' : 'justify-center'
          }`}
        >
          <Icon name="logout" className="w-5 h-5 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium ml-3 whitespace-nowrap text-rose-200">
              Çıxış
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}