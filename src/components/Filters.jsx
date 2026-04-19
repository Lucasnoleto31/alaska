import { useState } from 'react'
import { RotateCcw, Calendar, ChevronDown } from 'lucide-react'

const PERIODS = [
  { value: '1d', label: '1D' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '', label: 'Tudo' },
  { value: 'custom', label: 'Personalizado' },
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

function PillBtn({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-[11px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/20'
          : 'bg-white/[0.02] text-white/30 border border-white/[0.04] hover:border-white/[0.08] hover:text-white/50'
      }`}
    >
      {label}
    </button>
  )
}

function FilterSection({ title, open, onToggle, count, children }) {
  return (
    <div className="border-b border-white/[0.03] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2.5 md:py-3 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <span className="text-white/25 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold group-hover:text-white/40 transition-colors">{title}</span>
          {count > 0 && (
            <span className="text-[8px] md:text-[9px] text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded-full font-bold">{count}</span>
          )}
        </div>
        <ChevronDown
          className={`w-3 h-3 text-white/15 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-3 md:pb-4 flex flex-wrap gap-1 md:gap-1.5">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Filters({ filters, setFilters }) {
  const [openSections, setOpenSections] = useState({ period: true, month: false, day: false, hour: false })

  const hasFilters = filters.period || filters.months.length > 0 || filters.weekdays.length > 0 || filters.hours.length > 0 || filters.dateFrom || filters.dateTo
  const activeCount = filters.months.length + filters.weekdays.length + filters.hours.length + (filters.period ? 1 : 0)

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

  function toggleSection(key) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl px-3.5 md:px-5">
      {/* Header */}
      <div className="flex items-center justify-between py-3 md:py-4 border-b border-white/[0.03]">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[10px] md:text-xs font-semibold">Filtros</span>
          {hasFilters && (
            <span className="text-[8px] md:text-[9px] text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[10px] md:text-[11px] text-white/25 hover:text-[#00ff87] transition-all cursor-pointer px-2 py-1 rounded-lg hover:bg-[#00ff87]/5"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Limpar
          </button>
        )}
      </div>

      {/* Período — always visible */}
      <FilterSection title="Período" open={openSections.period} onToggle={() => toggleSection('period')} count={filters.period ? 1 : 0}>
        {PERIODS.map((p) => (
          <PillBtn
            key={p.value + p.label}
            label={p.label}
            active={filters.period === p.value}
            onClick={() => updateFilter('period', filters.period === p.value ? '' : p.value)}
          />
        ))}
        {filters.period === 'custom' && (
          <div className="flex items-center gap-2 w-full mt-2">
            <div className="relative flex-1">
              <Calendar className="w-3 h-3 text-[#00ff87]/50 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] text-white text-[10px] md:text-[11px] rounded-lg pl-7 pr-2 py-1.5 focus:outline-none focus:border-[#00ff87]/30 transition-all cursor-pointer [color-scheme:dark]"
              />
            </div>
            <span className="text-white/15 text-[10px]">até</span>
            <div className="relative flex-1">
              <Calendar className="w-3 h-3 text-[#00ff87]/50 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] text-white text-[10px] md:text-[11px] rounded-lg pl-7 pr-2 py-1.5 focus:outline-none focus:border-[#00ff87]/30 transition-all cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>
        )}
      </FilterSection>

      <FilterSection title="Mês" open={openSections.month} onToggle={() => toggleSection('month')} count={filters.months.length}>
        {MONTHS.map((m) => (
          <PillBtn key={m.value} label={m.label} active={filters.months.includes(m.value)} onClick={() => toggleMulti('months', m.value)} />
        ))}
      </FilterSection>

      <FilterSection title="Dia da semana" open={openSections.day} onToggle={() => toggleSection('day')} count={filters.weekdays.length}>
        {WEEKDAYS.map((d) => (
          <PillBtn key={d.value} label={d.label} active={filters.weekdays.includes(d.value)} onClick={() => toggleMulti('weekdays', d.value)} />
        ))}
      </FilterSection>

      <FilterSection title="Horário" open={openSections.hour} onToggle={() => toggleSection('hour')} count={filters.hours.length}>
        {HOURS.map((h) => (
          <PillBtn key={h.value} label={h.label} active={filters.hours.includes(h.value)} onClick={() => toggleMulti('hours', h.value)} />
        ))}
      </FilterSection>
    </div>
  )
}
