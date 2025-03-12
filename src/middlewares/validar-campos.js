<<<<<<< HEAD

=======
// src/middlewares/validar-cant-peticiones.js
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
