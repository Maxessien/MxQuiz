import dotenv from 'dotenv';
import { Pool } from 'pg';

// Ensure environment variables are loaded if not already done elsewhere
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Successfully connected to the PostgreSQL database.');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

export default pool;
