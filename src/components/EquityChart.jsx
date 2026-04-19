import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-3.5 md:p-4 shadow-2xl shadow-black/60">
      <p className="text-white/30 text-[9px] md:text-[10px] font-medium mb-2">{data.date} &middot; {data.time}</p>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-6">
          <span className="text-white/35 text-[10px] md:text-[11px]">Trade</span>
          <span className={`text-[11px] md:text-xs font-bold ${data.profit >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
            {data.profit >= 0 ? '+' : ''}R$ {data.profit.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-white/35 text-[10px] md:text-[11px]">Acumulado</span>
          <span className="text-white text-[11px] md:text-xs font-bold">
            R$ {data.cumulative.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function EquityChart({ data }) {
  const isPositive = data.length > 0 && data[data.length - 1].cumulative >= 0
  const color = isPositive ? '#00ff87' : '#ff4757'

  // Calculate stats for the mini cards
  const lastValue = data.length > 0 ? data[data.length - 1].cumulative : 0
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.cumulative)) : 0
  const minValue = data.length > 0 ? Math.min(...data.map(d => d.cumulative)) : 0
  const wins = data.filter(d => d.profit > 0).length
  const losses = data.filter(d => d.profit < 0).length

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-xl md:rounded-2xl p-4 md:p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff87]/[0.01] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-[#00ff87]/[0.02] to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 relative">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
          </div>
          <div>
            <span className="text-white font-semibold text-[13px] md:text-sm block">Curva de Capital</span>
            <span className="text-white/15 text-[9px] md:text-[10px]">{data.length} operações</span>
          </div>
        </div>
        {data.length > 0 && (
          <div className="text-right">
            <span className={`text-base md:text-xl font-black block ${isPositive ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
              {isPositive ? '+' : ''}R$ {lastValue.toLocaleString('pt-BR')}
            </span>
            <span className="text-white/15 text-[8px] md:text-[9px] uppercase tracking-wider">resultado acumulado</span>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="h-[220px] md:h-[360px] flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white/10" />
          </div>
          <span className="text-white/15 text-[11px] md:text-xs">Nenhuma operação encontrada</span>
        </div>
      ) : (
        <div className="relative -ml-2 md:ml-0">
          <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 240 : 380}>
            <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.18} />
                  <stop offset="40%" stopColor={color} stopOpacity={0.06} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <XAxis
                dataKey="date"
                tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v}`}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke={color}
                strokeWidth={2}
                fill="url(#equityGradient)"
                dot={false}
                activeDot={{ r: 4, fill: color, stroke: '#060608', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
