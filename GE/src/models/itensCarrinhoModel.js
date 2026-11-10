import conexao from "../../db.js";

export function listar(callback) {
    const sql = `
        SELECT item_carrinho.id, item_carrinho.id_carrinho, item_carrinho.id_produto,
               item_carrinho.quantidade, produto.nome AS nome_produto, produto.preco,
               produto.preco * item_carrinho.quantidade AS subtotal
        FROM item_carrinho
        INNER JOIN produto ON produto.id = item_carrinho.id_produto
        ORDER BY item_carrinho.id
    `;
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = `
        SELECT item_carrinho.id, item_carrinho.id_carrinho, item_carrinho.id_produto,
               item_carrinho.quantidade, produto.nome AS nome_produto, produto.preco,
               produto.preco * item_carrinho.quantidade AS subtotal
        FROM item_carrinho
        INNER JOIN produto ON produto.id = item_carrinho.id_produto
        WHERE item_carrinho.id = ?
    `;
    conexao.query(sql, [id], callback);
}

export function listarPorCarrinho(idCarrinho, callback) {
    const sql = `
        SELECT carrinho.id AS id_carrinho,
               item_carrinho.id AS id_item,
               item_carrinho.id_produto,
               item_carrinho.quantidade,
               produto.nome AS nome_produto,
               produto.preco,
               produto.preco * item_carrinho.quantidade AS subtotal,
               COALESCE((
                   SELECT SUM(produto_total.preco * item_total.quantidade)
                   FROM item_carrinho AS item_total
                   INNER JOIN produto AS produto_total ON produto_total.id = item_total.id_produto
                   WHERE item_total.id_carrinho = carrinho.id
               ), 0) AS total
        FROM carrinho
        LEFT JOIN item_carrinho ON item_carrinho.id_carrinho = carrinho.id
        LEFT JOIN produto ON produto.id = item_carrinho.id_produto
        WHERE carrinho.id = ?
        ORDER BY item_carrinho.id
    `;
    conexao.query(sql, [idCarrinho], callback);
}

export function criar(dados, callback) {
    validarDisponibilidade(dados.id_carrinho, dados.id_produto, dados.quantidade, undefined, (erro, disponibilidade) => {
        if (erro) return callback(erro);

        const itemExistente = disponibilidade.itens[0];
        if (itemExistente) {
            const quantidadeAtualizada = disponibilidade.itens.reduce(
                (total, item) => total + Number(item.quantidade),
                dados.quantidade
            );
            const sql = "UPDATE item_carrinho SET quantidade = ? WHERE id = ?";
            return conexao.query(sql, [quantidadeAtualizada, itemExistente.id], (erroAtualizacao, resultado) => {
                if (erroAtualizacao) return callback(erroAtualizacao);

                const idsDuplicados = disponibilidade.itens.slice(1).map((item) => item.id);
                if (idsDuplicados.length === 0) {
                    return callback(null, { ...resultado, insertId: itemExistente.id, atualizado: true });
                }

                conexao.query(
                    "DELETE FROM item_carrinho WHERE id IN (?)",
                    [idsDuplicados],
                    (erroExclusao) => {
                        if (erroExclusao) return callback(erroExclusao);
                        return callback(null, { ...resultado, insertId: itemExistente.id, atualizado: true });
                    }
                );
            });
        }

        const sql = "INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade) VALUES (?, ?, ?)";
        conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade], callback);
    });
}

export function atualizar(id, dados, callback) {
    conexao.query("SELECT id FROM item_carrinho WHERE id = ?", [id], (erro, itens) => {
        if (erro) return callback(erro);
        if (itens.length === 0) return callback(null, { affectedRows: 0 });

        validarDisponibilidade(dados.id_carrinho, dados.id_produto, dados.quantidade, id, (erroDisponibilidade) => {
            if (erroDisponibilidade) return callback(erroDisponibilidade);

            const sql = "UPDATE item_carrinho SET id_carrinho = ?, id_produto = ?, quantidade = ? WHERE id = ?";
            conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade, id], callback);
        });
    });
}

export function deletar(id, callback) {
    conexao.query("DELETE FROM item_carrinho WHERE id = ?", [id], callback);
}
