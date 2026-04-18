import Header from './components/Header'
import StatsCards from './components/StatsCards'
import Filters from './components/Filters'
import EquityChart from './components/EquityChart'
import YearlyChart from './components/YearlyChart'
import MonthlyChart from './components/MonthlyChart'
import Heatmap from './components/Heatmap'
import { useTrades } from './hooks/useTrades'
import { Loader2 } from 'lucide-react'

export default function App() {
  const { trades, equityCurve, stats, filters, setFilters, loading } = useTrades()

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-7xl mx-auto">
        <Header />

        <main className="p-3 md:p-6 flex flex-col gap-3 md:gap-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-[#00ff87]/10 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-[#00ff87] animate-spin" />
                </div>
              </div>
              <span className="text-white/20 text-sm font-medium">Carregando operacoes...</span>
            </div>
          ) : (
            <>
              <StatsCards stats={stats} />
              <Filters filters={filters} setFilters={setFilters} />
              <EquityChart data={equityCurve} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
                <YearlyChart trades={trades} />
                <MonthlyChart trades={trades} />
              </div>
              <Heatmap trades={trades} />
            </>
          )}
        </main>

        <footer className="text-center py-6 md:py-8 text-white/10 text-[10px] md:text-[11px] font-medium tracking-wider border-t border-white/[0.03]">
          ALASKA SQUARE &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
