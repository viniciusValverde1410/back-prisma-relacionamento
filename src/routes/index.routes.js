import express from 'express'

// Importar todas as rotas 
import authRouter from './auth.routes.js'
import animesRouter from './animeRoutes.js'
import personagensRouter from './personagemRoutes.js'
import collectionRouter from './collectionRoutes.js'
import cardRouter from './cardRoutes.js'

import authMiddleware from '../middleware/authMiddleware.js'

const routes = express.Router();

// Rotas públicas 
routes.use("/auth" , authRouter);

//Rotas protegidas
routes.use(authMiddleware)

routes.use("/animes" , animesRouter);
routes.use("/personagens" , personagensRouter);
routes.use("/colecoes" ,collectionRouter);
routes.use("/cartas" ,cardRouter);

export default routes