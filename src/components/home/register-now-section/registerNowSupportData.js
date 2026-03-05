import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'

const SUPPORT_ITEMS = [
  {
    id: 'email',
    title: 'بريد الأعمال',
    subtitle: 'الرد خلال 24 ساعة',
    value: 'business@adsplatform.com',
    icon: FaEnvelope,
  },
  {
    id: 'phone',
    title: 'خط المبيعات',
    subtitle: 'الأحد-الخميس 9 صباحًا - 6 مساءً',
    value: '+966 55 725 8055',
    icon: FaPhone,
  },
  {
    id: 'location',
    title: 'المقر الرئيسي',
    subtitle: 'المملكة العربية السعودية',
    value: 'منطقة الفهدة النور، الطائف',
    icon: FaLocationDot,
  },
]

export { SUPPORT_ITEMS }

