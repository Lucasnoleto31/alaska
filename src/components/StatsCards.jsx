import { useId, useState } from 'react'
import { brl, brlCompact, decimal, int, pct } from '../lib/format'

// "?" só no jargão: abre uma frase embaixo do número.
function Hint({ text }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        aria-label="O que é"
        className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-caption-2 font-semibold text-muted before:absolute before:-inset-2.5 before:content-[''] hover:text-foreground"
      >
        ?
      </button>
      {open && (
        <span id={id} role="note" className="mt-2 block text-footnote text-muted">
          {text}
        </span>
      )}
    </>
  )
}

function StatCard({ label, hint, value, tone = '', support }) {
  return (
    <div className="panel relative row-span-3 grid grid-rows-subgrid gap-1 p-4 md:p-5">
      <div className={`text-footnote text-muted ${hint ? 'pr-7' : ''}`}>
        {label}
        {hint && <Hint text={hint} />}
      </div>
      <div className={`text-title-3 font-bold tabular-nums md:text-title-2 ${tone}`}>{value}</div>
      <div className="self-end text-footnote text-muted tabular-nums">{support}</div>
    </div>
  )
}

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Operações"
        value={int(stats.totalTrades)}
        support={`${brl(stats.avgTrade)} por operação`}
      />
      <StatCard
        label="Taxa de acerto"
        value={pct(stats.winRate)}
        tone={stats.winRate >= 50 ? 'text-success' : 'text-destructive'}
        support={`${int(stats.wins)} de ${int(stats.totalTrades)}`}
      />
      <StatCard
        label="Fator de lucro"
        hint="Soma dos ganhos dividida pela soma das perdas. Acima de 1, o ganho cobre a perda."
        value={decimal(stats.profitFactor)}
        tone={stats.profitFactor >= 1 ? 'text-success' : 'text-destructive'}
        support={`${brlCompact(stats.grossProfit)} contra ${brlCompact(stats.grossLoss)}`}
      />
      <StatCard
        label="Drawdown máximo"
        hint="Maior distância entre um topo da curva de capital e o fundo seguinte."
        value={brl(stats.maxDrawdown)}
        tone={stats.maxDrawdown > 0 ? 'text-destructive' : ''}
        support={`${int(stats.losses)} operações com prejuízo`}
      />
    </div>
  )
}
