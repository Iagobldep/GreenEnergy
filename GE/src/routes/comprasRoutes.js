import { Router } from "express";
import * as comprasController from "../controllers/comprasController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.post("/finalizar", comprasController.finalizar);
router.get("/", comprasController.listar);
router.get("/:id", validarId, comprasController.buscarPorId);
router.post("/", comprasController.criar);
router.put("/:id", validarId, comprasController.atualizar);
router.delete("/:id", validarId, comprasController.deletar);

export default router;
