import { useState, useEffect, useRef, useCallback } from 'react'
import { Trophy, TrendingDown, Shield, Target, AlertTriangle, Users, ChevronLeft, ChevronRight, MessageCircle, Star } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'

/* ─── CREATOR HERO ─── */

const LIFE_CANDLES = [
  { year: '2000', type: 'bear', h: 50, title: 'O sonho e a luta', text: 'Queria ser jogador de futebol, enquanto isso vendia picolé no estádio para ajudar com as contas.' },
  { year: '2004', type: 'bull', h: 40, title: 'Estágio na CELG', text: 'Começa um estágio na CELG. O primeiro passo no mundo profissional.' },
  { year: '2006', type: 'bull', h: 55, title: 'Descobriu a Bolsa', text: 'Tem seu primeiro contato com a bolsa de valores através do FolhaINVEST. O fascínio foi imediato.' },
  { year: '2009', type: 'bull', h: 65, title: 'Primeiras operações', text: 'Aprovado em concurso público e no vestibular, junta seus primeiros R$ 3.000, abre conta na TOV e começa a operar.' },
  { year: '2013', type: 'bull', h: 70, title: 'Estatística como base', text: 'Descobre a estatística como base da estratégia de exaustão de movimento e passa a ser lucrativo em bolsa.' },
  { year: '2015', type: 'bear', h: 45, title: '100% dedicado', text: 'Pede exoneração do cargo público e fecha outros negócios. Passa a dedicar 100% do tempo às operações em ações e índice.' },
  { year: '2017', type: 'bull', h: 60, title: 'Notoriedade', text: 'Cria o Instagram e passa a ganhar notoriedade no Brasil compartilhando suas operações.' },
  { year: '2018', type: 'bull', h: 85, title: 'Alaska & Square', text: 'Nasce a estratégia Alaska Square para operar índice — 89% de acerto no mini índice Ibovespa.' },
]

function CreatorHero() {
  const [loaded, setLoaded] = useState(false)
  const [activeCandle, setActiveCandle] = useState(-1)
  const [revealedCount, setRevealedCount] = useState(0)
  const autoRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(t)
  }, [])

  // Sequential candle reveal + auto-play story
  useEffect(() => {
    if (!loaded) return
    const timers = LIFE_CANDLES.map((_, i) =>
      setTimeout(() => {
        setRevealedCount(i + 1)
        setActiveCandle(i)
      }, 600 + i * 400)
    )
    // After all revealed, clear selection
    const clearTimer = setTimeout(() => setActiveCandle(-1), 600 + LIFE_CANDLES.length * 400 + 2000)
    return () => { timers.forEach(clearTimeout); clearTimeout(clearTimer) }
  }, [loaded])

  return (
    <div className="relative mb-6 md:mb-20">
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0">

        {/* LEFT + CENTER — Name, story, candles */}
        <div className="flex-1 min-w-0 md:pr-8 lg:pr-12 flex flex-col justify-center">
          {/* Name */}
          <div
            className="transition-all duration-1000 delay-100"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)' }}
          >
            <div className="inline-flex items-center gap-1.5 bg-[#00ff87]/[0.06] border border-[#00ff87]/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-3 md:mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              <span className="text-[#00ff87]/60 text-[9px] md:text-[11px] font-semibold tracking-wide">QUEM CRIOU A ESTRATÉGIA</span>
            </div>
            <h2 className="text-white font-black text-xl md:text-5xl tracking-tight leading-[1.1]">
              Fabrício<br />
              <span className="text-[#00ff87]">Gonçalvez</span>
            </h2>
            <p className="text-white/30 text-[10px] md:text-sm mt-1.5 md:mt-3 leading-relaxed max-w-sm">
              De vendedor de picolé no estádio a criador de uma estratégia com 89% de acerto. Uma trajetória contada em candles.
            </p>

            {/* Stats row */}
            <div className="flex gap-3 md:gap-6 mt-3 md:mt-6">
              {[
                { value: '+3.500', label: 'Operações' },
                { value: '89%', label: 'Acerto' },
                { value: '+20', label: 'Anos de exp.' },
              ].map((s) => (
                <div key={s.label}>
                  <span className="text-white font-black text-base md:text-2xl block">{s.value}</span>
                  <span className="text-white/20 text-[7px] md:text-[10px] uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Candle timeline */}
          <div
            className="mt-4 md:mt-10 transition-all duration-700 delay-300"
            style={{ opacity: loaded ? 1 : 0 }}
          >
            {/* Candles row */}
            <div className="flex items-end gap-1 md:gap-2.5 h-[80px] md:h-[140px] mb-1.5 md:mb-3">
              {LIFE_CANDLES.map((c, i) => {
                const revealed = i < revealedCount
                const isActive = i === activeCandle
                const isBull = c.type === 'bull'
                const color = isBull ? '#00ff87' : '#ff4757'
                const maxH = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 120
                const bodyH = (c.h / 100) * maxH

                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => setActiveCandle(i)}
                    onMouseLeave={() => setActiveCandle(-1)}
                    onClick={() => setActiveCandle(activeCandle === i ? -1 : i)}
                  >
                    {/* Wick top */}
                    <div
                      className="w-px md:w-[1.5px] transition-all duration-500"
                      style={{
                        height: revealed ? 8 : 0,
                        backgroundColor: color,
                        opacity: revealed ? 0.4 : 0,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                    {/* Body */}
                    <div
                      className="w-full max-w-[14px] md:max-w-[28px] rounded-[2px] md:rounded-[4px] transition-all duration-700 relative"
                      style={{
                        height: revealed ? bodyH : 0,
                        backgroundColor: color,
                        opacity: revealed ? (isActive ? 1 : 0.6) : 0,
                        transitionDelay: `${i * 60}ms`,
                        boxShadow: isActive ? `0 0 20px ${color}30` : 'none',
                      }}
                    />
                    {/* Wick bottom */}
                    <div
                      className="w-px md:w-[1.5px] transition-all duration-500"
                      style={{
                        height: revealed ? 6 : 0,
                        backgroundColor: color,
                        opacity: revealed ? 0.4 : 0,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Year labels */}
            <div className="flex gap-1 md:gap-2.5">
              {LIFE_CANDLES.map((c, i) => (
                <div key={i} className="flex-1 text-center">
                  <span
                    className="text-[7px] md:text-[9px] font-semibold transition-all duration-300"
                    style={{ color: i === activeCandle ? (c.type === 'bull' ? '#00ff87' : '#ff4757') : 'rgba(255,255,255,0.15)' }}
                  >
                    {c.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Active candle info */}
            <div className="mt-2 md:mt-4 min-h-[50px] md:min-h-[64px]">
              {activeCandle >= 0 ? (
                <div
                  key={activeCandle}
                  className="bg-white/[0.03] border rounded-lg md:rounded-xl p-2.5 md:p-3.5 animate-[fadeSlide_0.3s_ease]"
                  style={{ borderColor: LIFE_CANDLES[activeCandle].type === 'bull' ? 'rgba(0,255,135,0.1)' : 'rgba(255,71,87,0.1)' }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: LIFE_CANDLES[activeCandle].type === 'bull' ? '#00ff87' : '#ff4757' }} />
                    <span className="text-white font-bold text-[11px] md:text-[13px]">{LIFE_CANDLES[activeCandle].title}</span>
                  </div>
                  <p className="text-white/35 text-[10px] md:text-[12px] leading-relaxed">{LIFE_CANDLES[activeCandle].text}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center py-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#00ff87]/40" />
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#ff4757]/40" />
                  </div>
                  <span className="text-white/15 text-[9px] md:text-[11px]">Toque em um candle para ver a história</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Photo, no border, bleeds to edge */}
        <div
          className="w-full md:w-[420px] lg:w-[500px] shrink-0 order-first md:order-last transition-all duration-1000 delay-200"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(0.96)' }}
        >
          <div className="relative h-[280px] md:h-full md:min-h-[600px] rounded-xl md:rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src="/criador.png"
              alt="Fabrício Gonçalvez"
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            {/* Line sweep on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff87]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/20 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/40 to-transparent pointer-events-none md:block hidden" />

            {/* Bottom badges */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-5 md:left-5 flex flex-wrap gap-1 md:gap-2 transition-transform duration-500 group-hover:translate-y-[-4px]">
              <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-white/60 text-[8px] md:text-[10px] font-medium transition-colors duration-500 group-hover:text-white/80">Trader</span>
              <span className="bg-[#00ff87]/10 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-[#00ff87]/70 text-[8px] md:text-[10px] font-semibold transition-colors duration-500 group-hover:text-[#00ff87]">Alaska & Square</span>
            </div>
          </div>
        </div>

      </div>

      {/* CSS keyframe for info panel */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ─── INTERACTIVE STRATEGY STEPPER ─── */

const STEPS = [
  {
    num: 1,
    color: '#00ff87',
    icon: Target,
    title: 'Identifique o sinal',
    subtitle: 'Gráfico de 60 minutos',
    description: 'Observe se a vela atual fechou positiva (verde). Esse fechamento habilita a operação na vela seguinte.',
    tags: ['Vela verde = Sinal ativo', 'Vela vermelha = Sem operação'],
    tagColors: ['#00ff87', '#ff4757'],
  },
  {
    num: 2,
    color: '#ffa502',
    icon: TrendingDown,
    title: 'Aguarde o gatilho',
    subtitle: 'Próxima vela',
    description: 'Espere o preço cair 200 pontos a partir da abertura. Quando atingir, inicie a venda a descoberto.',
    tags: ['Gatilho: -200 pontos da abertura'],
    tagColors: ['#ffa502'],
  },
  {
    num: 3,
    color: '#00ff87',
    icon: Target,
    title: 'Alvo do Alaska',
    subtitle: 'Operação aberta',
    description: 'Com a venda a descoberto aberta, o alvo é de 100 pontos de lucro. Se o mercado continuar caindo, você realiza o ganho rapidamente.',
    tags: ['Alvo: +100 pontos', 'Stop: 400 pontos'],
    tagColors: ['#00ff87', '#ff4757'],
  },
  {
    num: 4,
    color: '#3b82f6',
    icon: Shield,
    title: 'Square — O plano B',
    subtitle: 'Proteção inteligente',
    description: 'Se o preço recuar 150 pontos contra a posição sem atingir o alvo, entra o SQUARE com 3x o lote. O stop é o mesmo do Alaska.',
    tags: ['Entrada: +150 pts contra', 'Lote: 3x o Alaska', 'Alvo: +120 pontos'],
    tagColors: ['#3b82f6', '#3b82f6', '#3b82f6'],
  },
]

function StrategyStepper() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1) // 1=forward, -1=back
  const intervalRef = useRef(null)

  const goTo = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }, [active])

  const next = useCallback(() => {
    setDirection(1)
    setActive((p) => (p + 1) % STEPS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((p) => (p - 1 + STEPS.length) % STEPS.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => clearInterval(intervalRef.current)
  }, [next])

  const resetAuto = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }, [next])

  const step = STEPS[active]
  const Icon = step.icon

  return (
    <div className="mb-6 md:mb-16">
      <h2 className="text-white/20 text-[9px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4 md:mb-8 text-center">Passo a passo</h2>

      <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl">
        {/* Top progress bar */}
        <div className="flex h-1 md:h-1.5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex-1 cursor-pointer transition-all duration-300"
              style={{ backgroundColor: i <= active ? s.color : 'rgba(255,255,255,0.03)' }}
              onClick={() => { goTo(i); resetAuto() }}
            />
          ))}
        </div>

        {/* Step indicators */}
        <div className="flex px-2.5 pt-2.5 md:px-6 md:pt-5 gap-0.5 md:gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetAuto() }}
              className="flex items-center gap-1 md:gap-2 px-1.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: i === active ? `${s.color}12` : 'transparent',
                border: i === active ? `1px solid ${s.color}25` : '1px solid transparent',
              }}
            >
              <div
                className="w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg flex items-center justify-center text-[9px] md:text-[10px] font-black transition-all duration-300"
                style={{
                  backgroundColor: i === active ? `${s.color}20` : 'rgba(255,255,255,0.03)',
                  color: i === active ? s.color : 'rgba(255,255,255,0.2)',
                }}
              >
                {s.num}
              </div>
              <span
                className="text-[9px] md:text-[11px] font-semibold transition-colors duration-300 hidden md:block"
                style={{ color: i === active ? s.color : 'rgba(255,255,255,0.15)' }}
              >
                {s.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative min-h-[200px] md:min-h-[260px] p-3.5 md:p-8 pb-14 md:pb-8">
          <div
            key={active}
            className="animate-[stepIn_0.4s_ease]"
          >
            <div className="flex items-start gap-3 md:gap-5">
              <div
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                style={{ backgroundColor: `${step.color}12` }}
              >
                <Icon className="w-4 h-4 md:w-6 md:h-6" style={{ color: step.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <span className="text-white/15 text-[9px] md:text-[10px] uppercase tracking-widest font-medium">{step.subtitle}</span>
                </div>
                <h3 className="text-white font-bold text-base md:text-xl mb-2 md:mb-3">{step.title}</h3>
                <p className="text-white/40 text-[11px] md:text-sm leading-relaxed mb-4 md:mb-5 max-w-lg">{step.description}</p>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {step.tags.map((tag, ti) => (
                    <div
                      key={ti}
                      className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-[11px] font-semibold"
                      style={{ backgroundColor: `${step.tagColors[ti]}10`, color: step.tagColors[ti], border: `1px solid ${step.tagColors[ti]}15` }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-1.5 md:gap-2">
            <button
              onClick={() => { prev(); resetAuto() }}
              className="w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => { next(); resetAuto() }}
              className="w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Step counter */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
            <span className="text-white/10 text-[10px] md:text-xs font-mono">
              {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateX(${direction * 20}px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

/* ─── SCENARIO CARDS ─── */

function ScenarioCard({ title, subtitle, result, resultColor, items }) {
  return (
    <div className="flex-1 min-w-0 relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-3.5 md:p-6">
      <div className="mb-3 md:mb-4">
        <h4 className="text-white font-bold text-[13px] md:text-base">{title}</h4>
        <p className="text-white/25 text-[9px] md:text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2 mb-3 md:mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-lg md:rounded-xl px-2.5 py-2 md:px-3 md:py-2.5">
            <span className="text-white/40 text-[10px] md:text-xs">{item.label}</span>
            <span className="text-white/70 text-[10px] md:text-xs font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="pt-2.5 md:pt-3 border-t border-white/[0.04]">
        <div className="flex items-center justify-between">
          <span className="text-white/30 text-[10px] md:text-xs font-medium">Resultado</span>
          <span className="text-base md:text-xl font-black" style={{ color: resultColor }}>{result}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ─── */

export default function StrategyPage() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-5xl mx-auto px-3 py-6 md:px-8 md:py-16">

        {/* Creator Hero */}
        <CreatorHero />

        {/* Strategy Hero */}
        <div className="text-center mb-6 md:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#00ff87]/[0.08] border border-[#00ff87]/15 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
            <Trophy className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#00ff87]" />
            <span className="text-[#00ff87] text-[10px] md:text-xs font-bold">89% de acerto desde 2018</span>
          </div>
          <h1 className="text-xl md:text-5xl font-black text-white tracking-tight mb-2 md:mb-4">
            Estratégia <span className="text-[#00ff87]">Alaska</span> & <span className="text-[#3b82f6]">Square</span>
          </h1>
          <p className="text-white/30 text-xs md:text-base max-w-xl mx-auto leading-relaxed px-2">
            Operações de venda a descoberto em mini índice Ibovespa no gráfico de 60 minutos, com gerenciamento de risco inteligente.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-1.5 md:gap-3 mt-4 md:mt-8">
            {[
              { label: 'Ativo', value: 'Mini Índice' },
              { label: 'Timeframe', value: '60 minutos' },
              { label: 'Tipo', value: 'Venda a Descoberto' },
              { label: 'Operando desde', value: '2018' },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.03] border border-white/[0.06] px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl">
                <span className="text-white/20 text-[7px] md:text-[9px] uppercase tracking-wider block">{item.label}</span>
                <span className="text-white font-bold text-[11px] md:text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagrama Visual */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-3 md:p-8 mb-5 md:mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.01] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="flex items-center gap-1.5 mb-3 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-white/30 text-[9px] md:text-xs font-semibold uppercase tracking-wider">Gráfico interativo — toque sobre as zonas</span>
          </div>
          <CandlestickDiagram />
        </div>

        {/* Interactive Strategy Stepper */}
        <StrategyStepper />

        {/* Cenários de resultado */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-white/20 text-[9px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3 md:mb-8 text-center">Cenários de resultado</h2>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <ScenarioCard
              title="Cenário A"
              subtitle="Alaska direto — mercado a favor"
              result="+100 pts"
              resultColor="#00ff87"
              items={[
                { label: 'Entrada', value: '-200 pts' },
                { label: 'Direção', value: 'Mercado caiu' },
                { label: 'Alvo', value: '100 pts de lucro' },
                { label: 'Square?', value: 'Não' },
              ]}
            />
            <div className="flex items-center justify-center py-1 md:py-0">
              <span className="text-white/10 text-[10px] md:text-xs font-semibold">OU</span>
            </div>
            <ScenarioCard
              title="Cenário B"
              subtitle="Com Square — preço médio"
              result="+120 pts"
              resultColor="#3b82f6"
              items={[
                { label: 'Alaska', value: '-200 pts' },
                { label: 'Recuo', value: '+150 pts contra' },
                { label: 'Square', value: '3x lote' },
                { label: 'Alvo', value: '120 pts de lucro' },
              ]}
            />
          </div>
        </div>

        {/* Regra de invalidação */}
        <div className="mb-6 md:mb-16">
          <div className="relative overflow-hidden bg-[#ff4757]/[0.04] border border-[#ff4757]/10 rounded-xl md:rounded-2xl p-3.5 md:p-8">
            <div className="absolute top-0 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-[#ff4757] to-transparent opacity-30" />
            <div className="flex items-start gap-2.5 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#ff4757]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 md:w-6 md:h-6 text-[#ff4757]" />
              </div>
              <div>
                <h3 className="text-[#ff4757] font-bold text-[13px] md:text-base mb-1 md:mb-2">Regra de invalidação</h3>
                <p className="text-white/40 text-[11px] md:text-sm leading-relaxed">
                  Se a vela anterior fechar <span className="text-[#ff4757] font-semibold">negativa</span>, não há operação. O setup só é habilitado com vela anterior <span className="text-[#00ff87] font-semibold">positiva</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedbacks — Prova Social */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-white/20 text-[9px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3 md:mb-8 text-center">O que dizem os membros</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {[
              {
                name: 'Rafael M.',
                role: 'Day Trader',
                text: 'Entrei na comunidade sem acreditar muito, mas já no primeiro mês vi a consistência do setup. A taxa de acerto é real.',
                stars: 5,
              },
              {
                name: 'Lucas S.',
                role: 'Operador de Mini Índice',
                text: 'O Square é genial. Quando o Alaska não vai, o plano B salva a operação. Nunca vi um gerenciamento de risco tão bem pensado.',
                stars: 5,
              },
              {
                name: 'Ana P.',
                role: 'Trader Iniciante',
                text: 'Comecei do zero e em 3 meses já estava operando com confiança. O passo a passo é claro e o Fabrício explica tudo no grupo.',
                stars: 5,
              },
              {
                name: 'Marcos T.',
                role: 'Investidor',
                text: 'Opero há 8 anos e nunca achei algo tão objetivo. Sem enrolação, sem indicador mágico. É setup, entrada e saída.',
                stars: 5,
              },
              {
                name: 'Fernanda R.',
                role: 'Swing Trader',
                text: 'A comunidade é muito ativa. O Fabrício avisa antes das operações e faz questão de explicar cada decisão.',
                stars: 5,
              },
              {
                name: 'Diego C.',
                role: 'Day Trader',
                text: 'Saí de um curso de R$5.000 que não me ensinou nada e achei a Alaska & Square de graça. Irônico, mas funciona de verdade.',
                stars: 5,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-3.5 md:p-5 group hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-2.5 md:mb-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#00ff87]/[0.08] flex items-center justify-center">
                    <span className="text-[#00ff87] font-bold text-[10px] md:text-[11px]">{f.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-semibold text-[11px] md:text-[13px] block">{f.name}</span>
                    <span className="text-white/20 text-[9px] md:text-[10px]">{f.role}</span>
                  </div>
                  <MessageCircle className="w-3.5 h-3.5 text-white/10 shrink-0" />
                </div>

                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: f.stars }).map((_, si) => (
                    <Star key={si} className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#ffa502] fill-[#ffa502]" />
                  ))}
                </div>

                <p className="text-white/35 text-[10px] md:text-[12px] leading-relaxed">"{f.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#00ff87]/[0.06] to-[#00ff87]/[0.02] border border-[#00ff87]/15 rounded-xl md:rounded-2xl p-5 md:p-10 text-center mt-4 md:mt-10">
          <div className="relative">
            <h3 className="text-white font-black text-base md:text-2xl mb-1.5 md:mb-3">
              Quer operar com a gente?
            </h3>
            <p className="text-white/30 text-[11px] md:text-sm max-w-md mx-auto mb-4 md:mb-8 leading-relaxed">
              Entre na nossa comunidade e acompanhe as operações em tempo real.
            </p>
            <a
              href={communityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00ff87] text-black font-bold text-[13px] md:text-base px-6 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,135,0.35)] hover:scale-[1.03] active:scale-95"
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              Entrar na Comunidade
            </a>
            <p className="text-white/10 text-[8px] md:text-[10px] mt-3 md:mt-5 uppercase tracking-wider">
              Acesso gratuito via WhatsApp
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
