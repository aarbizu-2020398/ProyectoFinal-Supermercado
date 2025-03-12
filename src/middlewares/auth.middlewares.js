
export const validarJWT = (req, res, next) => {
    req.user = { _id: "64usuarioPrueba123" };
    next();
  };
  