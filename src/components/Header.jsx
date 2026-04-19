import { Users, BookOpen, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'
  const location = useLocation()

  return (
    <header className="flex items-center justify-between py-3 px-4 md:py-4 md:px-8 border-b border-white/[0.04]">
      <div className="flex items-center gap-2 md:gap-3">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Fabrício Gonçalvez" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-0.5 md:gap-1 ml-1 md:ml-3">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-semibold transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-[#00ff87]/10 text-[#00ff87]'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
            }`}
          >
            <BookOpen className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="hidden md:inline">Estratégia</span>
          </Link>
          <Link
            to="/resultados"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-semibold transition-all duration-200 ${
              location.pathname === '/resultados'
                ? 'bg-[#00ff87]/10 text-[#00ff87]'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
            }`}
          >
            <BarChart3 className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="hidden md:inline">Resultados</span>
          </Link>
        </nav>
      </div>

      <a
        href={communityLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-1.5 md:gap-2 bg-[#00ff87] text-black font-bold text-[10px] md:text-[13px] px-3 py-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] hover:scale-[1.02] active:scale-95"
      >
        <Users className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Comunidade</span>
      </a>
    </header>
  )
}
