import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function CreateEmployeeModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [liability, setLiability] = useState("");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="İşçi Əlavə Et"
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
        {/* TOP GREEN ACCENT */}
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
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
                  İşçi əlavə et
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                    mt-0.5
                  "
                >
                  Yeni işçi məlumatlarını daxil edin
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
                name: name.trim(),
                phone: phone.trim(),
                position: position.trim(),
                email: email.trim(),
                liability: liability.trim(),
                status: "Aktiv",
              });
            }}
            className="mt-5 space-y-4"
          >

            {/* NAME */}
            <div>
              <label
                htmlFor="employee-name"
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
                id="employee-name"
                required
                placeholder="Ad və soyadı daxil edin"
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
                  placeholder:text-slate-400
                  outline-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                "
              />
            </div>

            {/* PHONE + POSITION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label
                  htmlFor="employee-phone"
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
                  id="employee-phone"
                  required
                  placeholder="+994 XX XXX XX XX"
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
                    placeholder:text-slate-400
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
                  htmlFor="employee-position"
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
                  id="employee-position"
                  required
                  placeholder="Vəzifəni daxil edin"
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
                    placeholder:text-slate-400
                    outline-none
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                    transition
                  "
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="employee-email"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                  mb-1.5
                "
              >
                E-mail
              </label>

              <input
                id="employee-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder:text-slate-400
                  outline-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                "
              />
            </div>

            {/* LIABILITY */}
            <div>
              <label
                htmlFor="employee-liability"
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
                id="employee-liability"
                required
                rows={3}
                placeholder="İşçinin öhdəliyini qeyd edin"
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
                  placeholder:text-slate-400
                  outline-none
                  resize-none
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  transition
                "
              />
            </div>

            {/* ACTIONS */}
            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                pt-4
                border-t
                border-slate-100
                dark:border-slate-800
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  h-10
                  px-4
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

              <button
                type="submit"
                className="
                  h-10
                  px-5
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
          </form>
        </div>
      </div>
    </div>
  );
}