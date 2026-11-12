import conexao from "../../db.js";

export function listar (callback) {
    const sql = "SELECT * FROM categoria ORDER BY id";
    conexao.query(sql, callback);
}

export function buscarPorId (id, callback) {
    const sql = "SELECT * FROM categoria WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function buscarProdutosPorCategoria (id, callback) {
    const sql = "SELECT * FROM produto WHERE id_categoria = ?";
    conexao.query(sql, [id], callback);
}

export function criar (dados, callback) {
    const sql = "INSERT INTO categoria (nome) VALUES (?)";
    conexao.query(sql, [dados.nome], callback);
}

export function atualizar (id, nome, callback) {
    const sql = "UPDATE categoria SET nome = ? WHERE id = ?";
    conexao.query(sql, [nome, id], callback);
}

export function deletar (id, callback) {
    const sql = "DELETE FROM categoria WHERE id = ?";
    conexao.query(sql, [id], callback);
}