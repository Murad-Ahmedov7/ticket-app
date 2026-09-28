// import Icon from '../common/Icons.jsx';
// import { taskStatuses, statusLabel, statusDots } from '../../utils/helpers.js';

// export default function TaskDetailModal({ task, onClose, onStatus, onCycle, onDelete }) {
//   const selected = task.status === 'Tamamlandı' ? 'Bitmiş' : task.status;
//   return <div role="dialog" aria-modal="true" aria-label="Tapşırıq detalları" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm items-center justify-center p-4"><div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-modal space-y-4">
//     <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800"><div className="flex items-center gap-2"><span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">#{task.id}</span><h3 className="text-base font-bold text-slate-900 dark:text-white">{task.title}</h3></div><button onClick={onClose} title="Bağla" className="text-slate-400 hover:text-slate-600"><Icon name="close" className="w-5 h-5" /></button></div>
//     <div className="space-y-3 text-xs"><div><label className="text-slate-400">Mesaj / Təsvir:</label><p className="text-slate-800 dark:text-slate-200 mt-0.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-medium">{task.message || '-'}</p></div>
//       <div className="grid grid-cols-2 gap-3"><div><label className="text-slate-400">Təyin Edən:</label><p className="font-semibold text-slate-800 dark:text-slate-200">{task.creator}</p></div><div><label className="text-slate-400">İcraçı:</label><p className="font-semibold text-slate-800 dark:text-slate-200">{task.assignee}</p></div></div>
//       <div className="grid grid-cols-2 gap-3"><div><label className="text-slate-400">Yaradılma:</label><p className="font-mono text-slate-600 dark:text-slate-400">{task.createdAt}</p></div><div><label className="text-slate-400">Dedlayn:</label><p className="font-mono font-bold text-rose-600">{task.deadline}</p></div></div>
//       <div><label className="text-slate-500 dark:text-slate-400 block mb-1.5 font-bold text-[11px] uppercase tracking-wider">Status Variantları (Sürüşdürməli Seçim):</label><div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">{taskStatuses.map(status => <button key={status} type="button" onClick={() => onStatus(task.id, status)} className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1 ${selected === status ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm border border-brand-200 dark:border-brand-600' : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60'}`}><span className={`w-1.5 h-1.5 rounded-full ${statusDots[status]}`} />{statusLabel(status)}</button>)}</div></div>
//     </div>
//     <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800"><div className="flex items-center gap-2"><button onClick={() => onCycle(task.id)} className="px-3.5 py-2 text-xs font-bold rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200">Statusu Dəyiş</button><button onClick={() => onDelete(task.id)} className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl">Sil</button></div><button onClick={onClose} className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 rounded-xl">Bağla</button></div>
//   </div></div>;
// }



import Icon from '../common/Icons.jsx';
import {
  taskStatuses,
  statusLabel,
  statusDots,
} from '../../utils/helpers.js';

export default function TaskDetailModal({
  task,
  onClose,
  onStatus,
  onCycle,
  onDelete,
}) {
  const selected =
    task.status === 'Tamamlandı'
      ? 'Bitmiş'
      : task.status;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tapşırıq detalları"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/55
        backdrop-blur-md
        p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-[28px]
          border border-emerald-200/90
          bg-gradient-to-br from-emerald-50 via-white to-emerald-50/80
          shadow-[0_36px_90px_rgba(16,185,129,0.26),0_18px_42px_rgba(15,23,42,0.2)]
          ring-1 ring-emerald-200/80
          dark:border-emerald-700/60
          dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
          dark:ring-emerald-700/40
          animate-modal
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b border-emerald-200/80
            bg-gradient-to-r from-emerald-100/90 via-emerald-50 to-emerald-100/80
            px-6 py-5
            dark:border-emerald-800/60
            dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
          "
        >
          <div className="min-w-0 flex items-center gap-3">
            <span
              className="
                shrink-0
                rounded-lg
                bg-emerald-50
                px-2.5 py-1
                font-mono
                text-[11px]
                font-bold
                text-emerald-700
                dark:bg-emerald-950/40
                dark:text-emerald-300
              "
            >
              #{task.id}
            </span>

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-base
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {task.title}
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Tapşırıq detalları
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Bağla"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              active:scale-95
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <Icon
              name="close"
              className="h-4.5 w-4.5"
            />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-5 px-6 py-5">

          {/* DESCRIPTION */}
          <div>
            <label
              className="
                mb-2 block
                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Mesaj / Təsvir
            </label>

            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-slate-50/80
                px-4 py-3.5
                text-sm
                font-medium
                leading-relaxed
                text-slate-700
                dark:border-slate-800
                dark:bg-slate-800/60
                dark:text-slate-200
              "
            >
              {task.message || '-'}
            </div>
          </div>

          {/* PEOPLE */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-white
                p-4
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <p className="text-[11px] font-semibold text-slate-400">
                Təyin edən
              </p>

              <p
                className="
                  mt-1.5
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                {task.creator}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-slate-100
                bg-white
                p-4
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <p className="text-[11px] font-semibold text-slate-400">
                İcraçı
              </p>

              <p
                className="
                  mt-1.5
                  text-sm
                  font-bold
                  text-emerald-700
                  dark:text-emerald-300
                "
              >
                {task.assignee}
              </p>
            </div>
          </div>

          {/* DATES */}
          <div
            className="
              grid grid-cols-1 gap-3
              rounded-2xl
              border border-slate-100
              bg-slate-50/60
              p-4
              sm:grid-cols-2
              dark:border-slate-800
              dark:bg-slate-800/30
            "
          >
            <div>
              <p className="text-[11px] font-semibold text-slate-400">
                Yaradılma
              </p>

              <p
                className="
                  mt-1.5
                  font-mono
                  text-xs
                  font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {task.createdAt}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400">
                Dedlayn
              </p>

              <p
                className="
                  mt-1.5
                  font-mono
                  text-xs
                  font-bold
                  text-rose-600
                "
              >
                {task.deadline}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Status seçimi
              </label>

              <span
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5 py-1
                  text-[10px]
                  font-semibold
                  text-slate-500
                  dark:bg-slate-800
                  dark:text-slate-400
                "
              >
                Cari: {statusLabel(task.status)}
              </span>
            </div>

            <div
              className="
                grid grid-cols-2 gap-2
                rounded-2xl
                border border-slate-200/80
                bg-slate-100/70
                p-2
                sm:grid-cols-3
                dark:border-slate-700
                dark:bg-slate-800/70
              "
            >
              {taskStatuses.map((status) => {
                const active = selected === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      onStatus(task.id, status)
                    }
                    className={`
                      flex items-center justify-center gap-2
                      rounded-xl
                      px-3 py-2.5
                      text-[11px]
                      font-semibold
                      transition-all duration-200
                      active:scale-[0.98]

                      ${
                        active
                          ? `
                            border border-emerald-200
                            bg-white
                            text-emerald-700
                            shadow-sm
                            dark:border-emerald-700
                            dark:bg-slate-700
                            dark:text-emerald-300
                          `
                          : `
                            border border-transparent
                            text-slate-500
                            hover:bg-white/70
                            hover:text-slate-700
                            dark:text-slate-400
                            dark:hover:bg-slate-700/70
                            dark:hover:text-slate-200
                          `
                      }
                    `}
                  >
                    <span
                      className={`
                        h-2 w-2
                        shrink-0
                        rounded-full
                        ${statusDots[status]}
                      `}
                    />

                    <span className="truncate">
                      {statusLabel(status)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex flex-col gap-3
            border-t border-slate-100
            bg-slate-50/60
            px-6 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCycle(task.id)}
              className="
                rounded-xl
                border border-emerald-200
                bg-emerald-50
                px-4 py-2.5
                text-xs
                font-bold
                text-emerald-700
                transition
                hover:bg-emerald-100
                active:scale-[0.98]
                dark:border-emerald-800
                dark:bg-emerald-950/50
                dark:text-emerald-300
              "
            >
              Statusu dəyiş
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="
                rounded-xl
                px-4 py-2.5
                text-xs
                font-semibold
                text-rose-600
                transition
                hover:bg-rose-50
                active:scale-[0.98]
                dark:hover:bg-rose-950/40
              "
            >
              Sil
            </button>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-slate-900
              px-5 py-2.5
              text-xs
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-slate-800
              active:scale-[0.98]
              dark:bg-slate-100
              dark:text-slate-900
              dark:hover:bg-white
            "
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}