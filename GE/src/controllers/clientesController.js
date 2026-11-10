import * as clientesModel from "../models/clientesModel.js";
import { hashSenha, senhaHasheada, textoValido, verificarSenha } from "../utils/validacoes.js";

function emailValido(email) {
    return textoValido(email, 150) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function listar(req, res, next) {
    clientesModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    clientesModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ msg: "Cliente não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export async function criar(req, res, next) {
    const { nome, email, senha, endereco, telefone } = req.body ?? {};

    if (!textoValido(nome, 150) ||
        !emailValido(email) ||
        !textoValido(senha, 255) ||
        !textoValido(endereco, 255) ||
        !textoValido(telefone, 20)
    ) {
        return res.status(400).json({ msg: "Insira nome, email, senha, endereco e telefone válidos" });
    }

    try {
        const senhaHash = await hashSenha(senha);
        const dados = {
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: senhaHash,
            endereco: endereco.trim(),
            telefone: telefone.trim()
        };

        clientesModel.criar(dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(201).json({
                msg: "Cliente cadastrado com sucesso",
                id: resultado.insertId,
            });
        });
    } catch (erro) {
        return next(erro);
    }
}

export function login(req, res, next) {
    const { email, senha } = req.body ?? {};

    if (!emailValido(email) || !textoValido(senha, 255)) {
        return res.status(400).json({ msg: "Informe email e senha válidos" });
    }

    clientesModel.buscarPorEmail(email.trim().toLowerCase(), async (erro, resultado) => {
        if (erro) return next(erro);

        const cliente = resultado[0];
        if (!cliente) {
            return res.status(401).json({ msg: "Email ou senha incorretos" });
        }

        try {
            const senhaCorreta = await verificarSenha(senha, cliente.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ msg: "Email ou senha incorretos" });
            }

            if (!senhaHasheada(cliente.senha)) {
                const senhaHash = await hashSenha(senha);
                clientesModel.atualizarSenha(cliente.id, senhaHash, (erroAtualizacao) => {
                    if (erroAtualizacao) return next(erroAtualizacao);
                    return res.status(200).json({
                        msg: "Login realizado com sucesso",
                        cliente: {
                            id: cliente.id,
                            nome: cliente.nome,
                            email: cliente.email,
                        }
                    });
                });
                return;
            }

            return res.status(200).json({
                msg: "Login realizado com sucesso",
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    email: cliente.email
                }
            });
        } catch (erroVerificacao) {
            return next(erroVerificacao);
        }
    });
}

export async function atualizar(req, res, next) {
    const { nome, email, senha, endereco, telefone } = req.body ?? {};

    if (!textoValido(nome, 150) ||
        !emailValido(email) ||
        !textoValido(senha, 255) ||
        !textoValido(endereco, 255) ||
        !textoValido(telefone, 20)
    ) {
        return res.status(400).json({ msg: "Insira nome, email, senha, endereco e telefone válidos para todos os campos" })
    }

    try {
        const senhaHash = await hashSenha(senha);
        const dados = {
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: senhaHash,
            endereco: endereco.trim(),
            telefone: telefone.trim()
        };

        clientesModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);

            if (resultado.affectedRows > 0) {
                return res.status(200).json({ msg: "Cliente atualizado com sucesso" });
            }
            return res.status(404).json({ msg: "Cliente não encontrado" });
        });
    } catch (erro) {
        return next(erro);
    }
}

export function deletar(req, res, next) {
    clientesModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ msg: "Cliente deletado com sucesso" });
        }

        return res.status(404).json({ msg: "Cliente não encontrado" });
    });
}