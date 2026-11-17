export function configurarNavegacaoAutenticada() {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    const linkLogin = document.querySelector(".login-link");
    const linkCadastro = document.querySelector(".cadastro-link");

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
