import * as usuarios from "../controllers/usuarios.js"
import { Router } from "express";

const usuariosRouter = Router()
usuariosRouter.post('/register', usuarios.register);
usuariosRouter.post('/login', usuarios.login);
export default usuariosRouter