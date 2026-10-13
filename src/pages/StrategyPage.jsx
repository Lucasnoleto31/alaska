import { useState } from 'react'
import { Users } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'
import { useTrackRecord } from '../hooks/useTrackRecord'
import { int, pct } from '../lib/format'

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
                style={{ height: `${c.h}%`, opacity: isActive ? 1 : 0.4 }}
              >
                <span className="h-2 w-px shrink-0 bg-foreground" />
                <span
                  className={`w-full max-w-7 flex-1 rounded-[3px] ${
                    isBull ? 'bg-foreground' : 'border-[1.5px] border-foreground'
                  }`}
                />
                <span className="h-1.5 w-px shrink-0 bg-foreground" />
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
              i === active ? 'font-semibold text-foreground' : 'text-muted'
            }`}
          >
            {c.year}
          </span>
        ))}
      </div>

      <div key={active} className="panel fade-in mt-4 p-4 md:p-5" aria-live="polite">
        <p className="text-footnote text-muted tabular-nums">{current.year}</p>
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
    { value: pct(record.winRate), label: 'de acerto' },
    { value: '+20', label: 'anos de mercado' },
  ]

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_minmax(0,400px)] md:gap-10 lg:grid-cols-[1fr_440px]">
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-footnote text-muted">Criador da estratégia</p>
        <h2 className="mt-1 text-large-title font-bold">Fabrício Gonçalvez</h2>
        <p className="mt-3 max-w-md text-body text-muted">
          De vendedor de picolé no estádio a criador de uma estratégia com {pct(record.winRate)} de acerto no mini índice.
        </p>

        <dl className="mt-6 flex gap-6 md:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-footnote text-muted">{s.label}</dt>
              <dd className="text-title-2 font-bold tabular-nums">{s.value}</dd>
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

const FACTS = [
  { label: 'Ativo', value: 'Mini índice' },
  { label: 'Tempo gráfico', value: '60 minutos' },
  { label: 'Operação', value: 'Venda a descoberto' },
  { label: 'Desde', value: '2018' },
]

function StrategyIntro() {
  return (
    <section>
      <p className="text-footnote text-muted">A estratégia</p>
      <h1 className="mt-1 text-large-title font-bold">Estratégia Alaska & Square</h1>
      <p className="mt-3 max-w-xl text-body text-muted">
        Venda a descoberto no mini índice Ibovespa, no gráfico de 60 minutos. Se o preço volta contra a
        posição, uma segunda entrada maior melhora o preço médio.
      </p>

      <dl className="panel mt-6 grid grid-cols-2 md:grid-cols-4">
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className={`flex flex-col-reverse gap-0.5 p-4 md:p-5 ${i % 2 === 1 ? 'border-l border-border' : ''} ${
              i >= 2 ? 'border-t border-border md:border-t-0' : ''
            } ${i === 2 ? 'md:border-l' : ''}`}
          >
            <dt className="text-footnote text-muted">{f.label}</dt>
            <dd className="text-headline font-semibold">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

const STEPS = [
  {
    title: 'Sinal',
    subtitle: 'Gráfico de 60 minutos',
    description: 'A vela anterior precisa fechar positiva. Esse fechamento habilita a operação na vela seguinte.',
    facts: [
      ['Vela anterior positiva', 'opera'],
      ['Vela anterior negativa', 'não opera'],
    ],
  },
  {
    title: 'Gatilho',
    subtitle: 'Vela seguinte',
    description: 'Quando o preço cai 200 pontos a partir da abertura, entra a venda a descoberto.',
    facts: [['Entrada', '200 pts abaixo da abertura']],
  },
  {
    title: 'Alvo do Alaska',
    subtitle: 'Operação aberta',
    description: 'Com a venda aberta, o alvo é de 100 pontos de lucro. O stop fica 400 pontos acima da entrada.',
    facts: [
      ['Alvo', '100 pts'],
      ['Stop', '400 pts'],
    ],
  },
  {
    title: 'Square',
    subtitle: 'Segunda entrada',
    description: 'Se o preço sobe 150 pontos contra a posição sem atingir o alvo, entra o Square com 3 vezes o lote. O stop é o mesmo do Alaska.',
    facts: [
      ['Entrada', '150 pts contra'],
      ['Lote', '3 vezes o do Alaska'],
      ['Alvo', '120 pts'],
    ],
  },
]

function HowItWorks() {
  const [active, setActive] = useState(0)

  return (
    <section aria-labelledby="como-funciona">
      <h2 id="como-funciona" className="text-title-1 font-bold">Como funciona</h2>
      <p className="mt-1 text-subhead text-muted">4 passos, do sinal à segunda entrada.</p>

      <div className="mt-6 grid gap-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="panel flex items-center justify-center p-5 md:p-8">
          <CandlestickDiagram step={active} />
        </div>

        <ol className="panel divide-y divide-border">
          {STEPS.map((s, i) => {
            const isActive = i === active
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left md:px-5 md:py-4"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-footnote font-semibold tabular-nums transition-colors duration-200 ${
                      isActive ? 'bg-foreground text-background' : 'border border-border text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-headline font-semibold ${isActive ? '' : 'text-muted'}`}>{s.title}</span>
                    <span className="block text-footnote text-muted">{s.subtitle}</span>
                  </span>
                </button>

                {isActive && (
                  <div className="fade-in px-4 pb-4 pl-[60px] md:px-5 md:pb-5 md:pl-[64px]">
                    <p className="text-subhead text-muted">{s.description}</p>
                    <dl className="mt-3 flex flex-col divide-y divide-border rounded-control bg-background">
                      {s.facts.map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                          <dt className="text-footnote text-muted">{k}</dt>
                          <dd className="text-footnote font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

const SCENARIOS = [
  {
    result: '+100 pts',
    title: 'Cenário A',
    subtitle: 'Alaska direto: o mercado cai até o alvo',
    rows: [
      ['Entrada', '200 pts abaixo da abertura'],
      ['Alvo', '100 pts de lucro'],
      ['Square', 'não entra'],
    ],
  },
  {
    result: '+120 pts',
    title: 'Cenário B',
    subtitle: 'Com Square: o preço volta antes de cair',
    rows: [
      ['Alaska', '200 pts abaixo da abertura'],
      ['Recuo', '150 pts contra'],
      ['Square', '3 vezes o lote'],
      ['Alvo', '120 pts de lucro'],
    ],
  },
]

function Scenarios() {
  return (
    <section aria-labelledby="cenarios">
      <h2 id="cenarios" className="text-title-1 font-bold">Cenários de resultado</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
        {SCENARIOS.map((s) => (
          <article key={s.title} className="panel p-5 md:p-6">
            <p className="text-title-1 font-bold tabular-nums">{s.result}</p>
            <h3 className="mt-1 text-headline font-semibold">{s.title}</h3>
            <p className="text-footnote text-muted">{s.subtitle}</p>
            <dl className="mt-4 divide-y divide-border border-t border-border">
              {s.rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-subhead text-muted">{k}</dt>
                  <dd className="text-subhead font-medium">{v}</dd>
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-footnote font-semibold"
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
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'
  return (
    <section className="rounded-panel bg-foreground px-5 py-10 text-center text-background md:px-10 md:py-14">
      <h2 className="text-title-1 font-bold">Quer operar com a gente?</h2>
      <p className="mx-auto mt-2 max-w-md text-body opacity-75">
        Entre na comunidade e acompanhe as operações em tempo real.
      </p>
      <a
        href={communityLink}
        target="_blank"
        rel="noopener noreferrer"
        className="pressable mt-6 inline-flex h-12 items-center gap-2 rounded-control bg-brand px-6 text-callout font-semibold text-brand-foreground"
      >
        <Users className="h-5 w-5" aria-hidden />
        Entrar na comunidade
      </a>
      <p className="mt-3 text-footnote opacity-75">Acesso gratuito pelo WhatsApp</p>
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
