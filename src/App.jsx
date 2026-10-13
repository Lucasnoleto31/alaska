import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import Filters from './components/Filters'
import EquityChart from './components/EquityChart'
import YearlyChart from './components/YearlyChart'
import MonthlyChart from './components/MonthlyChart'
import Heatmap from './components/Heatmap'
import StrategyPage from './pages/StrategyPage'
import { useTrades } from './hooks/useTrades'
import { brl, dateBR } from './lib/format'

function ResultsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando operações" className="flex flex-col gap-3">
      <div className="h-36 rounded-panel bg-card motion-safe:animate-pulse" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-panel bg-card motion-safe:animate-pulse" />
        ))}
      </div>
      <div className="h-80 rounded-panel bg-card motion-safe:animate-pulse" />
    </div>
  )
}

// Um destaque por página: o lucro total, tingido pelo sinal.
function TotalCard({ stats }) {
  const positive = stats.totalProfit >= 0
  return (
    <section className={`rounded-panel p-5 md:p-6 ${positive ? 'tint-success' : 'tint-destructive'}`}>
      <p className="text-footnote text-muted">Lucro total</p>
      <p className={`mt-1 text-large-title font-bold tabular-nums ${positive ? 'text-success' : 'text-destructive'}`}>
        {brl(stats.totalProfit)}
      </p>
      {stats.firstDate && (
        <p className="mt-2 text-footnote text-muted tabular-nums">
          De {dateBR(stats.firstDate)} a {dateBR(stats.lastDate)}
        </p>
      )}
    </section>
  )
}

function DashboardPage() {
  const { trades, equityCurve, stats, filters, setFilters, loading } = useTrades()

  return (
    <main className="fade-in mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-16 pt-6 md:gap-4 md:px-8 md:pt-10">
      <div className="mb-2">
        <h1 className="text-large-title font-bold">Resultados</h1>
        <p className="mt-1 text-subhead text-muted">
          Alaska & Square no mini índice, com 16 contratos por operação: 4 no Alaska e 12 no Square.
        </p>
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      {loading ? (
        <ResultsSkeleton />
      ) : (
        <>
          <TotalCard stats={stats} />
          <StatsCards stats={stats} />
          <EquityChart data={equityCurve} />
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
            <YearlyChart trades={trades} />
            <MonthlyChart trades={trades} />
          </div>
          <Heatmap trades={trades} />
        </>
      )}
    </main>
  )
}

// Tela nova abre no topo.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <Routes>
          <Route path="/" element={<StrategyPage />} />
          <Route path="/resultados" element={<DashboardPage />} />
        </Routes>

        <footer className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-border px-4 py-6 md:px-8">
          <span className="text-footnote text-muted">© {new Date().getFullYear()} Fabrício Gonçalvez</span>
          <img src="/logo.png" alt="" className="h-8 w-8" />
        </footer>
      </div>
    </BrowserRouter>
  )
}
