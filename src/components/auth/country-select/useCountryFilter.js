import { useMemo } from 'react'
import { COUNTRIES } from '../../../constants/countries'

export function useCountryFilter(query) {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matches = (country) =>
      !normalizedQuery ||
      country.name.toLowerCase().includes(normalizedQuery) ||
      country.dialCode.includes(normalizedQuery)

    const filtered = COUNTRIES.filter(matches)
    return {
      popularCountries: filtered.filter((country) => country.popular),
      otherCountries: filtered.filter((country) => !country.popular),
    }
  }, [query])
}
