import { atualizarContadorCarrinho, configurarNavegacaoAutenticada } from "./navegacao.js";

const lista = document.querySelector('#listaProdutos');
const mensagem = document.querySelector('#mensagemProdutos');
const API_PRODUTOS = 'http://localhost:3000/produtos';
const API_CATEGORIAS = 'http://localhost:3000/categorias';

const cliente = configurarNavegacaoAutenticada();

function criarCard(produto) {
    const card = document.createElement('article');

    const nome = document.createElement('h2')
    nome.textContent = produto.nome

    const descricao = document.createElement('p');
    descricao.textContent = produto.descricao;

    const preco = document.createElement('strong');
    preco.textContent = Number(produto.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const adicionarProduto = document.createElement('button');
    adicionarProduto.textContent = "Adicionar ao carrinho";

    adicionarProduto.addEventListener("click", async () => {
        if (!cliente) {
            window.location.href = "../formularios/login.html"
            return;
        }

        const API_CARRINHO = `http://localhost:3000/carrinhos/cliente/${cliente.id}`;
        const resposta_car = await fetch(API_CARRINHO);
        const carrinho = await resposta_car.json();

        const API_ITENS_CARRINHO = `http://localhost:3000/itens-carrinho/`;
        const resposta_ic = await fetch(API_ITENS_CARRINHO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_carrinho: carrinho.id,
                id_produto: produto.id,
                quantidade: 1
            })
        });

        const itens = await resposta_ic.json();
        if (!resposta_ic.ok) {
            throw new Error(itens.msg || "Não foi possível adicionar o produto ao carrinho");
        }
        await atualizarContadorCarrinho(cliente);
    });

    let visual = document.createElement('div');
    visual.className = 'product-visual';
    visual.textContent = '🌿';

    if (produto.imagem_url) {
        visual = document.createElement('img');
        visual.src = produto.imagem_url;
        visual.alt = produto.nome;
    }

    card.append(visual, nome, descricao, preco, adicionarProduto);
    return card;
}

async function carregarProdutos() {
    const resposta_p = await fetch(API_PRODUTOS);
    const produtos = await resposta_p.json();
    console.log(produtos);

    const resposta_c = await fetch(API_CATEGORIAS);
    const categorias = await resposta_c.json();
    console.log(categorias);

    mensagem.textContent = "";

    categorias.forEach(categoria => {
        const secao = document.createElement('section');

        const nome = document.createElement('h2');
        nome.textContent = categoria.nome;

        secao.append(nome);

        const produtosCategoria = produtos.filter(
            produto => Number(produto.id_categoria) === Number(categoria.id)
        );

        produtosCategoria.forEach(produto => {
            secao.append(criarCard(produto));
        })

        lista.append(secao);
    });
}

carregarProdutos();
