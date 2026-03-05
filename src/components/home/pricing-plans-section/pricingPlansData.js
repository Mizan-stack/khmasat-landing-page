const BILLING_CYCLES = [
  { key: 'monthly', label: 'شهري' },
  { key: 'halfYear', label: 'نصف سنوي' },
  { key: 'yearly', label: 'سنوي' },
]

const PLAN_TITLES = [
  { key: 'advanced', title: 'الخطة المتقدمة' },
  { key: 'standard', title: 'الخطة القياسية' },
  { key: 'free', title: 'الخطة المجانية' },
]

const PLAN_FEATURES = [
  'متجر إلكتروني أساسي',
  'عدد منتجات محدود (حتى 20)',
  'دعم عبر البريد',
  'منتجات غير محدودة',
  'تقارير شهرية',
  'تحسين محركات البحث',
  'دعم فني',
  'تقارير أسبوعية',
  'دعم أولوية 24/7',
  'طلبات متقدمة',
  'تخصيص كامل للمتجر',
  'مدير حساب مخصص',
]

const PRICING_DATA = {
  monthly: {
    advanced: {
      price: '3,199',
      period: '/ شهر',
      features: [true, false, false, true, true, true, true, true, true, true, true, true],
    },
    standard: {
      price: '499',
      period: '/ شهر',
      features: [true, true, true, true, true, true, true, false, false, false, false, false],
    },
    free: {
      price: '0',
      period: 'مدى الحياة',
      features: [true, true, true, false, false, false, false, false, false, false, false, false],
    },
  },
  halfYear: {
    advanced: {
      price: '2,999',
      period: '/ 6 أشهر',
      features: [true, false, true, true, true, true, true, true, true, true, true, true],
    },
    standard: {
      price: '2,499',
      period: '/ 6 أشهر',
      features: [true, true, true, true, true, true, true, true, false, false, false, false],
    },
    free: {
      price: '0',
      period: 'مدى الحياة',
      features: [true, true, true, false, false, false, false, false, false, false, false, false],
    },
  },
  yearly: {
    advanced: {
      price: '5,499',
      period: '/ سنة',
      features: [true, false, true, true, true, true, true, true, true, true, true, true],
    },
    standard: {
      price: '4,799',
      period: '/ سنة',
      features: [true, true, true, true, true, true, true, true, true, true, false, false],
    },
    free: {
      price: '0',
      period: 'مدى الحياة',
      features: [true, true, true, false, false, false, false, false, false, false, false, false],
    },
  },
}

export { BILLING_CYCLES, PLAN_TITLES, PLAN_FEATURES, PRICING_DATA }

