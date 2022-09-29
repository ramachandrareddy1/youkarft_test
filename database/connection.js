const { Pool } = require('pg');
const { DB_USER, DB_HOST, DB_DATABASE_NAME, DB_PASSWORD, DB_PORT } = process.env;

const config = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 10, // max number of clients in the pool
}

const pool = new Pool(config);

module.exports = pool;