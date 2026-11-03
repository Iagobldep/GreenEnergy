import mysql from "mysql2";

const conexao = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "senai2026",
    database: process.env.DB_NAME || "greenenergy",
    port: process.env.DB_PORT || 3306
});

export default conexao;