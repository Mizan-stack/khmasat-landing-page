import { motion } from 'framer-motion'
import { useTheme } from '../../../app/providers/useTheme'
import { PhoneFieldRow } from '../../auth/shared'
import {
  BUSINESS_ACTIVITY_OPTIONS,
  BUSINESS_COUNTRY_OPTIONS,
  PLATFORM_OPTIONS,
  REGISTRATION_TYPES,
} from './addAdModalData'
import RegistrationDatePicker from './RegistrationDatePicker'
import StepField from './StepField'

const MotionSpan = motion.span
const MotionButton = motion.button
const SELECT_OPTION_STYLE = {
  backgroundColor: 'var(--ads-dropdown-bg)',
  color: 'var(--ads-text)',
}

function fieldClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--ads-text)] outline-none transition-all duration-300 placeholder:text-[var(--ads-muted)] ${
    hasError
      ? 'border-red-500 bg-red-500/10'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] focus:border-[var(--ads-dropdown-active-bg)]'
  }`
}

function selectFieldClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--ads-text)] outline-none transition-all duration-300 ${
    hasError
      ? 'border-red-500 bg-[var(--ads-surface-soft)] shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] focus:border-[var(--ads-dropdown-active-bg)]'
  }`
}

function uploadShellClass(hasError) {
  return `rounded-2xl border p-3 transition-colors ${
    hasError
      ? 'border-red-500 bg-red-500/10'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)]'
  }`
}

function UploadField({
  label,
  error,
  touched,
  file,
  progress,
  isUploading,
  onChange,
  onBlur,
}) {
  const currentError = touched ? error : ''
  const statusText = currentError
    ? 'تحقق من نوع الصورة أو حجمها'
    : isUploading
      ? 'جارٍ تحميل الصورة...'
      : progress === 100
        ? 'تم تحميل الصورة بنجاح'
        : 'الصورة جاهزة للمتابعة'

  return (
    <StepField label={label} required error={currentError}>
      <div className={uploadShellClass(currentError)}>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] ?? null
            onChange(selectedFile)
          }}
          onBlur={onBlur}
          className="block w-full text-sm text-[var(--ads-muted)] file:ms-3 file:rounded-xl file:border-0 file:bg-[var(--ads-button-primary-bg)] file:px-4 file:py-2 file:text-sm file:font-black file:text-[var(--ads-button-primary-text)]"
        />

        {file ? (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-xs font-semibold text-[var(--ads-text)]">{file.name}</p>
              <span className="shrink-0 text-xs font-black text-[var(--ads-button-ghost-text)]">{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[var(--ads-border-soft)]">
              <motion.span
                className="block h-full rounded-full [background:var(--ads-button-primary-bg)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
            </div>

            <p className="text-[11px] font-semibold text-[var(--ads-muted)]">{statusText}</p>
          </div>
        ) : (
          <p className="mt-2 text-[11px] font-semibold text-[var(--ads-muted)]">JPG / PNG / WEBP حتى 5MB</p>
        )}
      </div>
    </StepField>
  )
}

function BusinessInfoStep({
  form,
  errors,
  touched,
  fileUploadProgress,
  fileUploadLoading,
  onFieldChange,
  onFieldBlur,
  onPhoneCountryChange,
  onBack,
  onContinue,
}) {
  const isFreelance = form.registrationType === 'freelance'
  const phoneError = touched.phone ? errors.phone : ''
  const { isDark } = useTheme()
  const selectStyle = { colorScheme: isDark ? 'dark' : 'light' }

  return (
    <div className="space-y-5" dir="rtl">
      <div className="text-right">
        <h3 className="text-2xl font-black text-[var(--ads-text)]">املا البيانات التالية</h3>
        <p className="mt-1 text-sm text-[var(--ads-muted)]">
          {isFreelance
            ? 'أدخل بيانات وثيقة العمل الحر الخاصة بك، مع رقم الوثيقة وصورتها بشكل واضح.'
            : 'أدخل بيانات السجل التجاري وبيانات النشاط والصور المطلوبة بدقة.'}
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
            <RegistrationDatePicker
              value={form.registrationDate}
              error={touched.registrationDate ? errors.registrationDate : ''}
              onChange={(nextValue) => onFieldChange('registrationDate', nextValue)}
              onBlur={() => onFieldBlur('registrationDate')}
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
            style={selectStyle}
            className={selectFieldClass(touched.activity && errors.activity)}
          >
            <option value="">-- اختر --</option>
            {BUSINESS_ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={SELECT_OPTION_STYLE}>
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
            style={selectStyle}
            className={selectFieldClass(touched.countryIso && errors.countryIso)}
          >
            <option value="">-- اختر --</option>
            {BUSINESS_COUNTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={SELECT_OPTION_STYLE}>
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
            layoutClassName="md:grid md:grid-cols-[1fr_18rem] md:items-start"
            countrySelectClassName="md:w-[18rem]"
            countryDropdownClassName="md:w-[19rem]"
          />
        </StepField>

        <StepField label="اختر المنصة" required error={touched.platform ? errors.platform : ''}>
          <select
            value={form.platform}
            onChange={(event) => onFieldChange('platform', event.target.value)}
            onBlur={() => onFieldBlur('platform')}
            style={selectStyle}
            className={selectFieldClass(touched.platform && errors.platform)}
          >
            <option value="">-- اختر --</option>
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={SELECT_OPTION_STYLE}>
                {option.label}
              </option>
            ))}
          </select>
        </StepField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StepField
          label={isFreelance ? 'رقم الوثيقة' : 'رابط المتجر'}
          required
          error={isFreelance ? (touched.documentNumber ? errors.documentNumber : '') : touched.storeUrl ? errors.storeUrl : ''}
        >
          <input
            type={isFreelance ? 'text' : 'url'}
            dir={isFreelance ? 'rtl' : 'ltr'}
            value={isFreelance ? form.documentNumber : form.storeUrl}
            onChange={(event) => onFieldChange(isFreelance ? 'documentNumber' : 'storeUrl', event.target.value)}
            onBlur={() => onFieldBlur(isFreelance ? 'documentNumber' : 'storeUrl')}
            placeholder={isFreelance ? 'أدخل رقم وثيقة العمل الحر' : 'https://yourstore.com'}
            className={fieldClass(
              isFreelance
                ? touched.documentNumber && errors.documentNumber
                : touched.storeUrl && errors.storeUrl,
            )}
          />
        </StepField>

        <UploadField
          label="صورة الإعلان"
          error={errors.adImage}
          touched={touched.adImage}
          file={form.adImage}
          progress={fileUploadProgress.adImage}
          isUploading={fileUploadLoading.adImage}
          onChange={(file) => onFieldChange('adImage', file)}
          onBlur={() => onFieldBlur('adImage')}
        />
      </div>

      {isFreelance ? (
        <div className="grid gap-4 md:grid-cols-2">
          <UploadField
            label="رفع صورة وثيقة العمل الحر"
            error={errors.documentImage}
            touched={touched.documentImage}
            file={form.documentImage}
            progress={fileUploadProgress.documentImage}
            isUploading={fileUploadLoading.documentImage}
            onChange={(file) => onFieldChange('documentImage', file)}
            onBlur={() => onFieldBlur('documentImage')}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <StepField label="رقم السجل التجاري" required error={touched.licenseNumber ? errors.licenseNumber : ''}>
            <input
              type="text"
              value={form.licenseNumber}
              onChange={(event) => onFieldChange('licenseNumber', event.target.value)}
              onBlur={() => onFieldBlur('licenseNumber')}
              placeholder="أدخل رقم السجل التجاري"
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

          <UploadField
            label="رفع صورة السجل التجاري"
            error={errors.documentImage}
            touched={touched.documentImage}
            file={form.documentImage}
            progress={fileUploadProgress.documentImage}
            isUploading={fileUploadLoading.documentImage}
            onChange={(file) => onFieldChange('documentImage', file)}
            onBlur={() => onFieldBlur('documentImage')}
          />
        </div>
      )}

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
          className="inline-flex h-12 min-w-36 items-center justify-center rounded-2xl px-7 text-base font-black text-[var(--ads-create-text)] [background:var(--ads-create-bg)]"
        >
          التالي
        </MotionButton>
      </div>
    </div>
  )
}

export default BusinessInfoStep
