import { useState } from 'react'
import { BookOpen, TrendingDown, Shield, Target, AlertTriangle, Trophy, ChevronDown, ChevronUp, Zap } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    icon: BookOpen,
    color: '#00ff87',
    title: 'Leitura do Mercado',
    subtitle: 'Grafico de 60 minutos',
    description: 'Observamos o grafico de candlestick de 60 minutos do mini indice Ibovespa. Quando uma vela fecha positiva (verde), ficamos em alerta para a proxima vela.',
    highlight: 'Vela anterior VERDE = Sinal de alerta',
    highlightColor: '#00ff87',
  },
  {
    id: 2,
    icon: TrendingDown,
    color: '#ff4757',
    title: 'Entrada Alaska',
    subtitle: 'Venda a descoberto',
    description: 'Na vela seguinte, se o preco cair 200 pontos a partir da abertura, iniciamos a venda a descoberto. Aproveitamos a mudanca de tendencia no timeframe menor.',
    highlight: 'Gatilho: -200 pontos da abertura',
    highlightColor: '#ff4757',
  },
  {
    id: 3,
    icon: Target,
    color: '#00ff87',
    title: 'Alvo & Stop',
    subtitle: 'Gerenciamento de risco',
    description: 'O alvo do Alaska e de 100 pontos de lucro. A protecao (stop loss) fica a 400 pontos acima da entrada. Risco calculado e controlado.',
    highlight: 'Alvo: 100 pts | Stop: 400 pts',
    highlightColor: '#ffa502',
  },
  {
    id: 4,
    icon: Shield,
    color: '#3b82f6',
    title: 'Acionamento do Square',
    subtitle: 'Preco medio inteligente',
    description: 'Se o mercado recuar 150 pontos contra a posicao do Alaska sem atingir o alvo, entra o SQUARE com 3x o lote inicial. E um preco medio estrategico que transforma uma operacao adversa em oportunidade.',
    highlight: 'Square = 3x o lote do Alaska',
    highlightColor: '#3b82f6',
  },
  {
    id: 5,
    icon: Trophy,
    color: '#00ff87',
    title: 'Resultado',
    subtitle: 'Dois cenarios de ganho',
    items: [
      { label: 'Alaska direto', value: '+100 pontos', desc: 'Mercado caiu a favor' },
      { label: 'Com Square', value: '+120 pontos', desc: 'A partir da entrada do Square' },
    ],
    highlight: '89% de acerto desde 2018',
    highlightColor: '#00ff87',
  },
]

function StepCard({ step, isOpen, onToggle, index }) {
  const Icon = step.icon

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer group ${
        isOpen
          ? 'bg-white/[0.04] border-white/[0.08] shadow-lg'
          : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
      }`}
      onClick={onToggle}
    >
      <div className="absolute top-0 left-0 w-1 h-full transition-all duration-500" style={{ backgroundColor: isOpen ? step.color : 'transparent' }} />

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
              style={{ backgroundColor: `${step.color}15` }}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: step.color }} />
            </div>
            <div className="absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#060608] border border-white/10 flex items-center justify-center">
              <span className="text-[8px] md:text-[9px] font-bold text-white/40">{step.id}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm md:text-base">{step.title}</h3>
            <p className="text-white/25 text-[10px] md:text-xs font-medium uppercase tracking-wider">{step.subtitle}</p>
          </div>

          <div className="shrink-0 text-white/20 group-hover:text-white/40 transition-colors">
            {isOpen ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/[0.06] pt-4">
            {step.description && (
              <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4">{step.description}</p>
            )}

            {step.items && (
              <div className="flex flex-col gap-2 mb-4">
                {step.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded-xl px-3 py-2.5 md:px-4 md:py-3">
                    <div>
                      <span className="text-white/60 text-[11px] md:text-xs font-medium">{item.label}</span>
                      <p className="text-white/25 text-[9px] md:text-[10px]">{item.desc}</p>
                    </div>
                    <span className="text-[#00ff87] font-bold text-sm md:text-base">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold"
              style={{
                backgroundColor: `${step.highlightColor}12`,
                color: step.highlightColor,
              }}
            >
              <Zap className="w-3 h-3" />
              {step.highlight}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StrategySection() {
  const [openSteps, setOpenSteps] = useState([1])
  const [showImage, setShowImage] = useState(false)

  function toggleStep(id) {
    setOpenSteps((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur border border-white/[0.04] rounded-2xl p-4 md:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.02] via-transparent to-[#3b82f6]/[0.01] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8 relative">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Como funciona a estrategia</span>
            <p className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-wider">Alaska & Square</p>
          </div>
        </div>

        <button
          onClick={() => setShowImage(!showImage)}
          className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/30 hover:text-[#00ff87] transition-all cursor-pointer hover:bg-[#00ff87]/5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl border border-white/[0.06] hover:border-[#00ff87]/20"
        >
          {showImage ? 'Ocultar' : 'Ver'} grafico
        </button>
      </div>

      {/* Stats badges */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6 relative">
        <div className="flex items-center gap-1.5 bg-[#00ff87]/[0.06] border border-[#00ff87]/10 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl">
          <Trophy className="w-3 h-3 text-[#00ff87]" />
          <span className="text-[#00ff87] text-[10px] md:text-xs font-bold">89% de acerto</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl">
          <span className="text-white/40 text-[10px] md:text-xs font-medium">Mini Indice</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl">
          <span className="text-white/40 text-[10px] md:text-xs font-medium">60 minutos</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl">
          <span className="text-white/40 text-[10px] md:text-xs font-medium">Desde 2018</span>
        </div>
      </div>

      {/* Strategy Image */}
      <div
        className={`overflow-hidden transition-all duration-500 relative ${
          showImage ? 'max-h-[500px] opacity-100 mb-5 md:mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 md:p-6 flex justify-center">
          <img
            src="/alaska-strategy.png"
            alt="Estrategia Alaska & Square - Grafico visual"
            className="max-w-full h-auto max-h-[400px] rounded-xl"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2 md:gap-3 relative">
        {STEPS.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            isOpen={openSteps.includes(step.id)}
            onToggle={() => toggleStep(step.id)}
          />
        ))}
      </div>

      {/* Invalidation rule */}
      <div className="mt-4 md:mt-5 p-3 md:p-4 bg-[#ff4757]/[0.05] border border-[#ff4757]/10 rounded-xl md:rounded-2xl relative">
        <div className="flex items-start gap-2.5 md:gap-3">
          <AlertTriangle className="w-4 h-4 text-[#ff4757] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#ff4757] text-xs md:text-sm font-bold mb-1">Regra de invalidacao</h4>
            <p className="text-white/40 text-[11px] md:text-xs leading-relaxed">
              Se a vela anterior fechar <span className="text-[#ff4757] font-semibold">negativa (vermelha)</span>, nao ha operacao na vela seguinte. Apenas velas verdes habilitam o setup.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-white/[0.04] relative text-center">
        <p className="text-white/15 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em]">
          Acompanhe os resultados em tempo real no dashboard acima
        </p>
      </div>
    </div>
  )
}
