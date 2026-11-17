import { Router } from "express";
import * as carrinhoController from "../controllers/carrinhoController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", carrinhoController.listar);
router.get("/:id", validarId, carrinhoController.buscarPorId);
router.get("/cliente/:id", validarId, carrinhoController.buscarPorCliente);
router.post("/", carrinhoController.criar);
router.put("/:id", validarId, carrinhoController.atualizar);
router.delete("/:id", validarId, carrinhoController.deletar);

export default router;