const carousel = document.querySelector("#carousel");
const mensagemProdutos = document.querySelector("#mensagemProdutos");
const API_PRODUTOS = "http://localhost:3000/produtos";

function criarCardProduto(produto) {
    const card = document.createElement("article");
    card.className = "product-card";

    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.setAttribute("aria-hidden", "true");
    visual.textContent = "🌿";

    const informacoes = document.createElement("div");
    informacoes.className = "product-info";

    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;

    const preco = document.createElement("strong");
    preco.className = "product-price";
    preco.textContent = Number(produto.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const estoque = document.createElement("span");
    estoque.className = "product-stock";
    estoque.textContent = `Disponíveis: ${produto.estoque}`;

    informacoes.append(titulo, descricao, preco, estoque);
    card.append(visual, informacoes);

    return card;
}

async function carregarProdutos() {
    try {
        const resposta = await fetch(API_PRODUTOS);

        if (!resposta.ok) {
            throw new Error(`A API respondeu com o status ${resposta.status}.`);
        }

        const produtos = await resposta.json();
        if (!Array.isArray(produtos)) {
            throw new Error("A resposta da API não contém uma lista de produtos.");
        }

        if (produtos.length === 0) {
            mensagemProdutos.textContent = "Nenhum produto cadastrado.";
            return;
        }

        mensagemProdutos.remove();
        carousel.append(...produtos.map(criarCardProduto));
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        mensagemProdutos.textContent =
            "Não foi possível carregar os produtos. Verifique se a API está em execução.";
    }
}

document.querySelector("#produtos-anteriores").addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: "smooth" });
});

document.querySelector("#proximos-produtos").addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: "smooth" });
});

carregarProdutos();