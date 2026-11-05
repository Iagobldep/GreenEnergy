import { Router } from "express";
import * as clientesController from "../controllers/clientesController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", clientesController.listar);
router.get("/:id", validarId, clientesController.buscarPorId);
router.post("/", clientesController.criar);
router.put("/:id", validarId, clientesController.atualizar);
router.delete("/:id", validarId, clientesController.deletar);

export default router;