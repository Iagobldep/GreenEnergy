// Este script cuida do formulário de login do front-end.
// Ele pega os elementos do HTML, valida o preenchimento e envia os dados para a API.

// Seleciona o formulário de login e os campos de entrada utilizados pelo usuário.
const formulario = document.querySelector("#formLogin");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const mensagem = document.querySelector("#mensagemLogin");

// Quando o usuário envia o formulário, executa toda a lógica de autenticação.
formulario.addEventListener("submit", async (evento) => {
    // Evita o comportamento padrão do navegador de recarregar a página.
    evento.preventDefault();

    // Verifica se os campos obrigatórios do formulário foram preenchidos corretamente.
    // Se algum campo estiver inválido, a função para por aqui.
    if (!formulario.reportValidity()) {
        return;
    }

    // Cria um objeto com os dados que serão enviados para a API de login.
    // O trim() remove espaços extras antes e depois do e-mail.
    const dados = {
        email: email.value.trim(),
        senha: senha.value,
    };

    // Exibe uma mensagem de carregamento para o usuário enquanto a requisição está sendo feita.
    mensagem.textContent = "Entrando...";
    mensagem.className = "";

    try {
        // Faz a requisição POST para o backend, no endpoint de login do cliente.
        // O fetch envia os dados em JSON para o servidor.
        const resposta = await fetch("http://localhost:3000/clientes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        // Converte a resposta da API em objeto JavaScript para ler a mensagem retornada.
        const resultado = await resposta.json();

        // Se o servidor responder com erro (status 400, 401, 500 etc.),
        // mostra a mensagem enviada pelo backend ou uma mensagem padrão.
        if (!resposta.ok) {
            mensagem.textContent = resultado.msg || "Email ou senha inválidos.";
            mensagem.className = "erro";
            return;
        }

        // Se a autenticação foi bem-sucedida, mostra a mensagem de sucesso.
        // O backend normalmente retorna algo como "Login realizado com sucesso".
        mensagem.textContent = resultado.msg || "Login realizado com sucesso!";
        mensagem.className = "sucesso";

        // Limpa o formulário após o sucesso do login.
        formulario.reset();
    } catch (erro) {
        // Caso ocorra algum erro na comunicação com a API (servidor fora, URL errada, etc.),
        // registra o erro no console e mostra uma mensagem amigável ao usuário.
        console.error("Erro ao enviar login:", erro);
        mensagem.textContent = "Não foi possível conectar à API. Verifique se o servidor está rodando.";
        mensagem.className = "erro";
    }
});