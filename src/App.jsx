import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import Filters from './components/Filters'
import EquityChart from './components/EquityChart'
import YearlyChart from './components/YearlyChart'
import MonthlyChart from './components/MonthlyChart'
import Heatmap from './components/Heatmap'
import StrategyPage from './pages/StrategyPage'
import { useTrades } from './hooks/useTrades'
import { Loader2, TrendingUp, CandlestickChart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function AnimatedNumber({ value, prefix = '', suffix = '', color = 'text-white', duration = 2000 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.-]/g, '')) || 0
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic — starts fast, decelerates
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * target)
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }

    ref.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ref.current)
  }, [value, duration])

  return (
    <span className={color}>
      {prefix}{display.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{suffix}
    </span>
  )
}

function ResultsHero({ stats }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const isPositive = stats.totalProfit >= 0

  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-3xl p-4 md:p-10 mb-3 md:mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.04] via-[#060608] to-[#3b82f6]/[0.02]" />
      <div className="absolute top-0 right-0 w-28 h-28 md:w-80 md:h-80 opacity-[0.03]">
        <CandlestickChart className="w-full h-full text-[#00ff87]" strokeWidth={0.5} />
      </div>

      <div className="relative">
        <div
          className="transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="flex items-center gap-1.5 mb-2 md:mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-white/20 text-[8px] md:text-[11px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em]">Performance em tempo real</span>
          </div>

          <h1 className="text-xl md:text-5xl font-black text-white tracking-tight mb-3 md:mb-6">
            Resultados
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-10">
            {/* Main result */}
            <div>
              <span className="text-white/20 text-[8px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-semibold block mb-0.5">Lucro total</span>
              <div className="text-2xl md:text-6xl font-black tracking-tight">
                <AnimatedNumber
                  value={stats.totalProfit}
                  prefix="R$ "
                  color={isPositive ? 'text-[#00ff87]' : 'text-[#ff4757]'}
                  duration={2500}
                />
              </div>
            </div>

            {/* Secondary stats */}
            <div className="flex gap-4 md:gap-8 md:mb-2">
              <div>
                <span className="text-white/20 text-[7px] md:text-[10px] uppercase tracking-wider block mb-0.5">Operações</span>
                <span className="text-white font-black text-base md:text-2xl">{stats.totalTrades}</span>
              </div>
              <div>
                <span className="text-white/20 text-[7px] md:text-[10px] uppercase tracking-wider block mb-0.5">Win Rate</span>
                <span className={`font-black text-base md:text-2xl ${stats.winRate >= 50 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>{stats.winRate}%</span>
              </div>
              <div>
                <span className="text-white/20 text-[7px] md:text-[10px] uppercase tracking-wider block mb-0.5">Fator de Lucro</span>
                <span className={`font-black text-base md:text-2xl ${stats.profitFactor >= 1 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>{stats.profitFactor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const { trades, equityCurve, stats, filters, setFilters, loading } = useTrades()

  return (
    <main className="p-2.5 md:p-6 flex flex-col gap-2.5 md:gap-5">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-[#00ff87]/10 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-[#00ff87] animate-spin" />
            </div>
          </div>
          <span className="text-white/20 text-sm font-medium">Carregando operações...</span>
        </div>
      ) : (
        <>
          <ResultsHero stats={stats} />
          <StatsCards stats={stats} />
          <Filters filters={filters} setFilters={setFilters} />
          <EquityChart data={equityCurve} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 md:gap-5">
            <YearlyChart trades={trades} />
            <MonthlyChart trades={trades} />
          </div>
          <Heatmap trades={trades} />
        </>
      )}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#060608] text-white">
        <div className="max-w-7xl mx-auto">
          <Header />

          <Routes>
            <Route path="/" element={<StrategyPage />} />
            <Route path="/resultados" element={<DashboardPage />} />
          </Routes>

          <footer className="flex flex-col items-center py-6 md:py-8 border-t border-white/[0.03]">
            <img src="/logo.png" alt="Fabrício Gonçalvez" className="h-10 md:h-12 w-auto opacity-20 mb-2" />
            <span className="text-white/10 text-[10px] md:text-[11px] font-medium tracking-wider">&copy; {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}
