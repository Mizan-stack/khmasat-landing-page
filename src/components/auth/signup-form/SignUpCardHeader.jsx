import { Link } from 'react-router-dom'
import ThemeToggle from '../theme-toggle/ThemeToggle'
import { SIGNUP_FORM_TEXT } from './SignUpFormText'

function SignUpCardHeader() {
  return (
    <div className="mb-10 flex items-center justify-between gap-3">
      <Link
        to="/login"
        state={{ direction: -1 }}
        className="inline-flex h-12 items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 text-sm font-extrabold text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)]"
      >
        {SIGNUP_FORM_TEXT.backToLogin}
      </Link>
      <ThemeToggle />
    </div>
  )
}

export default SignUpCardHeader
