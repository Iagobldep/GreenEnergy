import conexao from "../../db.js";

export function listar(callback) {
    conexao.query("SELECT * FROM nota_fiscal", callback);
}

export function buscarPorId(id, callback) {
    conexao.query("SELECT * FROM nota_fiscal WHERE id = ?", [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO nota_fiscal (id_compra, data_emissao, valor_total, estado) VALUES (?, COALESCE(?, CURRENT_TIMESTAMP), ?, ?)";
    conexao.query(sql, [dados.id_compra, dados.data_emissao, dados.valor_total, dados.estado], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE nota_fiscal SET id_compra = ?, data_emissao = ?, valor_total = ?, estado = ? WHERE id = ?";
    conexao.query(sql, [dados.id_compra, dados.data_emissao, dados.valor_total, dados.estado, id], callback);
}

export function deletar(id, callback) {
    conexao.query("DELETE FROM nota_fiscal WHERE id = ?", [id], callback);
}
