// Diagrama da operação. Sem cor: vela positiva cheia na tinta, negativa vazada.
// O passo ativo acende os elementos dele; o resto fica apagado.
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

// Em quais passos (0 a 3) cada elemento acende
const ON = {
  prev: [0],
  entryCandle: [1],
  open: [1],
  entry: [1, 2, 3],
  target: [2],
  stop: [2, 3],
  square: [3],
}

function Level({ y, word, value, dashed, lit }) {
  return (
    <g className="transition-opacity duration-200" opacity={lit ? 1 : 0.28}>
      <line
        x1={LINE_FROM}
        x2={LINE_TO}
        y1={y}
        y2={y}
        stroke="var(--foreground)"
        strokeWidth={1.5}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <text x={LABEL_X} y={y + 5} fontSize={15}>
        <tspan fill="var(--foreground)" fontWeight={600}>{word}</tspan>
        {value && <tspan fill="var(--muted-foreground)"> {value}</tspan>}
      </text>
    </g>
  )
}

export default function CandlestickDiagram({ step }) {
  const lit = (key) => ON[key].includes(step)

  return (
    <figure className="mx-auto w-full max-w-[380px]">
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
          fill="var(--foreground)"
          className="transition-opacity duration-200"
          opacity={lit('target') ? 0.08 : 0}
        />

        {/* Vela anterior: positiva, cheia */}
        <g className="transition-opacity duration-200" opacity={lit('prev') ? 1 : 0.28}>
          <line x1={56} x2={56} y1={112} y2={246} stroke="var(--foreground)" strokeWidth={1.5} />
          <rect x={39} y={128} width={34} height={102} rx={3} fill="var(--foreground)" />
        </g>

        {/* Vela de entrada: negativa, vazada */}
        <g className="transition-opacity duration-200" opacity={lit('entryCandle') ? 1 : 0.28}>
          <line x1={150} x2={150} y1={104} y2={120} stroke="var(--foreground)" strokeWidth={1.5} />
          <line x1={150} x2={150} y1={262} y2={286} stroke="var(--foreground)" strokeWidth={1.5} />
          <rect x={133.75} y={120.75} width={32.5} height={140.5} rx={3} fill="var(--card)" stroke="var(--foreground)" strokeWidth={1.5} />
        </g>

        {/* Distância da abertura até a venda */}
        <g className="transition-opacity duration-200" opacity={lit('open') ? 1 : 0}>
          <line x1={110} x2={110} y1={LEVELS.open} y2={LEVELS.entry} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={105} x2={115} y1={LEVELS.open} y2={LEVELS.open} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={105} x2={115} y1={LEVELS.entry} y2={LEVELS.entry} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={100} y={LEVELS.open + 55} fontSize={13} fill="var(--muted-foreground)" textAnchor="end">200</text>
        </g>

        <Level y={LEVELS.stop} word="Stop" value="400" dashed lit={lit('stop')} />
        <Level y={LEVELS.open} word="Abertura" dashed lit={lit('open')} />
        <Level y={LEVELS.square} word="Square" value="150" dashed lit={lit('square')} />
        <Level y={LEVELS.entry} word="Venda" value="200" lit={lit('entry')} />
        <Level y={LEVELS.target} word="Alvo" value="100" dashed lit={lit('target')} />

        <text x={56} y={318} fontSize={13} fill="var(--muted-foreground)" textAnchor="middle">Anterior</text>
        <text x={150} y={318} fontSize={13} fill="var(--muted-foreground)" textAnchor="middle">Entrada</text>
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 whitespace-nowrap text-caption text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-2 rounded-[2px] bg-foreground" aria-hidden />
          Vela positiva
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-2 rounded-[2px] border border-foreground" aria-hidden />
          Vela negativa
        </span>
        <span>Valores em pontos</span>
      </figcaption>
    </figure>
  )
}
