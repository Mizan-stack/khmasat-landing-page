import { motion } from 'framer-motion'
import { CompactCountryCodeSelect } from '../../../auth/country-select'
import RegisterFormField from './RegisterFormField'
import { registerInputClass } from './registerInputClass'
import { useRegisterNowForm } from './useRegisterNowForm'

const MotionDiv = motion.div

function RegisterNowFormPanel() {
  const { form, fieldErrors, submitted, updateField, changeCountry, touchField, handleSubmit } = useRegisterNowForm()

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 44, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      dir="rtl"
    >
      <h2 className="text-right text-[clamp(1.6rem,3.4vw,3rem)] font-black text-[var(--home-register-title)]">سجل الآن</h2>
      <p className="mt-2 text-right text-[clamp(0.9rem,1.05vw,1.05rem)] text-[var(--home-register-text)]">
        جاهز للانطلاق؟ أخبرنا عن مشروعك وسنساعدك في اختيار الحل المناسب.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <RegisterFormField label="الاسم الأول" error={fieldErrors.firstName}>
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              onBlur={() => touchField('firstName')}
              placeholder="أدخل الاسم الأول"
              className={registerInputClass(fieldErrors.firstName)}
            />
          </RegisterFormField>
          <RegisterFormField label="الاسم الأخير" error={fieldErrors.lastName}>
            <input
              type="text"
              value={form.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              onBlur={() => touchField('lastName')}
              placeholder="أدخل الاسم الأخير"
              className={registerInputClass(fieldErrors.lastName)}
            />
          </RegisterFormField>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.02fr_0.98fr]">
          <RegisterFormField label="البريد الإلكتروني" error={fieldErrors.email}>
            <input
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={() => touchField('email')}
              placeholder="أدخل البريد الإلكتروني"
              className={`${registerInputClass(fieldErrors.email)} text-left placeholder-shown:text-right`}
            />
          </RegisterFormField>

          <RegisterFormField label="رقم الهاتف" error={fieldErrors.phone}>
            <div
              dir="rtl"
              className={`relative flex h-14 rounded-2xl border ${
                fieldErrors.phone
                  ? 'border-red-400/80 bg-red-500/10'
                  : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus-within:border-[var(--accent)]'
              }`}
            >
              <CompactCountryCodeSelect value={form.countryIso} onChange={changeCountry} error={fieldErrors.phone} />

              <input
                type="tel"
                inputMode="numeric"
                dir="ltr"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                onBlur={() => touchField('phone')}
                placeholder="اكتب الرقم"
                className="h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-left text-[clamp(0.88rem,1vw,1rem)] text-[var(--right-text-primary)] outline-none placeholder-shown:text-right placeholder:text-[var(--text-placeholder)]"
              />
            </div>
          </RegisterFormField>
        </div>

        <label className="flex items-center justify-end gap-2 pt-1 text-[clamp(0.85rem,1vw,0.95rem)] font-semibold text-[var(--home-register-item-title)]">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(event) => updateField('agree', event.target.checked)}
            onBlur={() => touchField('agree')}
            className="h-5 w-5 rounded border border-[var(--border-soft)]"
          />
          أوافق على استلام المراسلات
        </label>
        {fieldErrors.agree && <p className="text-right text-xs font-bold text-red-400">{fieldErrors.agree}</p>}

        <button
          type="submit"
          className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl text-2xl font-black text-white shadow-[0_16px_34px_rgba(43,184,179,0.28)]"
        >
          <span className="absolute inset-0 [background:var(--home-register-button-bg)] transition-transform duration-500 group-hover:scale-105" />
          <span className="relative">إنشاء حساب</span>
        </button>

        {submitted && (
          <p className="rounded-xl border border-[var(--status-success-border)] bg-[var(--status-success-bg)] px-4 py-3 text-sm font-bold text-[var(--status-success-text)]">
            تم إرسال طلبك بنجاح (واجهة UI فقط).
          </p>
        )}
      </form>
    </MotionDiv>
  )
}

export default RegisterNowFormPanel
