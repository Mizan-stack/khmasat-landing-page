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
        className={`${inputClass(error)} pl-24`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-2.5 py-1.5 text-xs font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        {showPassword ? 'إخفاء' : 'إظهار'}
      </button>
    </div>
  )
}

export default PasswordInputField
