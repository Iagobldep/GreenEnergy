import * as comprasModel from "../models/comprasModel.js";
import { dataHoraValida, inteiroPositivo, textoValido, valorMonetarioValido } from "../utils/validacoes.js";

function formatarCodigo(prefixo, id) {
    return `${prefixo}-${String(id).padStart(6, "0")}`;
}

function cpfValido(cpf) {
    const digitos = String(cpf).replace(/\D/g, "");
    if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) return false;

    let soma = 0;
    for (let indice = 0; indice < 9; indice++) {
        soma += Number(digitos[indice]) * (10 - indice);
    }
    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10) primeiroDigito = 0;
    if (primeiroDigito !== Number(digitos[9])) return false;

    soma = 0;
    for (let indice = 0; indice < 10; indice++) {
        soma += Number(digitos[indice]) * (11 - indice);
    }
    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10) segundoDigito = 0;
    return segundoDigito === Number(digitos[10]);
}

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

export function finalizar(req, res, next) {
    const { id_cliente, cpf, tipo_pagamento } = req.body ?? {};
    const pagamentosAceitos = ["pix", "cartao", "boleto"];
    const cpfNormalizado = String(cpf ?? "").replace(/\D/g, "");
    const pagamentoNormalizado = String(tipo_pagamento ?? "").trim().toLowerCase();

    if (!inteiroPositivo(id_cliente) || !cpfValido(cpfNormalizado)) {
        return res.status(400).json({ msg: "Informe um CPF válido" });
    }
    if (!pagamentosAceitos.includes(pagamentoNormalizado)) {
        return res.status(400).json({ msg: "Informe um tipo de pagamento válido" });
    }

    comprasModel.finalizar(id_cliente, cpfNormalizado, pagamentoNormalizado, (erro, compra) => {
        if (erro) {
            if (Number.isInteger(erro.status) && erro.status >= 400 && erro.status < 500) {
                return res.status(erro.status).json({ msg: erro.message });
            }
            return next(erro);
        }

        return res.status(201).json({
            msg: "Compra finalizada com sucesso",
            compra: {
                ...compra,
                codigo: formatarCodigo("COMP", compra.id),
                codigo_nota_fiscal: formatarCodigo("NF", compra.id_nota_fiscal),
                cpf: cpfNormalizado,
                tipo_pagamento: pagamentoNormalizado
            }
        });
    });
}

export function buscarItensDeCompra(req, res, next) {
    comprasModel.buscarItensDeCompra(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
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
