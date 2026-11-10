import * as notasFiscaisModel from "../models/notasFiscaisModel.js";
import { dataHoraValida, inteiroPositivo, textoValido, valorMonetarioValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    notasFiscaisModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    notasFiscaisModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) return res.status(404).json({ msg: "Nota fiscal não encontrada" });
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_compra, data_emissao, valor_total, estado } = req.body ?? {};
    if (!inteiroPositivo(id_compra) ||
        !valorMonetarioValido(valor_total) ||
        !textoValido(estado, 30) ||
        (data_emissao !== undefined && !dataHoraValida(data_emissao))) {
        return res.status(400).json({ msg: "Informe id_compra, valor_total e estado válidos; data_emissao é opcional" });
    }

    notasFiscaisModel.criar({ id_compra, data_emissao: data_emissao ?? null, valor_total, estado: estado.trim() }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ msg: "Nota fiscal cadastrada com sucesso", id: resultado.insertId });
    });
}

export function atualizar(req, res, next) {
    const { id_compra, data_emissao, valor_total, estado } = req.body ?? {};
    if (!inteiroPositivo(id_compra) ||
        !dataHoraValida(data_emissao) ||
        !valorMonetarioValido(valor_total) ||
        !textoValido(estado, 30)) {
        return res.status(400).json({ msg: "Informe id_compra, data_emissao, valor_total e estado válidos" });
    }

    notasFiscaisModel.atualizar(req.id, { id_compra, data_emissao, valor_total, estado: estado.trim() }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Nota fiscal não encontrada" });
        return res.status(200).json({ msg: "Nota fiscal atualizada com sucesso" });
    });
}

export function deletar(req, res, next) {
    notasFiscaisModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Nota fiscal não encontrada" });
        return res.status(200).json({ msg: "Nota fiscal deletada com sucesso" });
    });
}
