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
        min-h-[82px]
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
      <div className="flex min-w-0 items-center gap-3.5">

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
            rounded-xl
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
            dark:hover:bg-slate-800
            dark:hover:text-slate-200
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
        <div className="relative shrink-0">

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
              h-3
              w-3
              rounded-full
              border-2
              border-white
              bg-emerald-500
              dark:border-slate-900
            "
          />
        </div>

        {/* INFO */}
        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <h2
              className="
                truncate
                text-[15px]
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {conversation?.name}
            </h2>

            <span
              className="
                rounded-md
                bg-slate-100
                px-2
                py-0.5
                text-[10px]
                font-semibold
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
              truncate
              text-xs
              text-slate-400
            "
          >
            {isGroup
              ? `${members.length} iştirakçı${
                  members.length
                    ? ` • ${members.join(', ')}`
                    : ''
                }`
              : 'Onlayn • Halal Portal'}
          </p>

        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex shrink-0 items-center gap-1.5">

        <button
          onClick={onCall}
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-emerald-600
            dark:text-slate-400
            dark:hover:bg-slate-800
          "
          title="Zəng et"
        >
          <Icon
            name="phone"
            className="h-4 w-4"
          />
        </button>

        <button
          onClick={onCreateTask}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-50
            px-3
            py-2
            text-xs
            font-semibold
            text-emerald-700
            transition
            hover:bg-emerald-100
            dark:bg-emerald-950/40
            dark:text-emerald-300
          "
          title="Tapşırıq yarat"
        >
          <Icon
            name="plus"
            className="h-4 w-4"
          />

          <span className="chat-action-label">
            Tapşırıq
          </span>
        </button>

        <button
          onClick={onInfo}
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-100
            dark:text-slate-400
            dark:hover:bg-slate-800
          "
          title="Ətraflı məlumat"
        >
          <Icon
            name="edit"
            className="h-4 w-4"
          />
        </button>

        <button
          onClick={onAddMember}
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-emerald-600
            dark:text-slate-400
            dark:hover:bg-slate-800
          "
          title="İştirakçı əlavə et"
        >
          <Icon
            name="addMember"
            className="h-4 w-4"
          />
        </button>

      </div>
    </header>
  );
}