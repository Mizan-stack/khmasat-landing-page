import { motion } from 'framer-motion'
import { PhoneFieldRow } from '../../auth/shared'
import {
  BUSINESS_ACTIVITY_OPTIONS,
  BUSINESS_COUNTRY_OPTIONS,
  PLATFORM_OPTIONS,
  REGISTRATION_TYPES,
} from './addAdModalData'
import StepField from './StepField'

const MotionSpan = motion.span
const MotionButton = motion.button

function fieldClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--ads-text)] outline-none transition-all duration-300 placeholder:text-[var(--ads-muted)] ${
    hasError
      ? 'border-red-500 bg-red-500/10'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] focus:border-[var(--ads-dropdown-active-bg)]'
  }`
}

function BusinessInfoStep({
  form,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onPhoneCountryChange,
  onBack,
  onContinue,
}) {
  const isFreelance = form.registrationType === 'freelance'
  const phoneError = touched.phone ? errors.phone : ''
  const adImageError = touched.adImage ? errors.adImage : ''
  const selectedImageName = form.adImage ? form.adImage.name : ''

  return (
    <div className="space-y-5" dir="rtl">
      <div className="text-right">
        <h3 className="text-2xl font-black text-[var(--ads-text)]">املا البيانات التالية</h3>
        <p className="mt-1 text-sm text-[var(--ads-muted)]">
          {isFreelance
            ? 'الرجاء إدخال بيانات العمل الحر الخاصة بك كما هو مطلوب.'
            : 'الرجاء إدخال تفاصيل السجل التجاري أو العمل الحر الخاص بك.'}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {REGISTRATION_TYPES.map((option) => {
          const isActive = form.registrationType === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onFieldChange('registrationType', option.value)}
              className={`relative inline-flex min-w-32 items-center justify-center rounded-xl px-4 py-2 text-sm font-black transition-all ${
                isActive
                  ? 'bg-[var(--ads-dropdown-active-bg)] text-[var(--ads-dropdown-active-text)]'
                  : 'border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] text-[var(--ads-text)]'
              }`}
            >
              {isActive ? (
                <MotionSpan
                  layoutId="registration-type-active"
                  className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--ads-dropdown-active-bg)]"
                />
              ) : null}
              <span className="relative">{option.label}</span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StepField label={isFreelance ? 'اسم الشخص' : 'الاسم التجاري'} required error={touched.businessName ? errors.businessName : ''}>
          <input
            type="text"
            value={form.businessName}
            onChange={(event) => onFieldChange('businessName', event.target.value)}
            onBlur={() => onFieldBlur('businessName')}
            placeholder={isFreelance ? 'الاسم الكامل' : 'اسم النشاط التجاري'}
            className={fieldClass(touched.businessName && errors.businessName)}
          />
        </StepField>

        {isFreelance ? (
          <StepField label="البريد الإلكتروني" required error={touched.contactEmail ? errors.contactEmail : ''}>
            <input
              type="email"
              dir="ltr"
              value={form.contactEmail}
              onChange={(event) => onFieldChange('contactEmail', event.target.value)}
              onBlur={() => onFieldBlur('contactEmail')}
              placeholder="name@example.com"
              className={fieldClass(touched.contactEmail && errors.contactEmail)}
            />
          </StepField>
        ) : (
          <StepField label="تاريخ التسجيل" required error={touched.registrationDate ? errors.registrationDate : ''}>
            <input
              type="date"
              value={form.registrationDate}
              onChange={(event) => onFieldChange('registrationDate', event.target.value)}
              onBlur={() => onFieldBlur('registrationDate')}
              className={fieldClass(touched.registrationDate && errors.registrationDate)}
            />
          </StepField>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StepField label="اختر النشاط" required error={touched.activity ? errors.activity : ''}>
          <select
            value={form.activity}
            onChange={(event) => onFieldChange('activity', event.target.value)}
            onBlur={() => onFieldBlur('activity')}
            className={fieldClass(touched.activity && errors.activity)}
          >
            <option value="">-- اختر --</option>
            {BUSINESS_ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </StepField>

        <StepField label="الدولة" required error={touched.countryIso ? errors.countryIso : ''}>
          <select
            value={form.countryIso}
            onChange={(event) => onFieldChange('countryIso', event.target.value)}
            onBlur={() => onFieldBlur('countryIso')}
            className={fieldClass(touched.countryIso && errors.countryIso)}
          >
            <option value="">-- اختر --</option>
            {BUSINESS_COUNTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </StepField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StepField label="رقم الهاتف" required error={phoneError}>
          <PhoneFieldRow
            value={form.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            onBlur={() => onFieldBlur('phone')}
            placeholder="اكتب رقم الهاتف بدون مفتاح الدولة"
            error={phoneError}
            countryIso={form.phoneCountryIso}
            onChangeCountry={onPhoneCountryChange}
          />
        </StepField>

        <StepField label="اختر المنصة" required error={touched.platform ? errors.platform : ''}>
          <select
            value={form.platform}
            onChange={(event) => onFieldChange('platform', event.target.value)}
            onBlur={() => onFieldBlur('platform')}
            className={fieldClass(touched.platform && errors.platform)}
          >
            <option value="">-- اختر --</option>
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </StepField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StepField label="رابط المتجر" required error={touched.storeUrl ? errors.storeUrl : ''}>
          <input
            type="url"
            dir="ltr"
            value={form.storeUrl}
            onChange={(event) => onFieldChange('storeUrl', event.target.value)}
            onBlur={() => onFieldBlur('storeUrl')}
            placeholder="https://yourstore.com"
            className={fieldClass(touched.storeUrl && errors.storeUrl)}
          />
        </StepField>

        <StepField label="صورة الإعلان" required error={adImageError}>
          <div
            className={`rounded-2xl border p-3 transition-colors ${
              adImageError
                ? 'border-red-500 bg-red-500/10'
                : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)]'
            }`}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                onFieldChange('adImage', file)
              }}
              onBlur={() => onFieldBlur('adImage')}
              className="block w-full text-sm text-[var(--ads-muted)] file:ms-3 file:rounded-xl file:border-0 file:bg-[var(--ads-button-primary-bg)] file:px-4 file:py-2 file:text-sm file:font-black file:text-[var(--ads-button-primary-text)]"
            />
            {selectedImageName ? (
              <p className="mt-2 truncate text-xs font-semibold text-[var(--ads-text)]">{selectedImageName}</p>
            ) : null}
          </div>
        </StepField>
      </div>

      {!isFreelance ? (
        <div className="grid gap-4 md:grid-cols-2">
          <StepField label="رقم الترخيص" required error={touched.licenseNumber ? errors.licenseNumber : ''}>
            <input
              type="text"
              value={form.licenseNumber}
              onChange={(event) => onFieldChange('licenseNumber', event.target.value)}
              onBlur={() => onFieldBlur('licenseNumber')}
              placeholder="رقم ترخيص السجل التجاري"
              className={fieldClass(touched.licenseNumber && errors.licenseNumber)}
            />
          </StepField>

          <StepField
            label="رابط المتجر السعودي للأعمال"
            required
            error={touched.saudiStoreUrl ? errors.saudiStoreUrl : ''}
          >
            <input
              type="url"
              dir="ltr"
              value={form.saudiStoreUrl}
              onChange={(event) => onFieldChange('saudiStoreUrl', event.target.value)}
              onBlur={() => onFieldBlur('saudiStoreUrl')}
              placeholder="https://saudistore.sa/yourstore"
              className={fieldClass(touched.saudiStoreUrl && errors.saudiStoreUrl)}
            />
          </StepField>
        </div>
      ) : null}

      <label className="flex items-center justify-end gap-2 text-sm font-semibold text-[var(--ads-text)]">
        <input
          type="checkbox"
          checked={form.agreement}
          onChange={(event) => onFieldChange('agreement', event.target.checked)}
          onBlur={() => onFieldBlur('agreement')}
          className="h-5 w-5 rounded border border-[var(--ads-border-soft)]"
        />
        الموافقة على أن جميع البيانات صحيحة
      </label>
      {touched.agreement && errors.agreement ? (
        <p className="-mt-3 text-right text-xs font-bold text-red-500">{errors.agreement}</p>
      ) : null}

      <div className="flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 min-w-28 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] px-6 text-sm font-black text-[var(--ads-text)]"
        >
          رجوع
        </button>
        <MotionButton
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="inline-flex h-12 min-w-36 items-center justify-center rounded-2xl bg-[var(--ads-create-bg)] px-7 text-base font-black text-[var(--ads-text)] dark:text-[var(--ads-create-text)]"
        >
          التالي
        </MotionButton>
      </div>
    </div>
  )
}

export default BusinessInfoStep
