import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/muter';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// "routes.use(authMiddleware)" foi definido como um middleware global, ou seja, valerá para as rotas depois dele.
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// "upload.single('file')" -> atuação do multer nas rotas.
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

export default routes;
