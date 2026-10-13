import { useEffect, useState } from 'react'
import { Users, BookOpen, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Estratégia', icon: BookOpen },
  { to: '/resultados', label: 'Resultados', icon: BarChart3 },
]

// Fio de progresso da rolagem, só em página longa.
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="absolute left-0 top-0 h-0.5 w-full origin-left bg-foreground"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}

export default function Header() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? 'glass-bar border-border' : 'border-transparent'
      }`}
    >
      {pathname === '/' && <ScrollProgress />}

      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-8">
        <Link to="/" className="flex items-center justify-self-start" aria-label="Início">
          <img src="/logo.png" alt="Fabrício Gonçalvez" className="h-11 w-11 -ml-1.5" />
        </Link>

        <nav aria-label="Seções" className="flex items-center gap-0.5 rounded-full border border-border bg-card p-1">
          {NAV.map(({ to, label, icon }) => {
            const active = pathname === to
            const Icon = icon
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`pressable flex h-9 items-center gap-1.5 rounded-full px-3.5 text-footnote font-medium md:px-4 ${
                  active ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon className="hidden h-4 w-4 md:block" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                {label}
              </Link>
            )
          })}
        </nav>

        <a
          href={communityLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar na comunidade"
          className="pressable flex h-11 items-center gap-2 justify-self-end rounded-control bg-brand px-3 text-footnote font-semibold text-brand-foreground md:h-10 md:px-4"
        >
          <Users className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          <span className="hidden sm:inline">Comunidade</span>
        </a>
      </div>
    </header>
  )
}
