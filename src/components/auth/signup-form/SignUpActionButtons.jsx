import { SIGNUP_FORM_TEXT } from './SignUpFormText'

function SignUpActionButtons() {
  return (
    <div>
      <button
        type="submit"
        className="group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl text-sm font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 md:text-base"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
        <span className="relative">{SIGNUP_FORM_TEXT.submit}</span>
      </button>
    </div>
  )
}

export default SignUpActionButtons
