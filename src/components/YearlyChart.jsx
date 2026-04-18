import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CalendarDays } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 shadow-2xl shadow-black/60">
      <p className="text-white/30 text-[11px] font-medium mb-2">{data.label}</p>
      <div className="flex items-center justify-between gap-6">
        <span className="text-white/40 text-xs">Resultado</span>
        <span className={`text-sm font-bold ${data.value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
          {data.value >= 0 ? '+' : ''}R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex items-center justify-between gap-6 mt-1">
        <span className="text-white/40 text-xs">Operacoes</span>
        <span className="text-white text-xs font-medium">{data.count}</span>
      </div>
    </div>
  )
}

export default function YearlyChart({ trades }) {
  const data = useMemo(() => {
    const map = {}
    trades.forEach((trade) => {
      const year = String(trade.data).substring(0, 4)
      if (!map[year]) map[year] = { total: 0, count: 0 }
      map[year].total += Number(trade.resultado)
      map[year].count += 1
    })

    return Object.keys(map)
      .sort()
      .map((year) => ({
        label: year,
        value: Number(map[year].total.toFixed(2)),
        count: map[year].count,
      }))
  }, [trades])

  if (data.length === 0) return null

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff87]/[0.01] to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="w-8 h-8 rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
          <CalendarDays className="w-4 h-4 text-[#00ff87]" />
        </div>
        <span className="text-white font-semibold text-sm">Resultado por Ano</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${v}`}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
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
