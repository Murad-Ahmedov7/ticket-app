import Icon from '../common/Icons.jsx';

export default function ChatHeader({ conversation, onCall, onCreateTask, onInfo, onAddMember, onShowConversations }) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];
  const avatarGradient = conversation?.avatarGradient || 'from-teal-500 via-emerald-500 to-green-500';

  return (
    <header className="chat-header relative z-10 flex min-h-20 h-auto shrink-0 py-3 items-center justify-between border-b border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(208,250,229,0.72))] px-5 shadow-[0_16px_32px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(16,185,129,0.08)] backdrop-blur-2xl dark:border-emerald-800/60 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(6,47,46,0.92))] dark:shadow-[0_16px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(16,185,129,0.06)] sm:px-6">
      <div className="chat-header-identity flex min-w-0 items-center gap-3.5">
        <button type="button" onClick={onShowConversations} title="Söhbətlərə qayıt" aria-label="Söhbətlərə qayıt" className="chat-back shrink-0 h-9 w-9 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="chat-header-avatar relative shrink-0">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br ${avatarGradient} text-white shadow-[0_12px_24px_rgba(16,185,129,0.24)] dark:border-white/15 dark:shadow-[0_12px_24px_rgba(16,185,129,0.16)]`}>
            <Icon name="groups" className="h-5 w-5" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="min-w-0 truncate text-base font-bold text-slate-900 dark:text-slate-100">
              {isGroup ? 'Chat with ' : ''}
              {conversation?.name}
            </h2>
            <span className="shrink-0 inline-flex items-center rounded-full border border-emerald-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/60 dark:text-emerald-300">
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>
          </div>

          <p className="mt-0.5 flex items-start gap-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">
            {isGroup
              ? `${members.length || 0} iştirakçı • ${members.join(', ') || 'Heç kim yoxdur'}`
              : 'Onlayn • Halal Portal'}
            </span>
          </p>
        </div>
      </div>

      <div className="chat-header-actions flex shrink-0 items-center gap-2 sm:gap-2.5">
        <button
          onClick={onCall}
          className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-gradient-to-r from-teal-600/95 to-emerald-500/95 px-3.5 py-2.5 text-xs font-bold text-white shadow-[0_12px_22px_rgba(13,148,136,0.24)] dark:border-white/15 dark:from-teal-700 dark:to-emerald-600 dark:shadow-[0_12px_22px_rgba(13,148,136,0.16)] backdrop-blur-sm transition hover:brightness-105 active:scale-[0.98]"
          title="Zəng et"
        >
          <Icon name="phone" className="h-4 w-4 text-white" />
          <span className="chat-action-label">Zəng et</span>
        </button>

        <button
          onClick={onCreateTask}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200/80 bg-white/70 px-3.5 py-2.5 text-xs font-bold text-emerald-700 shadow-[0_10px_22px_rgba(16,185,129,0.15)] dark:border-emerald-700/50 dark:bg-slate-800/80 dark:text-emerald-300 dark:shadow-[0_10px_22px_rgba(0,0,0,0.16)] dark:hover:bg-emerald-900/50 backdrop-blur-sm transition hover:bg-emerald-50 active:scale-[0.98]"
          title="Tapşırıq yarat"
        >
          <Icon name="plus" className="h-4 w-4 text-emerald-700 dark:text-emerald-300" strokeWidth={2.2} />
          <span className="chat-action-label">Tapşırıq yarat</span>
        </button>

        <button
          onClick={onInfo}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200/80 bg-white/70 text-emerald-700 shadow-[0_8px_18px_rgba(16,185,129,0.12)] dark:border-emerald-700/50 dark:bg-slate-800/80 dark:text-emerald-300 dark:shadow-[0_8px_18px_rgba(0,0,0,0.14)] dark:hover:bg-emerald-900/50 backdrop-blur-sm transition hover:bg-emerald-50"
          title="Ətraflı məlumat"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>

        <button
          onClick={onAddMember}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_10px_22px_rgba(16,185,129,0.26)] dark:border-white/15 dark:from-emerald-600 dark:to-green-600 dark:shadow-[0_10px_22px_rgba(16,185,129,0.18)] backdrop-blur-sm transition hover:brightness-105 active:scale-[0.98]"
          title="İştirakçı əlavə et"
        >
          <Icon name="addMember" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}

// import Icon from '../common/Icons.jsx';

// const PERSON_AVATARS = [
//   'https://i.pravatar.cc/150?img=12',
//   'https://i.pravatar.cc/150?img=32',
//   'https://i.pravatar.cc/150?img=47',
// ];

// function getAvatarByName(name = '') {
//   let hash = 0;

//   for (let i = 0; i < name.length; i++) {
//     hash = name.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   return PERSON_AVATARS[
//     Math.abs(hash) % PERSON_AVATARS.length
//   ];
// }

// export default function ChatHeader({
//   conversation,
//   onCall,
//   onCreateTask,
//   onInfo,
//   onAddMember,
//   onShowConversations
// }) {
//   const isGroup = conversation?.type === 'group';
//   const members = conversation?.members || [];

//   const visibleMembers = members.slice(0, 3);

//   const remainingMembers = Math.max(
//     members.length - visibleMembers.length,
//     0
//   );

//   const conversationAvatar =
//     conversation?.avatar ||
//     getAvatarByName(conversation?.name);

//   return (
//     <header
//       className="
//         chat-header
//         relative
//         z-10
//         flex
//         min-h-[84px]
//         shrink-0
//         items-center
//         justify-between
//         gap-6
//         border-b
//         border-slate-200/70
//         bg-white
//         px-5
//         py-3
//         dark:border-slate-800
//         dark:bg-slate-900
//         sm:px-6
//       "
//     >
//       {/* LEFT SIDE */}
//       <div className="flex min-w-0 flex-1 items-center gap-3">

//         {/* BACK */}
//         <button
//           type="button"
//           onClick={onShowConversations}
//           title="Söhbətlərə qayıt"
//           aria-label="Söhbətlərə qayıt"
//           className="
//             chat-back
//             flex
//             h-9
//             w-9
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             text-slate-400
//             transition
//             hover:bg-slate-100
//             hover:text-slate-700
//             dark:text-slate-500
//             dark:hover:bg-slate-800
//             dark:hover:text-slate-200
//           "
//         >
//           <svg
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path d="m15 18-6-6 6-6" />
//           </svg>
//         </button>

//         {/* MAIN AVATAR */}
//         <div className="relative shrink-0">

//           {isGroup ? (
//             <div
//               className="
//                 flex
//                 h-[46px]
//                 w-[46px]
//                 items-center
//                 justify-center
//                 rounded-2xl
//                 bg-emerald-50
//                 text-emerald-600
//                 ring-1
//                 ring-emerald-100
//                 dark:bg-emerald-950/40
//                 dark:text-emerald-300
//                 dark:ring-emerald-900
//               "
//             >
//               <Icon
//                 name="groups"
//                 className="h-[20px] w-[20px]"
//                 strokeWidth={2.2}
//               />
//             </div>
//           ) : (
//             <img
//               src={conversationAvatar}
//               alt={conversation?.name}
//               className="
//                 h-[46px]
//                 w-[46px]
//                 rounded-2xl
//                 object-cover
//                 ring-1
//                 ring-slate-200
//                 dark:ring-slate-700
//               "
//             />
//           )}

//           <span
//             className="
//               absolute
//               -bottom-0.5
//               -right-0.5
//               h-3
//               w-3
//               rounded-full
//               border-2
//               border-white
//               bg-emerald-500
//               dark:border-slate-900
//             "
//           />
//         </div>

//         {/* CHAT INFO */}
//         <div className="flex min-w-0 flex-1 flex-col justify-center">

//           {/* TOP ROW */}
//           <div className="flex min-w-0 items-center gap-2">

//             <h2
//               className="
//                 min-w-0
//                 truncate
//                 text-[18px]
//                 font-extrabold
//                 tracking-[-0.015em]
//                 text-slate-950
//                 dark:text-white
//               "
//             >
//               {conversation?.name}
//             </h2>

//             <span
//               className="
//                 shrink-0
//                 rounded-md
//                 bg-slate-100
//                 px-2
//                 py-0.5
//                 text-[9px]
//                 font-bold
//                 uppercase
//                 tracking-[0.08em]
//                 text-slate-500
//                 dark:bg-slate-800
//                 dark:text-slate-400
//               "
//             >
//               {isGroup ? 'Qrup' : 'Şəxsi'}
//             </span>

//           </div>

//           {/* SECOND ROW */}
//           {isGroup ? (
//             <div
//               className="
//                 mt-2
//                 flex
//                 min-w-0
//                 items-center
//                 gap-3
//                 overflow-hidden
//                 whitespace-nowrap
//               "
//             >

//               {/* MEMBER AVATARS */}
//               <div className="mr-0.5 flex shrink-0 items-center -space-x-2">

//                 {visibleMembers.map((member, index) => (
//                   <img
//                     key={`${member}-${index}`}
//                     src={getAvatarByName(member)}
//                     alt={member}
//                     title={member}
//                     className="
//                       h-[26px]
//                       w-[26px]
//                       rounded-full
//                       border-2
//                       border-white
//                       object-cover
//                       dark:border-slate-900
//                     "
//                   />
//                 ))}

//                 {remainingMembers > 0 && (
//                   <div
//                     className="
//                       flex
//                       h-[26px]
//                       min-w-[26px]
//                       items-center
//                       justify-center
//                       rounded-full
//                       border-2
//                       border-white
//                       bg-slate-200
//                       px-1
//                       text-[9px]
//                       font-bold
//                       text-slate-600
//                       dark:border-slate-900
//                       dark:bg-slate-700
//                       dark:text-slate-200
//                     "
//                   >
//                     +{remainingMembers}
//                   </div>
//                 )}

//               </div>

//               {/* PARTICIPANT COUNT */}
//               <span
//                 className="
//                   inline-flex
//                   h-[28px]
//                   shrink-0
//                   items-center
//                   gap-1.5
//                   rounded-full
//                   bg-slate-50
//                   px-3
//                   text-[11px]
//                   font-medium
//                   text-slate-600
//                   ring-1
//                   ring-slate-100
//                   dark:bg-slate-800/70
//                   dark:text-slate-300
//                   dark:ring-slate-700
//                 "
//               >
//                 <Icon
//                   name="groups"
//                   className="
//                     h-3.5
//                     w-3.5
//                     text-emerald-600
//                     dark:text-emerald-400
//                   "
//                 />

//                 {members.length} iştirakçı
//               </span>

//               {/* MEMBER PILLS */}
//               <div
//                 className="
//                   flex
//                   min-w-0
//                   items-center
//                   gap-2
//                   overflow-hidden
//                 "
//               >
//                 {members.slice(0, 3).map((member, index) => {
//                   const isSelf =
//                     member.trim().toLowerCase() === 'siz';

//                   return (
//                     <span
//                       key={`${member}-pill-${index}`}
//                       title={member}
//                       className={
//                         isSelf
//                           ? `
//                             inline-flex
//                             h-[28px]
//                             max-w-[150px]
//                             shrink-0
//                             items-center
//                             truncate
//                             rounded-full
//                             bg-emerald-50
//                             px-3
//                             text-[11px]
//                             font-semibold
//                             text-emerald-700
//                             dark:bg-emerald-950/40
//                             dark:text-emerald-300
//                           `
//                           : `
//                             inline-flex
//                             h-[28px]
//                             max-w-[170px]
//                             shrink-0
//                             items-center
//                             truncate
//                             rounded-full
//                             bg-slate-100
//                             px-3
//                             text-[11px]
//                             font-medium
//                             text-slate-600
//                             dark:bg-slate-800
//                             dark:text-slate-300
//                           `
//                       }
//                     >
//                       {member}
//                     </span>
//                   );
//                 })}
//               </div>

//             </div>
//           ) : (
//             <div className="mt-2 flex items-center gap-2">

//               <span className="h-2 w-2 rounded-full bg-emerald-500" />

//               <span
//                 className="
//                   text-[12px]
//                   font-medium
//                   text-slate-500
//                   dark:text-slate-400
//                 "
//               >
//                 Onlayn
//               </span>

//               <span
//                 className="
//                   h-1
//                   w-1
//                   rounded-full
//                   bg-slate-300
//                   dark:bg-slate-600
//                 "
//               />

//               <span
//                 className="
//                   text-[12px]
//                   text-slate-400
//                   dark:text-slate-500
//                 "
//               >
//                 Halal Portal
//               </span>

//             </div>
//           )}

//         </div>
//       </div>

//       {/* RIGHT ACTIONS */}
//       <div
//         className="
//           flex
//           shrink-0
//           items-center
//           rounded-2xl
//           border
//           border-slate-200
//           bg-white
//           px-1.5
//           py-1
//           shadow-[0_1px_4px_rgba(15,23,42,0.04)]
//           dark:border-slate-700
//           dark:bg-slate-900
//         "
//       >

//         {/* CALL */}
//         <button
//           type="button"
//           onClick={onCall}
//           title="Zəng et"
//           aria-label="Zəng et"
//           className="
//             flex
//             h-10
//             w-10
//             items-center
//             justify-center
//             rounded-lg
//             text-slate-500
//             transition
//             hover:bg-slate-100
//             hover:text-slate-800
//             active:scale-95
//             dark:text-slate-400
//             dark:hover:bg-slate-800
//             dark:hover:text-slate-100
//           "
//         >
//           <Icon
//             name="phone"
//             className="h-[18px] w-[18px]"
//           />
//         </button>

//         <span className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

//         {/* CREATE TASK */}
//         <button
//           type="button"
//           onClick={onCreateTask}
//           title="Tapşırıq yarat"
//           aria-label="Tapşırıq yarat"
//           className="
//             flex
//             h-10
//             w-10
//             items-center
//             justify-center
//             rounded-lg
//             text-slate-500
//             transition
//             hover:bg-slate-100
//             hover:text-slate-800
//             active:scale-95
//             dark:text-slate-400
//             dark:hover:bg-slate-800
//             dark:hover:text-slate-100
//           "
//         >
//           <Icon
//             name="plus"
//             className="h-[18px] w-[18px]"
//             strokeWidth={2.2}
//           />
//         </button>

//         <span className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

//         {/* INFO */}
//         <button
//           type="button"
//           onClick={onInfo}
//           title="Söhbət məlumatları"
//           aria-label="Söhbət məlumatları"
//           className="
//             flex
//             h-10
//             w-10
//             items-center
//             justify-center
//             rounded-lg
//             text-slate-500
//             transition
//             hover:bg-slate-100
//             hover:text-slate-800
//             active:scale-95
//             dark:text-slate-400
//             dark:hover:bg-slate-800
//             dark:hover:text-slate-100
//           "
//         >
//           <Icon
//             name="edit"
//             className="h-[18px] w-[18px]"
//           />
//         </button>

//         {isGroup && (
//           <>
//             <span className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

//             {/* ADD MEMBER */}
//             <button
//               type="button"
//               onClick={onAddMember}
//               title="İştirakçı əlavə et"
//               aria-label="İştirakçı əlavə et"
//               className="
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-lg
//                 text-emerald-600
//                 transition
//                 hover:bg-emerald-50
//                 active:scale-95
//                 dark:text-emerald-400
//                 dark:hover:bg-emerald-950/40
//               "
//             >
//               <Icon
//                 name="addMember"
//                 className="h-[18px] w-[18px]"
//                 strokeWidth={2.3}
//               />
//             </button>
//           </>
//         )}

//       </div>
//     </header>
//   );
// }