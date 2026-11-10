import conexao from "../../db.js";

export function listar(callback) {
    conexao.query("SELECT * FROM compra", callback);
}

export function buscarPorId(id, callback) {
    conexao.query("SELECT * FROM compra WHERE id = ?", [id], callback);
}

/*
Implemente um endpoint específico, por exemplo `POST /compras/finalizar`, nos arquivos `comprasRoutes.js`, `comprasController.js` e `comprasModel.js`.

O fluxo deve ser:

1. Receber o cliente (idealmente identificado por autenticação) e encontrar o carrinho dele. **Não confie em preço nem total enviados pelo front-end.**
2. Iniciar uma transação no banco.
3. Ler os itens do carrinho e consultar cada produto no banco, bloqueando essas linhas durante a operação (`SELECT ... FOR UPDATE`).
4. Se o carrinho estiver vazio, algum produto não existir ou o estoque for insuficiente, interromper e fazer `ROLLBACK`.
5. Calcular o total com os preços atuais do banco.
6. Inserir a compra em `compra` e cada produto/quantidade/preço histórico em `item_compra`.
7. Subtrair as quantidades do estoque e criar a nota fiscal ligada à compra.
8. Apagar os itens do carrinho e só então fazer `COMMIT`.
9. Se qualquer etapa falhar, fazer `ROLLBACK`, para não deixar compra, estoque ou nota parcialmente atualizados.

As tabelas necessárias já estão no `database.sql`. Os models de compra e itens da compra hoje fazem operações individuais; a finalização precisa coordená-las numa única transação. No teste, confira tanto compra concluída quanto estoque insuficiente e falha no meio do processo.
 */

export function buscarItensDeCompra(id, callback) {
    conexao.query("SELECT * FROM item_compra WHERE id_compra = ?", [id], callback);
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
