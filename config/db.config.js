const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: PROCESS.env.HOST,
    user: PROCESS.env.USER,
    password:  PROCESS.env.PASSWORD,
    database: PROCESS.env.DATABASE
});

module.exports = pool;