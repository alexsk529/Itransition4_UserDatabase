import {Router} from 'express';

import UserController from "../controllers/UserController.js";

const routerMain = Router();

routerMain.get('/data', UserController.getData);
routerMain.delete('/delete/:id',UserController.deleteSelected)
routerMain.patch('/block/:id', UserController.blockUnblock)
routerMain.patch('/unblock/:id', UserController.blockUnblock)

export {routerMain as default}