import * as carrinhoModel from "../models/carrinhoModel.js";
import { textoValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    carrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    carrinhoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Carrinho não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, email, senha, endereco, telefone } = req.body ?? {};

    const dados = { nome: nome.trim(), email: email, senha: senha.trim(), endereco: endereco.trim(), telefone: telefone.trim() };

    carrinhoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        res.status(201).json({
            msg: "Carrinho criado com sucesso",
            id: resultado.insertId
        });
    })
}

export function atualizar(req, res, next) {
    const { id_cliente } = req.body ?? {};

    carrinhoModel.atualizar(req.id, id_cliente.trim(), (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ msg: "Carrinho atualizado com sucesso" });
        }
        else {
            res.status(400).json({ msg: "Carrinho não encontrado" });
        }
    });
}

export function deletar(req, res, next) {
    carrinhoModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Carrinho deletado com sucesso" });
        }

        return res.status(404).json({ msg: "Carrinho não encontrado" });
    });
}