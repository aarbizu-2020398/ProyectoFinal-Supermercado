'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from '../configs/mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';


import productoRutas from '../src/productos/productos.routes.js';


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use('/api/productos', productoRutas); 
    
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log(" Conexión a la base de datos exitosa");
    } catch (error) {
        console.error(" Error conectando a la base de datos", error);
        process.exit(1);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3045;

    try {
        middlewares(app);
        await conectarDB(); 
        routes(app);
        app.listen(port, () => console.log(` Servidor corriendo en el puerto: ${port}`));
    } catch (err) {
        console.error(` Error iniciando el servidor: ${err}`);
    }
};
