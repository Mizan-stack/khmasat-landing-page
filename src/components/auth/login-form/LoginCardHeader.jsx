import { Link } from 'react-router-dom'
import ThemeToggle from '../theme-toggle/ThemeToggle'
import { LOGIN_FORM_TEXT } from './LoginFormText'

function LoginCardHeader() {
  return (
    <div className="mb-10 flex items-center justify-between gap-3">
      <Link
        to="/home"
        state={{ direction: -1 }}
        className="h-12 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 text-sm font-extrabold text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)]"
      >
        {LOGIN_FORM_TEXT.backToSite}
      </Link>
      <ThemeToggle />
    </div>
  )
}

export default LoginCardHeader
