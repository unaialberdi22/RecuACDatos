import { Router } from "express";
import usuariosRouter from "../routes/usuarios.js";
const router = Router();
//primer elemento es el modelo, y el segundo es el archivo la ruta importado anteriormente
router.use('/usuarios', usuariosRouter);

export default router;