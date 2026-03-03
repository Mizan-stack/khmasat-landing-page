import AuthPageLayout from '../components/auth/AuthPageLayout'
import LoginFormCard from '../components/auth/LoginFormCard'
import MarketingPanel from '../components/auth/MarketingPanel'

function LoginPage() {
  return <AuthPageLayout marketing={<MarketingPanel variant="login" from="left" />} form={<LoginFormCard />} />
}

export default LoginPage
