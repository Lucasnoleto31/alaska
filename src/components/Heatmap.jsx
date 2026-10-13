import { useMemo } from 'react'
import { brlSigned, int, signedCompact } from '../lib/format'
import { PanelHeader } from './chartKit'

const WEEKDAYS = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
const WEEKDAY_SHORT = { Segunda: 'Seg', Terca: 'Ter', Quarta: 'Qua', Quinta: 'Qui', Sexta: 'Sex' }
const WEEKDAY_LONG = { Segunda: 'segunda', Terca: 'terça', Quarta: 'quarta', Quinta: 'quinta', Sexta: 'sexta' }
const HOURS = ['09', '10', '11', '12', '13', '14', '15', '16', '17']
const DAY_MAP = { 1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta' }

function getWeekday(dateStr) {
  const d = String(dateStr).substring(0, 10)
  const [y, m, day] = d.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, day))
  return date.getUTCDay()
}

// Cor por intensidade, não por matiz: o lucro preenche a célula na tinta,
// mais forte quanto maior. O prejuízo não preenche; o sinal e a cor ficam no número.
// Teto de 18%: acima disso o "op." apagado cai abaixo de 4,5:1 sobre a célula.
function cellStyle(value, maxPositive) {
  if (value === null || value <= 0 || maxPositive === 0) return undefined
  const intensity = Math.min(value / maxPositive, 1)
  const alpha = 0.04 + intensity * 0.14
  return { backgroundColor: `color-mix(in srgb, var(--foreground) ${(alpha * 100).toFixed(1)}%, var(--background))` }
}

export default function Heatmap({ trades }) {
  const { grid, maxPositive, weakest, hours } = useMemo(() => {
    const map = {}
    trades.forEach((trade) => {
      const dayOfWeek = getWeekday(trade.data)
      if (dayOfWeek === 0 || dayOfWeek === 6) return
      const dayName = DAY_MAP[dayOfWeek]
      let hour
      if (trade.hora) {
        hour = trade.hora.split(':')[0].padStart(2, '0')
      } else {
        hour = String(new Date(trade.data).getHours()).padStart(2, '0')
      }
      if (!HOURS.includes(hour)) return
      const key = `${dayName}-${hour}`
      if (!map[key]) map[key] = { total: 0, count: 0, day: dayName, hour }
      map[key].total += Number(trade.resultado)
      map[key].count += 1
    })
    let maxPositive = 0
    let weakest = null
    Object.values(map).forEach((v) => {
      if (v.total > maxPositive) maxPositive = v.total
      if (!weakest || v.total < weakest.total) weakest = v
    })
    // Horário sem nenhuma operação não ocupa linha
    const hours = HOURS.filter((h) => WEEKDAYS.some((d) => map[`${d}-${h}`]))
    return { grid: map, maxPositive, weakest, hours }
  }, [trades])

  if (trades.length === 0) return null

  return (
    <section className="panel p-5 md:p-6">
      <PanelHeader
        title="Dia e horário de entrada"
        caption="Soma em reais e número de operações"
        aside={weakest ? brlSigned(weakest.total) : null}
        asideCaption={weakest ? `ponto fraco, ${WEEKDAY_LONG[weakest.day]} ${Number(weakest.hour)}h` : null}
      />

      <div className="-mx-2 overflow-x-auto px-2 pb-1">
        <table className="w-full min-w-[300px] border-separate border-spacing-1 tabular-nums">
          <thead>
            <tr>
              <th scope="col" className="w-9">
                <span className="sr-only">Horário</span>
              </th>
              {WEEKDAYS.map((day) => (
                <th key={day} scope="col" className="pb-1 text-caption font-medium text-muted">
                  {WEEKDAY_SHORT[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <th scope="row" className="pr-1 text-right text-caption font-medium text-muted">
                  {Number(hour)}h
                </th>
                {WEEKDAYS.map((day) => {
                  const cell = grid[`${day}-${hour}`]
                  const value = cell ? cell.total : null
                  return (
                    <td
                      key={day}
                      className="h-12 rounded-cell bg-background px-0.5 text-center md:h-14"
                      style={cellStyle(value, maxPositive)}
                      title={cell ? `${WEEKDAY_LONG[day]}, ${Number(hour)}h: ${brlSigned(value)} em ${int(cell.count)} operações` : undefined}
                    >
                      {cell ? (
                        <>
                          <span className={`block text-caption font-semibold leading-tight ${value < 0 ? 'text-destructive' : 'text-foreground'}`}>
                            {signedCompact(value)}
                          </span>
                          <span className="block text-caption-2 text-muted">{int(cell.count)} op.</span>
                        </>
                      ) : (
                        <span className="text-caption text-muted" aria-label="sem operações">·</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
