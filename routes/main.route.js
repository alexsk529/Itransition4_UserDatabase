import {Router} from 'express';

import UserController from "../controllers/UserController.js";

const routerMain = Router();

routerMain.get('/data', UserController.getData);

routerMain.delete('/:id',UserController.deleteSelected)

export {routerMain as default}