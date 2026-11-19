import { configurarNavegacaoAutenticada } from "./navegacao.js";

const cliente = configurarNavegacaoAutenticada();
const formulario = document.querySelector("#formCheckout");
const cpf = document.querySelector("#cpf");
const tipoPagamento = document.querySelector("#tipoPagamento");
const totalCompra = document.querySelector("#totalCompra");
const mensagem = document.querySelector("#mensagemCheckout");
const confirmarCompra = document.querySelector("#confirmarCompra");

let carrinho;

function formatarCpf(valor) {
    const digitos = valor.replace(/\D/g, "").slice(0, 11);
    return digitos
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function mostrarErro(texto) {
    mensagem.textContent = texto;
    mensagem.className = "erro";
}

cpf.addEventListener("input", () => {
    cpf.value = formatarCpf(cpf.value);
});

async function carregarResumo() {
    if (!cliente) {
        window.location.href = "../formularios/login.html";
        return;
    }

    try {
        const respostaCarrinho = await fetch(
            `http://localhost:3000/carrinhos/cliente/${cliente.id}`
        );
        carrinho = await respostaCarrinho.json();
        if (!respostaCarrinho.ok) {
            throw new Error(carrinho.msg || "Não foi possível carregar o carrinho");
        }

        const respostaItens = await fetch(
            `http://localhost:3000/itens-carrinho/carrinho/${carrinho.id}`
        );
        const dados = await respostaItens.json();
        if (!respostaItens.ok || dados.itens.length === 0) {
            throw new Error("Seu carrinho está vazio");
        }

        totalCompra.textContent = Number(dados.total).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    } catch (erro) {
        mostrarErro(erro.message || "Não foi possível carregar o resumo da compra");
        confirmarCompra.disabled = true;
    }
}

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    confirmarCompra.disabled = true;
    mensagem.textContent = "Finalizando compra...";
    mensagem.className = "";

    try {
        const resposta = await fetch("http://localhost:3000/compras/finalizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_cliente: cliente.id,
                cpf: cpf.value,
                tipo_pagamento: tipoPagamento.value
            })
        });
        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.msg || "Não foi possível finalizar a compra");
        }

        mensagem.textContent =
            `Compra ${resultado.compra.codigo} finalizada. Nota fiscal ${resultado.compra.codigo_nota_fiscal}.`;
        mensagem.className = "sucesso";
        formulario.reset();
    } catch (erro) {
        mostrarErro(erro.message || "Não foi possível finalizar a compra");
        confirmarCompra.disabled = false;
    }
});

carregarResumo();
