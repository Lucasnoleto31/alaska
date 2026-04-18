import { TrendingUp, TrendingDown, BarChart3, Target, Activity, Zap } from 'lucide-react'

function StatCard({ label, value, icon: Icon, iconColor }) {
  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-4 md:p-5 flex flex-col gap-3 md:gap-4 hover:border-[#00ff87]/20 transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00ff87]/[0.03] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between relative">
        <span className="text-white/30 text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.15em]">{label}</span>
        <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${iconColor}`} />
      </div>
      <div className="text-lg md:text-[22px] font-bold tracking-tight relative">{value}</div>
    </div>
  )
}

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
      <StatCard
        label="Total de Operacoes"
        value={<span className="text-white">{stats.totalTrades}</span>}
        icon={BarChart3}
        iconColor="text-[#00ff87]/60"
      />
      <StatCard
        label="Lucro Total"
        value={
          <span className={stats.totalProfit >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}>
            R$ {stats.totalProfit.toLocaleString('pt-BR')}
          </span>
        }
        icon={stats.totalProfit >= 0 ? TrendingUp : TrendingDown}
        iconColor={stats.totalProfit >= 0 ? 'text-[#00ff87]/60' : 'text-[#ff4757]/60'}
      />
      <StatCard
        label="Taxa de Acerto"
        value={<span className={stats.winRate >= 50 ? 'text-[#00ff87]' : 'text-[#ff4757]'}>{stats.winRate}%</span>}
        icon={Target}
        iconColor="text-[#00ff87]/60"
      />
      <StatCard
        label="Vitorias / Derrotas"
        value={
          <span>
            <span className="text-[#00ff87]">{stats.wins}</span>
            <span className="text-white/15 mx-1">/</span>
            <span className="text-[#ff4757]">{stats.losses}</span>
          </span>
        }
        icon={stats.wins >= stats.losses ? TrendingUp : TrendingDown}
        iconColor="text-white/20"
      />
      <StatCard
        label="Max Drawdown"
        value={<span className="text-[#ff4757]">R$ {stats.maxDrawdown.toLocaleString('pt-BR')}</span>}
        icon={Activity}
        iconColor="text-[#ff4757]/60"
      />
      <StatCard
        label="Fator de Lucro"
        value={<span className={stats.profitFactor >= 1 ? 'text-[#00ff87]' : 'text-[#ff4757]'}>{stats.profitFactor}</span>}
        icon={Zap}
        iconColor="text-[#00ff87]/60"
      />
    </div>
  )
}
