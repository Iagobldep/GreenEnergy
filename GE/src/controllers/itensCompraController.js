import * as itensCompraModel from "../models/itensCompraModel.js";
import { inteiroPositivo, valorMonetarioValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    itensCompraModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    itensCompraModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) return res.status(404).json({ msg: "Item da compra não encontrado" });
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_compra, id_produto, quantidade, preco } = req.body ?? {};
    if (!inteiroPositivo(id_compra) ||
        !inteiroPositivo(id_produto) ||
        !inteiroPositivo(quantidade) ||
        !valorMonetarioValido(preco)) {
        return res.status(400).json({ msg: "Informe id_compra, id_produto, quantidade e preco válidos" });
    }

    itensCompraModel.criar({ id_compra, id_produto, quantidade, preco }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ msg: "Item da compra cadastrado com sucesso", id: resultado.insertId });
    });
}

export function atualizar(req, res, next) {
    const { id_compra, id_produto, quantidade, preco } = req.body ?? {};
    if (!inteiroPositivo(id_compra) ||
        !inteiroPositivo(id_produto) ||
        !inteiroPositivo(quantidade) ||
        !valorMonetarioValido(preco)) {
        return res.status(400).json({ msg: "Informe id_compra, id_produto, quantidade e preco válidos" });
    }

    itensCompraModel.atualizar(req.id, { id_compra, id_produto, quantidade, preco }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Item da compra não encontrado" });
        return res.status(200).json({ msg: "Item da compra atualizado com sucesso" });
    });
}

export function deletar(req, res, next) {
    itensCompraModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Item da compra não encontrado" });
        return res.status(200).json({ msg: "Item da compra deletado com sucesso" });
    });
}
