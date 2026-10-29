// require('dotenv').config();
// const mysql = require('mysql2');

import "dotenv/config";
import mysql from "mysql2";

const conexao = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "senai2026",
    database: process.env.DB_NAME || "gamehub.db",
    port: process.env.DB_PORT || 3306
});

// module.exports = conexao;
export default conexao;