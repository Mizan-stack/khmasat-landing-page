import { Link } from 'react-router-dom'

function AuthBrandBadge() {
  return (
    <Link
      to="/"
      state={{ direction: -1 }}
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-1.5 text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)]"
      aria-label="بوابة الأعمال"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-base font-black text-slate-950 shadow-[0_10px_22px_rgba(61,181,180,0.22)]">
        ب
      </span>
      <span className="text-sm font-black leading-none md:text-base">بوابة الأعمال</span>
    </Link>
  )
}

export default AuthBrandBadge
