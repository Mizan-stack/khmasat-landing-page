import AddProductsPreview from './previews/AddProductsPreview'
import AddSectionsPreview from './previews/AddSectionsPreview'
import AnalyticsPreview from './previews/AnalyticsPreview'
import CouponsPreview from './previews/CouponsPreview'
import OrderControlPreview from './previews/OrderControlPreview'
import OrdersPreview from './previews/OrdersPreview'
import SectionsPreview from './previews/SectionsPreview'

const PREVIEW_COMPONENTS = {
  sections: SectionsPreview,
  coupons: CouponsPreview,
  'add-sections': AddSectionsPreview,
  'add-products': AddProductsPreview,
  orders: OrdersPreview,
  'order-control': OrderControlPreview,
  analytics: AnalyticsPreview,
}

function FeaturePreview({ item }) {
  const PreviewComponent = PREVIEW_COMPONENTS[item.preview] ?? AnalyticsPreview
  return <PreviewComponent item={item} />
}

export default FeaturePreview
