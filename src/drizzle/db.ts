import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";
import * as schema from "./schema";

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Pool configuration with proper defaults
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Connection pool settings
  min: parseInt(process.env.DATABASE_POOL_MIN || "2"),
  max: parseInt(process.env.DATABASE_POOL_MAX || "10"),
  // Connection timeout settings
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  // SSL configuration for production
  ssl: process.env.NODE_ENV === "production" && process.env.DATABASE_SSL !== "false" 
    ? { rejectUnauthorized: false } 
    : false,
};

// Create connection pool
const pool = new Pool(poolConfig);

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Handle pool connection events
pool.on("connect", (client) => {
  console.log("New client connected to database");
});

pool.on("remove", (client) => {
  console.log("Client removed from pool");
});

// Create Drizzle instance
export const db = drizzle(pool, { schema });

// Database connection validation function
export async function validateDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Database connection validated successfully");
    return true;
  } catch (error) {
    console.error("Database connection validation failed:", error);
    return false;
  }
}

// Graceful shutdown function
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await pool.end();
    console.log("Database connection pool closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}

// Export pool for direct access if needed
export { pool };