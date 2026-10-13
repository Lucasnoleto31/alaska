// Peças comuns dos gráficos (bloco 5 do kit). O Recharts inspeciona os filhos
// diretos do gráfico: aqui saem props prontas, não componentes que embrulham
// grade ou eixo.

export const gridProps = {
  stroke: 'var(--chart-grid)',
  strokeDasharray: '2 4',
  vertical: false,
}

export const axisTick = {
  fill: 'var(--muted-foreground)',
  fontSize: 11,
  fontFamily: 'Poppins, system-ui, sans-serif',
}

export const axisProps = {
  axisLine: false,
  tickLine: false,
  tick: axisTick,
}

export const tooltipCursor = { fill: 'var(--chart-track)' }

// Gradiente vertical da barra: da ponta que recebe luz (opacidade .95) até a
// outra (.32), escalado pela intensidade da faixa (bom .95, ruim .45). Na barra
// negativa a ponta de luz fica embaixo.
export function barGradient(id, intensity, flip = false) {
  const top = intensity
  const bottom = intensity * (0.32 / 0.95)
  return (
    <linearGradient key={id} id={id} x1="0" y1={flip ? '1' : '0'} x2="0" y2={flip ? '0' : '1'}>
      <stop offset="0%" stopColor="var(--foreground)" stopOpacity={top} />
      <stop offset="100%" stopColor="var(--foreground)" stopOpacity={bottom} />
    </linearGradient>
  )
}

export function signClass(value) {
  if (value > 0) return 'text-success'
  if (value < 0) return 'text-destructive'
  return 'text-foreground'
}
