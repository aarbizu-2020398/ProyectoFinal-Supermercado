// src/middlewares/autenticacion.js
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId }; // Guardamos el ID del usuario en la petición
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

export const esAdmin = (req, res, next) => {
  const { userId } = req.user; // Verifica que el usuario existe en el token

  // Aquí puedes validar si el usuario tiene rol 'ADMIN' (suponiendo que tienes un modelo de Usuario)
  if (userId !== 'adminId') {  // Cambia 'adminId' por la lógica que validará si el usuario es administrador
    return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de ADMIN' });
  }
  next();
};
