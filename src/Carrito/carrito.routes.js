<<<<<<< HEAD

import { Router } from 'express';
import { verificarToken } from '../middlewares/autenticacion.js'; 
import { obtenerCarrito, agregarProductoAlCarrito, actualizarProductoDelCarrito, eliminarProductoDelCarrito } from './carrito.controller.js';

const router = Router();


router.get('/', verificarToken, obtenerCarrito);
router.post('/', verificarToken, agregarProductoAlCarrito);
router.put('/', verificarToken, actualizarProductoDelCarrito);
router.delete('/:productoId', verificarToken, eliminarProductoDelCarrito);
=======
import { Router } from 'express';
import { obtenerCarrito, agregarProductoAlCarrito, actualizarProductoDelCarrito, eliminarProductoDelCarrito } from './carrito.controller.js';


const router = Router();

router.get('/', obtenerCarrito);
router.post('/', agregarProductoAlCarrito);
router.put('/', actualizarProductoDelCarrito);
router.delete('/:productoId', eliminarProductoDelCarrito);
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

export default router;
