import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MONTHS_LONG, brlCompact, brlSigned, int, pct } from '../lib/format'
import { PanelHeader, TooltipBox } from './chartKit'
import { axisProps, barGradient, gridProps, signClass, tooltipCursor } from '../lib/chart'

const MONTH_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function MonthTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <TooltipBox
      title={`${d.name}, todos os anos`}
      rows={[
        { label: 'Resultado', value: brlSigned(d.value), className: signClass(d.value) },
        { label: 'Operações', value: int(d.count) },
        { label: 'Acerto', value: `${pct(d.winRate)} · ${int(d.wins)} de ${int(d.count)}` },
      ]}
    />
  )
}

export default function MonthlyChart({ trades }) {
  const reducedMotion = useReducedMotion()

  const data = useMemo(() => {
    // Agrupa por mês (1 a 12) somando todos os anos
    const map = {}
    for (let i = 1; i <= 12; i++) map[i] = { total: 0, count: 0, wins: 0 }

    trades.forEach((trade) => {
      const month = Number(String(trade.data).substring(5, 7))
      map[month].total += Number(trade.resultado)
      map[month].count += 1
      if (Number(trade.resultado) > 0) map[month].wins += 1
    })

    return Object.entries(map)
      .filter(([, v]) => v.count > 0)
      .map(([month, v]) => ({
        label: MONTH_SHORT[Number(month) - 1],
        name: MONTHS_LONG[Number(month) - 1].replace(/^./, (c) => c.toUpperCase()),
        value: Number(v.total.toFixed(2)),
        count: v.count,
        wins: v.wins,
        winRate: (v.wins / v.count) * 100,
      }))
  }, [trades])

  if (data.length === 0) return null

  const best = data.reduce((a, b) => (b.value > a.value ? b : a))

  return (
    <section className="panel p-5 md:p-6">
      <PanelHeader
        title="Resultado por mês"
        caption="Soma de todos os anos"
        aside={brlSigned(best.value)}
        asideCaption={`melhor mês, ${best.name.toLowerCase()}`}
      />

      <div className="-ml-2 h-56 md:ml-0 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
            <defs>
              {barGradient('month-pos', 0.95)}
              {barGradient('month-neg', 0.45, true)}
            </defs>
            <CartesianGrid {...gridProps} />
            <ReferenceLine y={0} stroke="var(--border)" />
            <XAxis dataKey="label" {...axisProps} interval={0} />
            <YAxis {...axisProps} tickFormatter={brlCompact} width="auto" />
            <Tooltip content={<MonthTooltip />} cursor={tooltipCursor} />
            <Bar
              dataKey="value"
              radius={[5, 5, 0, 0]}
              maxBarSize={32}
              background={{ fill: 'var(--chart-track)', radius: 5 }}
              isAnimationActive={!reducedMotion}
            >
              {data.map((entry) => (
                <Cell key={entry.label} fill={entry.value >= 0 ? 'url(#month-pos)' : 'url(#month-neg)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
