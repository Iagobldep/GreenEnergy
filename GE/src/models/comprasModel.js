import conexao from "../../db.js";

export function listar(callback) {
    conexao.query("SELECT * FROM compra", callback);
}

export function buscarPorId(id, callback) {
    conexao.query("SELECT * FROM compra WHERE id = ?", [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO compra (id_cliente, data_compra, valor_total, estado) VALUES (?, COALESCE(?, CURRENT_TIMESTAMP), ?, COALESCE(?, 'pendente'))";
    conexao.query(sql, [dados.id_cliente, dados.data_compra, dados.valor_total, dados.estado], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE compra SET id_cliente = ?, data_compra = ?, valor_total = ?, estado = ? WHERE id = ?";
    conexao.query(sql, [dados.id_cliente, dados.data_compra, dados.valor_total, dados.estado, id], callback);
}

export function deletar(id, callback) {
    conexao.query("DELETE FROM compra WHERE id = ?", [id], callback);
}
