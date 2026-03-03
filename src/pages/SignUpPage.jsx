import AuthPageLayout from '../components/auth/AuthPageLayout'
import MarketingPanel from '../components/auth/MarketingPanel'
import SignUpFormCard from '../components/auth/SignUpFormCard'

function SignUpPage() {
  return (
    <AuthPageLayout
      reverse
      marketing={<MarketingPanel variant="signup" from="right" />}
      form={<SignUpFormCard />}
    />
  )
}

export default SignUpPage
