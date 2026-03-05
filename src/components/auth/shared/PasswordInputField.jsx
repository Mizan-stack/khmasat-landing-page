import { inputClass } from './inputClass'

function PasswordInputField({ showPassword, onToggle, value, onChange, onBlur, error }) {
  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        dir="ltr"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="••••••••"
        className={`${inputClass(error)} pl-28`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        {showPassword ? 'إخفاء' : 'إظهار'}
      </button>
    </div>
  )
}

export default PasswordInputField
