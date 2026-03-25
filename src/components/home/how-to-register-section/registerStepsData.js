import { FaCrown, FaIdCard, FaTags, FaUserPlus } from 'react-icons/fa'

const REGISTER_STEPS = [
  {
    number: 1,
    title: 'إنشاء حساب',
    subtitle: 'ابدأ بإنشاء حسابك في دقائق',
    icon: FaUserPlus,
  },
  {
    number: 2,
    title: 'اختار الباقة',
    subtitle: 'حدد الخطة الأنسب لنشاطك',
    icon: FaTags,
  },
  {
    number: 3,
    title: 'بيانات الحساب',
    subtitle: 'أكمل بيانات الحساب بسهولة',
    icon: FaIdCard,
  },
  {
    number: 4,
    title: 'مبروك',
    subtitle: 'ابدأ بنشر إعلاناتك الآن',
    icon: FaCrown,
    celebration: true,
  },
]

export { REGISTER_STEPS }
