import { Router } from 'express';
import { crearFactura, obtenerFacturas, obtenerFacturaPorId, obtenerHistorialDeCompras } from './factura.controller.js';

const router = Router();

router.post('/', crearFactura);
router.get('/', obtenerFacturas);
router.get('/:id', obtenerFacturaPorId);
router.get('/usuario/historial', obtenerHistorialDeCompras);

export default router;
