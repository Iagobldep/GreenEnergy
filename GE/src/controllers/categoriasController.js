import * as categoriasModel from "../models/categoriasModel.js";
import { textoValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    categoriasModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    categoriasModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Categoria não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome } = req.body ?? {};

    if (!textoValido(nome, 150)) {
        return res.status(400).json({ msg: "Insira um nome válido para a categoria" });
    }

    const dados = { nome: nome.trim() };

    categoriasModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        res.status(201).json({
            msg: "Categoria cadastrada com sucesso",
            id: resultado.insertId
        });
    })
}

export function atualizar(req, res, next) {
    const { nome } = req.body ?? {};

    if (!textoValido(nome, 150)) {
        return res.status(400).json({ msg: "Insira um nome válido para a categoria" })
    }

    categoriasModel.atualizar(req.id, nome.trim(), (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ msg: "Categoria atualizado com sucesso" });
        }
        else {
            res.status(400).json({ msg: "Categoria não encontrado" });
        }
    });
}

export function deletar(req, res, next) {
    categoriasModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Categoria deletado com sucesso" });
        }

        return res.status(404).json({ msg: "Categoria não encontrado" });
    });
}