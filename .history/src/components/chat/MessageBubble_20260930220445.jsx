import ReplyQuote from './ReplyQuote.jsx';
import { getMessageContent } from '../../utils/messageReply.js';
import Icon from '../common/Icons.jsx';
import VoiceNote from './VoiceNote.jsx';

function MentionText({
  text = '',
  outgoing = false
}) {
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
                ? `
                  bg-emerald-100
                  text-emerald-700
                  dark:bg-emerald-950/60
                  dark:text-emerald-300
                `
                : `
                  bg-emerald-50
                  text-emerald-700
                  dark:bg-emerald-950/40
                  dark:text-emerald-300
                `
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
  const {
    text: bodyText,
    replyTo
  } = getMessageContent(message);

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

  const image =
    message.image || legacyImage;

  const actions = (
    <div
      className="
        message-actions
        mb-2
        flex
        items-center
        gap-0.5
        rounded-xl
        border
        border-slate-200
        bg-white
        px-1
        py-0.5
        text-slate-500
        opacity-0
        shadow-sm
        transition-opacity
        group-hover:opacity-100
        focus-within:opacity-100
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-400
      "
    >
      <button
        onClick={event =>
          onReactionPicker(event, message.id)
        }
        className="
          rounded-md
          p-1
          transition
          hover:bg-slate-100
          hover:text-amber-500
          dark:hover:bg-slate-700
        "
        title="Reaksiya bildir"
      >
        <Icon
          name="smile"
          className="h-3.5 w-3.5"
        />
      </button>

      <button
        onClick={() => onReply(message)}
        className="
          rounded-md
          p-1
          transition
          hover:bg-slate-100
          hover:text-emerald-600
          dark:hover:bg-slate-700
          dark:hover:text-emerald-400
        "
        title="Cavab ver"
      >
        <Icon
          name="reply"
          className="h-3.5 w-3.5"
        />
      </button>

      <button
        onClick={() => onCreateTask(message)}
        className="
          rounded-md
          p-1
          transition
          hover:bg-slate-100
          hover:text-emerald-600
          dark:hover:bg-slate-700
          dark:hover:text-emerald-400
        "
        title="Tapşırıq yarat (Halal 16)"
      >
        <Icon
          name="tasks"
          className="h-3.5 w-3.5"
        />
      </button>

      {outgoing && (
        <button
          onClick={() => onEdit(message)}
          className="
            rounded-md
            p-1
            transition
            hover:bg-slate-100
            hover:text-slate-800
            dark:hover:bg-slate-700
            dark:hover:text-white
          "
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
        gap-1.5

        ${
          outgoing
            ? 'justify-end'
            : 'justify-start'
        }
      `}
    >
      {outgoing && actions}

      <div
        className={`
          message-bubble
          relative
          min-w-0
          max-w-[82%]
          rounded-2xl
          border
          p-3.5
          shadow-[0_2px_8px_rgba(15,23,42,0.05)]
          transition-all
          md:max-w-[68%]

          ${
            outgoing
              ? `
                rounded-tr-sm
                border-emerald-100
                bg-emerald-50
                text-slate-800

                dark:border-emerald-900/50
                dark:bg-emerald-950/30
                dark:text-slate-100
              `
              : `
                rounded-tl-sm
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
        {!outgoing && message.sender && (
          <div
            className="
              mb-1
              flex
              items-center
              gap-1.5
              text-[11px]
              font-bold
              text-slate-700
              dark:text-slate-200
            "
          >
            <span>
              {message.sender}
            </span>
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
              w-[300px]
              max-w-full
              min-w-0
              space-y-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-3
              text-slate-800
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-100
            "
          >
            {/* POLL HEADER */}
            <div
              className="
                flex
                items-center
                gap-2
                border-b
                border-slate-100
                pb-2
                dark:border-slate-800
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
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-950/50
                  dark:text-emerald-400
                "
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-5h5v5zm0-7H7V7h5v3zm7 7h-5V7h5v10z" />
                </svg>
              </span>

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                Ümumi Sorğu
              </span>
            </div>

            {/* QUESTION */}
            <p
              className="
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {message.question}
            </p>

            {/* OPTIONS */}
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
                      rounded-xl
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
                            dark:bg-slate-800/60
                            dark:hover:bg-slate-800
                          `
                      }
                    `}
                  >
                    <div
                      className="
                        absolute
                        inset-y-0
                        left-0
                        rounded-lg
                        bg-emerald-100/60
                        transition-all
                        duration-500
                        dark:bg-emerald-900/30
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
                                  font-bold
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

                        <span>
                          {option.text}
                        </span>
                      </div>

                      <span
                        className="
                          font-mono
                          text-[11px]
                          font-bold
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="
                pt-0.5
                text-right
                text-[10px]
                text-slate-400
              "
            >
              {totalVotes} səs toplanıb
            </div>
          </div>
        ) : (
          <>
            {/* TEXT */}
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

            {/* IMAGE */}
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

            {/* EMBEDDED TASK */}
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
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-2.5
                  transition
                  hover:bg-slate-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:hover:bg-slate-700
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-emerald-600
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    #{message.embeddedTask.id}
                  </div>

                  <div className="min-w-0">

                    <h5
                      className="
                        truncate
                        text-xs
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {message.embeddedTask.title}
                    </h5>

                    <p
                      className="
                        font-mono
                        text-[10px]
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Dedlayn:{' '}
                      {
                        message.embeddedTask
                          .deadline
                      }
                    </p>

                  </div>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-lg
                    bg-white
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-emerald-700
                    ring-1
                    ring-slate-200
                    dark:bg-slate-900
                    dark:text-emerald-300
                    dark:ring-slate-700
                  "
                >
                  Baxış
                </span>
              </div>
            )}
          </>
        )}

        {/* REACTIONS */}
        {!!Object.keys(
          message.reactions || {}
        ).length && (
          <div
            className="
              mt-2
              flex
              flex-wrap
              items-center
              gap-1
              border-t
              border-slate-100
              pt-2
              dark:border-slate-800
            "
          >
            {Object.entries(
              message.reactions
            ).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() =>
                  onReaction(
                    message.id,
                    emoji
                  )
                }
                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  bg-slate-100
                  px-2
                  py-0.5
                  text-[11px]
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-200
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <span>{emoji}</span>

                <span
                  className="
                    font-mono
                    text-[10px]
                    font-bold
                  "
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* TIME */}
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
          <span>
            {message.time}
          </span>

          {outgoing && (
            <svg
              className="
                ml-1
                inline
                h-3.5
                w-3.5
              "
              viewBox="0 0 16 16"
              fill="none"
              aria-label="sent status"
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