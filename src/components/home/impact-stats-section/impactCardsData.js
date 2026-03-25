import { FaAward, FaRegSmileBeam, FaStore, FaUsers } from 'react-icons/fa'

const IMPACT_CARDS = {
  left: [
    {
      id: 'experience',
      title: 'سنوات الخبرة',
      description: 'خبرة حقيقية في التنفيذ',
      value: '45',
      numericValue: 45,
      decimals: 0,
      suffix: '+',
      icon: FaAward,
      size: 'small',
      delay: 0.02,
      floatDelay: 0.1,
      counterDuration: 1.45,
    },
    {
      id: 'merchants',
      title: 'تجار نشطون',
      description: 'عملاء ينمون طلبًا يدعمنا',
      value: '180',
      numericValue: 180,
      decimals: 0,
      suffix: '+',
      icon: FaUsers,
      size: 'large',
      delay: 0.18,
      floatDelay: 0.32,
      counterDuration: 1.55,
    },
  ],
  right: [
    {
      id: 'stores',
      title: 'متاجر تم بناؤها',
      description: 'إطلاقات ناجحة على المنصة',
      value: '2,500',
      numericValue: 2500,
      decimals: 0,
      suffix: '+',
      icon: FaStore,
      size: 'large',
      delay: 0.1,
      floatDelay: 0.24,
      counterDuration: 1.7,
    },
    {
      id: 'satisfaction',
      title: 'معدل الرضا',
      description: 'جودة مرضية',
      value: '99.9',
      numericValue: 99.9,
      decimals: 1,
      suffix: '%',
      icon: FaRegSmileBeam,
      size: 'small',
      delay: 0.26,
      floatDelay: 0.42,
      counterDuration: 1.6,
    },
  ],
}

export { IMPACT_CARDS }

