export function inputClass(hasError) {
  return `h-11 w-full rounded-2xl border px-3.5 text-sm text-[var(--right-text-primary)] outline-none transition-all duration-300 placeholder:text-[0.8rem] placeholder:text-[var(--text-placeholder)] md:text-[0.95rem] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus:border-[var(--accent)]'
  }`
}
