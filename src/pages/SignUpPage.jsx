import { AuthPageLayout, MarketingPanel, SignUpFormCard } from '../components/auth'

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
