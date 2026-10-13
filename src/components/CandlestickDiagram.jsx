// Diagrama da operação. O passo ativo (0 a 3) acende os elementos dele, e o
// caminho do preço avança junto: queda até a venda, depois o alvo (passo 3)
// ou a volta contra a posição até o Square (passo 4).
//
// Escala: 0,5px por ponto. Abertura da vela de entrada em y = 120.
//   stop     abertura + 200 (entrada + 400)   y = 20
//   square   abertura − 50  (entrada + 150)   y = 145
//   venda    abertura − 200                   y = 220
//   alvo     abertura − 300 (entrada − 100)   y = 270

const LEVELS = {
  stop: 20,
  open: 120,
  square: 145,
  entry: 220,
  target: 270,
}

const LINE_FROM = 172
const LINE_TO = 262
const LABEL_X = 270
const DIM = 0.3

// Em quais passos cada elemento acende
const ON = {
  prev: [0],
  entryCandle: [1],
  open: [1],
  entry: [1, 2, 3],
  target: [2],
  stop: [2, 3],
  square: [3],
}

// Caminho do preço dentro da vela de entrada
const PATH_TO_ENTRY = '172,120 182,150 188,140 200,220'
const PATH_TO_TARGET = '200,220 213,236 220,229 240,270'
const PATH_TO_SQUARE = '200,220 211,192 218,201 232,145'

function Level({ y, word, value, color, textColor, dashed, lit }) {
  return (
    <g className="transition-opacity duration-200" opacity={lit ? 1 : DIM}>
      <line
        x1={LINE_FROM}
        x2={LINE_TO}
        y1={y}
        y2={y}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <text x={LABEL_X} y={y + 5} fontSize={15}>
        <tspan fill={textColor} fontWeight={600}>{word}</tspan>
        {value && <tspan fill="var(--muted-foreground)"> {value}</tspan>}
      </text>
    </g>
  )
}

function Path({ points, color, visible }) {
  const last = points.split(' ').pop().split(',')
  return (
    <g className="transition-opacity duration-200" opacity={visible ? 1 : 0}>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2.25} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={5} fill={color} stroke="var(--card)" strokeWidth={2} />
    </g>
  )
}

export default function CandlestickDiagram({ step }) {
  const lit = (key) => ON[key].includes(step)

  return (
    <figure className="mx-auto w-full max-w-[400px]">
      <svg
        viewBox="0 0 380 330"
        className="h-auto w-full"
        role="img"
        aria-label="Vela anterior positiva, vela de entrada com venda 200 pontos abaixo da abertura, alvo de 100 pontos, Square 150 pontos contra e stop de 400 pontos"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {/* Faixa do alvo: da venda ao alvo */}
        <rect
          x={LINE_FROM}
          y={LEVELS.entry}
          width={LINE_TO - LINE_FROM}
          height={LEVELS.target - LEVELS.entry}
          fill="var(--success-fill)"
          className="transition-opacity duration-200"
          opacity={lit('target') ? 0.14 : 0}
        />
        {/* Faixa de risco: da venda ao stop */}
        <rect
          x={LINE_FROM}
          y={LEVELS.stop}
          width={LINE_TO - LINE_FROM}
          height={LEVELS.entry - LEVELS.stop}
          fill="var(--destructive-fill)"
          className="transition-opacity duration-200"
          opacity={lit('stop') ? 0.06 : 0}
        />

        {/* Vela anterior: positiva */}
        <g className="transition-opacity duration-200" opacity={lit('prev') ? 1 : DIM}>
          <line x1={56} x2={56} y1={112} y2={246} stroke="var(--success-fill)" strokeWidth={1.5} />
          <rect x={39} y={128} width={34} height={102} rx={3} fill="var(--success-fill)" />
        </g>
        <text
          x={56}
          y={98}
          fontSize={13}
          fontWeight={600}
          fill="var(--success)"
          textAnchor="middle"
          className="transition-opacity duration-200"
          opacity={lit('prev') ? 1 : 0}
        >
          Fechou positiva
        </text>

        {/* Vela de entrada: negativa */}
        <g className="transition-opacity duration-200" opacity={lit('entryCandle') ? 1 : DIM}>
          <line x1={150} x2={150} y1={104} y2={286} stroke="var(--destructive-fill)" strokeWidth={1.5} />
          <rect x={133} y={120} width={34} height={142} rx={3} fill="var(--destructive-fill)" />
        </g>

        {/* Distância da abertura até a venda */}
        <g className="transition-opacity duration-200" opacity={lit('open') ? 1 : 0}>
          <line x1={110} x2={110} y1={LEVELS.open} y2={LEVELS.entry} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={105} x2={115} y1={LEVELS.open} y2={LEVELS.open} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={105} x2={115} y1={LEVELS.entry} y2={LEVELS.entry} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={100} y={LEVELS.open + 55} fontSize={13} fill="var(--muted-foreground)" textAnchor="end">200</text>
        </g>

        <Level y={LEVELS.stop} word="Stop" value="400" color="var(--destructive-fill)" textColor="var(--destructive)" dashed lit={lit('stop')} />
        <Level y={LEVELS.open} word="Abertura" color="var(--muted-foreground)" textColor="var(--muted-foreground)" dashed lit={lit('open')} />
        <Level y={LEVELS.square} word="Square" value="150" color="var(--warning-fill)" textColor="var(--warning)" dashed lit={lit('square')} />
        <Level y={LEVELS.entry} word="Venda" value="200" color="var(--foreground)" textColor="var(--foreground)" lit={lit('entry')} />
        <Level y={LEVELS.target} word="Alvo" value="100" color="var(--success-fill)" textColor="var(--success)" dashed lit={lit('target')} />

        <Path points={PATH_TO_ENTRY} color="var(--foreground)" visible={step >= 1} />
        <Path points={PATH_TO_TARGET} color="var(--success-fill)" visible={step === 2} />
        <Path points={PATH_TO_SQUARE} color="var(--warning-fill)" visible={step === 3} />

        <text x={56} y={318} fontSize={13} fill="var(--muted-foreground)" textAnchor="middle">Anterior</text>
        <text x={150} y={318} fontSize={13} fill="var(--muted-foreground)" textAnchor="middle">Entrada</text>
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 whitespace-nowrap text-caption text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-2 rounded-[2px] bg-success-fill" aria-hidden />
          Vela positiva
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-2 rounded-[2px] bg-destructive-fill" aria-hidden />
          Vela negativa
        </span>
        <span>Valores em pontos</span>
      </figcaption>
    </figure>
  )
}
