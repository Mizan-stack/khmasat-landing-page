import { AuthPageLayout, LoginFormCard, MarketingPanel } from '../components/auth'

function LoginPage() {
  return <AuthPageLayout marketing={<MarketingPanel variant="login" from="left" />} form={<LoginFormCard />} />
}

export default LoginPage
