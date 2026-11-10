import * as comprasModel from "../models/comprasModel.js";
import { dataHoraValida, inteiroPositivo, textoValido, valorMonetarioValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    comprasModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    comprasModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) return res.status(404).json({ msg: "Compra não encontrada" });
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_cliente, data_compra, valor_total, estado } = req.body ?? {};
    if (!inteiroPositivo(id_cliente) ||
        !valorMonetarioValido(valor_total) ||
        (data_compra !== undefined && !dataHoraValida(data_compra)) ||
        (estado !== undefined && !textoValido(estado, 30))) {
        return res.status(400).json({ msg: "Informe id_cliente, valor_total e os campos opcionais data_compra e estado válidos" });
    }

    comprasModel.criar({ id_cliente, data_compra: data_compra ?? null, valor_total, estado: estado?.trim() ?? null }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ msg: "Compra cadastrada com sucesso", id: resultado.insertId });
    });
}

export function atualizar(req, res, next) {
    const { id_cliente, data_compra, valor_total, estado } = req.body ?? {};
    if (!inteiroPositivo(id_cliente) ||
        !dataHoraValida(data_compra) ||
        !valorMonetarioValido(valor_total) ||
        !textoValido(estado, 30)) {
        return res.status(400).json({ msg: "Informe id_cliente, data_compra, valor_total e estado válidos" });
    }

    comprasModel.atualizar(req.id, { id_cliente, data_compra, valor_total, estado: estado.trim() }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Compra não encontrada" });
        return res.status(200).json({ msg: "Compra atualizada com sucesso" });
    });
}

export function deletar(req, res, next) {
    comprasModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ msg: "Compra não encontrada" });
        return res.status(200).json({ msg: "Compra deletada com sucesso" });
    });
}
