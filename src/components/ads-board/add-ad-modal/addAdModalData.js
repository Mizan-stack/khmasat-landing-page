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
const DEFAULT_AD_PLAN_KEY = 'standard'

const AD_BILLING_CYCLES = BILLING_CYCLES

function parsePriceValue(priceText) {
  return Number(priceText.replace(/,/g, '')) || 0
}

const AD_PLAN_OPTIONS_BY_CYCLE = BILLING_CYCLES.reduce((cyclesMap, cycle) => {
  const cyclePlans = PRICING_DATA[cycle.key]

  cyclesMap[cycle.key] = PLAN_TITLES.map((planTitle) => {
    const pricing = cyclePlans[planTitle.key]
    const priceValue = parsePriceValue(pricing.price)

    return {
      key: planTitle.key,
      title: planTitle.title,
      price: pricing.price,
      priceValue,
      priceLabel: pricing.price === '0' ? 'مجاني' : `${pricing.price} ر.س`,
      period: pricing.period,
      cycleKey: cycle.key,
      cycleLabel: cycle.label,
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
  {
    value: 'visa',
    label: 'Visa',
    type: 'card',
    description: 'بطاقات فيزا الائتمانية والخصم المباشر',
  },
  {
    value: 'mastercard',
    label: 'Mastercard',
    type: 'card',
    description: 'الدفع عبر بطاقات ماستر كارد',
  },
  {
    value: 'applePay',
    label: 'Apple Pay',
    type: 'wallet',
    description: 'الدفع السريع من الأجهزة والمحافظ المدعومة',
  },
  {
    value: 'mada',
    label: 'مدى',
    type: 'card',
    description: 'بطاقات مدى المحلية المرتبطة بحسابك البنكي',
  },
  {
    value: 'bankTransfer',
    label: 'تحويل بنكي',
    type: 'bank',
    description: 'حوّل يدويًا ثم أكمل بيانات المرجع البنكي',
  },
  {
    value: 'tabby',
    label: 'تابي',
    type: 'installment',
    description: 'قسّم المبلغ على 4 دفعات بدون فوائد',
  },
  {
    value: 'tamara',
    label: 'تمارا',
    type: 'installment',
    description: 'اشتر الآن وادفع لاحقًا بخطوات سريعة',
  },
]

const PROMO_COUPONS = [
  {
    code: 'WELCOME10',
    label: 'خصم ترحيبي 10%',
    type: 'percent',
    amount: 10,
  },
  {
    code: 'BOOST250',
    label: 'خصم ثابت 250 ر.س',
    type: 'fixed',
    amount: 250,
  },
  {
    code: 'ADV20',
    label: 'خصم 20% على الخطة المتقدمة',
    type: 'percent',
    amount: 20,
    allowedPlans: ['advanced'],
  },
  {
    code: 'SCALE500',
    label: 'خصم 500 ر.س على الباقات نصف السنوية والسنوية',
    type: 'fixed',
    amount: 500,
    allowedCycles: ['halfYear', 'yearly'],
  },
]

const WIZARD_STEPS = [
  { key: 1, title: 'اختيار الباقة' },
  { key: 2, title: 'بيانات الإعلان' },
  { key: 3, title: 'الدفع' },
]

export {
  AD_BILLING_CYCLES,
  DEFAULT_AD_PLAN_KEY,
  DEFAULT_PLAN_CYCLE,
  BUSINESS_ACTIVITY_OPTIONS,
  BUSINESS_COUNTRY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PLATFORM_OPTIONS,
  PROMO_COUPONS,
  REGISTRATION_TYPES,
  WIZARD_STEPS,
  getAdPlanOptions,
}
