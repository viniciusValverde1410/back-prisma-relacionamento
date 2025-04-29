import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt.js";

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
}

export default new AuthController();
