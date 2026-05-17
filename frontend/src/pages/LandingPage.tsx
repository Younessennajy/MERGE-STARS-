import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { Button } from '@/shared/components/ui'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 border-b border-[#2A2A2A] bg-[#0A0A0A]/80 backdrop-blur-md">
        <span className="font-display font-bold text-[#D4AF37] tracking-widest text-lg">
          MERGE STARS
        </span>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest text-[#A0A0A0] uppercase">
          {['Home', 'Collection', 'Technology', 'Products', 'Partnership', 'About Us'].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <Link to={ROUTES.LOGIN}>
          <Button variant="outline" size="sm">Login / Register</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-16">
        <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-4">
          3D Filament Technology Infused with Precious Metals
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
          The Next Era of<br />
          <span className="text-[#D4AF37]">Luxury</span> Is Here
        </h1>
        <p className="text-[#A0A0A0] max-w-md mb-10 text-sm leading-relaxed">
          Revolutionary. Unique. Limitless.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Explore Collection</Button>
          <Button variant="ghost" size="lg">Watch Video</Button>
        </div>
      </section>
    </div>
  )
}
