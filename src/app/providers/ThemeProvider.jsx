import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context'
const STORAGE_KEY = 'ads-ui-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

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
