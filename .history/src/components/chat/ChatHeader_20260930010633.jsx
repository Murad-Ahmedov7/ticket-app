import Icon from '../common/Icons.jsx';

const PERSON_AVATARS = [
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=56',
  'https://i.pravatar.cc/150?img=68',
];

function getAvatarByName(name = '') {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return PERSON_AVATARS[
    Math.abs(hash) % PERSON_AVATARS.length
  ];
}

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

  const conversationAvatar =
    conversation?.avatar ||
    getAvatarByName(conversation?.name);

  const visibleMembers = members.slice(0, 3);

  const remainingMembers =
    members.length > visibleMembers.length
      ? members.length - visibleMembers.length
      : 0;

  return (
    <header
      className="
        chat-header
        relative
        z-10
        flex
        min-h-[86px]
        shrink-0
        items-center
        justify-between
        gap-4
        border-b
        border-slate-200
        bg-white
        px-5
        py-3.5
        dark:border-slate-800
        dark:bg-slate-900
        sm:px-6
      "
    >

      {/* LEFT SIDE */}
      <div className="flex min-w-0 flex-1 items-center gap-3.5">

        {/* BACK */}
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
            dark:text-slate-500
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

        {/* MAIN AVATAR */}
        <div className="relative shrink-0">

          {isGroup ? (
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-emerald-50
                text-emerald-600
                ring-1
                ring-emerald-100
                dark:bg-emerald-950/40
                dark:text-emerald-300
                dark:ring-emerald-900
              "
            >
              <Icon
                name="groups"
                className="h-[22px] w-[22px]"
              />
            </div>
          ) : (
            <img
              src={conversationAvatar}
              alt={conversation?.name}
              className="
                h-12
                w-12
                rounded-full
                object-cover
                ring-1
                ring-slate-200
                dark:ring-slate-700
              "
            />
          )}

          {/* ONLINE */}
          <span
            className="
              absolute
              bottom-0
              right-0
              h-3.5
              w-3.5
              rounded-full
              border-[2.5px]
              border-white
              bg-emerald-500
              dark:border-slate-900
            "
          />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          {/* NAME */}
          <div className="flex min-w-0 items-center gap-2">

            <h2
              className="
                min-w-0
                truncate
                text-[16px]
                font-extrabold
                tracking-[-0.015em]
                text-slate-950
                dark:text-white
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
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              {isGroup ? 'Qrup' : 'Şəxsi'}
            </span>

          </div>

          {/* GROUP MEMBERS */}
          {isGroup ? (
            <div
              className="
                mt-1.5
                flex
                min-w-0
                items-center
                gap-2
              "
            >

              {/* AVATAR STACK */}
              <div className="flex shrink-0 -space-x-1.5">

                {visibleMembers.map((member, index) => (
                  <img
                    key={`${member}-${index}`}
                    src={getAvatarByName(member)}
                    alt={member}
                    title={member}
                    className="
                      h-5
                      w-5
                      rounded-full
                      border-2
                      border-white
                      object-cover
                      dark:border-slate-900
                    "
                  />
                ))}

                {remainingMembers > 0 && (
                  <div
                    className="
                      flex
                      h-5
                      min-w-5
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-slate-100
                      px-1
                      text-[8px]
                      font-bold
                      text-slate-500
                      dark:border-slate-900
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    +{remainingMembers}
                  </div>
                )}

              </div>

              {/* MEMBER COUNT */}
              <span
                className="
                  shrink-0
                  text-[11px]
                  font-semibold
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {members.length} iştirakçı
              </span>

              <span
                className="
                  h-1
                  w-1
                  shrink-0
                  rounded-full
                  bg-slate-300
                  dark:bg-slate-600
                "
              />

              {/* MEMBER NAMES */}
              <span
                className="
                  min-w-0
                  truncate
                  text-[11px]
                  font-medium
                  text-slate-400
                  dark:text-slate-500
                "
                title={members.join(', ')}
              >
                {members.length
                  ? members.slice(0, 3).join(', ')
                  : 'İştirakçı yoxdur'}
              </span>

            </div>
          ) : (

            /* DIRECT CHAT STATUS */
            <div className="mt-1.5 flex items-center gap-1.5">

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />

              <span
                className="
                  text-[11px]
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Onlayn
              </span>

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-slate-300
                  dark:bg-slate-600
                "
              />

              <span
                className="
                  text-[11px]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Halal Portal
              </span>

            </div>
          )}

        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div
        className="
          flex
          shrink-0
          items-center
          rounded-xl
          border
          border-slate-200
          bg-slate-50/80
          p-1
          dark:border-slate-700
          dark:bg-slate-800/60
        "
      >

        {/* CALL */}
        <button
          type="button"
          onClick={onCall}
          title="Zəng et"
          aria-label="Zəng et"
          className="
            group
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition-all
            hover:bg-white
            hover:text-emerald-600
            hover:shadow-sm
            active:scale-95
            dark:text-slate-400
            dark:hover:bg-slate-700
            dark:hover:text-emerald-300
          "
        >
          <Icon
            name="phone"
            className="h-[17px] w-[17px]"
          />
        </button>

        {/* DIVIDER */}
        <span
          className="
            mx-0.5
            h-5
            w-px
            bg-slate-200
            dark:bg-slate-700
          "
        />

        {/* CREATE TASK */}
        <button
          type="button"
          onClick={onCreateTask}
          title="Tapşırıq yarat"
          aria-label="Tapşırıq yarat"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition-all
            hover:bg-white
            hover:text-emerald-600
            hover:shadow-sm
            active:scale-95
            dark:text-slate-400
            dark:hover:bg-slate-700
            dark:hover:text-emerald-300
          "
        >
          <Icon
            name="plus"
            className="h-[17px] w-[17px]"
            strokeWidth={2.2}
          />
        </button>

        {/* INFO */}
        <button
          type="button"
          onClick={onInfo}
          title="Söhbət məlumatları"
          aria-label="Söhbət məlumatları"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition-all
            hover:bg-white
            hover:text-slate-800
            hover:shadow-sm
            active:scale-95
            dark:text-slate-400
            dark:hover:bg-slate-700
            dark:hover:text-white
          "
        >
          <Icon
            name="edit"
            className="h-[17px] w-[17px]"
          />
        </button>

        {/* ADD MEMBER */}
        {isGroup && (
          <>
            <span
              className="
                mx-0.5
                h-5
                w-px
                bg-slate-200
                dark:bg-slate-700
              "
            />

            <button
              type="button"
              onClick={onAddMember}
              title="İştirakçı əlavə et"
              aria-label="İştirakçı əlavə et"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-emerald-600
                transition-all
                hover:bg-emerald-50
                active:scale-95
                dark:text-emerald-400
                dark:hover:bg-emerald-950/40
              "
            >
              <Icon
                name="addMember"
                className="h-[17px] w-[17px]"
                strokeWidth={2.3}
              />
            </button>
          </>
        )}

      </div>

    </header>
  );
}