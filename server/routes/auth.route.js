import {Router} from 'express';
import {check} from "express-validator";

import UserController from "../controllers/UserController.js";

const router = Router();


router.post('/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('firstName', 'Type in your name').isLength({min:1}),
        check('lastName', 'Type in your name').isLength({min:1}),
        check('password', 'The password length must be at least one symbol').isLength({min: 1})
    ],
    UserController.signup);

router.post('/signin',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    UserController.signin);


export {router as default}
