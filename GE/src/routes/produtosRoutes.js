import { Router } from "express";
import * as produtosController from "../controllers/produtosController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", produtosController.listar);
router.get("/:id", validarId, produtosController.buscarPorId);
router.post("/", produtosController.criar);
router.put("/:id", validarId, produtosController.atualizar);
router.delete("/:id", validarId, produtosController.deletar);

export default router;