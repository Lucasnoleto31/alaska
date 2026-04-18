import { useMemo } from 'react'
import { Grid3X3 } from 'lucide-react'

const WEEKDAYS = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
const WEEKDAY_LABELS = { Segunda: 'Segunda', Terca: 'Terca', Quarta: 'Quarta', Quinta: 'Quinta', Sexta: 'Sexta' }
const HOURS = ['09', '10', '11', '12', '13', '14', '15', '16', '17']
const DAY_MAP = { 1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta' }

function getWeekday(dateStr) {
  const d = String(dateStr).substring(0, 10)
  const [y, m, day] = d.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, day))
  return date.getUTCDay()
}

export default function Heatmap({ trades }) {
  const { grid, maxAbs } = useMemo(() => {
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
      if (!map[key]) map[key] = { total: 0, count: 0 }
      map[key].total += Number(trade.resultado)
      map[key].count += 1
    })

    let maxAbs = 0
    Object.values(map).forEach((v) => {
      const abs = Math.abs(v.total)
      if (abs > maxAbs) maxAbs = abs
    })

    return { grid: map, maxAbs }
  }, [trades])

  if (trades.length === 0) return null

  function getCellStyle(value) {
    if (value === null) return { backgroundColor: 'rgba(255,255,255,0.01)' }
    if (maxAbs === 0) return { backgroundColor: 'rgba(255,255,255,0.02)' }

    const intensity = Math.min(Math.abs(value) / maxAbs, 1)

    if (value > 0) {
      return {
        backgroundColor: `rgba(0, 255, 135, ${0.05 + intensity * 0.3})`,
        boxShadow: intensity > 0.5 ? `inset 0 0 30px rgba(0, 255, 135, ${intensity * 0.1})` : 'none',
      }
    } else if (value < 0) {
      return {
        backgroundColor: `rgba(255, 71, 87, ${0.05 + intensity * 0.3})`,
        boxShadow: intensity > 0.5 ? `inset 0 0 30px rgba(255, 71, 87, ${intensity * 0.1})` : 'none',
      }
    }
    return { backgroundColor: 'rgba(255,255,255,0.02)' }
  }

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.01] to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="w-8 h-8 rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
          <Grid3X3 className="w-4 h-4 text-[#00ff87]" />
        </div>
        <span className="text-white font-semibold text-sm">Heatmap de Performance</span>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full border-separate" style={{ borderSpacing: '4px' }}>
          <thead>
            <tr>
              <th className="w-20" />
              {WEEKDAYS.map((day) => (
                <th key={day} className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-semibold text-center py-2 min-w-[100px]">
                  {WEEKDAY_LABELS[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td className="text-[11px] text-white/40 font-semibold py-1 px-3 uppercase tracking-wider text-right">{hour}:00</td>
                {WEEKDAYS.map((day) => {
                  const key = `${day}-${hour}`
                  const cell = grid[key]
                  const value = cell ? cell.total : null

                  return (
                    <td
                      key={day}
                      className="text-center rounded-xl relative group cursor-default transition-all duration-200 hover:scale-[1.05]"
                      style={{
                        ...getCellStyle(value),
                        padding: '16px 6px',
                      }}
                    >
                      {value !== null ? (
                        <>
                          <div className={`text-[13px] font-bold ${value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                            {value >= 0 ? '+' : ''}{Number(value.toFixed(0)).toLocaleString('pt-BR')}
                          </div>
                          <div className="text-[9px] text-white/20 mt-1 font-medium">
                            {cell.count} {cell.count === 1 ? 'op' : 'ops'}
                          </div>

                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-xl px-4 py-3 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-2xl shadow-black/60">
                            <div className="text-white/30 text-[10px] font-medium mb-1.5">{WEEKDAY_LABELS[day]} &middot; {hour}:00</div>
                            <div className={`font-bold text-sm ${value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                              R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-white/20 text-[10px] mt-0.5">{cell.count} operacoes</div>
                          </div>
                        </>
                      ) : (
                        <div className="text-white/[0.07] text-[11px] font-medium">&mdash;</div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-5 border-t border-white/[0.04] relative">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md" style={{ backgroundColor: 'rgba(255, 71, 87, 0.3)' }} />
          <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">Prejuizo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-white/[0.03]" />
          <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">Sem operacao</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md" style={{ backgroundColor: 'rgba(0, 255, 135, 0.3)' }} />
          <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">Lucro</span>
        </div>
      </div>
    </div>
  )
}
