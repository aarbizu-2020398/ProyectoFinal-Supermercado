<<<<<<< HEAD

import { Router } from 'express';
import { crearFactura, obtenerFacturas, obtenerFacturaPorId, editarFactura, eliminarFactura, exportarFactura } from './factura.controller.js';
import { verificarToken } from '../middlewares/autenticacion.js';

const router = Router();

router.post('/', verificarToken, crearFactura);
router.get('/', verificarToken, obtenerFacturas);
router.get('/:id', verificarToken, obtenerFacturaPorId);
router.put('/:id', verificarToken, editarFactura);
router.delete('/:id', verificarToken, eliminarFactura);


router.get('/:id/export', verificarToken, exportarFactura);
=======
import { Router } from 'express';
import { crearFactura, obtenerFacturas, obtenerFacturaPorId, obtenerHistorialDeCompras } from './factura.controller.js';

const router = Router();

router.post('/', crearFactura);
router.get('/', obtenerFacturas);
router.get('/:id', obtenerFacturaPorId);
router.get('/usuario/historial', obtenerHistorialDeCompras);
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

export default router;
