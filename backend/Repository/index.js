const {Pool} = require('pg');

const options = {
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const pool = new Pool(options);

async function query(text, params) {
  const start = Date.now();
  const {rows} = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log(`Query took ${duration} and returned ${rows.length} rows.`);
  return rows;
}

module.exports = {
  query
};
