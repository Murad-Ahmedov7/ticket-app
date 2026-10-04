import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function EditCompanyModal({
  company,
  onClose,
  onSave,
  onDelete,
}) {
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);
  const [phone, setPhone] = useState(company.phone);
  const [email, setEmail] = useState(company.email);

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...company,
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      logo: name.trim().slice(0, 2).toUpperCase(),
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Şirkəti Redaktə Et"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
        bg-slate-950/55
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[792px] max-h-[calc(100dvh-2rem)]
          overflow-y-auto
          rounded-2xl
          bg-white
          dark:bg-slate-900
          border border-slate-200/80
          dark:border-slate-800
          shadow-2xl
          animate-modal
        "
      >
        {/* GREEN TOP ACCENT */}
        <div
          className="
            absolute
            top-0 left-0 right-0
            h-[3px]
            bg-gradient-to-r
            from-transparent
            via-emerald-500
            to-transparent
          "
        />

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            px-7 py-6
            border-b border-slate-100
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3.5">
            <div
              className="
                w-12 shrink-0 h-12
                rounded-xl
                bg-emerald-50
                dark:bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
                flex items-center justify-center
              "
            >
              <Icon
                name="companies"
                strokeWidth={2.3}
                className="w-5 h-5"
              />
            </div>

            <div>
              <h3
                className="
                  text-[19px]
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Şirkəti redaktə et
              </h3>

              <p
                className="
                  text-[13px]
                  text-slate-400
                  mt-0.5
                "
              >
                Şirkət məlumatlarını yeniləyin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Bağla"
            className="
              w-[42px] shrink-0 h-[42px]
              rounded-lg
              flex items-center justify-center
              text-slate-400
              hover:text-slate-700
              hover:bg-slate-100
              dark:hover:text-white
              dark:hover:bg-slate-800
              transition
            "
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-7 space-y-6"
        >
          {/* NAME + EMAIL */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-[19px]
            "
          >
            <div>
              <label
                htmlFor="edit-company-name"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Şirkət adı
              </label>

              <input
                id="edit-company-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Məs: Halal-P MMC"
                className="
                  w-full
                  h-[52px]
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-base
                  text-slate-800
                  dark:text-slate-100
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
                htmlFor="edit-company-email"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                E-mail
              </label>

              <input
                id="edit-company-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@company.az"
                className="
                  w-full
                  h-[52px]
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-base
                  text-slate-800
                  dark:text-slate-100
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

          {/* ADDRESS + PHONE */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-[19px]
            "
          >
            <div>
              <label
                htmlFor="edit-company-address"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Ünvan
              </label>

              <input
                id="edit-company-address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Bakı ş., ..."
                className="
                  w-full
                  h-[52px]
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-base
                  text-slate-800
                  dark:text-slate-100
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
                htmlFor="edit-company-phone"
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Əlaqə nömrəsi
              </label>

              <input
                id="edit-company-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+994 50 000 00 00"
                className="
                  w-full
                  h-[52px]
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-base
                  text-slate-800
                  dark:text-slate-100
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

          {/* COMPANY PREVIEW */}
          <div
            className="
              flex items-center gap-3.5
              p-[17px]
              rounded-xl
              bg-slate-50
              dark:bg-slate-800/60
              border
              border-slate-200/70
              dark:border-slate-700
            "
          >
            <div
              className="
                w-12 shrink-0 h-12
                rounded-xl
                bg-gradient-to-br
                from-emerald-500
                to-teal-600
                flex items-center justify-center
                text-white
                text-sm
                font-black
                shadow-sm
                shadow-emerald-500/20
              "
            >
              {name.trim().slice(0, 2).toUpperCase() || "ŞR"}
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                  dark:text-slate-100
                  truncate
                "
              >
                {name || "Şirkət adı"}
              </p>

              <p
                className="
                  text-[13px]
                  text-slate-400
                  mt-0.5
                  truncate
                "
              >
                {email || "E-mail ünvanı"}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-3.5
              pt-6
              border-t
              border-slate-100
              dark:border-slate-800
            "
          >
            {/* DELETE */}
            <button
              type="button"
              onClick={() => onDelete(company.id)}
              className="
                h-12
                px-[19px]
                rounded-xl
                inline-flex items-center justify-center
                gap-[9px]
                text-sm
                font-bold
                text-rose-600
                bg-rose-50
                hover:bg-rose-100
                dark:bg-rose-500/10
                dark:hover:bg-rose-500/15
                transition
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
                  d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3m-8 0h10"
                />
              </svg>

              Şirkəti sil
            </button>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center justify-end gap-[9px]">
              <button
                type="button"
                onClick={onClose}
                className="
                  h-12
                  px-[19px]
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
                  h-12
                  px-6
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-sm
                  font-bold
                  shadow-md
                  shadow-emerald-500/20
                  active:scale-[0.97]
                  transition-all
                  inline-flex items-center gap-[9px]
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                Yadda saxla
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}