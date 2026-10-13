import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Retrato de 13/10/2026, usado enquanto a contagem não chega ou se ela falhar.
const SNAPSHOT = { total: 4010, wins: 3380 }

// Total de operações e taxa de acerto, contados no banco com a mesma regra da
// página de resultados: acerto é operação com resultado acima de zero.
export function useTrackRecord() {
  const [record, setRecord] = useState(SNAPSHOT)

  useEffect(() => {
    let cancelled = false

    async function count() {
      const base = () =>
        supabase.from('trades').select('*', { count: 'exact', head: true }).eq('robo', 'alaska-&-square')

      const [all, won] = await Promise.all([base(), base().gt('resultado', 0)])
      if (cancelled || all.error || won.error || !all.count) return
      setRecord({ total: all.count, wins: won.count })
    }

    count()
    return () => { cancelled = true }
  }, [])

  return { ...record, winRate: (record.wins / record.total) * 100 }
}
