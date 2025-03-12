
import { Router } from 'express';
import { realizarCompra, listarCompras, obtenerCompraPorId,  editarCompra, eliminarCompra } from './compra.controller.js';
import { verificarToken } from '../middlewares/autenticacion.js';

const router = Router();


router.post('/', verificarToken, realizarCompra);


router.get('/', verificarToken, listarCompras);


router.get('/:id', verificarToken, obtenerCompraPorId);


router.put('/:id', verificarToken, editarCompra);


router.delete('/:id', verificarToken, eliminarCompra);

export default router;
