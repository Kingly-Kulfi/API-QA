const { Pool } = require('pg');
const config = require('../../config.js')

const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: 5432,
});

module.exports = pool;



