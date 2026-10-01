import {
  Fragment,
  useEffect,
  useRef,
  useState
} from 'react';

import MessageBubble from './MessageBubble.jsx';

export default function MessageList({
  messages,
  activeChatId,
  ...actions
}) {
  const scrollArea = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  // Yeni mesaj gələndə aşağı scroll
  useEffect(() => {
    if (!scrollArea.current) return;

    scrollArea.current.scrollTop =
      scrollArea.current.scrollHeight;
  }, [messages, activeChatId]);

  // Söhbət dəyişəndə audio state sıfırla
  useEffect(() => {
    setPlayingId(null);
  }, [activeChatId]);

  // Audio avtomatik stop
  useEffect(() => {
    if (playingId === null) return;

    const timeout = setTimeout(() => {
      setPlayingId(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [playingId]);

  function jumpToMessage(id) {
    const rows =
      scrollArea.current?.querySelectorAll(
        '[data-message-id]'
      ) || [];

    const row = [...rows].find(
      item =>
        item.dataset.messageId === String(id)
    );

    if (!row) {
      actions.notify?.(
        'Əvvəlki mesaj artıq bu söhbətdə yoxdur'
      );

      return;
    }

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    row.scrollIntoView({
      block: 'center',
      behavior: reducedMotion
        ? 'auto'
        : 'smooth'
    });

    row.animate(
      [
        {
          backgroundColor:
            'rgba(16,185,129,0.10)'
        },
        {
          backgroundColor:
            'transparent'
        }
      ],
      {
        duration: reducedMotion
          ? 0
          : 1000
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
        overflow-x-hidden
        overflow-y-auto

        bg-slate-50
        bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.035),transparent_38%)]

        px-4
        py-4

        dark:bg-slate-950
        dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.035),transparent_38%)]

        md:px-6
        md:py-5
      "
    >
      {/* 
        Mesajların tam ekranın iki kənarına qaçmasının
        qarşısını alan əsas container
      */}
      <div
        className="
          mx-auto
          w-full
          max-w-[1180px]
        "
      >
        {messages.map((message, index) => {
          const previousMessage =
            messages[index - 1];

          const isNewDate =
            index === 0 ||
            message.date !== previousMessage?.date;

          return (
            <Fragment key={message.id}>

              {/* DATE SEPARATOR */}
              {isNewDate && (
                <div
                  className="
                    my-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* LEFT LINE */}
                  <span
                    className="
                      h-px
                      flex-1
                      bg-gradient-to-r
                      from-transparent
                      to-slate-200
                      dark:to-slate-800
                    "
                  />

                  {/* DATE */}
                  <span
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-slate-200/80
                      bg-white/90
                      px-3
                      py-1
                      text-[10px]
                      font-medium
                      text-slate-400
                      shadow-[0_1px_3px_rgba(15,23,42,0.04)]
                      backdrop-blur-sm

                      dark:border-slate-700
                      dark:bg-slate-900/90
                      dark:text-slate-400
                    "
                  >
                    {message.date}
                  </span>

                  {/* RIGHT LINE */}
                  <span
                    className="
                      h-px
                      flex-1
                      bg-gradient-to-l
                      from-transparent
                      to-slate-200
                      dark:to-slate-800
                    "
                  />
                </div>
              )}

              {/* MESSAGE */}
              <div
                className="
                  mb-2
                  last:mb-0
                "
              >
                <MessageBubble
                  message={message}
                  {...actions}
                  onJumpToMessage={jumpToMessage}
                  playing={
                    playingId === message.id
                  }
                  onPlay={() => {
                    const stop =
                      playingId === message.id;

                    setPlayingId(
                      stop
                        ? null
                        : message.id
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
              </div>

            </Fragment>
          );
        })}
      </div>
    </div>
  );
}


// export default function MessageList({ messages, activeChatId, ...actions }) {
//   return (
//     <div></div>
//   )
// }