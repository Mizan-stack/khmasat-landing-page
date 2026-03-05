export function inputClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--right-text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-placeholder)] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus:border-[var(--accent)]'
  }`
}
