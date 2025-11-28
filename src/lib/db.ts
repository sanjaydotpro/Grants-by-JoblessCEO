import { Pool } from 'pg'

let _pool: Pool | null = null

export function getPool() {
  if (_pool) return _pool
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (!connectionString) return null
  const useSSL = (process.env.POSTGRES_SSL || '').toLowerCase() === 'require' || (process.env.POSTGRES_SSL || '').toLowerCase() === 'true'
  const cfg: any = { connectionString }
  if (useSSL) cfg.ssl = { rejectUnauthorized: false }
  _pool = new Pool(cfg)
  return _pool
}
