import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 shadow-2xl shadow-black/60">
      <p className="text-white/30 text-[11px] font-medium mb-2">{data.date} &middot; {data.time}</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-6">
          <span className="text-white/40 text-xs">Trade</span>
          <span className={`text-sm font-bold ${data.profit >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
            {data.profit >= 0 ? '+' : ''}R$ {data.profit.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-white/40 text-xs">Acumulado</span>
          <span className="text-white text-sm font-bold">
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

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff87]/[0.01] to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="w-8 h-8 rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#00ff87]" />
        </div>
        <span className="text-white font-semibold text-sm">Relatorio de Performance</span>
        {data.length > 0 && (
          <div className="ml-auto flex items-center gap-3">
            <span className="text-white/20 text-xs font-medium">{data.length} ops</span>
            <span className={`text-lg font-bold ${isPositive ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
              {isPositive ? '+' : ''}R$ {data[data.length - 1].cumulative.toLocaleString('pt-BR')}
            </span>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="h-[380px] flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white/10" />
          </div>
          <span className="text-white/20 text-sm">Nenhum trade encontrado</span>
        </div>
      ) : (
        <div className="relative">
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.05} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v}`}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke={color}
                strokeWidth={2}
                fill="url(#equityGradient)"
                dot={false}
                activeDot={{ r: 5, fill: color, stroke: '#060608', strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
