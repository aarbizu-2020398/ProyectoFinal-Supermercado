import Usuario from '../User/user.model.js';
import Factura from '../Factura/factura.model.js';
import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js';


// Actualizar el perfil del usuario
export const actualizarPerfil = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { nombre, email, ...otros } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      idUsuario,
      { nombre, email, ...otros },
      { new: true }
    );
    res.json({ mensaje: 'Perfil actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error actualizando el perfil', error });
  }
};

// Eliminar la cuenta del usuario
export const eliminarCuenta = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    await Usuario.findByIdAndDelete(idUsuario);
    res.json({ mensaje: 'Cuenta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error eliminando la cuenta', error });
  }
};

// Obtener el historial de compras (facturas) del usuario
export const obtenerHistorialDeCompras = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const facturas = await Factura.find({ usuario: idUsuario });
    res.json({ facturas });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo el historial de compras', error });
  }
};

// Obtener el carrito de compras del usuario (crea uno si no existe)
export const obtenerCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    let carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
    res.json({ carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo el carrito', error });
  }
};

// Realizar la compra (proceso de compra)
export const realizarCompra = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }
    
    let total = 0;
    // Validar stock y calcular total
    for (const item of carrito.items) {
      const producto = item.producto;
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ mensaje: `Stock insuficiente para el producto ${producto.nombre}` });
      }
      total += producto.precio * item.cantidad;
    }
    
    // Reducir el stock de los productos
    for (const item of carrito.items) {
      const producto = item.producto;
      producto.stock -= item.cantidad;
      await producto.save();
    }
    
    // Crear la factura de la compra
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
    
    // Vaciar el carrito
    carrito.items = [];
    await carrito.save();
    
    res.json({ mensaje: 'Compra realizada exitosamente', factura });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el proceso de compra', error });
  }
};
