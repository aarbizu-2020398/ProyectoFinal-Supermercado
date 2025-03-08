import { Router } from 'express';
import { realizarCompra } from './compra.controller.js';


const router = Router();

router.post('/', realizarCompra);

export default router;
