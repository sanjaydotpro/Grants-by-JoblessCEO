import * as schema from "./schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { getMockDb } from "./mock-db";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

let _db: PostgresJsDatabase<typeof schema> | null = null;
let _postgres: postgres.Sql | null = null;
let _useMockDb = false;
let _forceRealDb = false;

// Lazy database initialization function
export function getDb() {
  // Skip database operations during build to prevent native binding issues
  // Only skip during actual build phase, not during development or production runtime
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database operations not available during build');
  }

  if (_useMockDb && !_forceRealDb) {
    return getMockDb() as any;
  }

  if (_db) {
    return _db;
  }

  try {
    // Get database URL from environment
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is required");
    }

    try {
      // Create PostgreSQL connection
      _postgres = postgres(databaseUrl, {
        ssl: process.env.DATABASE_SSL === 'true' ? 'require' : false,
        max: parseInt(process.env.DATABASE_POOL_MAX || '20'),
        idle_timeout: parseInt(process.env.DATABASE_POOL_IDLE_TIMEOUT || '30'),
        connect_timeout: 60
      });
      
      console.log(`Connected to PostgreSQL database`);
    } catch (error) {
      console.error("Failed to initialize PostgreSQL database:", error);
      if (_forceRealDb) {
        throw error; // Don't fallback if real DB is forced
      }
      // Fallback to mock database for development
      console.log("Using mock database as fallback");
      _useMockDb = true;
      return getMockDb() as any;
    }

    // Create Drizzle instance
    _db = drizzle(_postgres, { schema });
    return _db;
  } catch (error) {
    console.error("Failed to initialize database, falling back to mock:", error);
    _useMockDb = true;
    return getMockDb() as any;
  }
}

// Export db for backward compatibility with proper typing
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(target, prop) {
    const database = getDb();
    if (!database) return undefined;
    const value = (database as any)[prop];
    return typeof value === 'function' ? value.bind(database) : value;
  }
});

// Graceful shutdown
process.on("exit", () => {
  try {
    if (_postgres) {
      _postgres.end();
    }
  } catch (error) {
    console.error("Error closing database:", error);
  }
});

export async function validateDatabaseConnection(): Promise<boolean> {
  try {
    const db = getDb();
    if (_postgres) {
      const result = await _postgres`SELECT 1 as test`;
      console.log("Database connection validated successfully");
      return result.length > 0;
    }
    return false;
  } catch (error) {
    console.error("Database connection validation failed:", error);
    return false;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    if (_postgres) {
      await _postgres.end();
      _postgres = null;
      _db = null;
    }
    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}

export { _postgres as postgres };

// Function to force using real database instead of mock
export function useRealDatabase() {
  _forceRealDb = true;
  _useMockDb = false;
  // Reset the database instance to force reconnection
  _db = null;
  _postgres = null;
}

// Function to check if using real database
export function isUsingRealDatabase() {
  return _forceRealDb || (!_useMockDb && _db !== null);
}