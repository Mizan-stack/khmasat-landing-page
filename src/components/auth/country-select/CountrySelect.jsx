import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES } from '../../../constants/countries'
import CountryOption from './CountryOption'
import { COUNTRY_SELECT_TEXT } from './countrySelectText'
import FlagIcon from './FlagIcon'
import { useCountryFilter } from './useCountryFilter'

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
  const { popularCountries, otherCountries } = useCountryFilter(query)

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
    if (isOpen) searchInputRef.current?.focus()
  }, [isOpen])

  function selectCountry(countryIso) {
    onChange(countryIso)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="relative w-full md:w-64" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex h-11 w-full items-center justify-between rounded-2xl border px-3 text-right transition-all duration-300 ${
          error
            ? 'border-red-400/80 bg-red-500/10 text-red-100'
            : 'border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--right-text-primary)] hover:border-[var(--accent)]'
        }`}
      >
        <span className="flex items-center gap-2">
          <FlagIcon isoCode={selectedCountry.isoCode} />
          <span className="text-xs font-bold md:text-sm">{selectedCountry.name}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[var(--accent)] md:text-sm">{selectedCountry.dialCode}</span>
          <span
            className={`text-xs text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            <div className="p-2.5">
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={COUNTRY_SELECT_TEXT.searchPlaceholder}
                className="h-9 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 text-xs text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)] md:text-sm"
              />
            </div>

            <div className="max-h-72 space-y-2.5 overflow-y-auto px-2.5 pb-2.5 pe-2">
              {popularCountries.length > 0 && (
                <CountrySection
                  title={COUNTRY_SELECT_TEXT.popularSection}
                  countries={popularCountries}
                  selectedIso={selectedCountry.isoCode}
                  onSelect={selectCountry}
                />
              )}

              {otherCountries.length > 0 && (
                <CountrySection
                  title={COUNTRY_SELECT_TEXT.othersSection}
                  countries={otherCountries}
                  selectedIso={selectedCountry.isoCode}
                  onSelect={selectCountry}
                />
              )}

              {popularCountries.length === 0 && otherCountries.length === 0 && (
                <p className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-4 text-center text-xs text-[var(--text-muted)] md:text-sm">
                  {COUNTRY_SELECT_TEXT.emptyResults}
                </p>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

function CountrySection({ title, countries, selectedIso, onSelect }) {
  return (
    <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-2">
      <p className="mb-1 px-2 text-xs font-bold text-[var(--text-muted)]">{title}</p>
      {countries.map((country) => (
        <CountryOption
          key={country.isoCode}
          country={country}
          active={country.isoCode === selectedIso}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default CountrySelect
