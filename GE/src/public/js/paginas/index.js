<<<<<<< HEAD
const carrossel = document.querySelector("#carousel");

function moverCarrossel(direcao) {
    carrossel.scrollBy({
        left: direcao * 320,
        behavior: "smooth"
    });
}

window.moverCarrossel = moverCarrossel;

const cliente = JSON.parse(localStorage.getItem("cliente"));

const nomeCliente = document.querySelector("#nomeCliente");
const btnLogin = document.querySelector("#btnLogin");
const btnCadastro = document.querySelector("#btnCadastro");
const btnSair = document.querySelector("#btnSair");

if (cliente) {
    nomeCliente.textContent = "Olá, " + cliente.nome;
    btnLogin.style.display = "none";
    btnCadastro.style.display = "none";
    btnSair.hidden = false;
}

btnSair.addEventListener("click", () => {
    localStorage.removeItem("cliente");
    window.location.reload();
});

async function carregarProdutos() {
    try {
        const resposta = await fetch("http://localhost:3000/produtos");
        const produtos = await resposta.json();

        if (!resposta.ok || produtos.length === 0) {
            return;
        }

        carrossel.innerHTML = "";

        produtos.forEach(produto => {
            const card = document.createElement("article");
            card.className = "product-card";

            const imagem = document.createElement("img");
            imagem.src = produto.imagem;
            imagem.alt = produto.nome;

            const info = document.createElement("div");
            info.className = "product-info";

            const nome = document.createElement("h3");
            nome.textContent = produto.nome;

            const descricao = document.createElement("p");
            descricao.textContent = produto.descricao;

            const preco = document.createElement("h3");
            preco.textContent = Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            const link = document.createElement("a");
            link.href = "catalogo.html";
            link.textContent = "Conhecer produto →";

            info.append(nome, descricao, preco, link);
            card.append(imagem, info);
            carrossel.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

=======
// Procura no HTML a área onde os cards dos produtos serão colocados.
const carousel = document.querySelector("#carousel");

// Elemento que mostra mensagens como "Carregando produtos..." ou erros.
const mensagemProdutos = document.querySelector("#mensagemProdutos");

// Endereço da rota da API que retorna todos os produtos cadastrados.
const API_PRODUTOS = "http://localhost:3000/produtos";

// Cria e devolve um card HTML preenchido com os dados de um produto.
function criarCardProduto(produto) {
    // O article representa um card individual de produto.
    const card = document.createElement("article");
    card.className = "product-card";

    // Exibe a imagem cadastrada ou um visual decorativo quando não há URL.
    let visual;
    if (produto.imagem_url) {
        visual = document.createElement("img");
        visual.src = produto.imagem_url;
        visual.alt = produto.nome;
        visual.loading = "lazy";
    } else {
        visual = document.createElement("div");
        visual.className = "product-visual";
        visual.setAttribute("aria-hidden", "true");
        visual.textContent = "🌿";
    }

    // Agrupa nome, descrição, preço e estoque.
    const informacoes = document.createElement("div");
    informacoes.className = "product-info";

    // Cria o título do produto. textContent insere texto sem interpretá-lo como HTML.
    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    // Mostra a descrição cadastrada no banco.
    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;

    // Converte o preço para número e formata como moeda brasileira (R$).
    const preco = document.createElement("strong");
    preco.className = "product-price";
    preco.textContent = Number(produto.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // Mostra quantas unidades estão disponíveis em estoque.
    const estoque = document.createElement("span");
    estoque.className = "product-stock";
    estoque.textContent = `Disponíveis: ${produto.estoque}`;

    // Adiciona os elementos de informação dentro do bloco de informações.
    informacoes.append(titulo, descricao, preco, estoque);

    // Adiciona o visual e as informações no card.
    card.append(visual, informacoes);

    // Devolve o card pronto para ser inserido no carrossel.
    return card;
}

// Busca os dados na API e cria os cards correspondentes.
async function carregarProdutos() {
    try {
        // Faz uma requisição HTTP GET para a rota de produtos.
        // await espera a resposta antes de continuar.
        const resposta = await fetch(API_PRODUTOS);

        // fetch não considera respostas HTTP de erro (como 404 ou 500) uma falha;
        // por isso verificamos o status e lançamos um erro explicitamente.
        if (!resposta.ok) {
            throw new Error(`A API respondeu com o status ${resposta.status}.`);
        }

        // Lê o corpo da resposta e converte o JSON em valores JavaScript.
        const produtos = await resposta.json();

        // Garante que a API realmente devolveu uma lista antes de tentar percorrê-la.
        if (!Array.isArray(produtos)) {
            throw new Error("A resposta da API não contém uma lista de produtos.");
        }

        // Se a lista estiver vazia, informa isso e não tenta criar cards.
        if (produtos.length === 0) {
            mensagemProdutos.textContent = "Nenhum produto cadastrado.";
            return;
        }

        // Remove a mensagem inicial de carregamento.
        mensagemProdutos.remove();

        // Cria um card para cada produto e adiciona todos ao carrossel.
        // map() transforma cada produto em um elemento; ... passa esses elementos
        // como argumentos individuais para append().
        carousel.append(...produtos.map(criarCardProduto));
    } catch (erro) {
        // Trata falhas de conexão, respostas de erro e problemas com o formato dos dados.
        console.error("Erro ao carregar produtos:", erro);
        mensagemProdutos.textContent =
            "Não foi possível carregar os produtos. Verifique se a API está em execução.";
    }
}

// Ao clicar na seta esquerda, rola o carrossel para os produtos anteriores.
document.querySelector("#produtos-anteriores").addEventListener("click", () => {
    // Move 80% da largura visível do carrossel com animação suave.
    carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: "smooth" });
});

// Ao clicar na seta direita, rola o carrossel para os próximos produtos.
document.querySelector("#proximos-produtos").addEventListener("click", () => {
    // Move 80% da largura visível do carrossel com animação suave.
    carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: "smooth" });
});

// Inicia o carregamento assim que o navegador executa este script.
>>>>>>> 0eb8bda38936e62187635c8633aadd810a896f7b
carregarProdutos();