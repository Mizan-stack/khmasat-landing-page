import { FaFacebookF, FaGithub, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa'
import { FaGlobe, FaXTwitter } from 'react-icons/fa6'

const FOOTER_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'لماذا نحن', href: '#why-us' },
  { label: 'الحلول', href: '#solutions' },
  { label: 'أعمالنا', href: '#works' },
  { label: 'اتصل بنا', href: '#register-now' },
]

const FOOTER_SOCIALS = [
  { label: 'الموقع', href: '#home', icon: FaGlobe },
  { label: 'إكس', href: 'https://x.com', icon: FaXTwitter },
  { label: 'جيت هاب', href: 'https://github.com', icon: FaGithub },
  { label: 'فيسبوك', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'لينكدإن', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'تيليجرام', href: 'https://t.me', icon: FaTelegramPlane },
]

const FOOTER_CONTENT = {
  brandName: 'حلول مسافات',
  brandDescription: 'شريكك الموثوق لحلول المتاجر وقوائم الطعام الرقمية. نبني مشاريع تنمو.',
  linksTitle: 'الحلول',
  newsletterTitle: 'نصائح تجارية',
  newsletterDescription: 'اشترك للحصول على استراتيجيات نمو التجارة الإلكترونية.',
  newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
  submitAriaLabel: 'اشتراك',
  copy: '© 2026 جميع الحقوق محفوظة - حلول مسافات',
}

export { FOOTER_CONTENT, FOOTER_LINKS, FOOTER_SOCIALS }
