import { Trophy, TrendingDown, Shield, Target, AlertTriangle, Zap, ArrowDown, Users, User } from 'lucide-react'
import CandlestickDiagram from '../components/CandlestickDiagram'

function FlowStep({ number, icon: Icon, color, title, description, details }) {
  return (
    <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-3.5 md:p-7">
      <div className="absolute top-0 left-0 w-full h-0.5 md:h-1" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />

      <div className="flex items-start gap-3 md:gap-5">
        <div className="relative shrink-0">
          <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
            <Icon className="w-4 h-4 md:w-6 md:h-6" style={{ color }} />
          </div>
          <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#060608] border-2 flex items-center justify-center" style={{ borderColor: `${color}40` }}>
            <span className="text-[7px] md:text-[10px] font-black" style={{ color }}>{number}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-[13px] md:text-lg mb-0.5 md:mb-1.5">{title}</h3>
          <p className="text-white/40 text-[11px] md:text-sm leading-relaxed mb-2.5 md:mb-4">{description}</p>

          {details && (
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {details.map((d, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-[9px] md:text-[11px] font-semibold" style={{ backgroundColor: `${d.color || color}10`, color: d.color || color }}>
                  <Zap className="w-2 h-2 md:w-2.5 md:h-2.5" />
                  {d.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

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

export default function StrategyPage() {
  const communityLink = import.meta.env.VITE_COMMUNITY_LINK || '#'

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-5xl mx-auto px-3 py-6 md:px-8 md:py-16">

        {/* Hero */}
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

        {/* Fluxo passo a passo */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-white/20 text-[9px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3 md:mb-8 text-center">Passo a passo</h2>

          <div className="flex flex-col gap-2 md:gap-4">
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

            <div className="flex justify-center">
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/10" />
            </div>

            <FlowStep
              number={2}
              icon={TrendingDown}
              color="#ffa502"
              title="Aguarde o gatilho"
              description="Na vela seguinte, espere o preço cair 200 pontos a partir da abertura. Quando atingir, inicie a venda a descoberto."
              details={[
                { text: 'Gatilho: -200 pontos da abertura' },
              ]}
            />

            <div className="flex justify-center">
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/10" />
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

            <div className="flex justify-center">
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/10" />
            </div>

            <FlowStep
              number={4}
              icon={Shield}
              color="#3b82f6"
              title="Square — O plano B"
              description="Se o preço recuar 150 pontos contra a posição sem atingir o alvo, entra o SQUARE com 3x o lote. O stop é o mesmo do Alaska."
              details={[
                { text: 'Entrada: +150 pts contra' },
                { text: 'Lote: 3x o Alaska' },
                { text: 'Alvo: +120 pontos' },
              ]}
            />
          </div>
        </div>

        {/* Cenarios de resultado */}
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

        {/* Regra de invalidacao */}
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

        {/* Sobre o Criador */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

          <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-8 relative">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#00ff87]/10 flex items-center justify-center">
              <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ff87]" />
            </div>
            <span className="text-white font-semibold text-sm">Quem criou a estratégia</span>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-8 relative">
            {/* Foto */}
            <div className="flex flex-col items-center md:items-start shrink-0">
              <div className="relative">
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/[0.06]">
                  <img
                    src="/criador.png"
                    alt="Fabrício Gonçalvez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 md:-bottom-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 bg-[#00ff87] rounded-lg md:rounded-xl flex items-center justify-center">
                  <span className="text-black font-black text-[10px] md:text-xs">A</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-sm md:text-lg mt-3 md:mt-4 text-center md:text-left">Fabrício Gonçalvez</h3>
              <p className="text-white/25 text-[9px] md:text-[11px] uppercase tracking-wider text-center md:text-left">Criador do Alaska & Square</p>

              <div className="flex gap-2 mt-2.5 md:mt-3">
                <div className="bg-white/[0.03] border border-white/[0.06] px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg">
                  <span className="text-white/40 text-[8px] md:text-[9px] uppercase tracking-wider block">No mercado desde</span>
                  <span className="text-white font-bold text-[11px] md:text-xs">2006</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg">
                  <span className="text-white/40 text-[8px] md:text-[9px] uppercase tracking-wider block">Formação</span>
                  <span className="text-white font-bold text-[11px] md:text-xs">Ciências Contábeis</span>
                </div>
              </div>
            </div>

            {/* História */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
              <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffa502]" />
                  <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">A origem</span>
                </div>
                <p className="text-white/45 text-[11px] md:text-sm leading-relaxed">
                  A trajetória de Fabrício começou longe das telas e dos gráficos. Antes de se consolidar no trading, sua realidade envolvia trabalhos informais e a busca por independência financeira desde cedo — incluindo períodos em que vendeu picolés em estádios para se sustentar.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                  <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">A descoberta</span>
                </div>
                <p className="text-white/45 text-[11px] md:text-sm leading-relaxed">
                  O interesse pelo mercado surgiu durante a formação em Ciências Contábeis. Foi nesse período que teve o primeiro contato com a bolsa de valores — experiência que mudaria o rumo da sua carreira. A partir daí, passou a conciliar estudos, trabalho e as primeiras operações.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">A evolução</span>
                </div>
                <p className="text-white/45 text-[11px] md:text-sm leading-relaxed">
                  Presente no mercado desde 2006, construiu sua trajetória de forma gradual, passando de investidor autônomo para uma atuação mais ativa após a crise do subprime — momento que marcou uma mudança importante na sua forma de encarar o mercado e que, eventualmente, levou à criação da estratégia Alaska & Square.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo final */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.04] rounded-xl md:rounded-2xl p-5 md:p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/[0.02] to-[#3b82f6]/[0.01] pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-[#00ff87]/10 flex items-center justify-center mx-auto mb-3 md:mb-5">
              <Trophy className="w-5 h-5 md:w-9 md:h-9 text-[#00ff87]" />
            </div>
            <h3 className="text-white font-black text-base md:text-2xl mb-1 md:mb-2">89% de acerto</h3>
            <p className="text-white/25 text-[10px] md:text-sm mb-4 md:mb-6">Desde 2018, operando mini índice Ibovespa</p>

            <div className="flex justify-center gap-6 md:gap-10">
              <div>
                <span className="text-[#00ff87] text-xl md:text-3xl font-black block">100</span>
                <span className="text-white/20 text-[8px] md:text-xs uppercase tracking-wider">pts Alaska</span>
              </div>
              <div>
                <span className="text-[#3b82f6] text-xl md:text-3xl font-black block">120</span>
                <span className="text-white/20 text-[8px] md:text-xs uppercase tracking-wider">pts Square</span>
              </div>
              <div>
                <span className="text-[#ff4757] text-xl md:text-3xl font-black block">400</span>
                <span className="text-white/20 text-[8px] md:text-xs uppercase tracking-wider">pts stop</span>
              </div>
            </div>
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
