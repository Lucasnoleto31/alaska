import { List } from 'lucide-react'

export default function TradesTable({ trades }) {
  if (trades.length === 0) return null

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg bg-[#00ff87]/10 flex items-center justify-center">
          <List className="w-3.5 h-3.5 text-[#00ff87]" />
        </div>
        <span className="text-white font-semibold text-sm">Historico de Trades</span>
        <span className="text-[#555] text-xs ml-auto bg-white/5 px-2.5 py-1 rounded-lg">{trades.length} trades</span>
      </div>

      <div className="overflow-x-auto max-h-[400px] overflow-y-auto rounded-xl border border-[#1a1a1a]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#0d0d0d] z-10">
            <tr className="text-[#555] text-[10px] uppercase tracking-wider border-b border-[#1a1a1a]">
              <th className="text-left py-3 px-4 font-semibold">#</th>
              <th className="text-left py-3 px-4 font-semibold">Data</th>
              <th className="text-left py-3 px-4 font-semibold">Hora</th>
              <th className="text-left py-3 px-4 font-semibold">Ativo</th>
              <th className="text-left py-3 px-4 font-semibold">Lado</th>
              <th className="text-left py-3 px-4 font-semibold">Estrategia</th>
              <th className="text-right py-3 px-4 font-semibold">Lote</th>
              <th className="text-right py-3 px-4 font-semibold">Bruto</th>
              <th className="text-right py-3 px-4 font-semibold">Custos</th>
              <th className="text-right py-3 px-4 font-semibold">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, i) => {
              const date = new Date(trade.data)
              const resultado = Number(trade.resultado)
              return (
                <tr key={trade.id} className="border-b border-[#111] hover:bg-[#0f0f0f] transition-colors">
                  <td className="py-3 px-4 text-[#444] text-xs">{i + 1}</td>
                  <td className="py-3 px-4 text-[#ccc]">{date.toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4 text-[#ccc]">{trade.hora || '-'}</td>
                  <td className="py-3 px-4 text-white font-medium">{trade.ativo || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      trade.lado === 'C' || trade.lado === 'BUY' || trade.lado === 'COMPRA'
                        ? 'bg-[#00ff87]/10 text-[#00ff87]'
                        : 'bg-[#ff4757]/10 text-[#ff4757]'
                    }`}>
                      {trade.lado || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#666]">{trade.estrategia || '-'}</td>
                  <td className="py-3 px-4 text-right text-[#ccc]">{trade.lote || '-'}</td>
                  <td className={`py-3 px-4 text-right ${Number(trade.resultado_bruto) >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                    R$ {Number(trade.resultado_bruto || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right text-[#ffb84d]">
                    R$ {Number(trade.custos || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`py-3 px-4 text-right font-bold ${resultado >= 0 ? 'text-[#00ff87]' : 'text-[#ff4757]'}`}>
                    R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
