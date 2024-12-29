const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST, //mysql-zagdb.alwaysdata.net
    user: process.env.DB_USER, // zagdb
    password: process.env.DB_PASSWORD, // zag@12345678
    database: process.env.DB_NAME, // zagdb_chat
});

module.exports = pool.promise();
