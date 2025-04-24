import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /colecoes/:id - Obter uma Coleção pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionById);

// POST /colecoes - Criar uma nova Coleção
collectionRouter.post("/", CollectionController.createCollection);

// PUT /colecoes/:id - Atualizar uma Coleção
collectionRouter.put("/:id", CollectionController.updateCollection);

// DELETE /personagens/:id - Remover um Personagem
// personagensRouter.delete("/:id", PersonagemController.deletePersonagem);

export default collectionRouter;
