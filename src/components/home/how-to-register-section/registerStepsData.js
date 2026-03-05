import { FaCog, FaEnvelopeOpenText, FaRocket, FaUserPlus } from 'react-icons/fa'

const REGISTER_STEPS = [
  {
    number: 1,
    title: 'إنشاء حساب',
    subtitle: 'أدخل بياناتك الأساسية للبدء',
    icon: FaUserPlus,
  },
  {
    number: 2,
    title: 'تفعيل الحساب',
    subtitle: 'أكد البريد والهاتف خلال لحظات',
    icon: FaEnvelopeOpenText,
  },
  {
    number: 3,
    title: 'إعداد الحساب',
    subtitle: 'خصص الإعدادات حسب نشاطك',
    icon: FaCog,
  },
  {
    number: 4,
    title: 'ابدأ الآن',
    subtitle: 'انطلق مباشرة في لوحة الإعلانات',
    icon: FaRocket,
  },
]

export { REGISTER_STEPS }

