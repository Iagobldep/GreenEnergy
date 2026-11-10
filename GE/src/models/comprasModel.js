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

function erroDaRegra(status, message) {
    const erro = new Error(message);
    erro.status = status;
    return erro;
}

export async function finalizar(idCliente, callback) {
    try {
        const banco = conexao.promise();
        const [carrinhos] = await banco.query(
            "SELECT id FROM carrinho WHERE id_cliente = ?",
            [idCliente]
        );

        if (carrinhos.length === 0) {
            throw erroDaRegra(404, "Carrinho do cliente não encontrado");
        }

        const idCarrinho = carrinhos[0].id;
        const [linhas] = await banco.query(
            `SELECT item_carrinho.id_produto, item_carrinho.quantidade,
                    produto.nome, produto.preco, produto.estoque
             FROM item_carrinho
             INNER JOIN produto ON produto.id = item_carrinho.id_produto
             WHERE item_carrinho.id_carrinho = ?
             ORDER BY item_carrinho.id_produto`,
            [idCarrinho]
        );

        if (linhas.length === 0) {
            throw erroDaRegra(400, "Não é possível finalizar uma compra com o carrinho vazio");
        }

        const itensPorProduto = new Map();
        for (const linha of linhas) {
            const quantidade = Number(linha.quantidade);
            const estoque = Number(linha.estoque);
            const precoCentavos = Math.round(Number(linha.preco) * 100);

            if (!Number.isSafeInteger(quantidade) || quantidade <= 0) {
                throw erroDaRegra(400, `Quantidade inválida para ${linha.nome}`);
            }
            if (!Number.isSafeInteger(estoque) || estoque < 0 || quantidade > estoque) {
                throw erroDaRegra(409, `Estoque insuficiente para ${linha.nome}`);
            }
            if (!Number.isSafeInteger(precoCentavos) || precoCentavos < 0) {
                throw new Error(`Preço inválido no cadastro do produto ${linha.id_produto}`);
            }

            const item = itensPorProduto.get(linha.id_produto) || {
                id_produto: linha.id_produto,
                nome: linha.nome,
                quantidade: 0,
                estoque,
                precoCentavos
            };
            item.quantidade += quantidade;
            if (item.quantidade > item.estoque) {
                throw erroDaRegra(409, `Estoque insuficiente para ${item.nome}`);
            }
            itensPorProduto.set(linha.id_produto, item);
        }

        const itens = [...itensPorProduto.values()];
        const totalCentavos = itens.reduce(
            (total, item) => total + item.precoCentavos * item.quantidade,
            0
        );
        if (!Number.isSafeInteger(totalCentavos) || totalCentavos > 9999999999) {
            throw erroDaRegra(400, "O total da compra excede o limite permitido");
        }

        const total = totalCentavos / 100;
        const [resultadoCompra] = await banco.query(
            "INSERT INTO compra (id_cliente, valor_total, estado) VALUES (?, ?, 'pendente')",
            [idCliente, total]
        );
        const idCompra = resultadoCompra.insertId;

        for (const item of itens) {
            await banco.query(
                "INSERT INTO item_compra (id_compra, id_produto, quantidade, preco) VALUES (?, ?, ?, ?)",
                [idCompra, item.id_produto, item.quantidade, item.precoCentavos / 100]
            );

            const [resultadoEstoque] = await banco.query(
                "UPDATE produto SET estoque = estoque - ? WHERE id = ? AND estoque >= ?",
                [item.quantidade, item.id_produto, item.quantidade]
            );
            if (resultadoEstoque.affectedRows !== 1) {
                throw erroDaRegra(409, `Estoque insuficiente para ${item.nome}`);
            }
        }

        const [resultadoNota] = await banco.query(
            "INSERT INTO nota_fiscal (id_compra, valor_total, estado) VALUES (?, ?, 'emitida')",
            [idCompra, total]
        );

        await banco.query("DELETE FROM item_carrinho WHERE id_carrinho = ?", [idCarrinho]);

        callback(null, {
            id: idCompra,
            id_cliente: idCliente,
            valor_total: total,
            estado: "pendente",
            id_nota_fiscal: resultadoNota.insertId,
            itens: itens.map((item) => ({
                id_produto: item.id_produto,
                nome: item.nome,
                quantidade: item.quantidade,
                preco: item.precoCentavos / 100
            }))
        });
    } catch (erro) {
        callback(erro);
    }
}

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
