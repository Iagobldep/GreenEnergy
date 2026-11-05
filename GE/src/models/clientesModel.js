import conexao from "../../db.js";

export function listar (callback) {
    const sql = "SELECT * FROM cliente";
    conexao.query(sql, callback);
}

export function buscarPorId (id, callback) {
    const sql = "SELECT * FROM cliente WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function criar (dados, callback) {
    const sql = "INSERT INTO cliente (nome, email, senha, endereco, telefone) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.endereco, dados.telefone], callback);
}

export function atualizar (id, dados, callback) {
    const sql = "UPDATE cliente SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.endereco, dados.telefone, id], callback);
}

export function deletar (id, callback) {
    const sql = "DELETE FROM cliente WHERE id = ?";
    conexao.query(sql, [id], callback);
}