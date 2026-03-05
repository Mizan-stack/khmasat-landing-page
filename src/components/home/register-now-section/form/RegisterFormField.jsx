function RegisterFormField({ label, error, children }) {
  return (
    <label className="block text-right">
      <span className="mb-2 inline-block text-[clamp(1rem,1.4vw,1.3rem)] font-bold text-[var(--home-register-item-title)]">{label}</span>
      {children}
      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
    </label>
  )
}

export default RegisterFormField
