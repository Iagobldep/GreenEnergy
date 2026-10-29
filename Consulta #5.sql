
CREATE DATABASE greenenergy;
USE greenenergy;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20)
);

CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    id_categoria INT,
    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id)
);

CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL UNIQUE,
    CONSTRAINT fk_carrinho_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id)
);

CREATE TABLE item_carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT fk_item_carrinho
        FOREIGN KEY (id_carrinho)
        REFERENCES carrinho(id),
    CONSTRAINT fk_item_carrinho_produto
        FOREIGN KEY (id_produto)
        REFERENCES produto(id)
);

CREATE TABLE compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(30) DEFAULT 'pendente',
    CONSTRAINT fk_compra_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id)
);

CREATE TABLE item_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_itemcompra
        FOREIGN KEY (id_compra)
        REFERENCES compra(id),
    CONSTRAINT fk_item_produto
        FOREIGN KEY (id_produto)
        REFERENCES produto(id)
);

CREATE TABLE nota_fiscal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    data_emissao DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    CONSTRAINT fk_notafiscal_compra
        FOREIGN KEY (id_compra)
        REFERENCES compra(id)
);

SHOW TABLES;
