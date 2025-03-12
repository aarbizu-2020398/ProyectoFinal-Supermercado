import express from 'express';
import productoControlador from '../Productos/productos.controller.js'; 
import { verificarToken, esAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();

<<<<<<< HEAD
router.get('/agotados', verificarToken, productoControlador.obtenerProductosAgotados);
router.get('/mas-vendidos', verificarToken, productoControlador.obtenerProductosMasVendidos);
router.get('/', verificarToken, productoControlador.obtenerProductos);
router.get('/:id', verificarToken, productoControlador.obtenerProductoPorId);
=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
router.post('/', verificarToken, esAdmin, productoControlador.crearProducto);
router.put('/:id', verificarToken, esAdmin, productoControlador.editarProducto);
router.delete('/:id', verificarToken, esAdmin, productoControlador.eliminarProducto);

<<<<<<< HEAD
=======
router.get('/', verificarToken, productoControlador.obtenerProductos);
router.get('/:id', verificarToken, productoControlador.obtenerProductoPorId);
router.get('/agotados', verificarToken, productoControlador.obtenerProductosAgotados);
router.get('/mas-vendidos', verificarToken, productoControlador.obtenerProductosMasVendidos);

>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export default router;
