import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Calendar } from 'lucide-react'

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-3 md:p-4 shadow-2xl shadow-black/60">
      <p className="text-white/30 text-[10px] md:text-[11px] font-medium mb-2">{data.label} (todos os anos)</p>
      <div className="flex items-center justify-between gap-4 md:gap-6">
        <span className="text-white/40 text-[11px] md:text-xs">Resultado Acumulado</span>
        <span className={`text-xs md:text-sm font-bold ${data.value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
          {data.value >= 0 ? '+' : ''}R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 md:gap-6 mt-1">
        <span className="text-white/40 text-[11px] md:text-xs">Operações</span>
        <span className="text-white text-[11px] md:text-xs font-medium">{data.count}</span>
      </div>
      <div className="flex items-center justify-between gap-4 md:gap-6 mt-1">
        <span className="text-white/40 text-[11px] md:text-xs">Win Rate</span>
        <span className="text-white text-[11px] md:text-xs font-medium">{data.winRate}%</span>
      </div>
    </div>
  )
}

export default function MonthlyChart({ trades }) {
  const data = useMemo(() => {
    // Agrupa por mes (1-12) somando todos os anos
    const map = {}
    for (let i = 1; i <= 12; i++) {
      map[i] = { total: 0, count: 0, wins: 0 }
    }

    trades.forEach((trade) => {
      const month = Number(String(trade.data).substring(5, 7))
      map[month].total += Number(trade.resultado)
      map[month].count += 1
      if (Number(trade.resultado) > 0) map[month].wins += 1
    })

    return Object.entries(map)
      .filter(([, v]) => v.count > 0)
      .map(([month, v]) => ({
        label: MONTH_NAMES[Number(month) - 1],
        value: Number(v.total.toFixed(2)),
        count: v.count,
        winRate: Number(((v.wins / v.count) * 100).toFixed(1)),
      }))
  }, [trades])

  if (data.length === 0) return null

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-xl md:rounded-2xl p-3.5 md:p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff87]/[0.01] to-transparent pointer-events-none" />

      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6 relative flex-wrap">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
        </div>
        <span className="text-white font-semibold text-[13px] md:text-sm">Resultado por Mês</span>
        <span className="text-white/15 text-[8px] md:text-[10px] ml-0 md:ml-2 uppercase tracking-wider w-full md:w-auto">acumulado de todos os anos</span>
      </div>

      <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 220 : 300}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: window.innerWidth < 768 ? 9 : 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${v}`}
            width={window.innerWidth < 768 ? 50 : 70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.value >= 0 ? '#00ff87' : '#ff4757'}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
