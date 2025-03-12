<<<<<<< HEAD

=======
// middlewares/validar-roles.js
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
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
  