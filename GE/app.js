import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import conexao from './db.js';

import clientesRoutes from './src/routes/clientesRoutes.js';
import categoriasRoutes from './src/routes/categoriasRoutes.js';
import produtosRoutes from './src/routes/produtosRoutes.js';
import carrinhoRoutes from './src/routes/carrinhoRoutes.js';
import itensCarrinhoRoutes from './src/routes/itensCarrinhoRoutes.js';
import comprasRoutes from './src/routes/comprasRoutes.js';
import itensCompraRoutes from './src/routes/itensCompraRoutes.js';
import notasFiscaisRoutes from './src/routes/notasFiscaisRoutes.js';
import { tratarErro } from './src/middlewares/tratarErro.js';

dotenv.config();

const app = express();
const PORTA = Number(process.env.PORTA || 3000);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API do GameHub funcionando" });
});

app.use("/clientes", clientesRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);
app.use("/carrinhos", carrinhoRoutes);
app.use("/itens-carrinho", itensCarrinhoRoutes);
app.use("/compras", comprasRoutes);
app.use("/itens-compra", itensCompraRoutes);
app.use("/notas-fiscais", notasFiscaisRoutes);

app.use(tratarErro);

app.use((req, res) => {
    res.status(404).json({ msg: "Rota não encontrada" });
});

conexao.connect((erro) => {
    if (erro) {
        console.error(`Erro ao conectar ao banco de dados: ${erro.code || erro.message}`);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados greenenergy")

    const servidor = app.listen(PORTA, () => {
        console.log(`Servidor rodando em http://localhost:${PORTA}`);
    });

    servidor.on("error", (erro) => {
        console.log(`Erro ao conectar ao servidor: ${erro.code || erro.message}`);
        conexao.end(() => process.exit(1));
    });
});