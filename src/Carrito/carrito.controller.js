import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js'

export const obtenerCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    let carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el carrito' });
  }
};

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId, cantidad } = req.body;
    
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
    
    const itemExistente = carrito.items.find(item => item.producto.toString() === productoId);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carrito.items.push({ producto: productoId, cantidad });
    }
    
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error agregando producto al carrito' });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const actualizarProductoDelCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId, cantidad } = req.body;
    
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    
    const item = carrito.items.find(item => item.producto.toString() === productoId);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    
    item.cantidad = cantidad;
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando el producto en el carrito' });
  }
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId } = req.params;
    
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    
    carrito.items = carrito.items.filter(item => item.producto.toString() !== productoId);
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando el producto del carrito' });
  }
};
