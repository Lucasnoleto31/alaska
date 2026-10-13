// Formato brasileiro em tudo, inclusive eixo e dica de gráfico.

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const compact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })
const integer = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const oneDecimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const twoDecimals = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const MONTHS_LONG = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

// R$ 1.234,56 (Intl usa espaço inseparável depois do símbolo)
export function brl(value) {
  return currency.format(value)
}

// +R$ 1.234,56 · -R$ 1.234,56
export function brlSigned(value) {
  return value > 0 ? `+${currency.format(value)}` : currency.format(value)
}

// R$ 12 mil · R$ 1,2 mi
export function brlCompact(value) {
  const sign = value < 0 ? '-' : ''
  return `${sign}R$ ${compact.format(Math.abs(value))}`
}

// +12 mil · -850
export function signedCompact(value) {
  const abs = Math.abs(value)
  const text = abs >= 10000 ? compact.format(abs) : integer.format(abs)
  if (value > 0) return `+${text}`
  if (value < 0) return `-${text}`
  return text
}

export function int(value) {
  return integer.format(value)
}

export function decimal(value) {
  return twoDecimals.format(value)
}

// 84,3%
export function pct(value) {
  return `${oneDecimal.format(value)}%`
}

// '2024-03-14' → 14/03/2024
export function dateBR(iso) {
  if (!iso) return ''
  const [y, m, d] = String(iso).substring(0, 10).split('-')
  return `${d}/${m}/${y}`
}

// '2024-03-14' → mar/2024
export function monthYear(iso) {
  if (!iso) return ''
  const [y, m] = String(iso).substring(0, 7).split('-')
  return `${MONTHS_SHORT[Number(m) - 1]}/${y}`
}

// '10:30:00' → 10h30 · '09:00' → 9h
export function hourText(hhmm) {
  if (!hhmm) return ''
  const [h, m] = String(hhmm).split(':')
  const hour = Number(h)
  return m && m !== '00' ? `${hour}h${m}` : `${hour}h`
}
