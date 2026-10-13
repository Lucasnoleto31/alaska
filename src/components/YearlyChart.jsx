import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { brlCompact, brlSigned, int, pct } from '../lib/format'
import { PanelHeader, TooltipBox } from './chartKit'
import { axisProps, barGradient, gridProps, signClass, tooltipCursor } from '../lib/chart'

function YearTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <TooltipBox
      title={d.label}
      rows={[
        { label: 'Resultado', value: brlSigned(d.value), className: signClass(d.value) },
        { label: 'Operações', value: int(d.count) },
        { label: 'Acerto', value: `${pct(d.winRate)} · ${int(d.wins)} de ${int(d.count)}` },
      ]}
    />
  )
}

export default function YearlyChart({ trades }) {
  const reducedMotion = useReducedMotion()

  const data = useMemo(() => {
    const map = {}
    trades.forEach((trade) => {
      const year = String(trade.data).substring(0, 4)
      if (!map[year]) map[year] = { total: 0, count: 0, wins: 0 }
      map[year].total += Number(trade.resultado)
      map[year].count += 1
      if (Number(trade.resultado) > 0) map[year].wins += 1
    })

    return Object.keys(map)
      .sort()
      .map((year) => ({
        label: year,
        value: Number(map[year].total.toFixed(2)),
        count: map[year].count,
        wins: map[year].wins,
        winRate: (map[year].wins / map[year].count) * 100,
      }))
  }, [trades])

  if (data.length === 0) return null

  const best = data.reduce((a, b) => (b.value > a.value ? b : a))

  return (
    <section className="panel p-5 md:p-6">
      <PanelHeader
        title="Resultado por ano"
        caption={`${data.length} ${data.length === 1 ? 'ano' : 'anos'}`}
        aside={brlSigned(best.value)}
        asideCaption={`melhor ano, ${best.label}`}
      />

      <div className="-ml-2 h-56 md:ml-0 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
            <defs>
              {barGradient('year-pos', 0.95)}
              {barGradient('year-neg', 0.45, true)}
            </defs>
            <CartesianGrid {...gridProps} />
            <ReferenceLine y={0} stroke="var(--border)" />
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={brlCompact} width="auto" />
            <Tooltip content={<YearTooltip />} cursor={tooltipCursor} />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              background={{ fill: 'var(--chart-track)', radius: 6 }}
              isAnimationActive={!reducedMotion}
            >
              {data.map((entry) => (
                <Cell key={entry.label} fill={entry.value >= 0 ? 'url(#year-pos)' : 'url(#year-neg)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
