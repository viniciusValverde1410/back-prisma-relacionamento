import express from "express";

import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/",AuthController.getAllUsers)

// POST /users - Criar um novo Usuário
authRouter.post("/register",AuthController.register);
authRouter.post("/login",AuthController.login);

export default authRouter;
