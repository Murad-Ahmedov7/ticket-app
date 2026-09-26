import { useEffect, useRef, useState } from 'react';
import Icon from '../common/Icons.jsx';
import { createPollOptionDrag } from '../../utils/pollOptionDrag.js';

export default function PollModal({ onClose, onSave, notify }) {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const optionRows = useRef([]);
  const reorder = useRef(null);
  reorder.current = swapOptions;
  const [optionDrag] = useState(() => createPollOptionDrag({
    getRows: () => optionRows.current,
    onSwap: () => reorder.current(),
  }));
  useEffect(() => () => optionDrag.cancel(), [optionDrag]);

  function swapOptions() {
    setOption1(option2);
    setOption2(option1);
  }

  function submit(event) {
    event.preventDefault();
    if (!question.trim()) return notify('Zəhmət olmasa sualı daxil edin');
    onSave(question.trim(), option1.trim() || 'Hə', option2.trim() || 'Yox');
  }

  const inputClass = 'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-400/20';

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="poll-heading" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm dark:bg-black/65 sm:p-4">
      <form onSubmit={submit} className="animate-modal flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.2)] dark:border-emerald-900/70 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
        <header className="relative shrink-0 border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-teal-50/70 to-white px-5 py-5 dark:border-emerald-900/60 dark:from-emerald-950 dark:via-teal-950/70 dark:to-slate-900 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-600/20 dark:from-emerald-600 dark:to-teal-700">
              <Icon name="poll" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 id="poll-heading" className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">Yeni sorğu yarat</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Sualını paylaş, komandanın fikrini öyrən.</p>
            </div>
            <button type="button" onClick={onClose} title="Bağla" aria-label="Bağla" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-emerald-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-emerald-900/60 dark:hover:text-emerald-300">
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="min-h-0 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          <div>
            <label htmlFor="poll-question" className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-200">Sual:</label>
            <textarea id="poll-question" rows={2} value={question} onChange={e => setQuestion(e.target.value)} placeholder="Məsələn, növbəti görüşü hansı gün keçirək?" className={`${inputClass} resize-none leading-relaxed`} />
          </div>

          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Cavab variantları</legend>
            <div className="space-y-2">
              {[
                { id: 'poll-option1', value: option1, onChange: setOption1 },
                { id: 'poll-option2', value: option2, onChange: setOption2 },
              ].map((option, index) => (
                <div
                  key={option.id}
                  ref={node => { optionRows.current[index] = node; }}
                  onPointerDown={event => optionDrag.start(event, index)}
                  onPointerMove={optionDrag.move}
                  onPointerUp={optionDrag.end}
                  onPointerCancel={optionDrag.cancel}
                  onLostPointerCapture={optionDrag.cancel}
                  onDragStart={event => event.preventDefault()}
                  className="flex touch-none items-center gap-3 rounded-lg border-b-2 border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-500 dark:border-slate-700 dark:bg-slate-800/70 dark:focus-within:border-emerald-400"
                >
                  <label htmlFor={option.id} className="sr-only">Variant {index + 1}</label>
                  <input
                    id={option.id}
                    value={option.value}
                    onChange={e => option.onChange(e.target.value)}
                    placeholder="Əlavə et"
                    onKeyDown={event => {
                      if (event.altKey && ((event.key === 'ArrowUp' && index > 0) || (event.key === 'ArrowDown' && index === 0))) {
                        event.preventDefault();
                        swapOptions();
                        optionRows.current[1 - index]?.querySelector('input')?.focus();
                      }
                    }}
                    aria-keyshortcuts={index === 0 ? 'Alt+ArrowDown' : 'Alt+ArrowUp'}
                    className="min-w-0 flex-1 touch-none bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                  <span aria-hidden="true" className="pointer-events-none flex h-8 w-8 shrink-0 items-center justify-center text-slate-400 dark:text-slate-500">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 9h14M5 15h14" /></svg>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">Boş variantlar “Hə” və “Yox” kimi göstəriləcək.</p>
          </fieldset>
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/30 sm:px-6">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-300">Ləğv et</button>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-900">
            <Icon name="poll" className="h-4 w-4" />
            Sorğunu başlat
          </button>
        </footer>
      </form>
    </div>
  );
}
