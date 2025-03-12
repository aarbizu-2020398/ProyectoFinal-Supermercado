<<<<<<< HEAD

=======
// Ejemplo de fragmento de src/configs/server.js
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
<<<<<<< HEAD
import { dbConnection } from './mongo.js';
=======
import { dbConnection } from './mongo.js'; // Se importa como dbConnection
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
import { limitador } from '../src/middlewares/validar-cant-peticiones.js';

import authRoutes from '../src/auth/auth.routes.js';
import productosRoutes from '../src/Productos/productos.routes.js';
import categoryRoutes from '../src/Category/category.routes.js';
import facturaRoutes from '../src/Factura/factura.routes.js';
import carritoRoutes from '../src/Carrito/carrito.routes.js';
import compraRoutes from '../src/Compra/compra.routes.js';
import usuariosRoutes from '../src/User/user.routes.js';

const configurarMiddlewares = (aplicacion) => {
  aplicacion.use(express.urlencoded({ extended: false }));
  aplicacion.use(cors());
  aplicacion.use(express.json());
  aplicacion.use(helmet());
  aplicacion.use(morgan('dev'));
  aplicacion.use(limitador);
};

const configurarRutas = (aplicacion) => {
<<<<<<< HEAD

=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  aplicacion.use('/api/auth', authRoutes);
  aplicacion.use('/api/users', usuariosRoutes);
  aplicacion.use('/api/productos', productosRoutes);
  aplicacion.use('/api/categorias', categoryRoutes);
  aplicacion.use('/api/facturas', facturaRoutes);
  aplicacion.use('/api/carrito', carritoRoutes);
  aplicacion.use('/api/compra', compraRoutes);
};

const conectarBaseDatos = async () => {
  try {
<<<<<<< HEAD
=======
    // Llamamos a la función importada dbConnection
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    await dbConnection();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error conectando a la base de datos', error);
    process.exit(1);
  }
};

export const iniciarServidor = async () => {
  const aplicacion = express();
  const puerto = process.env.PORT || 3055;

  try {
    configurarMiddlewares(aplicacion);
    await conectarBaseDatos();
    configurarRutas(aplicacion);
    aplicacion.listen(puerto, () =>
      console.log(`Servidor corriendo en el puerto: ${puerto}`)
    );
  } catch (err) {
    console.error(`Error iniciando el servidor: ${err}`);
  }
};
