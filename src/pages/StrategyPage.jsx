import { useState } from 'react'
import { Trophy, TrendingDown, Shield, Target, AlertTriangle, Zap, ArrowDown, ArrowRight, Users, Calculator } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'

function FlowStep({ number, icon: Icon, color, title, description, details }) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 md:p-7 hover:border-white/[0.08] transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div className="flex items-start gap-3 md:gap-5">
          <div className="relative shrink-0">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
              <Icon className="w-4 h-4 md:w-6 md:h-6" style={{ color }} />
            </div>
            <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#060608] border-2 flex items-center justify-center" style={{ borderColor: `${color}40` }}>
              <span className="text-[8px] md:text-[10px] font-black" style={{ color }}>{number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-1.5">{title}</h3>
            <p className="text-white/40 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-4">{description}</p>

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
    <div className="flex-1 min-w-0 relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 md:p-6 hover:border-white/[0.08] transition-all duration-300 group">
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

function Simulator() {
  const [lote, setLote] = useState(1)
  const pointValue = 0.2 // valor do ponto por mini contrato

  const alaskaGain = lote * 100 * pointValue
  const squareGain = (lote * 120 * pointValue) + (lote * 3 * 120 * pointValue) // Alaska + Square juntos na média
  const squareGainSimple = lote * 3 * 120 * pointValue // só o Square
  const stopLoss = lote * 400 * pointValue

  return (
    <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 md:p-8 mb-10 md:mb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.02] to-[#3b82f6]/[0.01] pointer-events-none" />

      <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-8 relative">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
          <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
        </div>
        <div>
          <span className="text-white font-semibold text-sm">Simulador de Ganhos</span>
          <p className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-wider">Veja quanto você pode ganhar por operação</p>
        </div>
      </div>

      {/* Input de lote */}
      <div className="relative mb-6 md:mb-8">
        <label className="text-white/30 text-[10px] md:text-xs font-semibold uppercase tracking-wider block mb-2 md:mb-3">
          Quantidade de mini contratos
        </label>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setLote(Math.max(1, lote - 1))}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/10 transition-all text-lg font-bold cursor-pointer"
          >
            -
          </button>
          <div className="flex-1 relative">
            <input
              type="number"
              min="1"
              max="100"
              value={lote}
              onChange={(e) => setLote(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-full bg-white/[0.03] border border-white/[0.06] text-white text-center text-xl md:text-2xl font-black rounded-xl py-3 focus:outline-none focus:border-[#00ff87]/40 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/15 text-xs font-medium">contratos</span>
          </div>
          <button
            onClick={() => setLote(Math.min(100, lote + 1))}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/10 transition-all text-lg font-bold cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {[1, 5, 10, 20].map((v) => (
            <button
              key={v}
              onClick={() => setLote(v)}
              className={`px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] font-semibold transition-all cursor-pointer ${
                lote === v
                  ? 'bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20'
                  : 'bg-white/[0.03] text-white/30 border border-white/[0.06] hover:text-white/50'
              }`}
            >
              {v} {v === 1 ? 'contrato' : 'contratos'}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative">
        <div className="bg-[#00ff87]/[0.04] border border-[#00ff87]/10 rounded-2xl p-4 md:p-5 text-center">
          <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold block mb-2">Alaska Direto</span>
          <span className="text-[#00ff87] text-2xl md:text-3xl font-black block">
            R$ {alaskaGain.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-white/15 text-[9px] md:text-[10px] mt-1 block">{lote} x 100 pts x R$ {pointValue.toFixed(2)}</span>
        </div>

        <div className="bg-[#3b82f6]/[0.04] border border-[#3b82f6]/10 rounded-2xl p-4 md:p-5 text-center">
          <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold block mb-2">Com Square (3x)</span>
          <span className="text-[#3b82f6] text-2xl md:text-3xl font-black block">
            R$ {squareGainSimple.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-white/15 text-[9px] md:text-[10px] mt-1 block">{lote * 3} x 120 pts x R$ {pointValue.toFixed(2)}</span>
        </div>

        <div className="bg-[#ff4757]/[0.04] border border-[#ff4757]/10 rounded-2xl p-4 md:p-5 text-center">
          <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold block mb-2">Stop Loss</span>
          <span className="text-[#ff4757] text-2xl md:text-3xl font-black block">
            -R$ {stopLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-white/15 text-[9px] md:text-[10px] mt-1 block">{lote} x 400 pts x R$ {pointValue.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-white/10 text-[9px] md:text-[10px] text-center mt-4 relative">
        * Valores aproximados por operação. Cada ponto do mini índice vale R$ 0,20 por contrato.
      </p>
    </div>
  )
}

export default function StrategyPage() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8 md:py-16">

        {/* Hero */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00ff87]/[0.08] border border-[#00ff87]/15 px-4 py-2 rounded-full mb-5 md:mb-6">
            <Trophy className="w-3.5 h-3.5 text-[#00ff87]" />
            <span className="text-[#00ff87] text-[11px] md:text-xs font-bold">89% de acerto desde 2018</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight mb-3 md:mb-4">
            Estratégia <span className="text-[#00ff87]">Alaska</span> & <span className="text-[#3b82f6]">Square</span>
          </h1>
          <p className="text-white/30 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Operações de venda a descoberto em mini índice Ibovespa no gráfico de 60 minutos, com gerenciamento de risco inteligente.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-3 mt-5 md:mt-8">
            <div className="bg-white/[0.03] border border-white/[0.06] px-3 py-2 md:px-4 md:py-2.5 rounded-xl">
              <span className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-wider block">Ativo</span>
              <span className="text-white font-bold text-xs md:text-sm">Mini Índice</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-3 py-2 md:px-4 md:py-2.5 rounded-xl">
              <span className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-wider block">Timeframe</span>
              <span className="text-white font-bold text-xs md:text-sm">60 minutos</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-3 py-2 md:px-4 md:py-2.5 rounded-xl">
              <span className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-wider block">Tipo</span>
              <span className="text-white font-bold text-xs md:text-sm">Venda a Descoberto</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-3 py-2 md:px-4 md:py-2.5 rounded-xl">
              <span className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-wider block">Operando desde</span>
              <span className="text-white font-bold text-xs md:text-sm">2018</span>
            </div>
          </div>
        </div>

        {/* Diagrama Visual */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 md:p-8 mb-6 md:mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.01] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-white/30 text-[10px] md:text-xs font-semibold uppercase tracking-wider">Gráfico interativo — toque ou passe o mouse sobre as zonas</span>
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
              description="No gráfico de 60 minutos, observe se a vela atual fechou positiva (verde). Esse fechamento habilita a operação na vela seguinte."
              details={[
                { text: 'Vela verde = Sinal ativo' },
                { text: 'Vela vermelha = Sem operação', color: '#ff4757' },
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
              description="Na vela seguinte, espere o preço cair 200 pontos a partir da abertura. Quando atingir, inicie a venda a descoberto. O fundamento é capturar a reversão de tendência no timeframe menor."
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
              description="Com a venda a descoberto aberta, o alvo é de 100 pontos de lucro. Se o mercado continuar caindo, você realiza o ganho rapidamente."
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
              description="Se o preço recuar 150 pontos contra a posição sem atingir o alvo, entra o SQUARE: uma nova entrada com 3x o lote do Alaska. O stop do Square é o mesmo do Alaska, protegendo 100% da posição."
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
          <h2 className="text-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-5 md:mb-8 text-center">Cenários de resultado</h2>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <ScenarioCard
              title="Cenário A"
              subtitle="Alaska direto — mercado a favor"
              result="+100 pts"
              resultColor="#00ff87"
              items={[
                { label: 'Entrada', value: '-200 pts da abertura' },
                { label: 'Direção', value: 'Mercado continuou caindo' },
                { label: 'Alvo atingido', value: '100 pontos de lucro' },
                { label: 'Square acionado?', value: 'Não' },
              ]}
            />

            <div className="flex items-center justify-center py-2 md:py-0">
              <span className="text-white/10 text-xs font-semibold">OU</span>
            </div>

            <ScenarioCard
              title="Cenário B"
              subtitle="Com Square — preço médio inteligente"
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
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#ff4757]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 md:w-6 md:h-6 text-[#ff4757]" />
              </div>
              <div>
                <h3 className="text-[#ff4757] font-bold text-sm md:text-base mb-2">Regra de invalidação</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                  Se a vela anterior fechar <span className="text-[#ff4757] font-bold">negativa (vermelha)</span>, não existe operação na vela seguinte. O setup só é habilitado quando a vela anterior fecha <span className="text-[#00ff87] font-bold">positiva (verde)</span>. Essa regra é fundamental para manter a alta taxa de acerto da estratégia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulador de Ganhos */}
        <Simulator />

        {/* Resumo final */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 md:p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.02] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[#00ff87]/10 flex items-center justify-center mx-auto mb-4 md:mb-5">
              <Trophy className="w-6 h-6 md:w-9 md:h-9 text-[#00ff87]" />
            </div>
            <h3 className="text-white font-black text-lg md:text-2xl mb-1.5 md:mb-2">89% de acerto</h3>
            <p className="text-white/25 text-[11px] md:text-sm mb-5 md:mb-6">Desde 2018, operando mini índice Ibovespa</p>

            <div className="flex flex-wrap justify-center gap-5 md:gap-10">
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

        {/* CTA Final */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#00ff87]/[0.06] to-[#00ff87]/[0.02] border border-[#00ff87]/15 rounded-2xl p-6 md:p-10 text-center mt-6 md:mt-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDI1NSwxMzUsMC4wMykiLz48L3N2Zz4=')] pointer-events-none" />
          <div className="relative">
            <h3 className="text-white font-black text-lg md:text-2xl mb-2 md:mb-3">
              Quer operar com a gente?
            </h3>
            <p className="text-white/30 text-xs md:text-sm max-w-md mx-auto mb-5 md:mb-8 leading-relaxed">
              Entre na nossa comunidade e acompanhe as operações do Alaska & Square em tempo real. Tire dúvidas, compartilhe resultados e evolua junto.
            </p>
            <a
              href={communityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 bg-[#00ff87] text-black font-bold text-sm md:text-base px-8 py-3.5 md:px-12 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,135,0.35)] hover:scale-[1.03] active:scale-95"
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              Entrar na Comunidade
            </a>
            <p className="text-white/10 text-[9px] md:text-[10px] mt-4 md:mt-5 uppercase tracking-wider">
              Acesso gratuito via WhatsApp
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
