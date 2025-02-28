import express from 'express';
import productoControlador from '../productod/productos.controller.js';
import { verificarToken, esAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();


router.post('/', verificarToken, esAdmin, productoControlador.crearProducto);
router.put('/:id', verificarToken, esAdmin, productoControlador.editarProducto);
router.delete('/:id', verificarToken, esAdmin, productoControlador.eliminarProducto);

router.get('/', verificarToken, productoControlador.obtenerProductos);
router.get('/:id', verificarToken, productoControlador.obtenerProductoPorId);
router.get('/agotados', verificarToken, productoControlador.obtenerProductosAgotados);
router.get('/mas-vendidos', verificarToken, productoControlador.obtenerProductosMasVendidos);

export default router; 
