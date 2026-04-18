import { Trophy, TrendingDown, Shield, Target, AlertTriangle, Zap, ArrowDown, ArrowRight } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'

function FlowStep({ number, icon: Icon, color, title, description, details }) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 md:p-7 hover:border-white/[0.08] transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div className="flex items-start gap-4 md:gap-5">
          <div className="relative shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
              <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#060608] border-2 flex items-center justify-center" style={{ borderColor: `${color}40` }}>
              <span className="text-[10px] font-black" style={{ color }}>{number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base md:text-lg mb-1.5">{title}</h3>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4">{description}</p>

            {details && (
              <div className="flex flex-wrap gap-2">
                {details.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] font-semibold" style={{ backgroundColor: `${d.color || color}10`, color: d.color || color }}>
                    <Zap className="w-2.5 h-2.5" />
                    {d.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScenarioCard({ title, subtitle, result, resultColor, items }) {
  return (
    <div className="flex-1 min-w-[260px] relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 md:p-6 hover:border-white/[0.08] transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at top right, ${resultColor}08, transparent)` }} />

      <div className="mb-4">
        <h4 className="text-white font-bold text-sm md:text-base">{title}</h4>
        <p className="text-white/25 text-[10px] md:text-xs mt-0.5">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-xl px-3 py-2.5">
            <span className="text-white/40 text-[11px] md:text-xs">{item.label}</span>
            <span className="text-white/70 text-[11px] md:text-xs font-semibold">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/[0.04]">
        <div className="flex items-center justify-between">
          <span className="text-white/30 text-[11px] md:text-xs font-medium">Resultado</span>
          <span className="text-lg md:text-xl font-black" style={{ color: resultColor }}>{result}</span>
        </div>
      </div>
    </div>
  )
}

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8 md:py-16">

        {/* Hero */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00ff87]/[0.08] border border-[#00ff87]/15 px-4 py-2 rounded-full mb-5 md:mb-6">
            <Trophy className="w-3.5 h-3.5 text-[#00ff87]" />
            <span className="text-[#00ff87] text-[11px] md:text-xs font-bold">89% de acerto desde 2018</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3 md:mb-4">
            Estrategia <span className="text-[#00ff87]">Alaska</span> & <span className="text-[#3b82f6]">Square</span>
          </h1>
          <p className="text-white/30 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Operacoes de venda a descoberto em mini indice Ibovespa no grafico de 60 minutos, com gerenciamento de risco inteligente.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6 md:mt-8">
            <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 rounded-xl">
              <span className="text-white/20 text-[9px] uppercase tracking-wider block">Ativo</span>
              <span className="text-white font-bold text-sm">Mini Indice</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 rounded-xl">
              <span className="text-white/20 text-[9px] uppercase tracking-wider block">Timeframe</span>
              <span className="text-white font-bold text-sm">60 minutos</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 rounded-xl">
              <span className="text-white/20 text-[9px] uppercase tracking-wider block">Tipo</span>
              <span className="text-white font-bold text-sm">Venda a Descoberto</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 rounded-xl">
              <span className="text-white/20 text-[9px] uppercase tracking-wider block">Operando desde</span>
              <span className="text-white font-bold text-sm">2018</span>
            </div>
          </div>
        </div>

        {/* Diagrama Visual */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 md:p-8 mb-6 md:mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.01] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-white/30 text-[10px] md:text-xs font-semibold uppercase tracking-wider">Grafico interativo — passe o mouse sobre as zonas</span>
          </div>
          <CandlestickDiagram />
        </div>

        {/* Fluxo passo a passo */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-5 md:mb-8 text-center">Passo a passo</h2>

          <div className="flex flex-col gap-3 md:gap-4">
            <FlowStep
              number={1}
              icon={Target}
              color="#00ff87"
              title="Identifique o sinal"
              description="No grafico de 60 minutos, observe se a vela atual fechou positiva (verde). Esse fechamento habilita a operacao na vela seguinte."
              details={[
                { text: 'Vela verde = Sinal ativo' },
                { text: 'Vela vermelha = Sem operacao', color: '#ff4757' },
              ]}
            />

            <div className="flex justify-center py-1">
              <ArrowDown className="w-4 h-4 text-white/10" />
            </div>

            <FlowStep
              number={2}
              icon={TrendingDown}
              color="#ffa502"
              title="Aguarde o gatilho"
              description="Na vela seguinte, espere o preco cair 200 pontos a partir da abertura. Quando atingir, inicie a venda a descoberto. O fundamento e capturar a reversao de tendencia no timeframe menor."
              details={[
                { text: 'Gatilho: -200 pontos da abertura' },
              ]}
            />

            <div className="flex justify-center py-1">
              <ArrowDown className="w-4 h-4 text-white/10" />
            </div>

            <FlowStep
              number={3}
              icon={Target}
              color="#00ff87"
              title="Alvo do Alaska"
              description="Com a venda a descoberto aberta, o alvo e de 100 pontos de lucro. Se o mercado continuar caindo, voce realiza o ganho rapidamente."
              details={[
                { text: 'Alvo: +100 pontos' },
                { text: 'Stop: 400 pontos', color: '#ff4757' },
              ]}
            />

            <div className="flex justify-center py-1">
              <ArrowDown className="w-4 h-4 text-white/10" />
            </div>

            <FlowStep
              number={4}
              icon={Shield}
              color="#3b82f6"
              title="Square — O plano B"
              description="Se o preco recuar 150 pontos contra a posicao sem atingir o alvo, entra o SQUARE: uma nova entrada com 3x o lote do Alaska. O stop do Square e o mesmo do Alaska, protegendo 100% da posicao."
              details={[
                { text: 'Entrada: +150 pts contra' },
                { text: 'Lote: 3x o Alaska' },
                { text: 'Alvo: +120 pontos' },
              ]}
            />
          </div>
        </div>

        {/* Cenarios de resultado */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-5 md:mb-8 text-center">Cenarios de resultado</h2>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <ScenarioCard
              title="Cenario A"
              subtitle="Alaska direto — mercado a favor"
              result="+100 pts"
              resultColor="#00ff87"
              items={[
                { label: 'Entrada', value: '-200 pts da abertura' },
                { label: 'Direcao', value: 'Mercado continuou caindo' },
                { label: 'Alvo atingido', value: '100 pontos de lucro' },
                { label: 'Square acionado?', value: 'Nao' },
              ]}
            />

            <div className="flex items-center justify-center py-2 md:py-0">
              <span className="text-white/10 text-xs font-semibold">OU</span>
            </div>

            <ScenarioCard
              title="Cenario B"
              subtitle="Com Square — preco medio inteligente"
              result="+120 pts"
              resultColor="#3b82f6"
              items={[
                { label: 'Alaska entrou em', value: '-200 pts da abertura' },
                { label: 'Mercado recuou', value: '+150 pts contra' },
                { label: 'Square acionado', value: '3x lote do Alaska' },
                { label: 'Alvo do Square', value: '120 pontos de lucro' },
              ]}
            />
          </div>
        </div>

        {/* Regra de invalidacao */}
        <div className="mb-10 md:mb-16">
          <div className="relative overflow-hidden bg-[#ff4757]/[0.04] border border-[#ff4757]/10 rounded-2xl p-5 md:p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff4757] to-transparent opacity-30" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#ff4757]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-[#ff4757]" />
              </div>
              <div>
                <h3 className="text-[#ff4757] font-bold text-sm md:text-base mb-2">Regra de invalidacao</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                  Se a vela anterior fechar <span className="text-[#ff4757] font-bold">negativa (vermelha)</span>, nao existe operacao na vela seguinte. O setup so e habilitado quando a vela anterior fecha <span className="text-[#00ff87] font-bold">positiva (verde)</span>. Essa regra e fundamental para manter a alta taxa de acerto da estrategia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo final */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 md:p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.02] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#00ff87]/10 flex items-center justify-center mx-auto mb-5">
              <Trophy className="w-7 h-7 md:w-9 md:h-9 text-[#00ff87]" />
            </div>
            <h3 className="text-white font-black text-xl md:text-2xl mb-2">89% de acerto</h3>
            <p className="text-white/25 text-xs md:text-sm mb-6">Desde 2018, operando mini indice Ibovespa</p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div>
                <span className="text-[#00ff87] text-2xl md:text-3xl font-black block">100</span>
                <span className="text-white/20 text-[10px] md:text-xs uppercase tracking-wider">pts alvo Alaska</span>
              </div>
              <div>
                <span className="text-[#3b82f6] text-2xl md:text-3xl font-black block">120</span>
                <span className="text-white/20 text-[10px] md:text-xs uppercase tracking-wider">pts alvo Square</span>
              </div>
              <div>
                <span className="text-[#ff4757] text-2xl md:text-3xl font-black block">400</span>
                <span className="text-white/20 text-[10px] md:text-xs uppercase tracking-wider">pts stop loss</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <p className="text-white/10 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em]">
            ALASKA SQUARE &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}
