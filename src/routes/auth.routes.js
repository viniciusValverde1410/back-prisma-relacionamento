import express from "express";

import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

// POST /users - Criar um novo Usuário
authRouter.post("/register",AuthController.register);

export default authRouter;
