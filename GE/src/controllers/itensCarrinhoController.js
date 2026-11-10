import * as itensCarrinhoModel from "../models/itensCarrinhoModel.js";
import { inteiroPositivo } from "../utils/validacoes.js";

export function listar(req, res, next) {
    itensCarrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    itensCarrinhoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) return res.status(404).json({ msg: "Item do carrinho não encontrado" });
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_carrinho, id_produto, quantidade } = req.body ?? {};
    if (!inteiroPositivo(id_carrinho) || !inteiroPositivo(id_produto) || !inteiroPositivo(quantidade)) {
        return res.status(400).json({ msg: "Informe id_carrinho, id_produto e quantidade como inteiros positivos" });
    }

    itensCarrinhoModel.criar({ id_carrinho, id_produto, quantidade }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ msg: "Item adicionado ao carrinho com sucesso", id: resultado.insertId });
    });
}

export function atualizar(req, res, next) {
    const { id_carrinho, id_produto, quantidade } = req.body ?? {};
    if (!inteiroPositivo(id_carrinho) || !inteiroPositivo(id_produto) || !inteiroPositivo(quantidade)) {
        return res.status(400).json({ msg: "Informe id_carrinho, id_produto e quantidade como inteiros positivos" });
    }

    itensCarrinhoModel.atualizar(req.id, { id_carrinho, id_produto, quantidade }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Item do carrinho não encontrado" });
        return res.status(200).json({ msg: "Item do carrinho atualizado com sucesso" });
    });
}

export function deletar(req, res, next) {
    itensCarrinhoModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Item do carrinho não encontrado" });
        return res.status(200).json({ msg: "Item removido do carrinho com sucesso" });
    });
}
