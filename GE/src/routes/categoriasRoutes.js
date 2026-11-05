import { Router } from "express";
import * as categoriasController from "../controllers/categoriasController.js";
import { validarId } from "../middlewares/validarId.js";

const router = Router();

router.get("/", categoriasController.listar);
router.get("/:id", validarId, categoriasController.buscarPorId);
router.post("/", categoriasController.criar);
router.put("/:id", validarId, categoriasController.atualizar);
router.delete("/:id", validarId, categoriasController.deletar);

export default router;