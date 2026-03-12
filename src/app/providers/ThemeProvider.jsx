import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context'

const STORAGE_KEY = 'ads-ui-theme-v2'
const LEGACY_THEME_KEYS = ['ads-ui-theme']
const UI_CACHE_VERSION_KEY = 'ads-ui-cache-version'
const UI_CACHE_VERSION = '2026-03-12-v1'

function isThemeValue(value) {
  return value === 'light' || value === 'dark'
}

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (isThemeValue(savedTheme)) {
      return savedTheme
    }

    for (const legacyKey of LEGACY_THEME_KEYS) {
      const legacyTheme = localStorage.getItem(legacyKey)
      if (isThemeValue(legacyTheme)) {
        localStorage.setItem(STORAGE_KEY, legacyTheme)
        return legacyTheme
      }
    }

    return getPreferredTheme()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const previousVersion = localStorage.getItem(UI_CACHE_VERSION_KEY)
    if (previousVersion !== UI_CACHE_VERSION) {
      LEGACY_THEME_KEYS.forEach((legacyKey) => localStorage.removeItem(legacyKey))
      localStorage.setItem(UI_CACHE_VERSION_KEY, UI_CACHE_VERSION)
    }

    const resetUiState = () => {
      localStorage.removeItem(STORAGE_KEY)
      LEGACY_THEME_KEYS.forEach((legacyKey) => localStorage.removeItem(legacyKey))
      localStorage.removeItem(UI_CACHE_VERSION_KEY)
      window.location.reload()
    }

    // Debug helper in browser console: window.resetUiState()
    window.resetUiState = resetUiState

    return () => {
      if (window.resetUiState === resetUiState) {
        delete window.resetUiState
      }
    }
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
