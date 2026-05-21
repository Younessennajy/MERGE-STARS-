import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGLTF } from '@react-three/drei'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroMergeCoin from '../components/HeroMergeCoin'
import Hero3DCoin from '../components/Hero3DCoin'
import landingCoinGlb from '../assets/3d-coin/Meshy_AI_Golden_Star_Emblem_0521090909_texture.glb?url'

useGLTF.preload(landingCoinGlb)
import {
  IconFilament3D,
  IconGlobal,
  IconLimitless,
  IconPreciousMetals,
  IconSustainable,
} from '../components/LandingFeatureIcons'

const FEATURES = [
  { id: 'filament' as const, Icon: IconFilament3D },
  { id: 'metals' as const, Icon: IconPreciousMetals },
  { id: 'limitless' as const, Icon: IconLimitless },
  { id: 'sustainable' as const, Icon: IconSustainable },
  { id: 'global' as const, Icon: IconGlobal },
]

const CATEGORIES = [
  { key: 'jewelry', to: '/apply' },
  { key: 'accessories', to: '/apply' },
  { key: 'souvenirs', to: '/apply' },
  { key: 'sanitaryware', to: '/apply' },
  { key: 'stationery', to: '/apply' },
  { key: 'construction', to: '/apply' },
  { key: 'more', to: '/how-it-works' },
] as const

const TECH_POINT_KEYS = ['metals', 'composite', 'lightweight'] as const
const INVEST_POINT_KEYS = ['growth', 'tech', 'partner', 'impact'] as const

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0">
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="0.75" />
      <path d="M6 5.2v3.6l3.2-1.8L6 5.2z" fill="currentColor" />
    </svg>
  )
}

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div className="landing-page">
      <Navbar variant="landing" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 min-h-screen pt-32 pb-20 px-8 lg:px-16 overflow-hidden max-w-[1440px] mx-auto">
        <div
          className="absolute pointer-events-none w-[min(90vw,640px)] h-[min(90vw,640px)] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 68%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-42%, -48%)',
          }}
        />

        {/* Left — editorial headline */}
        <div className="relative z-10 flex-1 max-w-[440px] animate-fade-in-up order-2 lg:order-none">
          <p className="landing-hero-kicker mb-6">{t('landing.heroKicker')}</p>
          <h1
            className="landing-hero-title mb-2"
            style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)' }}
          >
            <span className="landing-hero-gold">{t('landing.heroTitleGold')}</span>
            <br />
            {t('landing.heroTitleRest')}
          </h1>
          <p className="landing-tagline mt-6 mb-4">{t('landing.tagline')}</p>
          <p className="landing-body max-w-[340px] mb-10">{t('landing.heroBody')}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/apply" className="luxury-btn-glass">
              {t('landing.exploreCollection')}
            </Link>
            <Link to="/how-it-works" className="luxury-btn-ghost">
              <PlayIcon />
              {t('landing.watchVideo')}
            </Link>
          </div>

          <p className="mt-10">
            <a
              href="#technology"
              className="landing-tagline inline-block opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out no-underline border-b border-[rgba(212,175,55,0.25)] pb-0.5"
            >
              {t('landing.exploreTech')}
            </a>
          </p>
        </div>

        {/* Center — 3D coin (Meshy_AI_Golden_Star_Emblem_0521090909_texture.glb) */}
        <div className="relative z-10 flex-1 flex justify-center items-center order-first lg:order-none w-full min-h-[min(72vw,420px)] lg:min-h-0">
          <div
            className="relative flex items-center justify-center w-full max-w-[500px] aspect-square"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 62%)',
            }}
          >
            <Suspense
              fallback={
                <HeroMergeCoin
                  className="w-full h-full max-w-[500px] opacity-90"
                  aria-label="Loading MERGE STARS coin"
                />
              }
            >
              <Hero3DCoin
                className="w-full h-full"
                aria-label="MERGE STARS golden coin emblem"
              />
            </Suspense>
          </div>
        </div>

        {/* Right — minimal feature notes */}
        <div className="hidden xl:flex flex-col gap-5 flex-shrink-0 w-[240px] order-3">
          {FEATURES.slice(0, 3).map(({ id, Icon }) => (
            <div
              key={id}
              className="flex items-start gap-4 py-4 px-5 border border-[rgba(212,175,55,0.1)] bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-[rgba(212,175,55,0.28)]"
              style={{ borderRadius: '2px' }}
            >
              <Icon className="w-8 h-8 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#D4AF37] mb-1.5">{t(`landing.features.${id}.title`)}</p>
                <p className="text-[10px] leading-relaxed tracking-wide text-neutral-500">{t(`landing.features.${id}.sub`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────── */}
      <div className="section-divider max-w-[1440px] mx-auto" />
      <section
        className="grid grid-cols-2 lg:grid-cols-5 max-w-[1440px] mx-auto"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.06)' }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={f.id}
            className="landing-feature-cell flex flex-col items-center text-center py-14 px-5"
            style={{
              borderRight: i < FEATURES.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none',
            }}
          >
            <f.Icon className="w-10 h-10 mb-5 opacity-90" />
            <p className="text-[10px] font-medium tracking-[0.22em] text-[#D4AF37] mb-2 uppercase">
              {t(`landing.features.${f.id}.title`)}
            </p>
            <p className="text-[9px] tracking-[0.12em] text-neutral-500 leading-relaxed max-w-[140px]">
              {t(`landing.features.${f.id}.sub`)}
            </p>
          </div>
        ))}
      </section>
      <div className="section-divider max-w-[1440px] mx-auto" />

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className="py-24 px-8 lg:px-16 max-w-[1440px] mx-auto">
        <h2 className="landing-sans-head text-center mb-14">{t('landing.categoriesTitle')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="landing-category-card flex flex-col items-center justify-center py-12 px-3 text-center no-underline group min-h-[148px]"
              style={{ borderRadius: '2px' }}
            >
              <span
                className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 group-hover:text-[#D4AF37] transition-all duration-300 ease-in-out leading-relaxed"
              >
                {t(`landing.categories.${c.key}`)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────── */}
      <div className="section-divider max-w-[1440px] mx-auto" />
      <section
        id="technology"
        className="grid lg:grid-cols-2 min-h-[520px] scroll-mt-32 max-w-[1440px] mx-auto"
      >
        <div
          className="relative flex items-center justify-center overflow-hidden min-h-[320px] bg-[#060606]"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)',
            }}
          />
          <div className="relative z-10 text-center px-8">
            <IconFilament3D className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <p className="landing-sans-head">{t('landing.techPanel')}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-10 lg:px-14 py-16 bg-[#050505]">
          <h2
            className="landing-section-title text-[clamp(1.75rem,3vw,2.25rem)] leading-snug mb-5"
          >
            {t('landing.techTitle1')}
            <br />
            <span className="landing-hero-gold not-italic font-normal">{t('landing.techTitle2')}</span>
            <br />
            {t('landing.techTitle3')}
          </h2>
          <p className="landing-body max-w-[380px] mb-10">{t('landing.techBody')}</p>
          <Link to="/how-it-works" className="luxury-btn-glass self-start mb-12">
            {t('landing.discoverTech')}
          </Link>
          <div className="flex flex-col gap-6">
            {TECH_POINT_KEYS.map((key) => (
              <div key={key} className="flex items-start gap-4">
                <div className="w-px h-10 bg-[rgba(212,175,55,0.35)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#D4AF37] mb-1">{t(`landing.techPoints.${key}.title`)}</p>
                  <p className="text-[10px] tracking-wide text-neutral-500 leading-relaxed">{t(`landing.techPoints.${key}.sub`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider max-w-[1440px] mx-auto" />

      {/* ── INVEST ───────────────────────────────────── */}
      <section className="grid lg:grid-cols-2 min-h-[440px] max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center px-10 lg:px-14 py-16">
          <h2 className="landing-section-title text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug mb-6">
            {t('landing.investTitle1')}
            {t('landing.investTitle2') ? (
              <>
                <br />
                {t('landing.investTitle2')}{' '}
              </>
            ) : (
              <br />
            )}
            <span className="landing-hero-gold not-italic">{t('landing.investTitleGold')}</span>
          </h2>
          <p className="landing-body max-w-[360px] mb-10">{t('landing.investBody')}</p>
          <Link to="/merge-coin" className="luxury-btn-glass self-start">
            {t('landing.learnMore')}
          </Link>
        </div>

        <div className="relative flex items-center px-10 lg:px-14 py-16 overflow-hidden bg-[#060606]">
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
              right: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <div className="relative z-10 flex flex-col gap-4 w-full">
            {INVEST_POINT_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-center gap-4 py-4 px-5 border-l border-[rgba(212,175,55,0.25)] transition-all duration-300 ease-in-out hover:border-[rgba(212,175,55,0.5)] hover:bg-black/20"
              >
                <p className="text-[10px] font-medium tracking-[0.18em] text-neutral-300">{t(`landing.investPoints.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider max-w-[1440px] mx-auto" />

      <Footer />
    </div>
  )
}
