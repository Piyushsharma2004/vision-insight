// lib/db.ts
import { Pool, PoolConfig } from 'pg';

const config: PoolConfig = {
  connectionString: 'postgresql://jecrc_owner:Md5Dix4jfrEg@ep-plain-boat-a86yhz6z.eastus2.azure.neon.tech/jecrc?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(config);

export default pool;