import { Fragment, useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble.jsx';

export default function MessageList({
  messages,
  activeChatId,
  ...actions
}) {
  const scrollArea = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  // Yeni mesaj gələndə aşağı scroll et
  useEffect(() => {
    if (!scrollArea.current) return;

    scrollArea.current.scrollTop =
      scrollArea.current.scrollHeight;
  }, [messages, activeChatId]);

  // Chat dəyişəndə audio state sıfırlansın
  useEffect(() => {
    setPlayingId(null);
  }, [activeChatId]);

  // Audio 5 saniyədən sonra avtomatik dayansın
  useEffect(() => {
    if (playingId === null) return;

    const timeout = setTimeout(() => {
      setPlayingId(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [playingId]);

  function jumpToMessage(id) {
    const rows =
      scrollArea.current?.querySelectorAll('[data-message-id]') || [];

    const row = [...rows].find(
      item => item.dataset.messageId === String(id)
    );

    if (!row) {
      actions.notify?.(
        'Əvvəlki mesaj artıq bu söhbətdə yoxdur'
      );
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    row.scrollIntoView({
      block: 'center',
      behavior: reducedMotion ? 'auto' : 'smooth'
    });

    row.animate(
      [
        {
          backgroundColor: 'rgba(16,185,129,0.12)'
        },
        {
          backgroundColor: 'transparent'
        }
      ],
      {
        duration: reducedMotion ? 0 : 1000
      }
    );
  }

  return (
    <div
      ref={scrollArea}
      id="messages-scroll-area"
      className="
        chat-messages
        min-h-0
        min-w-0
        flex-1
        overflow-y-auto
        overflow-x-hidden
        bg-slate-50
        px-4
        py-4
        dark:bg-slate-950
        md:px-6
        md:py-5
      "
    >
      <div className="space-y-3">
        {messages.map((message, index) => (
          <Fragment key={message.id}>

            {/* DATE */}
            {(index === 0 ||
              message.date !== messages[index - 1].date) && (
              <div className="my-4 flex items-center justify-center">

                <span
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-1
                    text-[10px]
                    font-medium
                    text-slate-400
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-400
                  "
                >
                  {message.date}
                </span>

              </div>
            )}

            {/* MESSAGE */}
            <MessageBubble
              message={message}
              {...actions}
              onJumpToMessage={jumpToMessage}
              playing={playingId === message.id}
              onPlay={() => {
                const stop = playingId === message.id;

                setPlayingId(
                  stop ? null : message.id
                );

                actions.notify?.(
                  stop
                    ? 'Səs dayandırıldı'
                    : `Səs oxudulur: ${
                        message.audioUrl
                          ?.split('/')
                          .pop() || ''
                      }`
                );
              }}
            />

          </Fragment>
        ))}
      </div>
    </div>
  );
}


// export default function MessageList({ messages, activeChatId, ...actions }) {
//   return (
//     <div></div>
//   )
// }