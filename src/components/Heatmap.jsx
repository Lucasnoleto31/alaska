import { useMemo } from 'react'

const WEEKDAYS = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
const WEEKDAY_SHORT = { Segunda: 'Seg', Terca: 'Ter', Quarta: 'Qua', Quinta: 'Qui', Sexta: 'Sex' }
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

  function getCellColor(value) {
    if (value === null || maxAbs === 0) return 'rgba(255,255,255,0.015)'
    const intensity = Math.min(Math.abs(value) / maxAbs, 1)
    if (value > 0) return `rgba(0, 255, 135, ${0.04 + intensity * 0.25})`
    if (value < 0) return `rgba(255, 71, 87, ${0.04 + intensity * 0.25})`
    return 'rgba(255,255,255,0.015)'
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-3.5 md:p-6">
      <div className="flex items-center justify-between mb-3 md:mb-5 relative">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[10px] md:text-xs font-semibold">Mapa de Calor</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(255, 71, 87, 0.25)' }} />
            <span className="text-white/15 text-[8px] md:text-[9px]">Prejuízo</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(0, 255, 135, 0.25)' }} />
            <span className="text-white/15 text-[8px] md:text-[9px]">Lucro</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1 md:mx-0 md:px-0">
        <div className="min-w-[460px] md:min-w-0">
          {/* Header row */}
          <div className="grid gap-1 md:gap-1.5 mb-1 md:mb-1.5" style={{ gridTemplateColumns: `48px repeat(${WEEKDAYS.length}, 1fr)` }}>
            <div />
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[8px] md:text-[9px] text-white/20 font-semibold uppercase tracking-wider py-1">
                {WEEKDAY_SHORT[day]}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="grid gap-1 md:gap-1.5 mb-1 md:mb-1.5"
              style={{ gridTemplateColumns: `48px repeat(${WEEKDAYS.length}, 1fr)` }}
            >
              <div className="text-[9px] md:text-[10px] text-white/25 font-medium flex items-center justify-end pr-2">
                {hour}:00
              </div>
              {WEEKDAYS.map((day) => {
                const key = `${day}-${hour}`
                const cell = grid[key]
                const value = cell ? cell.total : null

                return (
                  <div
                    key={day}
                    className="rounded-md md:rounded-lg relative group cursor-default transition-all duration-200 hover:scale-[1.04] flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: getCellColor(value),
                      padding: isMobile ? '8px 2px' : '12px 4px',
                    }}
                  >
                    {value !== null ? (
                      <>
                        <div className={`text-[10px] md:text-[11px] font-bold leading-none ${value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                          {value >= 0 ? '+' : ''}{Number(value.toFixed(0)).toLocaleString('pt-BR')}
                        </div>
                        <div className="text-[7px] md:text-[8px] text-white/15 mt-0.5 font-medium">
                          {cell.count} op{cell.count > 1 ? 's' : ''}
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.06] rounded-lg px-2.5 py-2 md:px-3 md:py-2.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-2xl">
                          <div className="text-white/25 text-[8px] md:text-[9px] font-medium mb-1">{WEEKDAY_SHORT[day]} &middot; {hour}:00</div>
                          <div className={`font-bold text-[11px] md:text-xs ${value >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                            R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-white/[0.06] text-[9px] font-medium">&mdash;</div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
