function AuthFormField({ label, error, children }) {
  return (
    <label className="block text-right">
      <span className="mb-1.5 inline-block text-xs font-extrabold text-[var(--right-text-primary)] md:text-sm">{label}</span>
      {children}
      {error && <p className="mt-1.5 text-[11px] font-bold text-red-300 md:text-xs">{error}</p>}
    </label>
  )
}

export default AuthFormField
