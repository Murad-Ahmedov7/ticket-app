import {
  useEffect,
  useRef,
  useState
} from 'react';

export default function VoiceNote({
  message,
  playing,
  onToggle,
  notify
}) {
  const audio = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const Context =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!Context) return;

    const ctx = new Context();
    audio.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(
      220,
      ctx.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
      330,
      ctx.currentTime + 2
    );

    osc.frequency.exponentialRampToValueAtTime(
      190,
      ctx.currentTime + 5
    );

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(
      800,
      ctx.currentTime
    );
    filter.Q.setValueAtTime(
      3,
      ctx.currentTime
    );

    gain.gain.setValueAtTime(
      0.08,
      ctx.currentTime
    );

    gain.gain.linearRampToValueAtTime(
      0.08,
      ctx.currentTime + 4.9
    );

    gain.gain.linearRampToValueAtTime(
      0.001,
      ctx.currentTime + 5
    );

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    ctx.resume().catch(() => {});

    osc.start();
    osc.stop(ctx.currentTime + 5);

    const interval = setInterval(
      () =>
        setStep(value => value + 1),
      100
    );

    return () => {
      clearInterval(interval);

      try {
        osc.stop();
      } catch {}

      osc.disconnect();
      filter.disconnect();
      gain.disconnect();

      ctx.close().catch(() => {});
      audio.current = null;
    };
  }, [playing]);

  const heights = [
    12, 20, 8, 24, 16, 8,
    20, 12, 24, 8, 16
  ];

  return (
    <div
      className="
        flex
        w-[230px] max-w-full min-w-0
        items-center
        gap-3
        rounded-xl
        border
        border-[var(--message-border,#cbd6d0)]
        dark:border-[var(--message-border,#475569)]
        [background-image:linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)] dark:[background-image:linear-gradient(160deg,rgba(255,255,255,0.045),rgba(255,255,255,0)_70%)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        bg-[var(--message-inner,#e9efec)]
        px-2.5
        py-2
        dark:bg-[var(--message-inner,#293548)]
      "
    >
      <button
        onClick={onToggle}
        title={
          playing
            ? 'Səsi dayandır'
            : 'Səsi oxut'
        }
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500
          transition
          hover:scale-[1.02]
          active:scale-95
        "
      >
        <svg
          className={`
            h-4
            w-4
            ${playing ? '' : 'ml-0.5'}
          `}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d={
              playing
                ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'
                : 'M8 5v14l11-7z'
            }
          />
        </svg>
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className="
            flex
            h-7
            cursor-pointer
            items-end
            gap-1.5
            py-1
          "
          onClick={() =>
            notify?.(
              `Audio zaman xətti: ${message.duration}`
            )
          }
        >
          {heights.map((height, index) => (
            <span
              key={index}
              className={`
                audio-waveform-bar
                w-1.5
                rounded-full
                ${
                  playing
                    ? 'bg-slate-600 dark:bg-slate-300'
                    : 'bg-slate-400 dark:bg-slate-500'
                }
              `}
              style={{
                height: playing
                  ? Math.floor(
                      Math.sin(
                        (step + index) * 0.8
                      ) *
                        10 +
                        14
                    )
                  : height
              }}
            />
          ))}
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            text-[11px] tabular-nums
            font-medium
            text-slate-600
            dark:text-slate-400
          "
        >
          <span>0:00</span>
          <span>{message.duration}</span>
        </div>
      </div>
    </div>
  );
}
