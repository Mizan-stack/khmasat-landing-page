import { Link } from 'react-router-dom'
import { LOGIN_FORM_TEXT } from './LoginFormText'

function LoginStatusMessages({ submitted, hasErrors, touched }) {
  return (
    <>
      {submitted && !hasErrors && (
        <p className="rounded-xl border px-3 py-2.5 text-xs font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)] md:text-sm">
          {LOGIN_FORM_TEXT.success}
        </p>
      )}

      {!submitted && hasErrors && (touched.email || touched.phone || touched.password) && (
        <p className="text-xs font-semibold text-amber-300 md:text-sm">{LOGIN_FORM_TEXT.warning}</p>
      )}

      <p className="text-center text-xs text-[var(--right-text-muted)] md:text-sm">
        {LOGIN_FORM_TEXT.noAccount}{' '}
        <Link to="/signup" state={{ direction: 1 }} className="font-black text-[var(--accent)]">
          {LOGIN_FORM_TEXT.createAccount}
        </Link>
      </p>
    </>
  )
}

export default LoginStatusMessages
