import FlagIcon from './FlagIcon'

function CountryOption({ country, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(country.isoCode)}
      className={`mb-1 flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors last:mb-0 ${
        active
          ? 'bg-[var(--accent-soft)] text-[var(--right-text-primary)]'
          : 'text-[var(--right-text-primary)] hover:bg-[var(--surface-hover)]'
      }`}
    >
      <span className="flex items-center gap-2">
        <FlagIcon isoCode={country.isoCode} />
        <span>{country.name}</span>
      </span>
      <span className="font-semibold text-[var(--accent)]">{country.dialCode}</span>
    </button>
  )
}

export default CountryOption
