
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('x-token') || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }

  try {
    const { userId, rol } = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = { userId, rol };
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido o expirado' });
  }
};

module.exports = {
  validarJWT
};
