const formulario = document.querySelector("#formLogin");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const mensagem = document.querySelector("#mensagemLogin");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = {
        email: email.value.trim(),
        senha: senha.value
    };

    mensagem.textContent = "Entrando...";
    mensagem.className = "";

    try {
        const resposta = await fetch("http://localhost:3000/clientes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = resultado.msg || "Email ou senha inválidos.";
            mensagem.className = "erro";
            return;
        }

        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.className = "sucesso";

        formulario.reset();

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);

    } catch (erro) {
        mensagem.textContent = "Não foi possível conectar à API.";
        mensagem.className = "erro";
        localStorage.setItem("cliente", JSON.stringify(resultado.cliente));
    }
});