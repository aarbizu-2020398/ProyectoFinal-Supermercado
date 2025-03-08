import { Router } from 'express';
import { 
  actualizarPerfil, 
  eliminarCuenta, 
  obtenerHistorialDeCompras, 
  obtenerCarrito, 
  realizarCompra 
} from './user.controller.js';

const router = Router();

// Rutas de gestión de perfil
router.put('/perfil', actualizarPerfil);
router.delete('/perfil', eliminarCuenta);

// Rutas para funcionalidades de compra (cliente)
router.get('/carrito', obtenerCarrito);
router.post('/compra', realizarCompra);
router.get('/historial', obtenerHistorialDeCompras);

export default router;
