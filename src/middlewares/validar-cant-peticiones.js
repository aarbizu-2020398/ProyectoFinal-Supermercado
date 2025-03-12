
import rateLimit from 'express-rate-limit';

export const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Demasiadas peticiones desde esta IP, por favor inténtelo de nuevo después de 15 minutos"
});
