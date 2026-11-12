const formulario = document.querySelector("#formCadastro");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const endereco = document.querySelector("#endereco");
const telefone = document.querySelector("#telefone");
const mensagem = document.querySelector("#mensagemCadastro");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value,
        endereco: endereco.value.trim(),
        telefone: telefone.value.trim()
    };

    mensagem.textContent = "Cadastrando...";
    mensagem.className = "";

    try {
        const resposta = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = resultado.msg || "Erro ao cadastrar.";
            mensagem.className = "erro";
            return;
        }

        mensagem.textContent = "Cadastro realizado com sucesso!";
        mensagem.className = "sucesso";

        formulario.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (erro) {
        mensagem.textContent = "Não foi possível conectar à API.";
        mensagem.className = "erro";
    }
});