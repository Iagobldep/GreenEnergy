import { Router } from "express";
import * as notasFiscaisController from "../controllers/notasFiscaisController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", notasFiscaisController.listar);
router.get("/:id", validarId, notasFiscaisController.buscarPorId);
router.post("/", notasFiscaisController.criar);
router.put("/:id", validarId, notasFiscaisController.atualizar);
router.delete("/:id", validarId, notasFiscaisController.deletar);

export default router;
