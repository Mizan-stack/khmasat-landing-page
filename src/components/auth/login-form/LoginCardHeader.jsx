import { AuthBrandBadge, AuthLanguageBadge } from '../shared'
import ThemeToggle from '../theme-toggle/ThemeToggle'

function LoginCardHeader() {
  return (
    <div className="mb-6 flex items-center justify-between gap-3 md:mb-7">
      <AuthBrandBadge />
      <div className="flex items-center gap-2">
        <AuthLanguageBadge />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default LoginCardHeader
