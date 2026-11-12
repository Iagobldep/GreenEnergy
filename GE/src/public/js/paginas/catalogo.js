const lista = document.querySelector('#listaProdutos');
const mensagem = document.querySelector('#mensagemProdutos');
const API = 'http://localhost:3000/produtos';

function criarCard(produto) {
    const card = document.createElement('article');
    const nome = document.createElement('h2')
    nome.textContent = produto.nome

    const descricao = createElement('p');
    descricao.textContent = produto.descricao;

    card.append(nome, descricao);
    return card;
}