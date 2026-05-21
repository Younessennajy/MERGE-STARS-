import Navbar from './Navbar'
import Footer from './Footer'

/** Marketing + public pages: fixed nav, consistent top offset, footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#080808' }}>
      <Navbar variant="landing" />
      <main className="site-main flex-1 w-full min-w-0">{children}</main>
      <Footer />
    </div>
  )
}
