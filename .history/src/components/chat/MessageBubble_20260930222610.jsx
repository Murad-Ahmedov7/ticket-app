import ReplyQuote from './ReplyQuote.jsx';
import { getMessageContent } from '../../utils/messageReply.js';
import Icon from '../common/Icons.jsx';
import VoiceNote from './VoiceNote.jsx';

function MentionText({ text = '', outgoing = false }) {
  return text
    .split(/(@[a-zA-Z0-9_ğüşıöçƏĞÜŞİÖÇ\s]+)/g)
    .map((part, index) =>
      part.startsWith('@') ? (
        <span
          key={index}
          className={`
            mx-0.5
            inline-block
            max-w-full
            rounded-md
            px-1.5
            py-0.5
            font-semibold
            [overflow-wrap:anywhere]

            ${
              outgoing
                ? 'bg-white text-emerald-700 ring-1 ring-emerald-100 dark:bg-slate-900 dark:text-emerald-300 dark:ring-emerald-900/50'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }
          `}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
}

export default function MessageBubble({
  message,
  onReactionPicker,
  onReaction,
  onReply,
  onEdit,
  onCreateTask,
  onTaskDetail,
  onVote,
  playing,
  onPlay,
  notify,
  onJumpToMessage
}) {
  const { text: bodyText, replyTo } =
    getMessageContent(message);

  const outgoing = message.isOutgoing;

  const totalVotes =
    message.options?.reduce(
      (sum, option) => sum + option.votes,
      0
    ) || 0;

  const legacyImage =
    !message.image &&
    message.text?.startsWith('📷 Şəkil göndərildi:')
      ? message.text.match(
          /<img src="(data:image\/[^"\s]+)"/
        )?.[1]
      : null;

  const image = message.image || legacyImage;

  const actions = (
    <div
      className="
        message-actions
        mb-1
        flex
        items-center
        gap-0.5
        rounded-lg
        border
        border-slate-200
        bg-white
        px-1
        py-0.5
        text-slate-400
        opacity-0
        shadow-sm
        transition-opacity
        group-hover:opacity-100
        focus-within:opacity-100
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <button
        onClick={event =>
          onReactionPicker(event, message.id)
        }
        className="rounded-md p-1 transition hover:bg-slate-100 hover:text-amber-500 dark:hover:bg-slate-700"
        title="Reaksiya bildir"
      >
        <Icon name="smile" className="h-3.5 w-3.5" />
      </button>

      <button
        onClick={() => onReply(message)}
        className="rounded-md p-1 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700"
        title="Cavab ver"
      >
        <Icon name="reply" className="h-3.5 w-3.5" />
      </button>

      <button
        onClick={() => onCreateTask(message)}
        className="rounded-md p-1 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700"
        title="Tapşırıq yarat"
      >
        <Icon name="tasks" className="h-3.5 w-3.5" />
      </button>

      {outgoing && (
        <button
          onClick={() => onEdit(message)}
          className="rounded-md p-1 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700"
          title="Düzəliş et"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
            />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div
      data-message-id={message.id}
      className={`
        message-row
        group
        relative
        flex
        w-full
        min-w-0
        items-end
        gap-2
        ${outgoing ? 'justify-end' : 'justify-start'}
      `}
    >
      {outgoing && actions}

      <div
        className={`
          message-bubble
          relative
          min-w-0
          max-w-[82%]
          rounded-xl
          border
          px-3.5
          py-3
          shadow-[0_2px_8px_rgba(15,23,42,0.05)]
          transition
          hover:-translate-y-[1px]
          hover:shadow-md
          md:max-w-[68%]

          ${
            outgoing
              ? `
                rounded-br-sm
                border-slate-200
                bg-slate-100
                text-slate-800
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
              `
              : `
                rounded-bl-sm
                border-slate-200
                bg-white
                text-slate-800
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-100
              `
          }
        `}
      >
        {outgoing && (
          <span
            className="
              absolute
              bottom-3
              right-0
              top-3
              w-[3px]
              rounded-l-full
              bg-emerald-500
            "
          />
        )}

        {!outgoing && message.sender && (
          <div
            className="
              mb-1
              text-[11px]
              font-semibold
              text-slate-500
              dark:text-slate-400
            "
          >
            {message.sender}
          </div>
        )}

        {replyTo && (
          <div className="mb-2 w-[260px] max-w-full">
            <ReplyQuote
              reply={replyTo}
              outgoing={outgoing}
              onJump={onJumpToMessage}
            />
          </div>
        )}

        {message.type === 'voice' ? (
          <VoiceNote
            message={message}
            playing={playing}
            onToggle={onPlay}
            notify={notify}
          />
        ) : message.type === 'poll' ? (
          <div
            className="
              message-poll
              w-[320px]
              max-w-full
              min-w-0
              space-y-3
              rounded-xl
              border
              border-slate-200
              bg-white
              p-3
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                border-b
                border-slate-200
                pb-2
                dark:border-slate-700
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-100
                  text-slate-600
                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                <Icon name="poll" className="h-4 w-4" />
              </span>

              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Ümumi Sorğu
              </span>
            </div>

            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {message.question}
            </p>

            <div className="space-y-2">
              {message.options.map(option => {
                const percent =
                  totalVotes
                    ? Math.round(
                        option.votes /
                          totalVotes *
                          100
                      )
                    : 0;

                const selected =
                  message.userVoted === option.id;

                return (
                  <div
                    key={option.id}
                    onClick={() =>
                      onVote(
                        message.id,
                        option.id
                      )
                    }
                    className={`
                      relative
                      cursor-pointer
                      overflow-hidden
                      rounded-lg
                      border
                      p-2.5
                      transition

                      ${
                        selected
                          ? `
                            border-emerald-200
                            bg-emerald-50
                            dark:border-emerald-800
                            dark:bg-emerald-950/30
                          `
                          : `
                            border-slate-200
                            bg-slate-50
                            hover:bg-slate-100
                            dark:border-slate-700
                            dark:bg-slate-800
                          `
                      }
                    `}
                  >
                    <div
                      className="
                        absolute
                        inset-y-0
                        left-0
                        bg-emerald-100/50
                        dark:bg-emerald-900/20
                      "
                      style={{
                        width: `${percent}%`
                      }}
                    />

                    <div
                      className="
                        relative
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-xs
                        font-semibold
                        text-slate-700
                        dark:text-slate-200
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                            flex
                            h-4
                            w-4
                            items-center
                            justify-center
                            rounded-full
                            border
                            text-[9px]

                            ${
                              selected
                                ? `
                                  border-emerald-500
                                  bg-emerald-500
                                  text-white
                                `
                                : `
                                  border-slate-300
                                  bg-white
                                  text-transparent
                                  dark:border-slate-600
                                  dark:bg-slate-900
                                `
                            }
                          `}
                        >
                          {selected ? '✓' : ''}
                        </span>

                        <span>{option.text}</span>
                      </div>

                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        {percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-right text-[10px] text-slate-400">
              {totalVotes} səs toplanıb
            </div>
          </div>
        ) : (
          <>
            <div
              className="
                whitespace-pre-wrap
                text-xs
                leading-relaxed
                [overflow-wrap:anywhere]
                md:text-sm
              "
            >
              <MentionText
                text={
                  legacyImage
                    ? '📷 Şəkil göndərildi:'
                    : bodyText
                }
                outgoing={outgoing}
              />
            </div>

            {image && (
              <img
                src={image}
                alt={
                  message.fileName ||
                  'Göndərilən şəkil'
                }
                className="
                  my-2
                  max-h-52
                  rounded-xl
                  border
                  border-slate-200
                  object-cover
                  shadow-sm
                  dark:border-slate-700
                "
              />
            )}

            {message.embeddedTask && (
              <div
                onClick={() =>
                  onTaskDetail(
                    message.embeddedTask.id
                  )
                }
                className="
                  mt-2.5
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  p-2.5
                  transition
                  hover:bg-slate-50
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-900
                      text-xs
                      font-bold
                      text-white
                      dark:bg-slate-700
                    "
                  >
                    #{message.embeddedTask.id}
                  </div>

                  <div className="min-w-0">
                    <h5 className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {message.embeddedTask.title}
                    </h5>

                    <p className="font-mono text-[10px] text-slate-500">
                      Dedlayn: {message.embeddedTask.deadline}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-slate-600
                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >
                  Baxış
                </span>
              </div>
            )}
          </>
        )}

        {!!Object.keys(message.reactions || {}).length && (
          <div
            className="
              mt-2
              flex
              flex-wrap
              items-center
              gap-1
              border-t
              border-slate-200
              pt-2
              dark:border-slate-700
            "
          >
            {Object.entries(message.reactions).map(
              ([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() =>
                    onReaction(message.id, emoji)
                  }
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-white
                    px-2
                    py-0.5
                    text-[11px]
                    font-semibold
                    text-slate-700
                    ring-1
                    ring-slate-200
                    transition
                    hover:bg-slate-50
                    dark:bg-slate-900
                    dark:text-slate-200
                    dark:ring-slate-700
                  "
                >
                  <span>{emoji}</span>
                  <span className="font-mono text-[10px]">
                    {count}
                  </span>
                </button>
              )
            )}
          </div>
        )}

        <div
          className="
            mt-1
            flex
            select-none
            items-center
            justify-end
            gap-1
            text-[10px]
            text-slate-400
          "
        >
          <span>{message.time}</span>

          {outgoing && (
            <svg
              className="ml-1 h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1 8.5L4.5 12L9 6.5"
                stroke="#60a5fa"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M6 8.5L9.5 12L14 6.5"
                stroke="#60a5fa"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {!outgoing && actions}
    </div>
  );
}