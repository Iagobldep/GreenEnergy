import { Router } from "express";
import * as itensCompraController from "../controllers/itensCompraController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", itensCompraController.listar);
router.get("/:id", validarId, itensCompraController.buscarPorId);
router.post("/", itensCompraController.criar);
router.put("/:id", validarId, itensCompraController.atualizar);
router.delete("/:id", validarId, itensCompraController.deletar);

export default router;
