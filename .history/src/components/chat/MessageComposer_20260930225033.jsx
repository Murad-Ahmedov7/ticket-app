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
            border-slate-200/80
            bg-[#f5f6f2]
            px-4
            py-2.5
            dark:border-slate-800
            dark:from-slate-900/80
            dark:to-slate-900
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
              bg-white/80
              text-slate-500
              shadow-sm
              ring-1
              ring-slate-200/80
              transition
              hover:bg-slate-100
              hover:text-slate-700
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
          border-slate-200/80
          bg-[#f5f6f2]
          p-3
          dark:border-slate-800
          dark:bg-slate-900
          md:p-4
        "
      >
        <form
          onSubmit={submit}
          className="
            chat-compose-form
            relative
            flex
            items-center
            gap-1
            rounded-xl
            border
            border-slate-200
            bg-white
            p-1.5
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-800/90
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
              text-slate-500
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
              text-slate-500
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
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-700
              dark:hover:text-emerald-300
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
              placeholder:text-slate-400
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
                    animate-pulse
                    bg-rose-600
                    text-white
                  `
                  : `
                    bg-slate-200
                    text-slate-700
                    hover:bg-slate-300
                    dark:bg-slate-700
                    dark:text-slate-100
                    dark:hover:bg-slate-600
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
              bg-emerald-600
              p-2.5
              text-white
              shadow-sm
              transition
              hover:bg-emerald-700
              active:scale-95
              dark:bg-emerald-600
              dark:hover:bg-emerald-500
            "
          >
            <Icon
              name="send"
              className="h-5 w-5 rotate-90"
              strokeWidth={2.2}
            />
          </button>
        </form>
      </div>
    </>
  );
}