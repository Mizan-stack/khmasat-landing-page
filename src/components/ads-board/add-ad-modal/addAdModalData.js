import { BILLING_CYCLES, PLAN_TITLES, PRICING_DATA } from '../../home/pricing-plans-section/pricingPlansData'

const AD_PLAN_BADGES = {
  advanced: 'احترافية',
  standard: 'الأكثر استخدامًا',
  free: 'بدون تكلفة',
}

const AD_PLAN_DESCRIPTIONS = {
  advanced: 'أقوى مزايا الترويج والتحليلات والدعم المخصص.',
  standard: 'أفضل توازن بين السعر والمزايا لزيادة الوصول.',
  free: 'مثالية للتجربة الأولى وإطلاق الإعلان بسرعة.',
}

const DEFAULT_PLAN_CYCLE = 'halfYear'

const AD_BILLING_CYCLES = BILLING_CYCLES

const AD_PLAN_OPTIONS_BY_CYCLE = BILLING_CYCLES.reduce((cyclesMap, cycle) => {
  const cyclePlans = PRICING_DATA[cycle.key]

  cyclesMap[cycle.key] = PLAN_TITLES.map((planTitle) => {
    const pricing = cyclePlans[planTitle.key]

    return {
      key: planTitle.key,
      title: planTitle.title,
      price: `${pricing.price} ر.س`,
      period: pricing.period,
      description: AD_PLAN_DESCRIPTIONS[planTitle.key],
      badge: AD_PLAN_BADGES[planTitle.key],
    }
  })

  return cyclesMap
}, {})

function getAdPlanOptions(cycleKey) {
  return AD_PLAN_OPTIONS_BY_CYCLE[cycleKey] ?? AD_PLAN_OPTIONS_BY_CYCLE[DEFAULT_PLAN_CYCLE]
}

const REGISTRATION_TYPES = [
  { value: 'commercial', label: 'السجل التجاري' },
  { value: 'freelance', label: 'العمل الحر' },
]

const BUSINESS_ACTIVITY_OPTIONS = [
  { value: 'fashion', label: 'أزياء وملابس' },
  { value: 'electronics', label: 'إلكترونيات' },
  { value: 'beauty', label: 'عناية وجمال' },
  { value: 'food', label: 'مطاعم ومشروبات' },
  { value: 'services', label: 'خدمات رقمية' },
  { value: 'home', label: 'مستلزمات منزلية' },
]

const BUSINESS_COUNTRY_OPTIONS = [
  { value: 'SA', label: 'السعودية' },
  { value: 'AE', label: 'الإمارات' },
  { value: 'EG', label: 'مصر' },
  { value: 'KW', label: 'الكويت' },
  { value: 'QA', label: 'قطر' },
]

const PLATFORM_OPTIONS = [
  { value: 'instagram', label: 'إنستغرام' },
  { value: 'tiktok', label: 'تيك توك' },
  { value: 'facebook', label: 'فيسبوك' },
  { value: 'snapchat', label: 'سناب شات' },
  { value: 'google', label: 'جوجل أدز' },
]

const PAYMENT_METHOD_OPTIONS = [
  { value: 'card', label: 'بطاقة بنكية' },
  { value: 'mada', label: 'مدى' },
  { value: 'applePay', label: 'Apple Pay' },
]

const WIZARD_STEPS = [
  { key: 1, title: 'اختيار الباقة' },
  { key: 2, title: 'بيانات الإعلان' },
  { key: 3, title: 'الدفع' },
]

export {
  AD_BILLING_CYCLES,
  DEFAULT_PLAN_CYCLE,
  BUSINESS_ACTIVITY_OPTIONS,
  BUSINESS_COUNTRY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PLATFORM_OPTIONS,
  REGISTRATION_TYPES,
  WIZARD_STEPS,
  getAdPlanOptions,
}
