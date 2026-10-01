import { Fragment, useEffect, useRef, useState } from 'react';
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

    const timeout = setTimeout(
      () => setPlayingId(null),
      5000
    );

    return () => clearTimeout(timeout);
  }, [playingId]);

  function jumpToMessage(id) {
    const row = [
      ...(
        scrollArea.current?.querySelectorAll(
          '[data-message-id]'
        ) || []
      )
    ].find(
      item =>
        item.dataset.messageId === String(id)
    );

    if (!row) {
      return actions.notify(
        'Əvvəlki mesaj artıq bu söhbətdə yoxdur'
      );
    }

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    row.scrollIntoView({
      block: 'center',
      behavior: reducedMotion
        ? 'instant'
        : 'smooth'
    });

    row.animate(
      [
        {
          backgroundColor:
            'rgba(16,185,129,0.14)'
        },
        {
          backgroundColor: 'transparent'
        }
      ],
      {
        duration: reducedMotion
          ? 0
          : 1200
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
        bg-[#eef1f6]
        px-4
        py-5
        md:px-7
        md:py-6
        dark:bg-slate-950
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
          space-y-3.5
        "
      >
        {messages.map((message, index) => (
          <Fragment key={message.id}>

            {(index === 0 ||
              message.date !==
                messages[index - 1].date) && (
              <div className="my-4 flex justify-center">
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-slate-200/70
                    bg-white/90
                    px-3
                    py-1
                    text-[10px]
                    font-medium
                    text-slate-400
                    shadow-sm
                    backdrop-blur-sm
                    dark:border-slate-700
                    dark:bg-slate-800/90
                    dark:text-slate-400
                  "
                >
                  {message.date}
                </span>
              </div>
            )}

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

                actions.notify(
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