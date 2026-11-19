export async function atualizarContadorCarrinho(cliente) {
    const contador = document.querySelector(".contador-carrinho");
    if (!contador) return;

    if (!cliente) {
        contador.textContent = "0";
        contador.hidden = true;
        return;
    }

    try {
        const respostaCarrinho = await fetch(
            `http://localhost:3000/carrinhos/cliente/${cliente.id}`
        );
        const carrinho = await respostaCarrinho.json();
        if (!respostaCarrinho.ok) {
            throw new Error(carrinho.msg || "Não foi possível carregar o carrinho");
        }

        const respostaItens = await fetch(
            `http://localhost:3000/itens-carrinho/carrinho/${carrinho.id}`
        );
        const dadosCarrinho = await respostaItens.json();
        if (!respostaItens.ok) {
            throw new Error(dadosCarrinho.msg || "Não foi possível carregar os itens do carrinho");
        }

        const quantidade = dadosCarrinho.itens.reduce(
            (total, item) => total + item.quantidade,
            0
        );
        contador.textContent = String(quantidade);
        contador.hidden = quantidade === 0;
        contador.parentElement.setAttribute(
            "aria-label",
            `Carrinho, ${quantidade} ${quantidade === 1 ? "item" : "itens"}`
        );
    } catch (erro) {
        console.error("Erro ao atualizar o contador do carrinho:", erro);
    }
}

export function configurarNavegacaoAutenticada() {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    const linkLogin = document.querySelector(".login-link");
    const linkCadastro = document.querySelector(".cadastro-link");

    atualizarContadorCarrinho(cliente);

    if (!cliente || !linkLogin) {
        return cliente;
    }

    linkLogin.textContent = "Sair";
    linkLogin.href = "#";
    linkCadastro?.remove();

    linkLogin.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("cliente");
        window.location.reload();
    });

    return cliente;
}
