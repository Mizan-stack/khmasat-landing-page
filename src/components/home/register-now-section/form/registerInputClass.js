function registerInputClass(hasError) {
  return `h-14 w-full rounded-2xl border px-4 text-[clamp(1.05rem,1.4vw,1.35rem)] text-[var(--right-text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-placeholder)] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus:border-[var(--accent)]'
  }`
}

export { registerInputClass }
