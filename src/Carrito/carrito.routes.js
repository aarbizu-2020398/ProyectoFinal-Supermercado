import { Router } from 'express';
import { obtenerCarrito, agregarProductoAlCarrito, actualizarProductoDelCarrito, eliminarProductoDelCarrito } from './carrito.controller.js';


const router = Router();

router.get('/', obtenerCarrito);
router.post('/', agregarProductoAlCarrito);
router.put('/', actualizarProductoDelCarrito);
router.delete('/:productoId', eliminarProductoDelCarrito);

export default router;
