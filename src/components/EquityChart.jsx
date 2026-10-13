import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { brl, brlCompact, brlSigned, dateBR, hourText, int, monthYear } from '../lib/format'
import { PanelHeader, TooltipBox } from './chartKit'
import { axisProps, gridProps, signClass } from '../lib/chart'

function EquityTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const when = d.time ? `${dateBR(d.iso)} · ${hourText(d.time)}` : dateBR(d.iso)
  return (
    <TooltipBox
      title={when}
      rows={[
        { label: 'Operação', value: brlSigned(d.profit), className: signClass(d.profit) },
        { label: 'Acumulado', value: brl(d.cumulative) },
      ]}
    />
  )
}

export default function EquityChart({ data }) {
  const reducedMotion = useReducedMotion()

  const peak = useMemo(() => {
    let best = null
    for (const d of data) if (!best || d.cumulative > best.cumulative) best = d
    return best
  }, [data])

  return (
    <section className="panel p-5 md:p-6">
      <PanelHeader
        title="Curva de capital"
        caption={`${int(data.length)} operações em sequência`}
        aside={peak ? brl(peak.cumulative) : null}
        asideCaption={peak ? `topo em ${dateBR(peak.iso)}` : null}
      />

      {data.length === 0 ? (
        <p className="flex h-60 items-center justify-center text-subhead text-muted md:h-[360px]">
          Nenhuma operação no período.
        </p>
      ) : (
        <div className="-ml-2 h-60 md:ml-0 md:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <ReferenceLine y={0} stroke="var(--border)" />
              <XAxis
                dataKey="iso"
                {...axisProps}
                tickFormatter={monthYear}
                minTickGap={48}
                interval="preserveStartEnd"
              />
              <YAxis {...axisProps} tickFormatter={brlCompact} width="auto" />
              <Tooltip content={<EquityTooltip />} cursor={{ stroke: 'var(--border)' }} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="var(--foreground)"
                strokeWidth={1.5}
                fill="url(#equity-fill)"
                dot={false}
                activeDot={{ r: 4, fill: 'var(--foreground)', stroke: 'var(--card)', strokeWidth: 2 }}
                isAnimationActive={!reducedMotion}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}
