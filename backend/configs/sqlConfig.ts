import dotenv from 'dotenv';
import { Pool } from 'pg';
import logger from '../utils/logger.js';

// Ensure environment variables are loaded if not already done elsewhere
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  logger.log('Successfully connected to the PostgreSQL database.');
});

pool.on('error', (err: Error) => {
  logger.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

export default pool;
