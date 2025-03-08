// Ejemplo de fragmento de src/configs/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js'; // Se importa como dbConnection
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
    // Llamamos a la función importada dbConnection
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
