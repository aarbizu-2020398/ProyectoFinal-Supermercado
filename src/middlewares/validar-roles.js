
const validarAdminRole = (req, res, next) => {

    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
      });
    }
  
    const { rol, userId } = req.user;
    if (rol !== 'ADMIN') {
      return res.status(403).json({
        msg: `El usuario con ID ${userId} no es administrador - Acceso denegado.`
      });
    }
  
    next();
  };
  
  module.exports = {
    validarAdminRole
  };
  