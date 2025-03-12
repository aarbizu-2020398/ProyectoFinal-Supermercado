<<<<<<< HEAD

import { Router } from 'express';
import { realizarCompra, listarCompras, obtenerCompraPorId,  editarCompra, eliminarCompra } from './compra.controller.js';
import { verificarToken } from '../middlewares/autenticacion.js';

const router = Router();


router.post('/', verificarToken, realizarCompra);


router.get('/', verificarToken, listarCompras);


router.get('/:id', verificarToken, obtenerCompraPorId);


router.put('/:id', verificarToken, editarCompra);


router.delete('/:id', verificarToken, eliminarCompra);
=======
import { Router } from 'express';
import { realizarCompra } from './compra.controller.js';


const router = Router();

router.post('/', realizarCompra);
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

export default router;
