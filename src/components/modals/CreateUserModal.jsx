import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function CreateUserModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Aktiv");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      position: position.trim(),
      status,
    });
  };

  const inputClass = `
    w-full
    px-4
    py-3
    rounded-xl

    bg-slate-50
    dark:bg-slate-800/80

    text-sm
    text-slate-900
    dark:text-slate-100

    placeholder:text-sm
    placeholder:text-slate-400
    dark:placeholder:text-slate-500

    border
    border-slate-200
    dark:border-slate-700

    outline-none

    focus:border-emerald-400
    dark:focus:border-emerald-500

    focus:ring-4
    focus:ring-emerald-500/10

    transition-all
    duration-200
  `;

  const labelClass = `
    block
    mb-2
    text-xs
    font-bold
    text-slate-600
    dark:text-slate-300
  `;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yeni İstifadəçi Əlavə Et"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        p-4

        bg-slate-950/55
        backdrop-blur-[3px]
      "
    >
      <div
        className="
          relative

          w-full
          max-w-[560px] max-h-[calc(100dvh-2rem)]

          overflow-y-auto

          rounded-[24px]

          bg-white
          dark:bg-[#0f1722]

          border
          border-slate-200/80
          dark:border-slate-800

          shadow-[0_24px_70px_rgba(15,23,42,0.24)]
          dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]

          animate-modal
        "
      >
        {/* TOP ACCENT */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0

            h-[3px]

            bg-gradient-to-r
            from-emerald-400
            via-teal-500
            to-emerald-400
          "
        />

        {/* SOFT HEADER GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0

            h-24

            bg-gradient-to-b
            from-emerald-50/80
            to-transparent

            dark:from-emerald-950/20
          "
        />

        {/* HEADER */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between

            px-5 sm:px-8
            pt-6
            pb-5

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

                flex
                items-center
                justify-center

                bg-emerald-100
                dark:bg-emerald-950/40

                text-emerald-700
                dark:text-emerald-300

                border
                border-emerald-200
                dark:border-emerald-900
              "
            >
              <Icon name="plus" strokeWidth={2.5} />
            </div>

            <div>
              <h3
                className="
                  text-lg
                  font-black
                  tracking-tight

                  text-slate-900
                  dark:text-white
                "
              >
                Yeni istifadəçi əlavə et
              </h3>

              <p
                className="
                  mt-0.5
                  text-xs

                  text-slate-500
                  dark:text-slate-400
                "
              >
                Yeni istifadəçi məlumatlarını daxil edin
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

              rounded-xl

              flex
              items-center
              justify-center

              text-slate-400

              hover:text-slate-700
              hover:bg-slate-100

              dark:hover:text-white
              dark:hover:bg-slate-800

              transition-all
              duration-200
            "
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            relative
            z-10

            px-5 sm:px-8
            py-6

            space-y-5 sm:space-y-6
          "
        >
          {/* NAME */}
          <div>
            <label htmlFor="user-name" className={labelClass}>
              Ad / Soyad
            </label>

            <div className="relative">
              <input
                id="user-name"
                required
                placeholder="Məs: Rəşad Əliyev"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />

              {name.trim() && (
                <span
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2

                    w-2
                    h-2

                    rounded-full
                    bg-emerald-500
                  "
                />
              )}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <label htmlFor="user-company" className={labelClass}>
              Şirkət
            </label>

            <input
              id="user-company"
              required
              placeholder="Məs: HALAL-P MMC"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="user-email" className={labelClass}>
              E-mail
            </label>

            <input
              id="user-email"
              type="email"
              required
              placeholder="rashad@halal.az"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* POSITION */}
          <div>
            <label htmlFor="user-position" className={labelClass}>
              Vəzifə
            </label>

            <input
              id="user-position"
              required
              placeholder="Məs: Sistem Administratoru"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* STATUS */}
          <div>
            <label className={labelClass}>
              Status
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("Aktiv")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2

                  px-3
                  py-3

                  rounded-xl

                  border

                  text-xs
                  font-bold

                  transition-all
                  duration-200

                  ${
                    status === "Aktiv"
                      ? `
                        bg-emerald-50
                        dark:bg-emerald-950/35

                        border-emerald-300
                        dark:border-emerald-700

                        text-emerald-700
                        dark:text-emerald-300

                        shadow-sm
                      `
                      : `
                        bg-slate-50
                        dark:bg-slate-800

                        border-slate-200
                        dark:border-slate-700

                        text-slate-500
                        dark:text-slate-400

                        hover:border-emerald-200
                      `
                  }
                `}
              >
                <span
                  className={`
                    w-2
                    h-2

                    rounded-full

                    ${
                      status === "Aktiv"
                        ? "bg-emerald-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    }
                  `}
                />

                Aktiv
              </button>

              <button
                type="button"
                onClick={() => setStatus("Gözləmədə")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2

                  px-3
                  py-3

                  rounded-xl

                  border

                  text-xs
                  font-bold

                  transition-all
                  duration-200

                  ${
                    status === "Gözləmədə"
                      ? `
                        bg-amber-50
                        dark:bg-amber-950/30

                        border-amber-300
                        dark:border-amber-800

                        text-amber-700
                        dark:text-amber-300

                        shadow-sm
                      `
                      : `
                        bg-slate-50
                        dark:bg-slate-800

                        border-slate-200
                        dark:border-slate-700

                        text-slate-500
                        dark:text-slate-400

                        hover:border-amber-200
                      `
                  }
                `}
              >
                <span
                  className={`
                    w-2
                    h-2

                    rounded-full

                    ${
                      status === "Gözləmədə"
                        ? "bg-amber-400"
                        : "bg-slate-300 dark:bg-slate-600"
                    }
                  `}
                />

                Gözləmədə
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-2.5

              pt-6
              mt-2

              border-t
              border-slate-100
              dark:border-slate-800
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-3

                rounded-xl

                bg-slate-100
                hover:bg-slate-200

                dark:bg-slate-800
                dark:hover:bg-slate-700

                text-slate-600
                dark:text-slate-300

                text-xs
                font-bold

                transition-all
                duration-200
              "
            >
              Ləğv et
            </button>

            <button
              type="submit"
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                px-5
                py-3

                rounded-xl

                bg-emerald-600
                hover:bg-emerald-700

                dark:bg-emerald-500
                dark:hover:bg-emerald-400

                text-white

                text-xs
                font-bold

                shadow-sm
                shadow-emerald-500/20

                hover:shadow-md
                hover:shadow-emerald-500/25
                hover:-translate-y-[1px]

                active:translate-y-0
                active:scale-[0.98]

                transition-all
                duration-200
              "
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12l4 4L19 6"
                />
              </svg>

              Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}