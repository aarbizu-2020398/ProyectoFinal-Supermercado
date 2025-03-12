<<<<<<< HEAD

import rateLimit from 'express-rate-limit';

export const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
=======
// src/middlewares/validar-cant-peticiones.js
import rateLimit from 'express-rate-limit';

export const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar a 100 peticiones por IP
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  message: "Demasiadas peticiones desde esta IP, por favor inténtelo de nuevo después de 15 minutos"
});
