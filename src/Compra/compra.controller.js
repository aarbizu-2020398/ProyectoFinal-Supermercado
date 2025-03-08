import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js';
import Factura from '../Factura/factura.model.js'; // Asegúrate de tener este modelo

export const realizarCompra = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }
    
    let total = 0;
    for (const item of carrito.items) {
      const producto = item.producto;
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para el producto ${producto.nombre}` });
      }
      total += producto.precio * item.cantidad;
    }
    
    // Reducir el stock de cada producto
    for (const item of carrito.items) {
      const producto = item.producto;
      producto.stock -= item.cantidad;
      await producto.save();
    }
    
    // Crear factura con la compra
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
    res.status(500).json({ error: 'Error en el proceso de compra' });
  }
};
