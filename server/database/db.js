const Pool = require('pg').Pool;
var dotenv = require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

module.exports = {
    query: (text, params, callback) => {
        pool.query(text, params, callback);
    },
    getClient: (callback) => {
        pool.connect((err, client, release) => {
            callback(err, client, release);
        });
    }
};
