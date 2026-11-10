import conexao from "../../db.js";

export function listar(callback) {
    conexao.query("SELECT * FROM item_carrinho", callback);
}

export function buscarPorId(id, callback) {
    conexao.query("SELECT * FROM item_carrinho WHERE id = ?", [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE item_carrinho SET id_carrinho = ?, id_produto = ?, quantidade = ? WHERE id = ?";
    conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade, id], callback);
}

export function deletar(id, callback) {
    conexao.query("DELETE FROM item_carrinho WHERE id = ?", [id], callback);
}
