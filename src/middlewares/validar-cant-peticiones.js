// src/middlewares/validar-cant-peticiones.js
import rateLimit from 'express-rate-limit';

export const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar a 100 peticiones por IP
  message: "Demasiadas peticiones desde esta IP, por favor inténtelo de nuevo después de 15 minutos"
});
