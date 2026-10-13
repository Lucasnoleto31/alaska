import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'
import { useTrackRecord } from '../hooks/useTrackRecord'
import { int, pct } from '../lib/format'
import { COMMUNITY_URL } from '../lib/links'

// Tom de um valor: lucro, atenção ou prejuízo
const TONE = {
  pos: 'text-success',
  warn: 'text-warning',
  neg: 'text-destructive',
}

/* ─── CRIADOR ─── */

const LIFE_CANDLES = [
  { year: '2000', type: 'bear', h: 50, title: 'O sonho e a luta', text: 'Queria ser jogador de futebol, enquanto isso vendia picolé no estádio para ajudar com as contas.' },
  { year: '2004', type: 'bull', h: 40, title: 'Estágio na CELG', text: 'Começa um estágio na CELG. O primeiro passo no mundo profissional.' },
  { year: '2006', type: 'bull', h: 55, title: 'Descobriu a Bolsa', text: 'Tem seu primeiro contato com a bolsa de valores através do FolhaINVEST. O fascínio foi imediato.' },
  { year: '2009', type: 'bull', h: 65, title: 'Primeiras operações', text: 'Aprovado em concurso público e no vestibular, junta seus primeiros R$ 3.000, abre conta na TOV e começa a operar.' },
  { year: '2013', type: 'bull', h: 70, title: 'Estatística como base', text: 'Descobre a estatística como base da estratégia de exaustão de movimento e passa a ser lucrativo em bolsa.' },
  { year: '2015', type: 'bear', h: 45, title: '100% dedicado', text: 'Pede exoneração do cargo público e fecha outros negócios. Passa a dedicar 100% do tempo às operações em ações e índice.' },
  { year: '2017', type: 'bull', h: 60, title: 'Notoriedade', text: 'Cria o Instagram e passa a ganhar notoriedade no Brasil compartilhando suas operações.' },
  { year: '2018', type: 'bull', h: 85, title: 'Alaska & Square', text: 'Nasce a estratégia Alaska & Square para operar o mini índice Ibovespa.' },
]

function LifeTimeline() {
  const [active, setActive] = useState(LIFE_CANDLES.length - 1)
  const current = LIFE_CANDLES[active]

  return (
    <div>
      <div className="flex h-28 items-end gap-1.5 md:h-32 md:gap-2.5">
        {LIFE_CANDLES.map((c, i) => {
          const isActive = i === active
          const isBull = c.type === 'bull'
          return (
            <button
              key={c.year}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`${c.year}: ${c.title}`}
              className="group flex h-full flex-1 flex-col items-center justify-end"
            >
              <span
                className="flex w-full flex-col items-center transition-opacity duration-200"
                style={{ height: `${c.h}%`, opacity: isActive ? 1 : 0.55 }}
              >
                <span className={`h-2 w-px shrink-0 ${isBull ? 'bg-success-fill' : 'bg-destructive-fill'}`} />
                <span
                  className={`w-full max-w-7 flex-1 rounded-[3px] ${isBull ? 'bg-success-fill' : 'bg-destructive-fill'}`}
                />
                <span className={`h-1.5 w-px shrink-0 ${isBull ? 'bg-success-fill' : 'bg-destructive-fill'}`} />
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-2 flex gap-1.5 md:gap-2.5" aria-hidden>
        {LIFE_CANDLES.map((c, i) => (
          <span
            key={c.year}
            className={`flex-1 text-center text-caption-2 tabular-nums ${
              i === active ? `font-semibold ${c.type === 'bull' ? 'text-success' : 'text-destructive'}` : 'text-muted'
            }`}
          >
            {c.year}
          </span>
        ))}
      </div>

      <div key={active} className="panel fade-in mt-4 p-4 md:p-5" aria-live="polite">
        <p className={`text-footnote font-medium tabular-nums ${current.type === 'bull' ? 'text-success' : 'text-destructive'}`}>
          {current.year}
        </p>
        <p className="mt-0.5 text-headline font-semibold">{current.title}</p>
        <p className="mt-1 text-subhead text-muted">{current.text}</p>
      </div>
      <p className="mt-2 text-caption text-muted">Toque num ano para ler.</p>
    </div>
  )
}

function CreatorHero() {
  const record = useTrackRecord()
  const stats = [
    { value: int(record.total), label: 'operações desde 2018' },
    { value: pct(record.winRate), label: 'de acerto', tone: 'text-success' },
    { value: '+20', label: 'anos de mercado' },
  ]

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_minmax(0,400px)] md:gap-10 lg:grid-cols-[1fr_440px]">
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-footnote font-medium text-success">Criador da estratégia</p>
        <h2 className="mt-1 text-large-title font-bold">Fabrício Gonçalvez</h2>
        <p className="mt-3 max-w-md text-body text-muted">
          De vendedor de picolé no estádio a criador de uma estratégia com {pct(record.winRate)} de acerto no mini índice.
        </p>

        <dl className="mt-6 flex gap-6 md:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-footnote text-muted">{s.label}</dt>
              <dd className={`text-title-2 font-bold tabular-nums ${s.tone || ''}`}>{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <LifeTimeline />
        </div>
      </div>

      {/* Perfil de pessoa: foto em preto e branco, na altura toda */}
      <div className="order-first md:order-last">
        <img
          src="/criador.png"
          alt="Fabrício Gonçalvez"
          className="h-80 w-full rounded-panel object-cover object-top grayscale md:h-full md:min-h-[560px]"
        />
      </div>
    </section>
  )
}

/* ─── ESTRATÉGIA ─── */

const FACTS = ['Mini índice', 'Gráfico de 60 minutos', 'Venda a descoberto', 'Desde 2018']

// As regras inteiras em quatro números
const RULES = [
  { value: '200 pts', label: 'abaixo da abertura: entra a venda' },
  { value: '100 pts', label: 'de alvo no Alaska', tone: 'pos' },
  { value: '150 pts', label: 'contra a posição: entra o Square, com 3 vezes o lote', tone: 'warn' },
  { value: '400 pts', label: 'acima da entrada: stop dos dois', tone: 'neg' },
]

function StrategyIntro() {
  return (
    <section>
      <p className="text-footnote font-medium text-success">A estratégia</p>
      <h1 className="mt-1 text-large-title font-bold">Estratégia Alaska & Square</h1>
      <p className="mt-3 max-w-xl text-body text-muted">
        Venda a descoberto no mini índice Ibovespa, no gráfico de 60 minutos. Se o preço volta contra a
        posição, uma segunda entrada maior melhora o preço médio.
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Onde opera">
        {FACTS.map((f) => (
          <li key={f} className="flex h-8 items-center rounded-full border border-border px-3 text-footnote text-muted">
            {f}
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {RULES.map((r) => (
          <div key={r.value} className="panel flex flex-col-reverse justify-end gap-1 p-4 md:p-5">
            <dt className="text-footnote text-muted">{r.label}</dt>
            <dd className={`text-title-2 font-bold tabular-nums ${TONE[r.tone] || ''}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

const STEPS = [
  {
    short: 'Sinal',
    title: 'Sinal',
    subtitle: 'Gráfico de 60 minutos',
    description: 'A vela anterior precisa fechar positiva. Esse fechamento habilita a operação na vela seguinte.',
    facts: [
      ['Vela anterior positiva', 'opera', 'pos'],
      ['Vela anterior negativa', 'não opera', 'neg'],
    ],
  },
  {
    short: 'Gatilho',
    title: 'Gatilho de venda',
    subtitle: 'Vela seguinte',
    description: 'Na vela seguinte, quando o preço cai 200 pontos a partir da abertura, entra a venda a descoberto.',
    facts: [['Entrada', '200 pts abaixo da abertura']],
  },
  {
    short: 'Alvo',
    title: 'Alvo do Alaska',
    subtitle: 'Operação aberta',
    description: 'Com a venda aberta, o alvo é de 100 pontos de lucro. O stop fica 400 pontos acima da entrada.',
    facts: [
      ['Alvo', '100 pts', 'pos'],
      ['Stop', '400 pts acima da entrada', 'neg'],
    ],
  },
  {
    short: 'Square',
    title: 'Square',
    subtitle: 'Segunda entrada',
    description: 'Se o preço sobe 150 pontos contra a posição sem atingir o alvo, entra o Square com 3 vezes o lote. O stop é o mesmo do Alaska.',
    facts: [
      ['Entrada', '150 pts contra', 'warn'],
      ['Lote', '3 vezes o do Alaska'],
      ['Alvo', '120 pts', 'pos'],
      ['Stop', 'o mesmo do Alaska', 'neg'],
    ],
  },
]

function HowItWorks() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const step = STEPS[active]
  const last = STEPS.length - 1

  function go(i) {
    setActive(i)
    tabs.current[i]?.focus()
  }

  // Setas trocam de aba, como num seletor do sistema
  function onKeyDown(e) {
    if (e.key === 'ArrowRight') go(Math.min(active + 1, last))
    if (e.key === 'ArrowLeft') go(Math.max(active - 1, 0))
  }

  return (
    <section aria-labelledby="como-funciona">
      <h2 id="como-funciona" className="text-title-1 font-bold">Como funciona</h2>
      <p className="mt-1 text-subhead text-muted">4 passos, do sinal à segunda entrada.</p>

      <div className="panel mt-6 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex items-center justify-center p-5 md:p-8 lg:border-r lg:border-border">
          <CandlestickDiagram step={active} />
        </div>

        <div className="flex flex-col border-t border-border p-5 md:p-8 lg:border-t-0">
          <div role="tablist" aria-label="Passos" className="grid grid-cols-4 gap-1 rounded-control bg-background p-1" onKeyDown={onKeyDown}>
            {STEPS.map((s, i) => {
              const selected = i === active
              return (
                <button
                  key={s.short}
                  ref={(el) => { tabs.current[i] = el }}
                  type="button"
                  role="tab"
                  id={`passo-${i}`}
                  aria-selected={selected}
                  aria-controls="passo-painel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`pressable flex h-11 items-center justify-center gap-1 rounded-chip px-1 text-footnote font-semibold md:h-10 ${
                    selected ? 'bg-brand text-brand-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  <span className="tabular-nums">{i + 1}</span>
                  <span>{s.short}</span>
                </button>
              )
            })}
          </div>

          <div key={active} id="passo-painel" role="tabpanel" aria-labelledby={`passo-${active}`} className="fade-in mt-6 flex-1">
            <p className="text-footnote font-medium text-success">
              Passo {active + 1} de {STEPS.length} · {step.subtitle}
            </p>
            <h3 className="mt-1 text-title-2 font-bold">{step.title}</h3>
            <p className="mt-2 text-body text-muted">{step.description}</p>
            <dl className="mt-4 divide-y divide-border rounded-control bg-background">
              {step.facts.map(([k, v, tone]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-subhead text-muted">{k}</dt>
                  <dd className={`text-right text-subhead font-semibold ${TONE[tone] || ''}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActive(active - 1)}
              disabled={active === 0}
              className="pressable flex h-11 items-center gap-2 rounded-control border border-border px-4 text-footnote font-medium disabled:pointer-events-none disabled:opacity-40 md:h-10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Anterior
            </button>
            {active < last ? (
              <button
                type="button"
                onClick={() => setActive(active + 1)}
                className="pressable flex h-11 items-center gap-2 rounded-control bg-foreground px-4 text-footnote font-semibold text-background md:h-10"
              >
                Próximo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <a
                href="#cenarios"
                className="pressable flex h-11 items-center gap-2 rounded-control bg-foreground px-4 text-footnote font-semibold text-background md:h-10"
              >
                Ver os cenários
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Desenho do caminho do preço em cada cenário. Só a forma: queda até o alvo,
// ou volta contra a posição antes de cair.
const SCENARIOS = [
  {
    result: '+100 pts',
    title: 'Cenário A',
    subtitle: 'Alaska direto: o mercado cai até o alvo',
    path: [[4, 8], [34, 30], [44, 26], [70, 44], [80, 40], [116, 58]],
    marks: [{ at: 2, tone: 'var(--foreground)' }, { at: 5, tone: 'var(--success-fill)' }],
    rows: [
      ['Entrada', '200 pts abaixo da abertura'],
      ['Alvo', '100 pts de lucro', 'pos'],
      ['Square', 'não entra'],
    ],
  },
  {
    result: '+120 pts',
    title: 'Cenário B',
    subtitle: 'Com Square: o preço volta antes de cair',
    path: [[4, 22], [26, 44], [34, 40], [58, 12], [70, 18], [116, 50]],
    marks: [{ at: 2, tone: 'var(--foreground)' }, { at: 3, tone: 'var(--warning-fill)' }, { at: 5, tone: 'var(--success-fill)' }],
    rows: [
      ['Alaska', '200 pts abaixo da abertura'],
      ['Recuo', '150 pts contra', 'warn'],
      ['Square', '3 vezes o lote'],
      ['Alvo', '120 pts de lucro', 'pos'],
    ],
  },
]

function PathSketch({ path, marks }) {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-[120px] shrink-0" aria-hidden>
      <polyline
        points={path.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {marks.map((m) => (
        <circle key={m.at} cx={path[m.at][0]} cy={path[m.at][1]} r={4.5} fill={m.tone} stroke="var(--card)" strokeWidth={2} />
      ))}
    </svg>
  )
}

function Scenarios() {
  return (
    <section id="cenarios" aria-labelledby="cenarios-titulo" className="scroll-mt-24">
      <h2 id="cenarios-titulo" className="text-title-1 font-bold">Cenários de resultado</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
        {SCENARIOS.map((s) => (
          <article key={s.title} className="panel p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-title-1 font-bold tabular-nums text-success">{s.result}</p>
                <h3 className="mt-1 text-headline font-semibold">{s.title}</h3>
                <p className="text-footnote text-muted">{s.subtitle}</p>
              </div>
              <PathSketch path={s.path} marks={s.marks} />
            </div>
            <dl className="mt-4 divide-y divide-border border-t border-border">
              {s.rows.map(([k, v, tone]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-subhead text-muted">{k}</dt>
                  <dd className={`text-right text-subhead font-medium ${TONE[tone] || ''}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── DEPOIMENTOS ─── */

const TESTIMONIALS = [
  { name: 'Rafael M.', role: 'Day trader', text: 'Entrei na comunidade sem acreditar muito, mas já no primeiro mês vi a consistência do setup. A taxa de acerto é real.' },
  { name: 'Lucas S.', role: 'Operador de mini índice', text: 'O Square é genial. Quando o Alaska não vai, o plano B salva a operação. Nunca vi um gerenciamento de risco tão bem pensado.' },
  { name: 'Ana P.', role: 'Trader iniciante', text: 'Comecei do zero e em 3 meses já estava operando com confiança. O passo a passo é claro e o Fabrício explica tudo no grupo.' },
  { name: 'Marcos T.', role: 'Investidor', text: 'Opero há 8 anos e nunca achei algo tão objetivo. Sem enrolação, sem indicador mágico. É setup, entrada e saída.' },
  { name: 'Fernanda R.', role: 'Swing trader', text: 'A comunidade é muito ativa. O Fabrício avisa antes das operações e faz questão de explicar cada decisão.' },
  { name: 'Diego C.', role: 'Day trader', text: 'Saí de um curso de R$ 5.000 que não me ensinou nada e achei a Alaska & Square de graça. Irônico, mas funciona de verdade.' },
]

function Testimonials() {
  return (
    <section aria-labelledby="membros">
      <h2 id="membros" className="text-title-1 font-bold">O que dizem os membros</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="panel flex flex-col justify-between gap-4 p-5">
            <blockquote className="text-subhead">“{t.text}”</blockquote>
            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden
                className="tint-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-footnote font-semibold text-success"
              >
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-footnote font-semibold">{t.name}</span>
                <span className="block text-footnote text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ─── CHAMADA ─── */

function CallToAction() {
  return (
    <section className="tint-brand rounded-panel px-5 py-10 text-center md:px-10 md:py-14">
      <h2 className="text-title-1 font-bold">Quer operar com a gente?</h2>
      <p className="mx-auto mt-2 max-w-md text-body text-muted">
        No canal gratuito do Fabrício no WhatsApp saem análises e setups de mini índice.
      </p>
      <a
        href={COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pressable mt-6 inline-flex h-12 items-center gap-2 rounded-control bg-brand px-6 text-callout font-semibold text-brand-foreground"
      >
        <Users className="h-5 w-5" aria-hidden />
        Entrar na comunidade
      </a>
      <p className="mt-3 text-footnote text-muted">Gratuito. Você preenche uma ficha e o WhatsApp abre no canal.</p>
    </section>
  )
}

/* ─── PÁGINA ─── */

export default function StrategyPage() {
  return (
    <main className="fade-in mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-6 md:gap-24 md:px-8 md:pt-10">
      <CreatorHero />
      <StrategyIntro />
      <HowItWorks />
      <Scenarios />
      <Testimonials />
      <CallToAction />
    </main>
  )
}
