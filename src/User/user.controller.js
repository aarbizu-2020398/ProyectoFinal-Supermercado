
import Usuario from '../User/user.model.js';
import Factura from '../Factura/factura.model.js';
import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js';


export const actualizarPerfil = async (req, res) => {
  try {
    const idUsuario = req.user?._id;
    if (!idUsuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario en la solicitud' });
    }

    const { nombre, email, ...otros } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      idUsuario,
      { nombre, email, ...otros },
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado al actualizar' });
    }
    res.json({ mensaje: 'Perfil actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error en actualizarPerfil:', error);
    res.status(500).json({ mensaje: 'Error actualizando el perfil', error });
  }
};

export const eliminarCuenta = async (req, res) => {
  try {
    const idUsuario = req.user?._id;
    if (!idUsuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario en la solicitud' });
    }
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado al eliminar' });
    }
    res.json({ mensaje: 'Cuenta eliminada exitosamente' });
  } catch (error) {
    console.error('Error en eliminarCuenta:', error);
    res.status(500).json({ mensaje: 'Error eliminando la cuenta', error });
  }
};


export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json({ usuarios });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error });
  }
};


export const editarUsuarioPorId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nombre, email, rol, contraseña } = req.body;
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (rol) usuario.rol = rol;
    if (contraseña) {

      usuario.contraseña = contraseña;
    }
    await usuario.save();
    res.json({ mensaje: 'Usuario editado exitosamente', usuario });
  } catch (error) {
    console.error('Error al editar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error });
  }
};


export const eliminarUsuarioPorId = async (req, res) => {
  try {
    const { userId } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(userId);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error });
  }
};


export const obtenerHistorialDeCompras = async (req, res) => {
  try {
    const idUsuario = req.user?._id;
    if (!idUsuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario en la solicitud' });
    }
    const facturas = await Factura.find({ usuario: idUsuario });
    res.json({ facturas });
  } catch (error) {
    console.error('Error en obtenerHistorialDeCompras:', error);
    res.status(500).json({ mensaje: 'Error obteniendo el historial de compras', error });
  }
};

export const obtenerCarrito = async (req, res) => {
  try {
    const idUsuario = req.user?._id;
    if (!idUsuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario en la solicitud' });
    }
    let carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
    res.json({ carrito });
  } catch (error) {
    console.error('Error en obtenerCarrito:', error);
    res.status(500).json({ mensaje: 'Error obteniendo el carrito', error });
  }
};

export const realizarCompra = async (req, res) => {
  try {
    const idUsuario = req.user?._id;
    if (!idUsuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario en la solicitud' });
    }
    const carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }
    let total = 0;
    for (const item of carrito.items) {
      const producto = item.producto;
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ mensaje: `Stock insuficiente para el producto ${producto.nombre}` });
      }
      total += producto.precio * item.cantidad;
    }
    for (const item of carrito.items) {
      const producto = item.producto;
      producto.stock -= item.cantidad;
      await producto.save();
    }
    const datosFactura = {
      usuario: idUsuario,
      items: carrito.items.map(item => ({
        producto: item.producto._id,
        cantidad: item.cantidad,
        precio: item.producto.precio
      })),
      total,
      fecha: new Date()
    };
    const factura = await Factura.create(datosFactura);
    carrito.items = [];
    await carrito.save();
    res.json({ mensaje: 'Compra realizada exitosamente', factura });
  } catch (error) {
    console.error('Error en realizarCompra:', error);
    res.status(500).json({ mensaje: 'Error en el proceso de compra', error });
  }
};
