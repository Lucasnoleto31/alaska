import { useState } from 'react'

export default function CandlestickDiagram() {
  const [activeZone, setActiveZone] = useState(null)

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 800 520" className="w-full h-auto" style={{ maxHeight: '520px' }}>
        <defs>
          <filter id="glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="grad-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00cc6a" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad-red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4757" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cc3344" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad-entry" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffa502" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffa502" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="grad-target" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ff87" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="grad-stop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4757" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ff4757" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Background grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={`grid-${i}`} x1="60" y1={60 + i * 50} x2="750" y2={60 + i * 50} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}

        {/* ====== VELA 1 - VERDE (fechamento positivo) ====== */}
        {/* Pavio superior */}
        <line x1="220" y1="80" x2="220" y2="130" stroke="#00ff87" strokeWidth="2.5" opacity="0.7" />
        {/* Corpo */}
        <rect
          x="180" y="130" width="80" height="180" rx="6"
          fill="url(#grad-green)"
          filter="url(#glow-green)"
          className="cursor-pointer transition-all duration-300"
          opacity={activeZone === 'candle1' ? 1 : 0.85}
          onMouseEnter={() => setActiveZone('candle1')}
          onMouseLeave={() => setActiveZone(null)}
        />
        {/* Pavio inferior */}
        <line x1="220" y1="310" x2="220" y2="390" stroke="#00ff87" strokeWidth="2.5" opacity="0.7" />

        {/* Label vela 1 */}
        <text x="220" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600" letterSpacing="0.5">VELA ANTERIOR</text>

        {/* Abertura e Fechamento labels vela 1 */}
        <text x="155" y="318" textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="10">Abertura</text>
        <text x="155" y="138" textAnchor="end" fill="#00ff87" fontSize="10" fontWeight="600">Fechamento +</text>

        {/* ====== VELA 2 - VERMELHA (vela de entrada) ====== */}
        {/* Pavio superior */}
        <line x1="480" y1="100" x2="480" y2="145" stroke="#ff4757" strokeWidth="2.5" opacity="0.7" />
        {/* Corpo */}
        <rect
          x="440" y="145" width="80" height="110" rx="6"
          fill="url(#grad-red)"
          filter="url(#glow-red)"
          className="cursor-pointer transition-all duration-300"
          opacity={activeZone === 'candle2' ? 1 : 0.85}
          onMouseEnter={() => setActiveZone('candle2')}
          onMouseLeave={() => setActiveZone(null)}
        />
        {/* Pavio inferior */}
        <line x1="480" y1="255" x2="480" y2="430" stroke="#ff4757" strokeWidth="2.5" opacity="0.7" />

        {/* Label vela 2 */}
        <text x="480" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600" letterSpacing="0.5">VELA DE ENTRADA</text>

        {/* Abertura vela 2 */}
        <text x="535" y="153" textAnchor="start" fill="rgba(255,255,255,0.25)" fontSize="10">Abertura</text>

        {/* ====== ZONA DE ENTRADA - 200 PONTOS ====== */}
        {/* Linha de entrada */}
        <line x1="440" y1="255" x2="750" y2="255" stroke="#ffa502" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

        {/* Bracket 200 pontos */}
        <line x1="530" y1="148" x2="530" y2="255" stroke="#ffa502" strokeWidth="1.5" opacity="0.5" />
        <line x1="525" y1="148" x2="535" y2="148" stroke="#ffa502" strokeWidth="1.5" opacity="0.5" />
        <line x1="525" y1="255" x2="535" y2="255" stroke="#ffa502" strokeWidth="1.5" opacity="0.5" />

        {/* Box 200 pontos */}
        <rect
          x="540" y="185" width="105" height="30" rx="8"
          fill="rgba(255,165,2,0.12)" stroke="rgba(255,165,2,0.3)" strokeWidth="1"
          className="cursor-pointer"
          onMouseEnter={() => setActiveZone('entry')}
          onMouseLeave={() => setActiveZone(null)}
        />
        <text x="592" y="205" textAnchor="middle" fill="#ffa502" fontSize="12" fontWeight="700">-200 pontos</text>

        {/* Label entrada */}
        <rect x="656" y="243" width="90" height="24" rx="6" fill="rgba(255,165,2,0.1)" />
        <text x="701" y="260" textAnchor="middle" fill="#ffa502" fontSize="11" fontWeight="700">VENDA</text>

        {/* ====== ZONA ALVO - 100 PONTOS ====== */}
        {/* Area alvo */}
        <rect
          x="440" y="255" width="300" height="100" rx="0"
          fill="url(#grad-target)"
          className="cursor-pointer"
          onMouseEnter={() => setActiveZone('target')}
          onMouseLeave={() => setActiveZone(null)}
          opacity={activeZone === 'target' ? 0.8 : 0.4}
        />

        {/* Linha alvo */}
        <line x1="440" y1="355" x2="750" y2="355" stroke="#00ff87" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

        {/* Bracket alvo */}
        <line x1="735" y1="258" x2="735" y2="352" stroke="#00ff87" strokeWidth="1.5" opacity="0.4" />
        <line x1="730" y1="258" x2="740" y2="258" stroke="#00ff87" strokeWidth="1.5" opacity="0.4" />
        <line x1="730" y1="352" x2="740" y2="352" stroke="#00ff87" strokeWidth="1.5" opacity="0.4" />

        {/* Label alvo */}
        <rect x="656" y="295" width="73" height="24" rx="6" fill="rgba(0,255,135,0.1)" />
        <text x="692" y="312" textAnchor="middle" fill="#00ff87" fontSize="11" fontWeight="700">ALVO 1</text>

        {/* Box 100 pontos */}
        <rect x="745" y="290" width="50" height="24" rx="6" fill="rgba(0,255,135,0.08)" />
        <text x="770" y="307" textAnchor="middle" fill="#00ff87" fontSize="10" fontWeight="600">100p</text>

        {/* ====== ZONA STOP - 400 PONTOS ====== */}
        {/* Linha stop */}
        <line x1="370" y1="100" x2="750" y2="100" stroke="#ff4757" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.5" />

        {/* Area stop */}
        <rect
          x="440" y="100" width="300" height="48" rx="0"
          fill="url(#grad-stop)"
          className="cursor-pointer"
          onMouseEnter={() => setActiveZone('stop')}
          onMouseLeave={() => setActiveZone(null)}
          opacity={activeZone === 'stop' ? 0.8 : 0.4}
        />

        {/* Label stop */}
        <rect x="648" y="88" width="90" height="24" rx="6" fill="rgba(255,71,87,0.12)" />
        <text x="693" y="105" textAnchor="middle" fill="#ff4757" fontSize="11" fontWeight="700">STOP LOSS</text>

        {/* Bracket stop 400 pts */}
        <line x1="390" y1="103" x2="390" y2="252" stroke="#ff4757" strokeWidth="1" opacity="0.3" />
        <line x1="385" y1="103" x2="395" y2="103" stroke="#ff4757" strokeWidth="1" opacity="0.3" />
        <line x1="385" y1="252" x2="395" y2="252" stroke="#ff4757" strokeWidth="1" opacity="0.3" />
        <text x="390" y="182" textAnchor="middle" fill="#ff4757" fontSize="10" fontWeight="600" opacity="0.5">400p</text>

        {/* ====== ZONA SQUARE ====== */}
        {/* Linha square entry - 150 pontos acima da entrada */}
        <line x1="440" y1="195" x2="650" y2="195" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

        {/* Label square */}
        <rect x="555" y="150" width="90" height="34" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"
          className="cursor-pointer"
          onMouseEnter={() => setActiveZone('square')}
          onMouseLeave={() => setActiveZone(null)}
        />
        <text x="600" y="164" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700">SQUARE</text>
        <text x="600" y="178" textAnchor="middle" fill="rgba(59,130,246,0.6)" fontSize="9" fontWeight="500">3x lote | +150p</text>

        {/* ====== SETA CONECTANDO AS VELAS ====== */}
        <line x1="270" y1="135" x2="430" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="350" y="128" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontWeight="500">fechou verde?</text>

        {/* ====== LEGENDA INFERIOR ====== */}
        <rect x="60" y="465" width="690" height="45" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        <circle cx="100" cy="488" r="5" fill="#00ff87" opacity="0.8" />
        <text x="115" y="492" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="500">Vela positiva</text>

        <circle cx="240" cy="488" r="5" fill="#ff4757" opacity="0.8" />
        <text x="255" y="492" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="500">Vela negativa</text>

        <rect x="370" y="483" width="20" height="10" rx="3" fill="rgba(255,165,2,0.3)" />
        <text x="398" y="492" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="500">Zona de entrada</text>

        <rect x="520" y="483" width="20" height="10" rx="3" fill="rgba(59,130,246,0.3)" />
        <text x="548" y="492" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="500">Square (preco medio)</text>
      </svg>

      {/* Tooltip flutuante */}
      {activeZone && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#0c0c10]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 md:p-4 max-w-[200px] md:max-w-[240px] shadow-2xl shadow-black/60 pointer-events-none z-10">
          {activeZone === 'candle1' && (
            <>
              <p className="text-[#00ff87] text-[11px] md:text-xs font-bold mb-1">Vela de Sinal</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">Fechamento positivo habilita a operacao na proxima vela.</p>
            </>
          )}
          {activeZone === 'candle2' && (
            <>
              <p className="text-[#ff4757] text-[11px] md:text-xs font-bold mb-1">Vela de Entrada</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">Esperamos a queda de 200 pontos para iniciar a venda a descoberto.</p>
            </>
          )}
          {activeZone === 'entry' && (
            <>
              <p className="text-[#ffa502] text-[11px] md:text-xs font-bold mb-1">Gatilho de Entrada</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">-200 pontos da abertura = inicio da venda a descoberto.</p>
            </>
          )}
          {activeZone === 'target' && (
            <>
              <p className="text-[#00ff87] text-[11px] md:text-xs font-bold mb-1">Zona de Alvo</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">Alvo de 100 pontos de lucro a partir da entrada.</p>
            </>
          )}
          {activeZone === 'stop' && (
            <>
              <p className="text-[#ff4757] text-[11px] md:text-xs font-bold mb-1">Stop Loss</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">Protecao a 400 pontos acima da entrada. Risco controlado.</p>
            </>
          )}
          {activeZone === 'square' && (
            <>
              <p className="text-[#3b82f6] text-[11px] md:text-xs font-bold mb-1">Square</p>
              <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed">Preco medio com 3x o lote. Entra a 150 pontos contra. Alvo: +120 pontos.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
