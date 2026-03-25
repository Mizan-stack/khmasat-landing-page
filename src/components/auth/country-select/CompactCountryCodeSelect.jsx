import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES } from '../../../constants/countries'
import FlagIcon from './FlagIcon'

function CompactCountryCodeSelect({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === value) ?? COUNTRIES[0],
    [value],
  )

  useEffect(() => {
    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  function handleBlur() {
    window.requestAnimationFrame(() => {
      if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
        setIsOpen(false)
      }
    })
  }

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      className={`relative shrink-0 border-l ${error ? 'border-red-400/50' : 'border-[var(--border-soft)]'}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="اختر مفتاح الدولة"
        aria-expanded={isOpen}
        title={selectedCountry ? `${selectedCountry.name} ${selectedCountry.dialCode}` : undefined}
        className="relative flex h-full w-28 items-center bg-transparent pl-12 pr-8 text-left text-xs font-bold text-[var(--right-text-primary)] outline-none"
        dir="ltr"
      >
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-muted)]">
          ▾
        </span>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <FlagIcon isoCode={selectedCountry.isoCode} />
        </span>
        <span className="block w-full text-left">{selectedCountry.dialCode}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-32 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-panel)] shadow-[0_18px_42px_rgba(8,15,45,0.2)] backdrop-blur-md">
          <div className="max-h-72 overflow-y-auto p-1.5">
            {COUNTRIES.map((country) => {
              const isActive = country.isoCode === selectedCountry.isoCode

              return (
                <button
                  key={country.isoCode}
                  type="button"
                  onClick={() => {
                    onChange(country.isoCode)
                    setIsOpen(false)
                  }}
                  className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors last:mb-0 ${
                    isActive
                      ? 'bg-[var(--accent)] text-slate-950'
                      : 'text-[var(--right-text-primary)] hover:bg-[var(--surface-hover)]'
                  }`}
                  dir="ltr"
                >
                  <FlagIcon isoCode={country.isoCode} />
                  <span className="block text-left">{country.dialCode}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompactCountryCodeSelect
