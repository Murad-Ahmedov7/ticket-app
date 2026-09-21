import { Fragment, useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble.jsx';

export default function MessageList({ messages, activeChatId, ...actions }) {
  const scrollArea = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  useEffect(() => { scrollArea.current.scrollTop = scrollArea.current.scrollHeight; }, [messages, activeChatId]);
  useEffect(() => { setPlayingId(null); }, [activeChatId]);
  useEffect(() => {
    if (playingId === null) return;
    const timeout = setTimeout(() => setPlayingId(null), 5000);
    return () => clearTimeout(timeout);
  }, [playingId]);
  return <div ref={scrollArea} id="messages-scroll-area" className="flex-1 overflow-y-auto p-4 md:p-6 custom-chat-bg space-y-4">
    {messages.map((message, index) => <Fragment key={message.id}>
      {(index === 0 || message.date !== messages[index - 1].date) && <div className="flex justify-center my-3"><span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 shadow-sm border border-slate-200/50 dark:border-slate-700/60 backdrop-blur">{message.date}</span></div>}
      <MessageBubble message={message} {...actions} playing={playingId === message.id} onPlay={() => {
        const stop = playingId === message.id;
        setPlayingId(stop ? null : message.id);
        actions.notify(stop ? 'Səs dayandırıldı' : `Səs oxudulur: ${message.audioUrl?.split('/').pop() || ''}`);
      }} />
    </Fragment>)}
  </div>;
}
