import conexao from "../../db.js";

export function listar(callback) {
    conexao.query("SELECT * FROM item_compra", callback);
}

export function buscarPorId(id, callback) {
    conexao.query("SELECT * FROM item_compra WHERE id = ?", [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO item_compra (id_compra, id_produto, quantidade, preco) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [dados.id_compra, dados.id_produto, dados.quantidade, dados.preco], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE item_compra SET id_compra = ?, id_produto = ?, quantidade = ?, preco = ? WHERE id = ?";
    conexao.query(sql, [dados.id_compra, dados.id_produto, dados.quantidade, dados.preco, id], callback);
}

export function deletar(id, callback) {
    conexao.query("DELETE FROM item_compra WHERE id = ?", [id], callback);
}
