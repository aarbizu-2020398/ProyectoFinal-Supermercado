<<<<<<< HEAD

import { Router } from 'express';
import { actualizarPerfil, eliminarCuenta, obtenerHistorialDeCompras, obtenerCarrito, realizarCompra,listarUsuarios,editarUsuarioPorId,eliminarUsuarioPorId} from './user.controller.js';

const dummyAuth = (req, res, next) => {
  req.user = { _id: '64abc123def456...' }; 
  next();
};

const router = Router();

router.get('/perfil', dummyAuth, async (req, res) => {

  res.json({ mensaje: 'Endpoint GET /perfil para obtener datos del usuario' });
});
router.put('/perfil', dummyAuth, actualizarPerfil);
router.delete('/perfil', dummyAuth, eliminarCuenta);
router.get('/carrito', dummyAuth, obtenerCarrito);
router.post('/compra', dummyAuth, realizarCompra);
router.get('/historial', dummyAuth, obtenerHistorialDeCompras);


router.get('/', /*verificarAdmin,*/ listarUsuarios);
router.put('/:userId', /*verificarAdmin,*/ editarUsuarioPorId);
router.delete('/:userId', /*verificarAdmin,*/ eliminarUsuarioPorId);
=======
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
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

export default router;
