const dotenv = require('dotenv');
const assert = require('assert');
const sql = require('mssql');
dotenv.config();

const {
  PORT,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  SECRET_KEY,
  ENCRYPT
} = process.env;

const sqlEncrypt = ENCRYPT === 'true';

const config = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DATABASE,
  key: SECRET_KEY,
  options: {
    encrypt: sqlEncrypt,
    enableArithAbort: true,
  },
  timezone: '+00:00',
};

config.connectionTimeout = 30000;
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to the database');
    return pool;
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = {
  poolPromise,
  port: PORT
};
