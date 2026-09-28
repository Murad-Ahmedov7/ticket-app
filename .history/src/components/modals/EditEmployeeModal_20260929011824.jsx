import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function EditEmployeeModal({
  employee,
  onClose,
  onSave,
  onDelete,
}) {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position || "");
  const [liability, setLiability] = useState(employee.liability || "");
  const [phone, setPhone] = useState(employee.phone || "");
  const [status, setStatus] = useState(employee.status || "Aktiv");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="İşçini Redaktə Et"
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-slate-900/55
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-lg
          bg-white
          dark:bg-slate-900
          rounded-2xl
          border
          border-slate-200/80
          dark:border-slate-800
          shadow-[0_20px_60px_rgba(15,23,42,0.18)]
          overflow-hidden
          animate-modal
        "
      >
        {/* GREEN ACCENT */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[3px]
            bg-gradient-to-r
            from-transparent
            via-emerald-500
            to-transparent
          "
        />

        <div className="p-6">

          {/* HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              pb-4
              border-b
              border-slate-100
              dark:border-slate-800
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-emerald-50
                  dark:bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                  />
                </svg>
              </div>

              <div>
                <h3
                  className="
                    text-lg
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  İşçini redaktə et
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                    mt-0.5
                  "
                >
                  İşçi məlumatlarını yenilə
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              title="Bağla"
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:text-slate-700
                hover:bg-slate-100
                dark:hover:text-white
                dark:hover:bg-slate-800
                transition
              "
            >
              <Icon
                name="close"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              onSave({
                ...employee,
                name: name.trim(),
                position: position.trim(),
                liability: liability.trim(),
                phone: phone.trim(),
                status,
              });
            }}
            className="mt-5 space-y-4"
          >
            {/* NAME */}
            <div>
              <label
                htmlFor="edit-employee-name"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                  mb-1.5
                "
              >
                Ad soyad
              </label>

              <input
                id="edit-employee-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full
                  h-11
                  px-3.5
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-sm
                  text-slate-900
                  dark:text-white
                  outline-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                "
              />
            </div>

            {/* POSITION + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="edit-employee-position"
                  className="
                    block
                    text-sm
                    font-bold
                    text-slate-700
                    dark:text-slate-200
                    mb-1.5
                  "
                >
                  Vəzifə
                </label>

                <input
                  id="edit-employee-position"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="
                    w-full
                    h-11
                    px-3.5
                    rounded-xl
                    bg-slate-50
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-sm
                    text-slate-900
                    dark:text-white
                    outline-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="edit-employee-phone"
                  className="
                    block
                    text-sm
                    font-bold
                    text-slate-700
                    dark:text-slate-200
                    mb-1.5
                  "
                >
                  Mobil nömrə
                </label>

                <input
                  id="edit-employee-phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="
                    w-full
                    h-11
                    px-3.5
                    rounded-xl
                    bg-slate-50
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-sm
                    text-slate-900
                    dark:text-white
                    outline-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                  "
                />
              </div>
            </div>

            {/* LIABILITY */}
            <div>
              <label
                htmlFor="edit-employee-liability"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                  mb-1.5
                "
              >
                Öhdəlik
              </label>

              <textarea
                id="edit-employee-liability"
                required
                rows={3}
                value={liability}
                onChange={(e) => setLiability(e.target.value)}
                className="
                  w-full
                  px-3.5
                  py-3
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-sm
                  text-slate-900
                  dark:text-white
                  outline-none
                  resize-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                "
              />
            </div>

            {/* STATUS */}
            <div>
              <label
                htmlFor="edit-employee-status"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                  mb-1.5
                "
              >
                Status
              </label>

              <div className="relative">
                <select
                  id="edit-employee-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="
                    w-full
                    h-11
                    px-3.5
                    pr-10
                    rounded-xl
                    bg-slate-50
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                    outline-none
                    appearance-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                    cursor-pointer
                  "
                >
                  <option value="Aktiv">
                    Aktiv
                  </option>

                  <option value="Gözləmədə">
                    Gözləmədə
                  </option>
                </select>

                <svg
                  className="
                    pointer-events-none
                    absolute
                    right-3.5
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-slate-400
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                pt-4
                border-t
                border-slate-100
                dark:border-slate-800
              "
            >
              {/* DELETE */}
              <button
                type="button"
                onClick={() => onDelete(employee.id)}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  text-sm
                  font-bold
                  text-rose-600
                  bg-rose-50
                  hover:bg-rose-100
                  dark:bg-rose-500/10
                  dark:hover:bg-rose-500/15
                  dark:text-rose-400
                  transition
                  flex
                  items-center
                  gap-2
                "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79"
                  />
                </svg>

                Sil
              </button>

              <div className="flex items-center gap-2">
                {/* CANCEL */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-500
                    hover:text-slate-700
                    hover:bg-slate-100
                    dark:hover:text-white
                    dark:hover:bg-slate-800
                    transition
                  "
                >
                  Ləğv et
                </button>

                {/* SAVE */}
                <button
                  type="submit"
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-emerald-600
                    hover:bg-emerald-700
                    text-white
                    text-sm
                    font-bold
                    shadow-sm
                    shadow-emerald-500/20
                    hover:shadow-md
                    hover:shadow-emerald-500/25
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}