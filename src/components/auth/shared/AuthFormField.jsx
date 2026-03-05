function AuthFormField({ label, error, children }) {
  return (
    <label className="block text-right">
      <span className="mb-2 inline-block text-sm font-extrabold text-[var(--right-text-primary)]">{label}</span>
      {children}
      {error && <p className="mt-2 text-xs font-bold text-red-300">{error}</p>}
    </label>
  )
}

export default AuthFormField
