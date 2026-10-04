import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CreateCompanyModal({
  onClose,
  onSave,
  notify
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [warning, setWarning] = useState(false);

  function submit(event) {
    event.preventDefault();

    if (!logo) {
      setWarning(true);

      if (notify) {
        notify('Loqo əlavə olunmalıdır!');
      }

      return;
    }

    onSave({
      name: name.trim(),
      email: email.trim(),
      address: address.trim(),
      phone: phone.trim(),
      logo: name.trim().slice(0, 2).toUpperCase()
    });
  }

  function handleLogoChange(event) {
    const file = event.target.files?.[0] || null;

    setLogo(file);

    if (file) {
      setWarning(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Şirkət yarat"
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
          max-w-[752px] max-h-[calc(100dvh-2rem)]
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

        {/* GREEN ACCENT */}
        <div
          className="
            absolute top-0 left-0 right-0
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
            px-[27px] py-[22px]
            border-b border-slate-100
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-[13.5px]">
            <div
              className="
                w-11 h-11
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
                  text-[18px]
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Yeni şirkət yarat
              </h3>

              <p
                className="
                  text-[12.5px]
                  text-slate-400
                  mt-0.5
                "
              >
                Şirkət haqqında əsas məlumatları daxil edin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Bağla"
            className="
              w-10 h-10
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
            <Icon
              name="close"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={submit}
          className="p-[27px] space-y-[22px]"
        >

          {/* NAME + EMAIL */}
          <div className="
            grid grid-cols-1
            md:grid-cols-2
            gap-[18px]
          ">
            <div>
              <label
                htmlFor="company-name"
                className="
                  block
                  text-[13.5px]
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Şirkət adı
              </label>

              <input
                id="company-name"
                required
                placeholder="Məs: Halal-P MMC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-[15.5px]
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
                htmlFor="company-email"
                className="
                  block
                  text-[13.5px]
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                E-mail
              </label>

              <input
                id="company-email"
                type="email"
                required
                placeholder="info@company.az"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-[15.5px]
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
          <div className="
            grid grid-cols-1
            md:grid-cols-2
            gap-[18px]
          ">
            <div>
              <label
                htmlFor="company-address"
                className="
                  block
                  text-[13.5px]
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Ünvan
              </label>

              <input
                id="company-address"
                required
                placeholder="Bakı ş., ..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-[15.5px]
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
                htmlFor="company-phone"
                className="
                  block
                  text-[13.5px]
                  font-bold
                  text-slate-700
                  dark:text-slate-300
                  mb-[7px]
                "
              >
                Əlaqə nömrəsi
              </label>

              <input
                id="company-phone"
                required
                placeholder="+994 50 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-slate-50
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-[15.5px]
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

          {/* LOGO */}
          <div>
            <label
              className="
                block
                text-[13.5px]
                font-bold
                text-slate-700
                dark:text-slate-300
                mb-[7px]
              "
            >
              Şirkət loqosu
            </label>

            <label
              className={`
                group
                min-h-[112px]
                w-full
                rounded-xl
                border
                border-dashed
                flex
                items-center
                justify-between
                gap-[18px]
                px-[18px]
                cursor-pointer
                transition-all

                ${
                  warning
                    ? `
                      border-rose-300
                      bg-rose-50/50
                      dark:border-rose-500/50
                      dark:bg-rose-500/5
                    `
                    : `
                      border-slate-300
                      dark:border-slate-700
                      bg-slate-50/70
                      dark:bg-slate-800/40
                      hover:border-emerald-400
                      hover:bg-emerald-50/40
                      dark:hover:bg-emerald-500/5
                    `
                }
              `}
            >
              <div className="flex items-center gap-[13.5px] min-w-0">
                <div
                  className="
                    w-12 h-12
                    shrink-0
                    rounded-xl
                    bg-emerald-50
                    dark:bg-emerald-500/10
                    text-emerald-600
                    dark:text-emerald-400
                    flex items-center justify-center
                    group-hover:scale-105
                    transition-transform
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[13.5px]
                      font-bold
                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    {logo
                      ? 'Loqo seçildi'
                      : 'Loqo faylını seçin'}
                  </p>

                  <p
                    className="
                      text-[12.5px]
                      text-slate-400
                      mt-1
                      truncate
                    "
                  >
                    {logo
                      ? logo.name
                      : 'PNG, JPG və ya SVG faylı'}
                  </p>
                </div>
              </div>

              <div
                className="
                  shrink-0
                  px-4 py-[9px]
                  rounded-lg
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-[12.5px]
                  font-bold
                  text-slate-600
                  dark:text-slate-300
                  group-hover:border-emerald-300
                  group-hover:text-emerald-600
                  transition
                "
              >
                Fayl seç
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>

            {warning && (
              <p
                className="
                  text-rose-500
                  text-[12.5px]
                  font-semibold
                  mt-1.5
                "
              >
                Loqo əlavə olunmalıdır!
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-[9px]
              pt-[22px]
              border-t
              border-slate-100
              dark:border-slate-800
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                h-11
                px-[18px]
                rounded-xl
                text-[13.5px]
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
                h-11
                px-[22px]
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                text-[13.5px]
                font-bold
                shadow-md
                shadow-emerald-500/20
                active:scale-[0.97]
                transition-all
                flex items-center gap-[9px]
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
        </form>
      </div>
    </div>
  );
}