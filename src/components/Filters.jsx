import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

const PERIODS = [
  { value: '1d', label: '1D' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '', label: 'Tudo' },
  { value: 'custom', label: 'Datas' },
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

const HOURS = ['9', '10', '11', '12', '13', '14', '15', '16', '17'].map((h) => ({ value: h, label: `${h}h` }))

function Chip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`pressable h-10 min-w-12 rounded-chip px-3 text-footnote font-medium tabular-nums md:h-8 md:min-w-10 ${
        active ? 'bg-foreground text-background' : 'bg-background text-muted hover:text-foreground'
      }`}
    >
      {label}
    </button>
  )
}

function ChipGroup({ title, options, selected, onToggle }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-footnote text-muted">{title}</legend>
      <div className="flex flex-wrap gap-2 md:gap-1.5">
        {options.map((o) => (
          <Chip key={o.value} label={o.label} active={selected.includes(o.value)} onClick={() => onToggle(o.value)} />
        ))}
      </div>
    </fieldset>
  )
}

function DateField({ label, value, onChange }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-footnote text-muted">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-control border border-border bg-background px-3 text-left text-subhead text-foreground md:h-9"
      />
    </label>
  )
}

export default function Filters({ filters, setFilters }) {
  const [open, setOpen] = useState(false)

  const extraCount = filters.months.length + filters.weekdays.length + filters.hours.length
  const hasFilters = filters.period || extraCount > 0

  function clearFilters() {
    setFilters({ period: '', dateFrom: '', dateTo: '', months: [], weekdays: [], hours: [] })
  }

  function setPeriod(value) {
    setFilters((prev) => ({
      ...prev,
      period: value,
      ...(value !== 'custom' && { dateFrom: '', dateTo: '' }),
    }))
  }

  function setDate(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function toggleMulti(key, value) {
    setFilters((prev) => {
      const arr = prev[key]
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
  }

  return (
    <section aria-label="Filtros" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Seletor segmentado do período */}
        <div role="radiogroup" aria-label="Período" className="grid w-full grid-cols-6 rounded-control bg-card p-0.5 sm:w-auto">
          {PERIODS.map((p) => {
            const active = filters.period === p.value
            return (
              <button
                key={p.label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setPeriod(p.value)}
                className={`pressable h-10 rounded-chip px-2 text-footnote font-medium md:h-8 md:px-3.5 ${
                  active ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-1">
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="pressable flex h-10 items-center gap-1 rounded-control px-3 text-footnote font-medium text-muted hover:text-foreground md:h-8"
            >
              <X className="h-4 w-4" aria-hidden />
              Limpar
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mais-filtros"
            className={`pressable flex h-10 items-center gap-2 rounded-control px-3 text-footnote font-medium md:h-8 ${
              open ? 'bg-card text-foreground' : 'text-muted hover:text-foreground'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filtros
            {extraCount > 0 && (
              <span className="rounded-full bg-foreground px-1.5 text-caption-2 font-semibold leading-[18px] text-background tabular-nums">
                {extraCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {filters.period === 'custom' && (
        <div className="flex gap-3 sm:max-w-md">
          <DateField label="De" value={filters.dateFrom} onChange={(v) => setDate('dateFrom', v)} />
          <DateField label="Até" value={filters.dateTo} onChange={(v) => setDate('dateTo', v)} />
        </div>
      )}

      {open && (
        <div id="mais-filtros" className="panel fade-in grid gap-5 p-5 md:grid-cols-[2fr_1fr_1.5fr]">
          <ChipGroup title="Mês" options={MONTHS} selected={filters.months} onToggle={(v) => toggleMulti('months', v)} />
          <ChipGroup title="Dia da semana" options={WEEKDAYS} selected={filters.weekdays} onToggle={(v) => toggleMulti('weekdays', v)} />
          <ChipGroup title="Horário de entrada" options={HOURS} selected={filters.hours} onToggle={(v) => toggleMulti('hours', v)} />
        </div>
      )}
    </section>
  )
}
