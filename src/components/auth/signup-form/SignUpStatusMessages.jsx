import { Link } from 'react-router-dom'
import { SIGNUP_FORM_TEXT } from './SignUpFormText'

function SignUpStatusMessages({ submitted, hasErrors, touched }) {
  return (
    <>
      {submitted && !hasErrors && (
        <p className="rounded-xl border px-3 py-2.5 text-xs font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)] md:text-sm">
          {SIGNUP_FORM_TEXT.signupSuccess}
        </p>
      )}

      {!submitted && hasErrors && (touched.name || touched.email || touched.phone || touched.password) && (
        <p className="text-xs font-semibold text-amber-300 md:text-sm">{SIGNUP_FORM_TEXT.fieldsWarning}</p>
      )}

      {!submitted && !hasErrors && touched.password && (
        <p className="text-xs font-semibold text-amber-300 md:text-sm">{SIGNUP_FORM_TEXT.verificationWarning}</p>
      )}

      <p className="text-center text-xs text-[var(--right-text-muted)] md:text-sm">
        {SIGNUP_FORM_TEXT.hasAccount}{' '}
        <Link to="/login" state={{ direction: -1 }} className="font-black text-[var(--accent)]">
          {SIGNUP_FORM_TEXT.loginNow}
        </Link>
      </p>
    </>
  )
}

export default SignUpStatusMessages
