import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// === CONFIGURACAO ===
const SUPABASE_URL = 'https://dbczpbvhmpiebmwiugtt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiY3pwYnZobXBpZWJtd2l1Z3R0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE0MzY1MiwiZXhwIjoyMDg5NzE5NjUyfQ.ANcUQH3s-FWU4uEDLE1btP-417UQIZ2yxmt4ShD2L3E'
const CSV_FILE = './exemplo.csv'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function parseCSV(content) {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',')

  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row = {}
    headers.forEach((h, i) => {
      row[h.trim()] = values[i]?.trim() || ''
    })
    return {
      robo: row.robo,
      data: row.data,
      ativo: row.ativo,
      lado: row.lado,
      resultado: parseFloat(row.resultado),
      resultado_pct: parseFloat(row.resultado_pct),
      hora: row.hora,
      estrategia: row.estrategia,
      lote: parseInt(row.lote),
      resultado_bruto: parseFloat(row.resultado_bruto),
      custos: parseFloat(row.custos),
    }
  })
}

async function importar() {
  const csvPath = resolve(import.meta.dirname, CSV_FILE)
  const content = readFileSync(csvPath, 'utf-8')
  const trades = parseCSV(content)

  console.log(`Importando ${trades.length} trades...`)

  const BATCH = 500
  let total = 0

  for (let i = 0; i < trades.length; i += BATCH) {
    const batch = trades.slice(i, i + BATCH)
    const { error } = await supabase.from('trades').insert(batch)

    if (error) {
      console.error(`Erro no lote ${i / BATCH + 1}:`, error.message)
    } else {
      total += batch.length
      console.log(`  Lote ${i / BATCH + 1}: ${batch.length} trades inseridos`)
    }
  }

  console.log(`\nConcluido! ${total} trades importados com sucesso.`)
}

importar()
