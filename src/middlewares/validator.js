
const { check } = require('express-validator');
const { validarCampos } = require('./validar-campos');


const registerValidator = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(),
  check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validarCampos
];


const loginValidator = [
  check('email', 'El correo no es válido').isEmail(),
  check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
];

module.exports = {
  registerValidator,
  loginValidator
};
