function ContactField({ label, error, children }) {
  return (
    <label className="block text-right">
      <span className="mb-2 inline-block text-sm font-bold text-[var(--home-contact-label)] md:text-base">{label}</span>
      {children}
      {error ? <p className="mt-1 text-xs font-bold text-red-400">{error}</p> : null}
    </label>
  )
}

export default ContactField
