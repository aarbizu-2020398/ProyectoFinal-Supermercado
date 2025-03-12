
import { Router } from 'express';
import { verificarToken } from '../middlewares/autenticacion.js'; 
import { obtenerCarrito, agregarProductoAlCarrito, actualizarProductoDelCarrito, eliminarProductoDelCarrito } from './carrito.controller.js';

const router = Router();


router.get('/', verificarToken, obtenerCarrito);
router.post('/', verificarToken, agregarProductoAlCarrito);
router.put('/', verificarToken, actualizarProductoDelCarrito);
router.delete('/:productoId', verificarToken, eliminarProductoDelCarrito);

export default router;
