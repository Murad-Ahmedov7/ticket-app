import Icon from '../common/Icons.jsx';

const PERSON_AVATARS = [
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=47',
];

export default function ChatHeader({
  conversation,
  onCall,
  onCreateTask,
  onInfo,
  onAddMember,
  onShowConversations
}) {
  const isGroup = conversation?.type === 'group';
  const members = conversation?.members || [];

  const avatarIndex =
    Math.abs(Number(conversation?.id) || 0) %
    PERSON_AVATARS.length;

  return (
    <header
      className="
        chat-header
        relative
        z-10
        flex
        min-h-20
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-5
        py-3
        dark:border-slate-800
        dark:bg-slate-900
        sm:px-6
      "
    >

      {/* LEFT */}
      <div className="chat-header-identity flex min-w-0 items-center gap-3.5">

        <button
          type="button"
          onClick={onShowConversations}
          title="Söhbətlərə qayıt"
          aria-label="Söhbətlərə qayıt"
          className="
            chat-back
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-800
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-slate-100
          "
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* AVATAR */}
        <div className="chat-header-avatar relative shrink-0">

          {isGroup ? (
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-emerald-100
                text-emerald-700
                dark:bg-emerald-950
                dark:text-emerald-300
              "
            >
              <Icon
                name="groups"
                className="h-5 w-5"
              />
            </div>
          ) : (
            <img
              src={
                conversation?.avatar ||
                PERSON_AVATARS[avatarIndex]
              }
              alt={conversation?.name}
              className="
                h-11
                w-11
                rounded-full
                object-cover
              "
            />
          )}

          <span
            className="
              absolute
              -bottom-0.5
              -right-0.5
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-white
              bg-emerald-500
              dark:border-slate-900
            "
          />
        </div>

        {/* INFO */}
        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <h2
              className="
                min-w-0
                truncate
                text-base
                font-bold
                text-slate-900
                dark:text-slate-100
              "
            >
              {conversation?.name}
            </h2>

            <span
              className="
                shrink-0
                rounded-md
                bg-slate-100
                px-2
                py-0.5
                text-[10px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>

          </div>

          <p
            className="
              mt-1
              flex
              items-start
              gap-1.5
              text-xs
              leading-relaxed
              text-slate-500
              dark:text-slate-400
            "
          >
            <span
              className="
                mt-1
                h-2
                w-2
                shrink-0
                rounded-full
                bg-emerald-500
              "
            />

            <span className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">
              {isGroup
                ? `${members.length || 0} iştirakçı • ${
                    members.join(', ') || 'Heç kim yoxdur'
                  }`
                : 'Onlayn • Halal Portal'}
            </span>
          </p>

        </div>
      </div>

      {/* ACTIONS */}
      <div className="chat-header-actions flex shrink-0 items-center gap-2">

        {/* CALL */}
        <button
          onClick={onCall}
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-emerald-600
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-emerald-400
          "
          title="Zəng et"
        >
          <Icon
            name="phone"
            className="h-4 w-4"
          />
        </button>

        {/* CREATE TASK */}
        <button
          onClick={onCreateTask}
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-emerald-600
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-emerald-400
          "
          title="Tapşırıq yarat"
        >
          <Icon
            name="plus"
            className="h-4 w-4"
            strokeWidth={2.2}
          />
        </button>

        {/* INFO */}
        <button
          onClick={onInfo}
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-slate-800
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-slate-100
          "
          title="Ətraflı məlumat"
        >
          <Icon
            name="edit"
            className="h-4 w-4"
          />
        </button>

        {/* ADD MEMBER */}
        <button
          onClick={onAddMember}
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-emerald-600
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-emerald-400
          "
          title="İştirakçı əlavə et"
        >
          <Icon
            name="addMember"
            className="h-4 w-4"
            strokeWidth={2.4}
          />
        </button>

      </div>
    </header>
  );
}