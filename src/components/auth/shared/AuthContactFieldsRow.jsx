import { CompactCountryCodeSelect } from '../country-select'

function inputShellClass(hasError) {
  return hasError
    ? 'border-red-400/80 bg-red-500/10'
    : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus-within:border-[var(--accent)]'
}

function inputLabelClass() {
  return 'mb-2 inline-block text-[clamp(1rem,1.35vw,1.2rem)] font-black text-[var(--right-text-primary)]'
}

function inputErrorClass() {
  return 'mt-2 text-xs font-bold text-red-300'
}

function inputFieldClass(hasError) {
  return `h-14 w-full rounded-2xl border px-4 text-[clamp(0.88rem,1vw,1rem)] text-[var(--right-text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-placeholder)] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus:border-[var(--accent)]'
  }`
}

function AuthContactFieldsRow({
  emailLabel,
  emailPlaceholder,
  emailValue,
  onEmailChange,
  onEmailBlur,
  emailError,
  phoneLabel,
  phonePlaceholder,
  phoneValue,
  onPhoneChange,
  onPhoneBlur,
  phoneError,
  countryIso,
  onChangeCountry,
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[1.02fr_0.98fr]">
      <label className="block text-right">
        <span className={inputLabelClass()}>{emailLabel}</span>
        <input
          type="email"
          dir="ltr"
          value={emailValue}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          placeholder={emailPlaceholder}
          className={`${inputFieldClass(emailError)} text-left placeholder-shown:text-right`}
        />
        {emailError && <p className={inputErrorClass()}>{emailError}</p>}
      </label>

      <label className="block text-right">
        <span className={inputLabelClass()}>{phoneLabel}</span>
        <div
          dir="rtl"
          className={`relative flex h-14 rounded-2xl border transition-all duration-300 ${inputShellClass(phoneError)}`}
        >
          <CompactCountryCodeSelect value={countryIso} onChange={onChangeCountry} error={phoneError} />

          <input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            value={phoneValue}
            onChange={onPhoneChange}
            onBlur={onPhoneBlur}
            placeholder={phonePlaceholder}
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-left text-[clamp(0.88rem,1vw,1rem)] text-[var(--right-text-primary)] outline-none placeholder-shown:text-right placeholder:text-[var(--text-placeholder)]"
          />
        </div>
        {phoneError && <p className={inputErrorClass()}>{phoneError}</p>}
      </label>
    </div>
  )
}

export default AuthContactFieldsRow
