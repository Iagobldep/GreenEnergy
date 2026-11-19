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
    const sql = "INSERT INTO produto (nome, descricao, imagem_url, preco, estoque, id_categoria) VALUES (?, ?, ?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.descricao, dados.imagem_url, dados.preco, dados.estoque, dados.id_categoria], callback);
}

export function atualizar (id, dados, callback) {
    const campos = ["nome = ?", "descricao = ?"];
    const valores = [dados.nome, dados.descricao];

    if (dados.imagem_url !== undefined) {
        campos.push("imagem_url = ?");
        valores.push(dados.imagem_url);
    }

    campos.push("preco = ?", "estoque = ?", "id_categoria = ?");
    valores.push(dados.preco, dados.estoque, dados.id_categoria, id);

    const sql = `UPDATE produto SET ${campos.join(", ")} WHERE id = ?`;
    conexao.query(sql, valores, callback);
}

export function deletar (id, callback) {
    const sql = "DELETE FROM produto WHERE id = ?";
    conexao.query(sql, [id], callback);
}