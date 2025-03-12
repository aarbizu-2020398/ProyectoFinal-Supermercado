
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../User/user.model.js';

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;


    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: password,
      rol: rol || 'CLIENT'
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ success: false, message: 'Correo o contraseña incorrectos' });
=======
        const usuario = users.find((user) => user.email === email);
        if (!usuario) {
            return res.status(400).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ success: false, message: "Correo o contraseña incorrectos" });
        }


        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "15d" });

        res.json({ success: true, token, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    }


    const passwordValido = await bcrypt.compare(password, usuario.contraseña);
    if (!passwordValido) {
      return res.status(400).json({ success: false, message: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '15d' }
    );

    res.json({ success: true, token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
