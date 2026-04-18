-- Execute este SQL no SQL Editor do seu Supabase

CREATE TABLE trades (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol TEXT NOT NULL DEFAULT 'WINM25',
  direction TEXT NOT NULL CHECK (direction IN ('BUY', 'SELL')),
  profit DECIMAL(12,2) NOT NULL,
  opened_at TIMESTAMPTZ NOT NULL,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para consultas por data
CREATE INDEX idx_trades_opened_at ON trades(opened_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Politica para leitura publica (qualquer um pode ver os resultados)
CREATE POLICY "Trades visíveis para todos" ON trades
  FOR SELECT USING (true);

-- Dados de exemplo (remova depois de testar)
INSERT INTO trades (symbol, direction, profit, opened_at) VALUES
  ('WINM25', 'BUY',   150.00, '2026-04-01 09:15:00-03'),
  ('WINM25', 'SELL', -75.00,  '2026-04-01 10:30:00-03'),
  ('WINM25', 'BUY',   200.00, '2026-04-01 14:00:00-03'),
  ('WINM25', 'SELL',  120.00, '2026-04-02 09:45:00-03'),
  ('WINM25', 'BUY',  -50.00,  '2026-04-02 11:00:00-03'),
  ('WINM25', 'BUY',   300.00, '2026-04-02 15:30:00-03'),
  ('WINM25', 'SELL', -100.00, '2026-04-03 09:20:00-03'),
  ('WINM25', 'BUY',   180.00, '2026-04-03 10:45:00-03'),
  ('WINM25', 'SELL',  250.00, '2026-04-03 14:15:00-03'),
  ('WINM25', 'BUY',   90.00,  '2026-04-04 09:30:00-03'),
  ('WINM25', 'SELL', -30.00,  '2026-04-04 11:15:00-03'),
  ('WINM25', 'BUY',   175.00, '2026-04-04 14:45:00-03'),
  ('WINM25', 'SELL',  60.00,  '2026-04-07 09:10:00-03'),
  ('WINM25', 'BUY',  -80.00,  '2026-04-07 10:20:00-03'),
  ('WINM25', 'SELL',  220.00, '2026-04-07 15:00:00-03'),
  ('WINM25', 'BUY',   110.00, '2026-04-08 09:35:00-03'),
  ('WINM25', 'SELL', -45.00,  '2026-04-08 11:50:00-03'),
  ('WINM25', 'BUY',   190.00, '2026-04-08 14:30:00-03'),
  ('WINM25', 'SELL',  80.00,  '2026-04-09 09:25:00-03'),
  ('WINM25', 'BUY',   350.00, '2026-04-09 15:45:00-03'),
  ('WINM25', 'SELL', -120.00, '2026-04-10 09:40:00-03'),
  ('WINM25', 'BUY',   200.00, '2026-04-10 10:55:00-03'),
  ('WINM25', 'SELL',  160.00, '2026-04-10 14:20:00-03'),
  ('WINM25', 'BUY',  -60.00,  '2026-04-11 09:15:00-03'),
  ('WINM25', 'BUY',   280.00, '2026-04-11 15:30:00-03'),
  ('WINM25', 'SELL',  95.00,  '2026-04-14 09:50:00-03'),
  ('WINM25', 'BUY',  -35.00,  '2026-04-14 11:30:00-03'),
  ('WINM25', 'SELL',  170.00, '2026-04-14 14:40:00-03'),
  ('WINM25', 'BUY',   140.00, '2026-04-15 09:20:00-03'),
  ('WINM25', 'BUY',   260.00, '2026-04-15 15:10:00-03');
