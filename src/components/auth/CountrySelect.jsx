import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES } from '../../constants/countries'

const MotionDiv = motion.div

function CountrySelect({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const searchInputRef = useRef(null)

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === value) ?? COUNTRIES[0],
    [value],
  )

  const [popularCountries, otherCountries] = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matches = (country) =>
      !normalizedQuery ||
      country.name.toLowerCase().includes(normalizedQuery) ||
      country.dialCode.includes(normalizedQuery)

    const filtered = COUNTRIES.filter(matches)
    return [filtered.filter((country) => country.popular), filtered.filter((country) => !country.popular)]
  }, [query])

  useEffect(() => {
    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  function selectCountry(countryIso) {
    onChange(countryIso)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="relative w-full md:w-80" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-right transition-all duration-300 ${
          error
            ? 'border-red-400/80 bg-red-500/10 text-red-100'
            : 'border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--right-text-primary)] hover:border-[var(--accent)]'
        }`}
      >
        <span className="flex items-center gap-2">
          <Flag isoCode={selectedCountry.isoCode} />
          <span className="text-sm font-bold">{selectedCountry.name}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-[var(--accent)]">{selectedCountry.dialCode}</span>
          <span
            className={`text-xs text-[var(--text-muted)] transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            ▾
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-panel)] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"
          >
            <div className="p-3">
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن الدولة أو المفتاح"
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]"
              />
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-3 pb-3 pe-2">
              {popularCountries.length > 0 && (
                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-2">
                  <p className="mb-1 px-2 text-xs font-bold text-[var(--text-muted)]">الأكثر استخدامًا</p>
                  {popularCountries.map((country) => (
                    <CountryOption
                      key={country.isoCode}
                      country={country}
                      active={country.isoCode === selectedCountry.isoCode}
                      onSelect={selectCountry}
                    />
                  ))}
                </div>
              )}

              {otherCountries.length > 0 && (
                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-2">
                  <p className="mb-1 px-2 text-xs font-bold text-[var(--text-muted)]">دول أخرى</p>
                  {otherCountries.map((country) => (
                    <CountryOption
                      key={country.isoCode}
                      country={country}
                      active={country.isoCode === selectedCountry.isoCode}
                      onSelect={selectCountry}
                    />
                  ))}
                </div>
              )}

              {popularCountries.length === 0 && otherCountries.length === 0 && (
                <p className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-4 text-center text-sm text-[var(--text-muted)]">
                  لا توجد نتائج مطابقة
                </p>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

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
        <Flag isoCode={country.isoCode} />
        <span>{country.name}</span>
      </span>
      <span className="font-semibold text-[var(--accent)]">{country.dialCode}</span>
    </button>
  )
}

function Flag({ isoCode }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`}
      alt=""
      className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
      loading="lazy"
      decoding="async"
    />
  )
}

export default CountrySelect
