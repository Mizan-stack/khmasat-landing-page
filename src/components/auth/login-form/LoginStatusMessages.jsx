import { Link } from 'react-router-dom'
import { LOGIN_FORM_TEXT } from './LoginFormText'

function LoginStatusMessages({ submitted, hasErrors, touched }) {
  return (
    <>
      {submitted && !hasErrors && (
        <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
          {LOGIN_FORM_TEXT.success}
        </p>
      )}

      {!submitted && hasErrors && (touched.email || touched.phone || touched.password) && (
        <p className="text-sm font-semibold text-amber-300">{LOGIN_FORM_TEXT.warning}</p>
      )}

      <p className="text-center text-sm text-[var(--right-text-muted)]">
        {LOGIN_FORM_TEXT.noAccount}{' '}
        <Link to="/signup" state={{ direction: 1 }} className="font-black text-[var(--accent)]">
          {LOGIN_FORM_TEXT.createAccount}
        </Link>
      </p>
    </>
  )
}

export default LoginStatusMessages
