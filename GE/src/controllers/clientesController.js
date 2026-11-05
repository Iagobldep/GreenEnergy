import * as clientesModel from "../models/clientesModel.js";
import { textoValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    clientesModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    clientesModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Cliente não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, email, senha, endereco, telefone } = req.body ?? {};

    const dados = { nome: nome.trim(), email: email, senha: senha.trim(), endereco: endereco.trim(), telefone: telefone.trim() };

    clientesModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        res.status(201).json({
            msg: "Cliente cadastrado com sucesso",
            id: resultado.insertId
        });
    })
}

export function atualizar(req, res, next) {
    const { nome, email, senha, endereco, telefone } = req.body ?? {};

    if (!textoValido(nome, 150) ||
        !textoValido(email, 150) ||
        !textoValido(senha, 255) ||
        !textoValido(endereco, 255) ||
        !textoValido(telefone, 20)
    ) {
        return res.status(400).json({ msg: "Insira nome, email, senha, endereco e telefone válidos para todos os campos" })
    }

    const dados = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
        endereco: endereco.trim(),
        telefone: telefone.trim()
    }

    clientesModel.atualizar(req.id, dados, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ msg: "Cliente atualizado com sucesso" });
        }
        else {
            res.status(400).json({ msg: "Cliente não encontrado" });
        }
    });
}

export function deletar(req, res, next) {
    clientesModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Cliente deletado com sucesso" });
        }

        return res.status(404).json({ msg: "Cliente não encontrado" });
    });
}