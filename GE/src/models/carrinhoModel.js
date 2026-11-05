import conexao from "../../db.js";

export function listar (callback) {
    const sql = "SELECT * FROM carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId (id, callback) {
    const sql = "SELECT * FROM carrinho WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function criar (dados, callback) {
    const sql = "INSERT INTO carrinho (id_cliente) VALUES (?)";
    conexao.query(sql, [dados.id_cliente], callback);
}

export function atualizar (id, dados, callback) {
    const sql = "UPDATE carrinho SET id_cliente = ? WHERE id = ?";
    conexao.query(sql, [dados.id_cliente, id], callback);
}

export function deletar (id, callback) {
    const sql = "DELETE FROM carrinho WHERE id = ?";
    conexao.query(sql, [id], callback);
}