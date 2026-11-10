import { Router } from "express";
import * as itensCarrinhoController from "../controllers/itensCarrinhoController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", itensCarrinhoController.listar);
router.get("/carrinho/:id", validarId, itensCarrinhoController.listarPorCarrinho);
router.get("/:id", validarId, itensCarrinhoController.buscarPorId);
router.post("/", itensCarrinhoController.criar);
router.put("/:id", validarId, itensCarrinhoController.atualizar);
router.delete("/:id", validarId, itensCarrinhoController.deletar);

export default router;
