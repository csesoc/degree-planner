const Pool = require('pg').Pool;

const pool = new Pool();

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
