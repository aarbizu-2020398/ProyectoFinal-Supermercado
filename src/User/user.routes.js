
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

export default router;
