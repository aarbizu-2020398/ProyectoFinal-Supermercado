
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

export default router;
