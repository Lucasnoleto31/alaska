import { Users, BookOpen, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'
  const location = useLocation()

  return (
    <header className="flex items-center justify-between py-4 px-4 md:py-6 md:px-8 border-b border-white/[0.04]">
      <div className="flex items-center gap-3 md:gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-[#00ff87] rounded-xl md:rounded-2xl flex items-center justify-center">
              <span className="text-black font-black text-base md:text-lg">A</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#00ff87] rounded-full border-2 border-[#060608] animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-base md:text-xl tracking-tight">
              Alaska <span className="text-[#00ff87]">Square</span>
            </h1>
            <p className="text-white/20 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.2em]">Performance Dashboard</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 ml-2 md:ml-4">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-[11px] md:text-xs font-semibold transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-[#00ff87]/10 text-[#00ff87]'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link
            to="/estrategia"
            className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-[11px] md:text-xs font-semibold transition-all duration-200 ${
              location.pathname === '/estrategia'
                ? 'bg-[#00ff87]/10 text-[#00ff87]'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Estratégia</span>
          </Link>
        </nav>
      </div>

      <a
        href={communityLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 bg-[#00ff87] text-black font-bold text-[11px] md:text-[13px] px-4 py-2.5 md:px-7 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] hover:scale-[1.02] active:scale-95"
      >
        <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Comunidade</span>
      </a>
    </header>
  )
}
