import AuthBackdrop from './AuthBackdrop'

function AuthPageLayout({ marketing, form, reverse = false }) {
  return (
    <main className="relative flex min-h-dvh items-start overflow-x-hidden overflow-y-auto px-3 py-2 md:items-center md:px-4 md:py-3">
      <AuthBackdrop />

      <section className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-3 md:grid-cols-[0.95fr_1fr] md:gap-4">
        <div className={`hidden md:block ${reverse ? 'md:order-2' : 'md:order-1'}`}>{marketing}</div>
        <div className={reverse ? 'md:order-1' : 'md:order-2'}>{form}</div>
      </section>
    </main>
  )
}

export default AuthPageLayout
