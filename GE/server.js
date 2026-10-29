require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conexao = require('./db.js');

const app = express();
const PORTA = Number(process.env.PORTA || 3000);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    console.log("s");
});

app.use((req, res) => {
    res.status(404).json({msg: "Rota não encontrada"});
});

conexao.connect((erro) => {
    if (erro) {
        console.error(`Erro ao conectar ao banco de dados: ${erro.code || erro.message}`);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados greenenergy")

    const servidor = app.listen(PORTA, () => {
        console.log(`Servidor rodando em http://localhost:${PORTA}`);
    });

    servidor.on("error", (erro) => {
        console.log(`Erro ao conectar ao servidor: ${erro.code || erro.message}`);
        conexao.end(() => process.exit(1));
    });
});