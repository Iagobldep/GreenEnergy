const formulario = document.querySelector("#formCadastro");
const senha = document.querySelector("#senha");
const confirmarSenha = document.querySelector("#confirmarSenha");
const mensagem = document.querySelector("#mensagemCadastro");

function conferirSenhas() {
    confirmarSenha.setCustomValidity(
        senha.value === confirmarSenha.value ? "" : "As senhas não coincidem."
    );
}

senha.addEventListener("input", conferirSenhas);
confirmarSenha.addEventListener("input", conferirSenhas);

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    conferirSenhas();

    if (!formulario.reportValidity()) {
        return;
    }

    const dados = {
        nome: formulario.elements.nome.value.trim(),
        email: formulario.elements.email.value.trim(),
        senha: senha.value,
        endereco: formulario.elements.endereco.value.trim(),
        telefone: formulario.elements.telefone.value.trim(),
    };

    mensagem.textContent = "Enviando cadastro...";
    mensagem.className = "";

    try {
        const resposta = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });
        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = resultado.msg || "Não foi possível realizar o cadastro.";
            mensagem.className = "erro";
            return;
        }

        mensagem.textContent = resultado.msg || "Cadastro realizado com sucesso!";
        mensagem.className = "sucesso";
        formulario.reset();
    } catch (erro) {
        console.error("Erro ao enviar cadastro:", erro);
        mensagem.textContent = "Não foi possível conectar à API. Verifique se o servidor está rodando.";
        mensagem.className = "erro";
    }
});