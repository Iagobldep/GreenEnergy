import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import conexao from './db.js';

import { textoValido } from './src/utils/validacoes.js';
dotenv.config();

const app = express();
const PORTA = Number(process.env.PORTA || 3000);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API do GameHub funcionando" });
});

//#region clientes
app.get("/clientes", (req, res) => {
    const sql = `SELECT * FROM cliente`;
    conexao.query(sql, (erro, resposta) => {
        if (erro) {
            console.error(`Erro ao buscar clientes: ${erro.code || erro.message}`);
            return res.status(500).json({ msg: "Erro ao buscar clientes" })
        }
        res.status(200).json(resposta);
    })
})

app.get("/clientes/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM cliente WHERE id = ?`
    conexao.query(sql, [id], (erro, resposta) => {
        if (erro) {
            console.error(`Erro ao buscar cliente ${erro.code || erro.message}`);
            return res.status(500).json({ msg: "Erro ao buscar cliente" });
        }
        res.status(200).json(resposta);
    })
})

app.post("/clientes", (req, res) => {
    const sql = `INSERT INTO cliente (nome, email, senha, endereco, telefone) VALUES (?, ?, ?, ?, ?)`
    const { nome, email, senha, endereco, telefone } = req.body;

    if (!textoValido(nome, 150) ||
        !textoValido(email, 150) ||
        !textoValido(senha, 255) ||
        !textoValido(endereco, 255) ||
        !textoValido(telefone, 20)
    ) {
        return res.status(400).json({ msg: "Insira nome, email, senha, endereco e telefone válidos para todos os campos" })
    }

    conexao.query(sql, [nome, email, senha, endereco, telefone], (erro, resposta) => {
        if (erro) {
            console.error(`Erro ao cadastrar cliente: ${erro.code || erro.message}`);
            return res.status(500).json({ msg: "Erro ao cadastrar cliente" });
        }
        res.status(201).json({ msg: "Cliente cadastrado com sucesso" });
    });
});

app.put("/clientes/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `UPDATE cliente SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ? WHERE id = ?`
    const { nome, email, senha, endereco, telefone } = req.body;

    conexao.query(sql, [nome, email, senha, endereco, telefone, id], (erro, resposta) => {
        if (erro) {
            console.error(`Erro ao atualizar cliente: ${erro.code || erro.message}`);
            return res.status(500).json({ msg: "Erro ao atualizar cliente" });
        }

        if (resposta.affectedRows > 0) {
            res.status(200).json({ msg: "Cliente atualizado com sucesso" });
        }
        else {
            res.status(400).json({ msg: "Cliente não encontrado" });
        }
    });
});

app.delete("/clientes/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM cliente WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error(`Erro ao deletar cliente: ${erro.code || erro.message}`);
            return res.status(500).json({ msg: "Erro ao deletar cliente" });
        }
        if (resultado.affectedRows > 0) {
            res.status(200).json({ msg: "Cliente deletado com sucesso" });
        } else {
            res.status(400).json({ msg: "Cliente não encontrado" });
        }
    });
})
//#endregion

app.use((req, res) => {
    res.status(404).json({ msg: "Rota não encontrada" });
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