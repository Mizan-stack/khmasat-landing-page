import AuthBackdrop from './AuthBackdrop'

function AuthPageLayout({ marketing, form, reverse = false }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden px-3 py-3 md:px-6 md:py-5">
      <AuthBackdrop />

      <section className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>{marketing}</div>
        <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>{form}</div>
      </section>
    </main>
  )
}

export default AuthPageLayout
