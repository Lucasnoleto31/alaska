import { SlidersHorizontal, RotateCcw, Calendar } from 'lucide-react'

const PERIODS = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '', label: 'Tudo' },
  { value: 'custom', label: 'Custom' },
]

const MONTHS = [
  { value: '1', label: 'Jan' },
  { value: '2', label: 'Fev' },
  { value: '3', label: 'Mar' },
  { value: '4', label: 'Abr' },
  { value: '5', label: 'Mai' },
  { value: '6', label: 'Jun' },
  { value: '7', label: 'Jul' },
  { value: '8', label: 'Ago' },
  { value: '9', label: 'Set' },
  { value: '10', label: 'Out' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dez' },
]

const WEEKDAYS = [
  { value: 'Segunda', label: 'Seg' },
  { value: 'Terca', label: 'Ter' },
  { value: 'Quarta', label: 'Qua' },
  { value: 'Quinta', label: 'Qui' },
  { value: 'Sexta', label: 'Sex' },
]

const HOURS = [
  { value: '9', label: '09h' },
  { value: '10', label: '10h' },
  { value: '11', label: '11h' },
  { value: '12', label: '12h' },
  { value: '13', label: '13h' },
  { value: '14', label: '14h' },
  { value: '15', label: '15h' },
  { value: '16', label: '16h' },
  { value: '17', label: '17h' },
]

function Btn({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[11px] md:text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-[#00ff87] text-black shadow-[0_0_16px_rgba(0,255,135,0.25)]'
          : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:border-white/10 hover:text-white/60'
      }`}
    >
      {label}
    </button>
  )
}

function FilterRow({ title, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold md:w-20 shrink-0 md:text-right">{title}</span>
      <div className="flex flex-wrap gap-1.5 md:gap-2">{children}</div>
    </div>
  )
}

export default function Filters({ filters, setFilters }) {
  const hasFilters = filters.period || filters.months.length > 0 || filters.weekdays.length > 0 || filters.hours.length > 0 || filters.dateFrom || filters.dateTo

  function clearFilters() {
    setFilters({ period: '', dateFrom: '', dateTo: '', months: [], weekdays: [], hours: [] })
  }

  function updateFilter(key, value) {
    setFilters((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'period' && value !== 'custom') {
        next.dateFrom = ''
        next.dateTo = ''
      }
      return next
    })
  }

  function toggleMulti(key, value) {
    setFilters((prev) => {
      const arr = prev[key]
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
  }

  const activeCount = filters.months.length + filters.weekdays.length + filters.hours.length + (filters.period ? 1 : 0)

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-4 md:p-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00ff87]/[0.02] to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-4 md:mb-6 relative">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
          </div>
          <span className="text-white font-semibold text-sm">Filtros</span>
          {hasFilters && (
            <span className="text-[9px] md:text-[10px] text-[#00ff87] bg-[#00ff87]/10 px-1.5 md:px-2 py-0.5 rounded-full font-semibold">
              {activeCount} {activeCount === 1 ? 'ATIVO' : 'ATIVOS'}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-[11px] md:text-xs text-white/30 hover:text-[#00ff87] transition-all cursor-pointer hover:bg-[#00ff87]/5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl"
          >
            <RotateCcw className="w-3 h-3" />
            Resetar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 md:gap-4 relative">
        <FilterRow title="Período">
          {PERIODS.map((p) => (
            <Btn
              key={p.value + p.label}
              label={p.label}
              active={filters.period === p.value}
              onClick={() => updateFilter('period', filters.period === p.value ? '' : p.value)}
            />
          ))}
        </FilterRow>

        {filters.period === 'custom' && (
          <FilterRow title="Datas">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#00ff87] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.06] text-white text-[11px] md:text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#00ff87]/40 transition-all cursor-pointer hover:border-white/10 [color-scheme:dark]"
                />
              </div>
              <span className="text-white/15 text-xs font-medium">ate</span>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#00ff87] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.06] text-white text-[11px] md:text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#00ff87]/40 transition-all cursor-pointer hover:border-white/10 [color-scheme:dark]"
                />
              </div>
            </div>
          </FilterRow>
        )}

        <div className="border-t border-white/[0.04]" />

        <FilterRow title="Mês">
          {MONTHS.map((m) => (
            <Btn key={m.value} label={m.label} active={filters.months.includes(m.value)} onClick={() => toggleMulti('months', m.value)} />
          ))}
        </FilterRow>

        <FilterRow title="Dia">
          {WEEKDAYS.map((d) => (
            <Btn key={d.value} label={d.label} active={filters.weekdays.includes(d.value)} onClick={() => toggleMulti('weekdays', d.value)} />
          ))}
        </FilterRow>

        <FilterRow title="Horário">
          {HOURS.map((h) => (
            <Btn key={h.value} label={h.label} active={filters.hours.includes(h.value)} onClick={() => toggleMulti('hours', h.value)} />
          ))}
        </FilterRow>
      </div>
    </div>
  )
}
