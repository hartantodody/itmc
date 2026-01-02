import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function SiteLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative overflow-x-clip'>
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -top-28 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -bottom-28 right-[-10%] h-72 w-[40rem] rounded-full bg-accent/20 blur-3xl' />
      </div>

      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  )
}
