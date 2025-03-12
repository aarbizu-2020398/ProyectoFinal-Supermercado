// index.js
import { config } from 'dotenv';
config();  // Cargar variables de entorno

import { iniciarServidor } from './configs/server.js';

iniciarServidor();
