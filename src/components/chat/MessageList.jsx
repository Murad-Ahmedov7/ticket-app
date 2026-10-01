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

  useEffect(() => {
    if (!scrollArea.current) return;

    scrollArea.current.scrollTop =
      scrollArea.current.scrollHeight;
  }, [messages, activeChatId]);

  useEffect(() => {
    setPlayingId(null);
  }, [activeChatId]);

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
      item => item.dataset.messageId === String(id)
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
          backgroundColor: 'rgba(16,185,129,0.08)'
        },
        {
          backgroundColor: 'transparent'
        }
      ],
      {
        duration: reducedMotion ? 0 : 900
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
        bg-[#f2f5f3]
        [background-image:radial-gradient(circle,#d2d8d5_0.7px,transparent_0.8px)]
        [background-size:20px_20px]
        dark:[background-image:radial-gradient(circle,#2c3b52_0.7px,transparent_0.8px)]
        px-4
        py-4
        dark:bg-slate-900
        md:px-6
        md:py-5
      "
    >
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

              {isNewDate && (
                <div className="my-5 flex items-center gap-3">

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

                  <span
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-slate-200
                      bg-[#f8faf9]
                      px-3
                      py-1
                      text-[11px]
                      font-medium
                      text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    {message.date}
                  </span>

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

              <div className="mb-3 last:mb-0">
                <MessageBubble
                  message={message}
                  {...actions}
                  onJumpToMessage={jumpToMessage}
                  playing={playingId === message.id}
                  onPlay={() => {
                    const stop =
                      playingId === message.id;

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
              </div>

            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
