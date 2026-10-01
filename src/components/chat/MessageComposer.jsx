import ReplyQuote from './ReplyQuote.jsx';
import { createReplySnapshot } from '../../utils/messageReply.js';
import {
  useEffect,
  useRef,
  useState
} from 'react';
import Icon from '../common/Icons.jsx';

export default function MessageComposer({
  reply,
  onCancelReply,
  onSend,
  onFile,
  onLocation,
  onPoll,
  onVoice,
  notify
}) {
  const [text, setText] =
    useState('');

  const [recording, setRecording] =
    useState(false);

  const input = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (reply) {
      input.current?.focus();
    }
  }, [reply]);

  function submit(event) {
    event.preventDefault();

    if (!text.trim()) return;

    onSend(text.trim());
    setText('');
  }

  return (
    <>
      {reply && (
        <div
          className="
            chat-reply
            flex
            min-w-0
            shrink-0
            items-center
            gap-2
            border-t
            border-slate-300/70
            bg-[#f8faf9]
            px-4
            py-2.5
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="min-w-0 flex-1">
            <ReplyQuote
              reply={
                createReplySnapshot(reply)
              }
            />
          </div>

          <button
            type="button"
            onClick={onCancelReply}
            title="Cavabı ləğv et"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#f8faf9]
              text-slate-500
              shadow-sm
              ring-1
              ring-slate-200/80
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:bg-slate-800
              dark:text-slate-300
              dark:ring-slate-700
              dark:hover:bg-slate-700
            "
          >
            <Icon name="close" />
          </button>
        </div>
      )}

      <div
        className="
          chat-composer
          shrink-0
          border-t
          border-slate-300/70
          bg-[#f8faf9]
          p-3
          dark:border-slate-700
          dark:bg-slate-900
          md:p-4
        "
      >
        <form
          onSubmit={submit}
          className="
            chat-compose-form
            [background-image:linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)] dark:[background-image:linear-gradient(160deg,rgba(255,255,255,0.045),rgba(255,255,255,0)_70%)]
            relative
            flex
            items-center
            gap-1
            rounded-2xl
            border
            border-slate-300/70
            bg-[#f8faf9]
            p-1.5
            shadow-[0_2px_6px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.55)] dark:shadow-[0_2px_6px_rgba(2,6,23,0.14),inset_0_1px_0_rgba(255,255,255,0.07)] transition-colors focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:focus-within:border-emerald-500/50 dark:focus-within:ring-emerald-400/10

            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <button
            type="button"
            onClick={() =>
              fileInput.current?.click()
            }
            className="
              rounded-full
              p-2.5
              text-slate-600
              dark:text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-700
              dark:hover:text-slate-100
            "
          >
            <Icon
              name="attachment"
              className="h-5 w-5"
            />
          </button>

          <input
            ref={fileInput}
            type="file"
            className="hidden"
            onChange={e => {
              if (e.target.files[0]) {
                onFile(e.target.files[0]);
              }

              e.target.value = '';
            }}
          />

          <button
            type="button"
            onClick={onLocation}
            className="
              rounded-full
              p-2.5
              text-slate-600
              dark:text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-700
              dark:hover:text-slate-100
            "
          >
            <Icon
              name="location"
              className="h-5 w-5"
            />
          </button>

          <button
            type="button"
            onClick={onPoll}
            className="
              rounded-full
              p-2.5
              text-slate-600
              dark:text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-700
              dark:hover:text-slate-100
            "
          >
            <Icon
              name="poll"
              className="h-5 w-5"
            />
          </button>

          <textarea
            ref={input}
            rows="1"
            value={text}
            onChange={e =>
              setText(e.target.value)
            }
            onKeyDown={e => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey
              ) {
                submit(e);
              }
            }}
            placeholder="Mesajınızı daxil edin..."
            className="
              min-w-0
              w-0
              max-h-32
              flex-1
              resize-none
              bg-transparent
              px-2
              py-2
              text-xs
              text-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              focus:outline-none
              dark:text-slate-100
              md:text-sm
            "
          />

          <button
            type="button"
            onClick={() => {
              if (recording) {
                onVoice();
              } else {
                notify?.(
                  'Mikrofon yazır... Tamamlamaq üçün yenidən vurun'
                );
              }

              setRecording(
                !recording
              );
            }}
            className={`
              rounded-full
              p-2.5
              transition
              shadow-sm

              ${
                recording
                  ? `
                    animate-pulse bg-emerald-600 text-white
                  `
                  : `
                    bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600
                  `
              }
            `}
          >
            <Icon
              name="mic"
              className="h-5 w-5"
            />
          </button>

          <button
            type="submit"
            className="
              rounded-full
              bg-emerald-700 p-2.5
              text-white
              shadow-sm
              transition
              hover:bg-emerald-800 active:scale-95
              dark:bg-slate-700 dark:text-emerald-300
              dark:hover:bg-slate-600
            "
          >
            <Icon
              name="send"
              className="h-5 w-5 rotate-90"
              strokeWidth={2}
            />
          </button>
        </form>
      </div>
    </>
  );
}
