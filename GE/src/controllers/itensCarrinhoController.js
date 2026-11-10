import * as itensCarrinhoModel from "../models/itensCarrinhoModel.js";
import { inteiroPositivo } from "../utils/validacoes.js";

function responderErroRegra(erro, res, next) {
    if (Number.isInteger(erro.status) && erro.status >= 400 && erro.status < 500) {
        return res.status(erro.status).json({ msg: erro.message });
    }
    return next(erro);
}

export function listar(req, res, next) {
    itensCarrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function listarPorCarrinho(req, res, next) {
    itensCarrinhoModel.listarPorCarrinho(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Carrinho não encontrado" });
        }

        const primeiraLinha = resultado[0];
        const itens = resultado
            .filter((linha) => linha.id_item !== null)
            .map((linha) => ({
                id: linha.id_item,
                id_produto: linha.id_produto,
                nome_produto: linha.nome_produto,
                quantidade: Number(linha.quantidade),
                preco: Number(linha.preco),
                subtotal: Number(linha.subtotal)
            }));

        return res.status(200).json({
            id_carrinho: req.id,
            itens,
            total: Number(primeiraLinha.total)
        });
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
        if (erro) return responderErroRegra(erro, res, next);
        return res.status(resultado.atualizado ? 200 : 201).json({
            msg: resultado.atualizado
                ? "Quantidade do produto atualizada no carrinho"
                : "Item adicionado ao carrinho com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_carrinho, id_produto, quantidade } = req.body ?? {};
    if (!inteiroPositivo(id_carrinho) || !inteiroPositivo(id_produto) || !inteiroPositivo(quantidade)) {
        return res.status(400).json({ msg: "Informe id_carrinho, id_produto e quantidade como inteiros positivos" });
    }

    itensCarrinhoModel.atualizar(req.id, { id_carrinho, id_produto, quantidade }, (erro, resultado) => {
        if (erro) return responderErroRegra(erro, res, next);
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
