import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    // Listar todos os usuários
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            res.json(users);
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).json({ error: "Erro ao listar usuários" });
        }
    }

    //Registar um novo usuário
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            //Validação básica
            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json({ error: "Os campos nome, email e senha são obrigatórios!" });
            }

            // Verificar se o usuário já existe
            const userExists = await UserModel.findByEmail(email);
            if (userExists) {
                return res.status(400).json({ error: "Email já cadastrado!" });
            }

            //Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            //Criar o objeto do usuário
            const data = {
                name,
                email,
                password: hashedPassword,
            };

            //Criar o usuário
            const user = await UserModel.create(data);

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
                user,
            });

        } catch (error) {
            console.error("Erro ao criar um novo usuário:", error);
            res.status(500).json({ error: "Erro ao criar um novo usuário" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            //Validação básica
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: "Os campos email e senha são obrigatórios!" });
            }

            // Verificar se o usuário existe
            const userExists = await UserModel.findByEmail(email);
            if (!userExists) {
                return res.status(401).json({ error: "Credenciais inválidas!" });
            }

            //Verificar a senha 
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Credenciais inválidas!" });
            }

                    //gerar Token JWT
        const token = jwt.sign(
            {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email
            },
            process.env.JWT_secret,
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            userExists,
        });

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao fazer login" });
        }
    }
}

export default new AuthController();
