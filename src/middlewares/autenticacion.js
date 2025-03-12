
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id, rol };
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

export const esAdmin = (req, res, next) => {

  if (req.user.rol !== 'ADMIN') {
    return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de ADMIN' });
  }
  next();
};

