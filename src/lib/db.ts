import { Pool } from 'pg'

let _pool: Pool | null = null

export function getPool() {
  if (_pool) return _pool
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (!connectionString) return null
  _pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  return _pool
}

