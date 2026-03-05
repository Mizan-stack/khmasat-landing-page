import { FaAward, FaRegSmileBeam, FaStore, FaUsers } from 'react-icons/fa'

const IMPACT_CARDS = {
  left: [
    {
      id: 'experience',
      title: 'سنوات الخبرة',
      description: 'خبرة حقيقية في التنفيذ',
      value: '45',
      suffix: '+',
      icon: FaAward,
      size: 'small',
      delay: 0.02,
      floatDelay: 0.1,
    },
    {
      id: 'merchants',
      title: 'تجار نشطون',
      description: 'عملاء ينمون طلبًا يدعمنا',
      value: '180',
      suffix: '+',
      icon: FaUsers,
      size: 'large',
      delay: 0.18,
      floatDelay: 0.32,
    },
  ],
  right: [
    {
      id: 'stores',
      title: 'متاجر تم بناؤها',
      description: 'إطلاقات ناجحة على المنصة',
      value: '2,500',
      suffix: '+',
      icon: FaStore,
      size: 'large',
      delay: 0.1,
      floatDelay: 0.24,
    },
    {
      id: 'satisfaction',
      title: 'معدل الرضا',
      description: 'جودة مرضية',
      value: '99.9',
      suffix: '%',
      icon: FaRegSmileBeam,
      size: 'small',
      delay: 0.26,
      floatDelay: 0.42,
    },
  ],
}

export { IMPACT_CARDS }

