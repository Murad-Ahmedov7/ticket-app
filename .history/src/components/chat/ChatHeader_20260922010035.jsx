{/* SOL ÇAT SİYAHISININ BAŞLIQ ZOLAĞI */}
<div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800">
  <div className="flex items-center gap-3">
    {/* Gömrük tərzi tünd kvadrat Hamburger düyməsi */}
    <button
      onClick={onToggleSidebar}
      title="Menyunu Aç / Bağla"
      className="w-9 h-9 rounded-xl bg-[#1e2329] hover:bg-[#2b323a] text-slate-200 flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer border border-white/10 shrink-0"
    >
      <span className="w-4 h-[2px] bg-slate-200 rounded-sm" />
      <span className="w-4 h-[2px] bg-slate-200 rounded-sm" />
      <span className="w-4 h-[2px] bg-slate-200 rounded-sm" />
    </button>

    {/* "Söhbətlər" Başlığı və Sayğac */}
    <div className="flex items-center gap-2">
      <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
        Söhbətlər
      </h1>
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
        4 aktiv
      </span>
    </div>
  </div>

  {/* Sağdakı Bənövşəyi Yeni Çat (+) Düyməsi */}
  <button
    onClick={onNewChat}
    className="w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-500/20 active:scale-95 transition-all cursor-pointer"
    title="Yeni söhbət"
  >
    <Icon name="plus" className="w-5 h-5" strokeWidth={2.5} />
  </button>
</div>