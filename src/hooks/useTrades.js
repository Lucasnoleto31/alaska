import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'

const DAY_MAP = { 1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta' }

// Extrai dia da semana usando a data da string ISO (sem timezone do browser)
function getWeekday(dateStr) {
  const d = dateStr.substring(0, 10) // '2026-04-17'
  const [y, m, day] = d.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, day))
  return date.getUTCDay()
}

// Extrai mes usando a data da string ISO
function getMonth(dateStr) {
  return Number(dateStr.substring(5, 7))
}

export function useTrades() {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    period: '',
    dateFrom: '',
    dateTo: '',
    months: [],
    weekdays: [],
    hours: [],
  })

  useEffect(() => {
    fetchTrades()
  }, [])

  async function fetchTrades() {
    setLoading(true)
    const PAGE_SIZE = 1000
    let allTrades = []
    let from = 0
    let hasMore = true

    while (hasMore) {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('robo', 'alaska-&-square')
        .order('data', { ascending: true })
        .range(from, from + PAGE_SIZE - 1)

      if (error) {
        console.error('Erro ao buscar trades:', error)
        break
      }

      allTrades = allTrades.concat(data)
      from += PAGE_SIZE
      hasMore = data.length === PAGE_SIZE
    }

    setTrades(allTrades)
    setLoading(false)
  }

  const periodLimit = useMemo(() => {
    const now = new Date()
    if (filters.period === '1d') {
      const d = new Date(now); d.setDate(d.getDate() - 1); return d
    }
    if (filters.period === '7d') {
      const d = new Date(now); d.setDate(d.getDate() - 7); return d
    }
    if (filters.period === '30d') {
      const d = new Date(now); d.setDate(d.getDate() - 30); return d
    }
    if (filters.period === '90d') {
      const d = new Date(now); d.setDate(d.getDate() - 90); return d
    }
    return null
  }, [filters.period])

  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const date = new Date(trade.data)
      const dateStr = String(trade.data)

      // Filtro de periodo rapido
      if (periodLimit && date < periodLimit) return false

      // Filtro de periodo personalizado
      if (filters.period === 'custom') {
        if (filters.dateFrom && date < new Date(filters.dateFrom + 'T00:00:00')) return false
        if (filters.dateTo && date > new Date(filters.dateTo + 'T23:59:59')) return false
      }

      // Filtro de meses (multiplos) - usa string ISO para evitar timezone
      if (filters.months.length > 0 && !filters.months.includes(String(getMonth(dateStr)))) return false

      // Filtro de dias da semana (multiplos) - usa string ISO para evitar timezone
      const weekday = getWeekday(dateStr)
      if (filters.weekdays.length > 0 && !filters.weekdays.includes(DAY_MAP[weekday])) return false

      // Filtro de horarios (multiplos)
      if (filters.hours.length > 0) {
        let hour
        if (trade.hora) {
          hour = parseInt(trade.hora.split(':')[0], 10)
        } else {
          hour = date.getHours()
        }
        if (!filters.hours.includes(String(hour))) return false
      }

      return true
    })
  }, [trades, filters, periodLimit])

  const equityCurve = useMemo(() => {
    let cumulative = 0
    return filteredTrades.map((trade, index) => {
      cumulative += Number(trade.resultado)
      const dateStr = String(trade.data).substring(0, 10)
      const [y, m, d] = dateStr.split('-')
      return {
        index: index + 1,
        profit: Number(trade.resultado),
        cumulative: Number(cumulative.toFixed(2)),
        date: `${d}/${m}/${y}`,
        time: trade.hora || '',
      }
    })
  }, [filteredTrades])

  const stats = useMemo(() => {
    if (filteredTrades.length === 0) {
      return { totalTrades: 0, totalProfit: 0, winRate: 0, wins: 0, losses: 0, maxDrawdown: 0, profitFactor: 0 }
    }

    const wins = filteredTrades.filter((t) => Number(t.resultado) > 0)
    const losses = filteredTrades.filter((t) => Number(t.resultado) < 0)
    const totalProfit = filteredTrades.reduce((sum, t) => sum + Number(t.resultado), 0)
    const grossProfit = wins.reduce((sum, t) => sum + Number(t.resultado), 0)
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + Number(t.resultado), 0))

    let peak = 0
    let maxDrawdown = 0
    let cumulative = 0
    for (const trade of filteredTrades) {
      cumulative += Number(trade.resultado)
      if (cumulative > peak) peak = cumulative
      const dd = peak - cumulative
      if (dd > maxDrawdown) maxDrawdown = dd
    }

    return {
      totalTrades: filteredTrades.length,
      totalProfit: Number(totalProfit.toFixed(2)),
      winRate: Number(((wins.length / filteredTrades.length) * 100).toFixed(1)),
      wins: wins.length,
      losses: losses.length,
      maxDrawdown: Number(maxDrawdown.toFixed(2)),
      profitFactor: grossLoss === 0 ? grossProfit : Number((grossProfit / grossLoss).toFixed(2)),
    }
  }, [filteredTrades])

  return { trades: filteredTrades, equityCurve, stats, filters, setFilters, loading }
}
