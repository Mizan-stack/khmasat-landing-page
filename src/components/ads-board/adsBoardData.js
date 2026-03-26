const ADS_SORT_OPTIONS = [
  { value: 'latest', label: 'الأحدث' },
  { value: 'priceLow', label: 'الأقل سعرًا' },
  { value: 'priceHigh', label: 'الأعلى سعرًا' },
]

const ADS_ITEMS = [
  {
    id: 'ad-1',
    title: 'إدارة حسابات سوشيال ميديا وتصاميم جرافيك احترافية',
    category: 'خدمات',
    planKey: 'free',
    planName: 'باقة الانطلاقة',
    expiresOn: '18 أبريل 2026',
    location: 'أونلاين',
    timeAgo: 'منذ 3 أيام',
    price: 150,
    featured: false,
    createdRank: 2,
    image:
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ad-2',
    title: 'iPhone 14 Pro Max 256GB - Deep Purple',
    category: 'جوالات',
    planKey: 'standard',
    planName: 'باقة الوصول',
    expiresOn: '9 أبريل 2026',
    location: 'رابغ',
    timeAgo: 'منذ يومين',
    price: 950,
    featured: true,
    createdRank: 3,
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ad-3',
    title: 'جلسة تصوير منتجات مع تعديل احترافي خلال 24 ساعة',
    category: 'تصوير',
    planKey: 'advanced',
    planName: 'باقة مميزة',
    expiresOn: '22 أبريل 2026',
    location: 'جدة',
    timeAgo: 'منذ 4 ساعات',
    price: 320,
    featured: true,
    createdRank: 6,
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ad-4',
    title: 'لابتوب أعمال خفيف جدًا بحالة ممتازة',
    category: 'أجهزة',
    planKey: 'advanced',
    planName: 'باقة الاحتراف',
    expiresOn: '29 أبريل 2026',
    location: 'الرياض',
    timeAgo: 'منذ يوم',
    price: 780,
    featured: false,
    createdRank: 5,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ad-5',
    title: 'خدمة كتابة محتوى إعلاني يحوّل المتابعين إلى عملاء',
    category: 'محتوى',
    planKey: 'standard',
    planName: 'باقة النمو',
    expiresOn: '14 أبريل 2026',
    location: 'أونلاين',
    timeAgo: 'منذ 5 أيام',
    price: 210,
    featured: false,
    createdRank: 1,
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ad-6',
    title: 'حزمة هوية بصرية كاملة للشركات الناشئة',
    category: 'براندنج',
    planKey: 'advanced',
    planName: 'باقة الشركات',
    expiresOn: '30 أبريل 2026',
    location: 'الدمام',
    timeAgo: 'منذ 12 ساعة',
    price: 540,
    featured: true,
    createdRank: 4,
    image:
      'https://images.unsplash.com/photo-1533749047139-189de3cf06d3?auto=format&fit=crop&w=1200&q=80',
  },
]

const ADS_PAGE_TEXT = {
  createService: 'إضافة إعلان جديد',
  resultLabel: `تم العثور على ${ADS_ITEMS.length} إعلان`,
  dashboard: 'الذهاب للداشبورد',
  goToAd: 'الذهاب للإعلان',
  upgrade: 'ترقية',
  expiresLabel: 'ينتهي في',
}

export { ADS_ITEMS, ADS_PAGE_TEXT, ADS_SORT_OPTIONS }
