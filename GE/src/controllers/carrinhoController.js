import * as carrinhoModel from "../models/carrinhoModel.js";
import { inteiroPositivo } from "../utils/validacoes.js";

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
    const { id_cliente } = req.body ?? {};

    if (!inteiroPositivo(id_cliente)) {
        return res.status(400).json({ msg: "Insira um id_cliente inteiro positivo" });
    }

    carrinhoModel.criar(id_cliente, (erro, resultado) => {
        if (erro) return next(erro);

        return res.status(201).json({
            msg: "Carrinho criado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_cliente } = req.body ?? {};

    if (!inteiroPositivo(id_cliente)) {
        return res.status(400).json({ msg: "Insira um id_cliente inteiro positivo" });
    }

    carrinhoModel.atualizar(req.id, id_cliente, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Carrinho atualizado com sucesso" });
        }

        return res.status(404).json({ msg: "Carrinho não encontrado" });
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