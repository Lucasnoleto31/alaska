import { Users } from 'lucide-react'

export default function Header() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'

  return (
    <header className="flex items-center justify-between py-6 px-8 border-b border-white/[0.04]">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-11 h-11 bg-[#00ff87] rounded-2xl flex items-center justify-center">
            <span className="text-black font-black text-lg">A</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00ff87] rounded-full border-2 border-[#060608] animate-pulse" />
        </div>
        <div>
          <h1 className="text-white font-bold text-xl tracking-tight">
            Alaska <span className="text-[#00ff87]">Square</span>
          </h1>
          <p className="text-white/20 text-[11px] font-medium uppercase tracking-[0.2em]">Performance Dashboard</p>
        </div>
      </div>

      <a
        href={communityLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-[#00ff87] text-black font-bold text-[13px] px-7 py-3 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] hover:scale-[1.02] active:scale-95"
      >
        <Users className="w-4 h-4" />
        Comunidade
      </a>
    </header>
  )
}
