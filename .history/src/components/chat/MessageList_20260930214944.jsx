// import { Fragment, useEffect, useRef, useState } from 'react';
// import MessageBubble from './MessageBubble.jsx';

// export default function MessageList({ messages, activeChatId, ...actions }) {
//   const scrollArea = useRef(null);
//   const [playingId, setPlayingId] = useState(null);
//   useEffect(() => { scrollArea.current.scrollTop = scrollArea.current.scrollHeight; }, [messages, activeChatId]);
//   useEffect(() => { setPlayingId(null); }, [activeChatId]);
//   useEffect(() => {
//     if (playingId === null) return;
//     const timeout = setTimeout(() => setPlayingId(null), 5000);
//     return () => clearTimeout(timeout);
//   }, [playingId]);
//   function jumpToMessage(id) {
//     const row = [...(scrollArea.current?.querySelectorAll('[data-message-id]') || [])].find(item => item.dataset.messageId === String(id));
//     if (!row) return actions.notify('Əvvəlki mesaj artıq bu söhbətdə yoxdur');
//     const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     row.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'instant' : 'smooth' });
//     row.animate([{ backgroundColor: 'rgba(16,185,129,0.22)' }, { backgroundColor: 'transparent' }], { duration: reducedMotion ? 0 : 1400 });
//   }
//   return <div ref={scrollArea} id="messages-scroll-area" className="chat-messages min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 custom-chat-bg space-y-4">
//     {messages.map((message, index) => <Fragment key={message.id}>
//       {(index === 0 || message.date !== messages[index - 1].date) && <div className="flex justify-center my-3"><span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 shadow-sm border border-slate-200/50 dark:border-slate-700/60 backdrop-blur">{message.date}</span></div>}
//       <MessageBubble message={message} {...actions} onJumpToMessage={jumpToMessage} playing={playingId === message.id} onPlay={() => {
//         const stop = playingId === message.id;
//         setPlayingId(stop ? null : message.id);
//         actions.notify(stop ? 'Səs dayandırıldı' : `Səs oxudulur: ${message.audioUrl?.split('/').pop() || ''}`);
//       }} />
//     </Fragment>)}
//   </div>;
// }



export default function MessageList({ messages, activeChatId, ...actions }) {
  
}