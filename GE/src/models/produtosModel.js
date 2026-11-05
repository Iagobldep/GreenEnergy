import conexao from "../../db.js";

export function listar (callback) {
    const sql = "SELECT * FROM produto";
    conexao.query(sql, callback);
}

export function buscarPorId (id, callback) {
    const sql = "SELECT * FROM produto WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function criar (dados, callback) {
    const sql = "INSERT INTO produto (nome, descricao, preco, estoque, id_categoria) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.descricao, dados.preco, dados.estoque, dados.id_categoria], callback);
}

export function atualizar (id, dados, callback) {
    const sql = "UPDATE produto SET nome = ?, descricao = ?, preco = ?, estoque = ?, id_categoria = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.descricao, dados.preco, dados.estoque, dados.id_categoria, id], callback);
}

export function deletar (id, callback) {
    const sql = "DELETE FROM produto WHERE id = ?";
    conexao.query(sql, [id], callback);
}