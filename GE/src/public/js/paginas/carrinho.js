import { configurarNavegacaoAutenticada } from "./navegacao.js";

const itensCarrinho = document.querySelector("#itensCarrinho");
const mensagemCarrinho = document.querySelector("#mensagemCarrinho");
const finalizarCompra = document.querySelector("#finalizarCompra");
finalizarCompra.disabled = true;
const clienteSalvo = configurarNavegacaoAutenticada();

async function atualizarQuantidadeItem(url, idCarrinho, idProduto, quantidade) {
    try {
        const resposta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id_carrinho: idCarrinho,
                id_produto: idProduto,
                quantidade
            })
        });
        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagemCarrinho.textContent =
                resultado.msg || `Não foi possível atualizar o item (HTTP ${resposta.status})`;
            return;
        }

        window.location.reload();
    } catch (erro) {
        console.error("Erro ao atualizar a quantidade:", erro);
        mensagemCarrinho.textContent = "Não foi possível atualizar o item. Tente novamente.";
    }
}

async function carregarCarrinho() {
    if (!clienteSalvo) {
        mensagemCarrinho.textContent = "Faça login para ver seu carrinho";
        return;
    }

    try {
        const API_CARRINHO = `http://localhost:3000/carrinhos/cliente/${clienteSalvo.id}`;
        const resposta_car = await fetch(API_CARRINHO);
        const carrinho = await resposta_car.json();

        if (!resposta_car.ok) {
            throw new Error(carrinho.msg || "Não foi possível encontrar seu carrinho");
        }

        const API_ITENS = `http://localhost:3000/itens-carrinho/carrinho/${carrinho.id}`;
        const resposta_ic = await fetch(API_ITENS);
        const itens_carrinho = await resposta_ic.json();

        if (!resposta_ic.ok) {
            throw new Error(itens_carrinho.msg || "Não foi possível carregar os itens do carrinho");
        }

        if (itens_carrinho.itens.length === 0) {
            mensagemCarrinho.textContent = "Seu carrinho está vazio";
            return;
        }

        finalizarCompra.disabled = false;

        itens_carrinho.itens.forEach(item => {
            const card = document.createElement('article');

            const visual = document.createElement('div');
            visual.className = 'product-visual';

            if (item.imagem_url) {
                const imagem = document.createElement('img');
                imagem.src = item.imagem_url;
                imagem.alt = item.nome_produto;
                imagem.loading = 'lazy';
                imagem.addEventListener('error', () => {
                    visual.textContent = '🌿';
                });
                visual.append(imagem);
            } else {
                visual.textContent = '🌿';
                visual.setAttribute('aria-hidden', 'true');
            }

            const nome = document.createElement('h2');
            nome.textContent = item.nome_produto;

            const quantidade = document.createElement('p');
            quantidade.textContent = item.quantidade;

            const subtotal = document.createElement('strong');
            subtotal.textContent = Number(item.subtotal).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });

            const opcoes = document.createElement('div');
            const API_ITEM_ID = `http://localhost:3000/itens-carrinho/${item.id}`;

            const adicionar = document.createElement('button');
            adicionar.textContent = "+";
            adicionar.setAttribute('aria-label', `Adicionar uma unidade de ${item.nome_produto}`);

            adicionar.addEventListener('click', async () => {
                await atualizarQuantidadeItem(
                    API_ITEM_ID,
                    itens_carrinho.id_carrinho,
                    item.id_produto,
                    item.quantidade + 1
                );
            });

            const diminuir = document.createElement('button');
            diminuir.textContent = "-";
            diminuir.setAttribute('aria-label', `Diminuir uma unidade de ${item.nome_produto}`);

            diminuir.addEventListener('click', async () => {
                if (item.quantidade === 1) {
                    const resposta_men = await fetch(API_ITEM_ID, {
                        method: 'DELETE'
                    });

                    if (resposta_men.ok) {
                        window.location.reload();
                    } else {
                        mensagemCarrinho.textContent = "Erro ao remover item";
                    }

                    return;
                }

                await atualizarQuantidadeItem(
                    API_ITEM_ID,
                    itens_carrinho.id_carrinho,
                    item.id_produto,
                    item.quantidade - 1
                );
            });

            const excluir = document.createElement('button');
            excluir.textContent = "🗑️";
            excluir.setAttribute('aria-label', `Remover ${item.nome_produto} do carrinho`);

            excluir.addEventListener('click', async () => {
                const resposta_del = await fetch(API_ITEM_ID, {
                    method: 'DELETE'
                });

                if (resposta_del.ok) {
                    window.location.reload();
                } else {
                    mensagemCarrinho.textContent = "Erro ao remover item";
                }
            });

            opcoes.append(adicionar, diminuir, excluir);
            card.append(visual, nome, quantidade, subtotal, opcoes);
            itensCarrinho.append(card);
        });

        const total = document.createElement('strong');
        total.textContent = Number(itens_carrinho.total).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        itensCarrinho.append(total);
    } catch (erro) {
        console.error("Erro ao carregar o carrinho:", erro);
        mensagemCarrinho.textContent = erro.message || "Não foi possível carregar o carrinho";
    }
}

finalizarCompra.addEventListener('click', async () => {
    if (!clienteSalvo) {
        mensagemCarrinho.textContent = "Faça login para finalizar a compra";
        return;
    }

    window.location.href = "checkout.html";
});

carregarCarrinho();