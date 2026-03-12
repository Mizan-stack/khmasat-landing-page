function StepField({ label, error, required = false, children }) {
  return (
    <label className="block text-right">
      <span className="mb-1.5 block text-sm font-bold text-[var(--ads-text)]">
        {label}
        {required ? <span className="ms-1 text-red-500">*</span> : null}
      </span>
      {children}
      {error ? <p className="mt-1 text-xs font-bold text-red-500">{error}</p> : null}
    </label>
  )
}

export default StepField
