import { Link } from 'react-router-dom'
import { SIGNUP_FORM_TEXT } from './SignUpFormText'

function SignUpStatusMessages({ otpSent, otpVerified, submitted, hasErrors, touched }) {
  return (
    <>
      {otpSent && (
        <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-info-bg)] text-[var(--status-info-text)] border-[var(--status-info-border)]">
          {SIGNUP_FORM_TEXT.otpSent}
        </p>
      )}

      {otpVerified && (
        <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
          {SIGNUP_FORM_TEXT.otpVerified}
        </p>
      )}

      {submitted && !hasErrors && (
        <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
          {SIGNUP_FORM_TEXT.signupSuccess}
        </p>
      )}

      {!submitted && hasErrors && (touched.name || touched.email || touched.phone || touched.password) && (
        <p className="text-sm font-semibold text-amber-300">{SIGNUP_FORM_TEXT.fieldsWarning}</p>
      )}

      {!submitted && !otpVerified && !hasErrors && touched.password && (
        <p className="text-sm font-semibold text-amber-300">{SIGNUP_FORM_TEXT.otpWarning}</p>
      )}

      <p className="text-center text-sm text-[var(--right-text-muted)]">
        {SIGNUP_FORM_TEXT.hasAccount}{' '}
        <Link to="/login" state={{ direction: -1 }} className="font-black text-[var(--accent)]">
          {SIGNUP_FORM_TEXT.loginNow}
        </Link>
      </p>
    </>
  )
}

export default SignUpStatusMessages
