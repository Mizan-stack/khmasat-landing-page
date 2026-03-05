import { SIGNUP_FORM_TEXT } from './SignUpFormText'

function SignUpActionButtons({ onRequestOtp }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <button
        type="button"
        onClick={onRequestOtp}
        className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-base font-black text-[var(--right-text-primary)] transition-colors hover:border-[var(--accent)]"
      >
        {SIGNUP_FORM_TEXT.requestOtp}
      </button>
      <button
        type="submit"
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl text-base font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
        <span className="relative">{SIGNUP_FORM_TEXT.submit}</span>
      </button>
    </div>
  )
}

export default SignUpActionButtons
