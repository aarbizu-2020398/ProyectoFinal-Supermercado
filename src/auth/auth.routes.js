<<<<<<< HEAD

import { Router } from 'express';
import { login, register } from './auth.controller.js';
=======
import { Router } from "express";
import { login, register } from "./auth.controller.js";
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
