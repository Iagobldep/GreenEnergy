import * as produtosModel from "../models/produtosModel.js";
import { textoValido } from "../utils/validacoes.js";
import { inteiroPositivo } from "../utils/validacoes.js";
import { precoValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    produtosModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    produtosModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, descricao, imagem_url, preco, estoque, id_categoria } = req.body ?? {};

    if (!textoValido(nome, 255) ||
        !descricao ||
        !precoValido(preco) ||
        !inteiroPositivo(estoque) ||
        !inteiroPositivo(id_categoria)
    ) {
        return res.status(400).json({ msg: "Insira nome, descricao, preco, estoque e id_categoria válidos para todos os campos" })
    }
    
    const dados = { nome: nome.trim(), descricao: descricao.trim(), imagem_url: imagem_url?.trim() || null, preco: preco, estoque: estoque, id_categoria: id_categoria };

    produtosModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        res.status(201).json({
            msg: "Produto cadastrado com sucesso",
            id: resultado.insertId
        });
    })
}

export function atualizar(req, res, next) {
    const { nome, descricao, preco, estoque, id_categoria } = req.body ?? {};

    if (!textoValido(nome, 150)) {
        return res.status(400).json({ msg: "Insira um nome válido para o produto" })
    }

    produtosModel.atualizar(req.id, { nome: nome.trim(), descricao: descricao.trim(), preco: preco, estoque: estoque, id_categoria: id_categoria }, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ msg: "Produto atualizado com sucesso" });
        }
        else {
            res.status(400).json({ msg: "Produto não encontrado" });
        }
    });
}

export function deletar(req, res, next) {
    produtosModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Produto deletado com sucesso" });
        }

        return res.status(404).json({ msg: "Produto não encontrado" });
    });
}