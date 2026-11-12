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

carregarProdutos();